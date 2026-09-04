import { z } from 'zod';

/**
 * Source unique de vérité du formulaire de contact.
 *
 * Le même schéma est consommé par le client (`components/forms/ContactForm.tsx`,
 * via `@hookform/resolvers/zod`) et par la route serveur (`app/api/contact/route.ts`).
 * Les messages d’erreur sont rédigés pour être affichés tels quels : ils sont en
 * français, dans la voix du site, et respectent la typographie de la charte
 * (apostrophes courbes, espaces fines insécables avant « : ; ! ? »).
 */

/** Espace fine insécable — U+202F. Devant « : ; ! ? » et dans les nombres. */
const FINE = '\u202f';

/** Bornes hautes des champs. Elles bornent aussi la taille utile du corps de requête. */
export const CONTACT_LIMITS = {
  name: 120,
  email: 254,
  phone: 24,
  message: 4000,
} as const;

/**
 * Champs anti-spam, sans service tiers.
 *
 * - `company` est un **leurre** : invisible pour un humain (`aria-hidden`,
 *   `tabindex="-1"`, `autocomplete="off"`), rempli par la plupart des robots.
 *   Le schéma l’accepte toujours — c’est la route qui décide quoi en faire, afin
 *   de ne jamais renvoyer d’erreur qui apprendrait la règle au robot.
 * - `renderedAt` est l’**horodatage de rendu** du formulaire, en millisecondes
 *   (`Date.now()` au montage du composant). Une soumission arrivée moins de
 *   trois secondes après le rendu n’est pas humaine.
 */
export const CONTACT_HONEYPOT_FIELD = 'company';
export const CONTACT_TIMESTAMP_FIELD = 'renderedAt';

/** Délai minimal entre le rendu du formulaire et sa soumission. */
export const CONTACT_MIN_SUBMIT_DELAY_MS = 3000;

/**
 * Téléphone : chiffres, espaces, points, tirets, parenthèses, indicatif « + »
 * facultatif. Au moins six caractères — on ne cherche pas à valider un plan de
 * numérotation, seulement à écarter la saisie manifestement fautive.
 */
const PHONE_PATTERN = /^\+?[\d\s().-]{6,}$/;

/** Le schéma complet, tel qu’il transite entre le client et la route. */
export const contactSchema = z.object({
  name: z
    .string({ error: 'Il nous faut votre nom.' })
    .trim()
    .min(2, { error: 'Il nous faut votre nom.' })
    .max(CONTACT_LIMITS.name, { error: 'Ce nom dépasse 120 caractères.' }),

  email: z
    .string({ error: `Il nous faut votre adresse e-mail${FINE}: c’est là que nous répondons.` })
    .trim()
    .min(1, { error: `Il nous faut votre adresse e-mail${FINE}: c’est là que nous répondons.` })
    .max(CONTACT_LIMITS.email, { error: 'Cette adresse e-mail est trop longue.' })
    .pipe(z.email({ error: 'Cette adresse e-mail semble incomplète.' })),

  // Facultatif. La chaîne vide est acceptée : le champ est simplement resté vide.
  phone: z
    .string()
    .trim()
    .max(CONTACT_LIMITS.phone, { error: 'Ce numéro dépasse 24 caractères.' })
    .refine((value) => value === '' || PHONE_PATTERN.test(value), {
      error: 'Ce numéro ne ressemble pas à un téléphone. Chiffres, espaces, points ou tirets.',
    })
    .optional(),

  message: z
    .string({ error: 'Il nous faut quelques lignes sur votre projet.' })
    .trim()
    .min(1, { error: 'Il nous faut quelques lignes sur votre projet.' })
    .min(10, {
      error: `Dites-nous-en un peu plus${FINE}: votre activité, et ce qui bloque. Deux phrases suffisent.`,
    })
    .max(CONTACT_LIMITS.message, {
      error: `Votre message dépasse 4${FINE}000 caractères. Gardez l’essentiel, nous creuserons ensemble.`,
    }),

  // Leurre : aucune contrainte, aucune erreur possible. La route s’en charge.
  company: z.string().optional(),

  // Horodatage de rendu. Un nombre, jamais une chaîne : le client l’ajoute au
  // moment de l’envoi, il ne provient pas d’un champ de saisie.
  renderedAt: z
    .number({ error: 'Formulaire expiré. Rechargez la page, puis réessayez.' })
    .int({ error: 'Formulaire expiré. Rechargez la page, puis réessayez.' })
    .nonnegative({ error: 'Formulaire expiré. Rechargez la page, puis réessayez.' }),
});

/**
 * Dérivation pour le client : les seuls champs que l’utilisateur saisit.
 * Le leurre et l’horodatage sont ajoutés au moment de l’envoi, ils ne sont pas
 * gérés par `react-hook-form`. Une seule source, deux vues.
 */
export const contactFormSchema = contactSchema.omit({ company: true, renderedAt: true });

/** Corps attendu par `POST /api/contact`. */
export type ContactPayload = z.infer<typeof contactSchema>;

/** Valeurs manipulées par le formulaire client. */
export type ContactFormValues = z.infer<typeof contactFormSchema>;

/** Les champs visibles, les seuls qui peuvent porter une erreur affichable. */
export const CONTACT_VISIBLE_FIELDS = ['name', 'email', 'phone', 'message'] as const;

export type ContactField = (typeof CONTACT_VISIBLE_FIELDS)[number];

/** Erreurs prêtes à l’affichage : un message par champ, jamais un tableau. */
export type ContactFieldErrors = Partial<Record<ContactField, string>>;

/**
 * Réduit les erreurs zod à un message par champ visible.
 * Les champs anti-spam sont volontairement écartés : leur signaler une erreur
 * reviendrait à publier la règle au robot qui l’a déclenchée.
 */
export function toFieldErrors(error: z.ZodError<ContactPayload>): ContactFieldErrors {
  const flat = z.flattenError(error).fieldErrors;
  const result: ContactFieldErrors = {};

  for (const field of CONTACT_VISIBLE_FIELDS) {
    const messages = flat[field];
    if (messages && messages.length > 0) result[field] = messages[0];
  }

  return result;
}
