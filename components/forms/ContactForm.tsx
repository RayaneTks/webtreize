'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm, type FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { Field } from '@/components/ui/Field';
import { CONTACT_EMAIL } from '@/lib/constants';
import {
  CONTACT_HONEYPOT_FIELD,
  CONTACT_TIMESTAMP_FIELD,
  CONTACT_VISIBLE_FIELDS,
  contactFormSchema,
  type ContactField,
  type ContactFieldErrors,
  type ContactFormValues,
} from '@/lib/validation/contact';

/**
 * Formulaire de contact — seul point de conversion du site.
 *
 * C’est le seul îlot client de la page : `app/contact/page.tsx` est redevenu un
 * composant serveur et porte enfin ses propres métadonnées (finding critique
 * « seo-contact-client-component-sans-metadata » — la page héritait du titre de
 * l’accueil, deux URL indexables avec le même `<title>`).
 *
 * ## Validation
 *
 * `zod` et `react-hook-form` étaient des dépendances installées et jamais
 * employées ; la validation était réécrite à la main, en double, et divergeait
 * de celle de la route. Le schéma de `lib/validation/contact.ts` est désormais
 * la seule source : le client valide avec `contactFormSchema`, la route avec
 * `contactSchema` (le même, plus les deux champs anti-spam). Un message d’erreur
 * n’est donc écrit qu’une fois, au même endroit, pour les deux côtés.
 *
 * ## Accessibilité (findings « a11y-formulaire-erreurs-non-annoncees » et
 * « a11y-formulaire-autocomplete-inputmode »)
 *
 * - `noValidate` : les bulles natives du navigateur sont muettes pour certains
 *   lecteurs d’écran et ignorent la langue du document. La validation est la
 *   nôtre, annoncée par nous.
 * - Deux régions live **présentes dès le premier rendu** — une région insérée
 *   en même temps que son contenu n’est pas annoncée : `assertive` pour l’échec
 *   (il interrompt, l’envoi vient d’échouer), `polite` pour le succès.
 * - Le focus part sur le premier champ en défaut, dans l’ordre visuel, à chaque
 *   soumission refusée — côté client comme côté serveur.
 * - Au succès, le focus part sur le titre du panneau de confirmation, qui porte
 *   `tabIndex={-1}` : sans cela, le bouton d’envoi est démonté et le focus
 *   retombe sur `<body>`.
 * - `autocomplete` sur les trois champs qui en ont un (`name`, `email`, `tel`)
 *   et `inputMode="tel"` sur le téléphone.
 *
 * ## Anti-spam
 *
 * Aucun service tiers, aucun CAPTCHA : un champ leurre (`company`) et
 * l’horodatage de rendu, exactement ce que la route attend. Le leurre est
 * `sr-only` **et** `aria-hidden` : invisible à l’œil, hors de l’arbre
 * d’accessibilité, mais bien présent dans le DOM pour le robot qui le remplira.
 */

/** Champs, dans l’ordre visuel. Sert au focus du premier défaut. */
const FIELD_ORDER = CONTACT_VISIBLE_FIELDS;

/** Repli quand la réponse n’est pas exploitable (page d’erreur d’un proxy, corps vide). */
const STATUS_FALLBACK: Record<number, string> = {
  400: 'Le formulaire n’est pas encore complet. Reprenez les champs signalés.',
  413: `Votre message est trop volumineux. Écrivez-nous à ${CONTACT_EMAIL}, nous répondons aussi vite.`,
  429: `Trop d’envois depuis cette connexion. Réessayez dans quelques minutes, ou écrivez-nous à ${CONTACT_EMAIL}.`,
  500: `Le formulaire est momentanément indisponible. Écrivez-nous à ${CONTACT_EMAIL}, nous répondons aussi vite.`,
  502: `L’envoi n’a pas abouti de notre côté. Écrivez-nous à ${CONTACT_EMAIL}, nous répondons aussi vite.`,
  504: `Notre service d’envoi met trop de temps à répondre. Écrivez-nous à ${CONTACT_EMAIL}, nous répondons aussi vite.`,
};

/** Résumé annoncé quand la validation client refuse la soumission. */
const INCOMPLETE_FORM = 'Le formulaire n’est pas encore complet. Reprenez les champs signalés.';

const NETWORK_ERROR =`Votre connexion a coupé avant l’envoi. Réessayez, ou écrivez-nous à ${CONTACT_EMAIL}.`;

const UNKNOWN_ERROR = `L’envoi n’a pas abouti. Écrivez-nous à ${CONTACT_EMAIL}, nous répondons aussi vite.`;

/** Corps de réponse de `POST /api/contact`, tel que la route le construit. */
type ContactResponse = {
  success?: boolean;
  error?: string;
  fieldErrors?: ContactFieldErrors;
  retryAfter?: number;
};

const EMPTY_FORM: ContactFormValues = { name: '', email: '', phone: '', message: '' };

/** Déplace le focus sur le premier champ en défaut, dans l’ordre visuel. */
function focusFirstError(fields: readonly ContactField[]): void {
  const first = FIELD_ORDER.find((name) => fields.includes(name));
  if (!first) return;
  document.getElementById(first)?.focus();
}

export function ContactForm() {
  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: EMPTY_FORM,
  });

  const [isSent, setIsSent] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const honeypotRef = useRef<HTMLInputElement>(null);
  const renderedAtRef = useRef(0);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  // Horodatage de rendu, posé au montage. Une soumission arrivée moins de trois
  // secondes après n’est pas humaine : la route la rejette en silence.
  useEffect(() => {
    renderedAtRef.current = Date.now();
  }, []);

  useEffect(() => {
    if (isSent) successHeadingRef.current?.focus();
  }, [isSent]);

  const onValid = async (values: ContactFormValues) => {
    setFormError(null);

    let response: Response;

    try {
      response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          [CONTACT_HONEYPOT_FIELD]: honeypotRef.current?.value ?? '',
          [CONTACT_TIMESTAMP_FIELD]: renderedAtRef.current,
        }),
      });
    } catch {
      setFormError(NETWORK_ERROR);
      return;
    }

    // Le corps peut ne pas être du JSON : page d’erreur d’un proxy, 502 du CDN.
    const data: ContactResponse | null = await response.json().catch(() => null);

    if (response.ok && data?.success) {
      setIsSent(true);
      return;
    }

    const fieldErrors = data?.fieldErrors;

    if (fieldErrors) {
      const touched: ContactField[] = [];

      for (const name of FIELD_ORDER) {
        const message = fieldErrors[name];
        if (!message) continue;
        setError(name, { type: 'server', message });
        touched.push(name);
      }

      if (touched.length > 0) {
        setFormError(data?.error ?? STATUS_FALLBACK[400]);
        focusFirstError(touched);
        return;
      }
    }

    setFormError(data?.error ?? STATUS_FALLBACK[response.status] ?? UNKNOWN_ERROR);
  };

  // `react-hook-form` passe les erreurs à ce gestionnaire : on ne relit ni
  // `formState` (celui du rendu précédent) ni le DOM (pas encore rafraîchi).
  const onInvalid = (invalid: FieldErrors<ContactFormValues>) => {
    setFormError(INCOMPLETE_FORM);
    focusFirstError(FIELD_ORDER.filter((name) => Boolean(invalid[name])));
  };

  return (
    <div>
      {/* Régions live montées dès le premier rendu : une région créée en même
          temps que son message n’est pas annoncée par les lecteurs d’écran. */}
      <p aria-live="assertive" role="alert" className="sr-only">
        {formError ?? ''}
      </p>
      <p aria-live="polite" className="sr-only">
        {isSent ? 'Votre message est parti.' : ''}
      </p>

      {isSent ? (
        <div className="rule-top">
          <h3
            ref={successHeadingRef}
            tabIndex={-1}
            className="text-title font-bold text-ink focus:outline-none"
          >
            C’est envoyé.
          </h3>
          <p className="mt-gap-xs max-w-[46ch] text-body text-ink-muted">
            Nous vous répondons par écrit, les jours ouvrés, depuis{' '}
            <span className="font-medium text-ink">{CONTACT_EMAIL}</span>. Si rien n’arrive, pensez
            à regarder vos indésirables&#8239;: c’est là que les premières réponses se perdent.
          </p>
          <p className="mt-gap-sm text-label font-semibold uppercase text-ink-faint">
            En attendant
          </p>
          <ul className="mt-gap-xs grid gap-gap-xs">
            <li>
              <Button href="/services" variant="text" arrow>
                Ce que nous faisons, en détail
              </Button>
            </li>
            <li>
              <Button href="/about" variant="text" arrow>
                Qui vous répondra
              </Button>
            </li>
          </ul>
        </div>
      ) : (
        <form noValidate onSubmit={handleSubmit(onValid, onInvalid)} className="grid gap-gap-sm">
          {/* Leurre. Ni visible, ni annoncé, ni atteignable au clavier. */}
          <input
            ref={honeypotRef}
            id={CONTACT_HONEYPOT_FIELD}
            name={CONTACT_HONEYPOT_FIELD}
            type="text"
            defaultValue=""
            tabIndex={-1}
            aria-hidden="true"
            autoComplete="off"
            className="sr-only"
          />

          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field
                id="name"
                label="Nom complet"
                required
                autoComplete="name"
                value={field.value ?? ''}
                onChange={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field
                id="email"
                label="Adresse e-mail"
                type="email"
                required
                autoComplete="email"
                inputMode="email"
                hint="C’est là que nous répondons."
                value={field.value ?? ''}
                onChange={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState }) => (
              <Field
                id="phone"
                label="Téléphone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                hint="Facultatif, si vous préférez que nous vous rappelions."
                value={field.value ?? ''}
                onChange={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="message"
            control={control}
            render={({ field, fieldState }) => (
              <Field
                id="message"
                label="Votre projet"
                type="textarea"
                required
                rows={6}
                hint="Votre activité, ce qui bloque aujourd’hui. Deux phrases suffisent."
                value={field.value ?? ''}
                onChange={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />

          {/* Le message d’échec est répété à l’écran : la région live plus haut
              n’est lue que par les technologies d’assistance. */}
          {formError ? (
            <p className="text-note font-medium text-accent-deep">{formError}</p>
          ) : null}

          <div className="mt-gap-xs">
            <Button type="submit" loading={isSubmitting} arrow>
              Envoyer ma demande
            </Button>
          </div>

          {/* RGPD art. 13 : l’information est due au moment de la collecte, pas
              trois clics plus loin (finding « rgpd-collecte-sans-information »). */}
          <p className="max-w-[52ch] text-note text-ink-faint">
            Vos coordonnées ne servent qu’à vous répondre. Elles ne sont ni revendues ni utilisées
            pour de la prospection.{' '}
            <Link href="/legal/politique-confidentialite" className="link-draw font-medium">
              Politique de confidentialité
            </Link>
            .
          </p>
        </form>
      )}
    </div>
  );
}
