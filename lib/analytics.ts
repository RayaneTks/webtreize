import { SITE_URL } from '@/lib/constants';

/**
 * Mesure d’audience — désactivée par défaut.
 *
 * ## Le principe : la politique de confidentialité ne peut pas mentir
 *
 * Le site affirme n’utiliser aucun outil de mesure, et c’est vrai tant que
 * `NEXT_PUBLIC_ANALYTICS` est vide. Le jour où la mesure est activée, la section
 * « Cookies et mesure d’audience » de la politique de confidentialité lit la
 * **même** constante que le script de mesure (`lib/data/legal.ts`) : les deux
 * basculent dans le même déploiement, ou ni l’un ni l’autre. Il est impossible
 * d’activer la mesure en oubliant le texte.
 *
 * ## Pourquoi Plausible
 *
 * Mesure sans cookie, sans identifiant persistant, sans croisement entre sites,
 * données hébergées dans l’UE. Configurée ainsi, elle entre dans l’exemption de
 * consentement prévue par la CNIL pour la mesure d’audience strictement
 * nécessaire : aucun bandeau de cookies n’est requis. Un outil qui dépose des
 * cookies (Google Analytics, pixels publicitaires) imposerait au contraire un
 * recueil de consentement préalable — hors périmètre de ce fichier.
 *
 * ## Les six événements suivis
 *
 * Le nom technique est court et stable : il sert de clé dans l’outil de mesure.
 */
export const ANALYTICS_EVENTS = {
  clic_audit: 'Clic sur un appel à l’audit',
  debut_formulaire: 'Début de saisie du formulaire de contact',
  envoi_formulaire: 'Formulaire de contact envoyé avec succès',
  visite_realisation: 'Consultation d’une étude de cas',
  clic_email: 'Clic sur l’adresse e-mail',
  clic_telephone: 'Clic sur le numéro de téléphone',
} as const;

export type AnalyticsEvent = keyof typeof ANALYTICS_EVENTS;

type Provider = 'plausible';

/** Le fournisseur actif, ou `undefined` : aucune mesure. */
export const ANALYTICS_PROVIDER: Provider | undefined =
  process.env.NEXT_PUBLIC_ANALYTICS === 'plausible' ? 'plausible' : undefined;

/** Domaine déclaré côté Plausible. Par défaut, l’hôte canonique du site. */
export const PLAUSIBLE_DOMAIN =
  process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN?.trim() || new URL(SITE_URL).host;

/** Origine du script, déclarée aussi dans la CSP de `next.config.ts`. */
export const PLAUSIBLE_ORIGIN = 'https://plausible.io';

type PlausibleFn = ((event: string, options?: { props?: Record<string, string> }) => void) & {
  q?: unknown[];
};

declare global {
  interface Window {
    plausible?: PlausibleFn;
  }
}

/**
 * Envoie un événement. Sans fournisseur actif, ne fait strictement rien — ni
 * requête, ni stockage, ni file d’attente.
 */
export function track(event: AnalyticsEvent, props?: Record<string, string>): void {
  if (!ANALYTICS_PROVIDER || typeof window === 'undefined') return;

  // File d’attente officielle de Plausible : un événement émis avant la fin du
  // chargement du script n’est pas perdu.
  const plausible: PlausibleFn =
    window.plausible ??
    Object.assign(
      (...args: unknown[]) => {
        (plausible.q = plausible.q ?? []).push(args);
      },
      {},
    );
  window.plausible = plausible;
  plausible(event, props ? { props } : undefined);
}

/** Garde de type pour les attributs `data-track` lus dans le DOM. */
export function isAnalyticsEvent(value: string | undefined): value is AnalyticsEvent {
  return value !== undefined && Object.prototype.hasOwnProperty.call(ANALYTICS_EVENTS, value);
}
