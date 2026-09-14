import { clsx } from 'clsx';
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
  GEO_LINE,
  SOCIAL_PROFILES,
} from '@/lib/constants';

/**
 * Coordonnées du studio, en colonnes séparées par un filet haut — pas de
 * pastilles, pas d’icônes décoratives.
 *
 * Le bloc est un `<address>` : c’est l’élément qui rattache des coordonnées à
 * l’entité éditrice. Les valeurs affichées reprennent celles des données
 * structurées de `lib/seo.ts` — la cohérence entre le site, le JSON-LD et la
 * fiche Google Business compte pour le classement local.
 *
 * **Le téléphone et les réseaux n’apparaissent que s’ils existent.** Ils sont
 * lus depuis `lib/constants.ts`, alimenté par les variables d’environnement :
 * aucun numéro n’est jamais inventé, et la colonne disparaît sans lui.
 *
 * Les liens `mailto:` et `tel:` portent `data-track` : c’est le seul branchement
 * nécessaire pour la mesure des clics (voir `lib/analytics.ts`).
 *
 * Les liens portent `.link-draw` et **aucun** utilitaire `transition-*`, qui
 * redéfinirait `transition-property` et empêcherait le soulignement de se
 * dessiner.
 */
export function ContactChannels({ className }: { className?: string }) {
  const hasPhone = Boolean(CONTACT_PHONE_HREF);

  return (
    <address className={clsx('not-italic', className)}>
      <ul className={clsx('grid gap-gap-md sm:grid-cols-2', hasPhone ? 'lg:grid-cols-4' : 'lg:grid-cols-3')}>
        <li className="rule-top">
          <p className="eyebrow">Où</p>
          <p className="mt-2.5 text-body-lg font-semibold text-ink">Marseille</p>
          <p className="mt-1.5 text-body text-ink-muted">{GEO_LINE}</p>
        </li>

        <li className="rule-top">
          <p className="eyebrow">E-mail</p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            data-track="clic_email"
            className="link-draw mt-2.5 inline-block break-all py-1 text-body-lg font-semibold text-ink"
          >
            {CONTACT_EMAIL}
          </a>
          <p className="mt-1.5 text-body text-ink-muted">Réponse écrite sous 48&nbsp;heures.</p>
        </li>

        {hasPhone ? (
          <li className="rule-top">
            <p className="eyebrow">Téléphone</p>
            <a
              href={CONTACT_PHONE_HREF}
              data-track="clic_telephone"
              className="link-draw mt-2.5 inline-block py-1 text-body-lg font-semibold text-ink"
            >
              {CONTACT_PHONE_DISPLAY}
            </a>
            <p className="mt-1.5 text-body text-ink-muted">Du lundi au vendredi, 9&nbsp;h – 18&nbsp;h.</p>
          </li>
        ) : null}

        <li className="rule-top">
          <p className="eyebrow">{SOCIAL_PROFILES.length > 1 ? 'Réseaux' : 'Réseau'}</p>
          <ul className="mt-2.5 grid gap-1">
            {SOCIAL_PROFILES.map((profile) => (
              <li key={profile.href}>
                <a
                  href={profile.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-draw inline-block py-1 text-body-lg font-semibold text-ink"
                >
                  {profile.label}
                  <span className="sr-only"> (nouvelle fenêtre)</span>
                </a>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </address>
  );
}
