import { clsx } from 'clsx';
import { CONTACT_EMAIL, SNAPCHAT_URL } from '@/lib/constants';

/**
 * Coordonnées du studio, en colonnes séparées par un filet haut — pas de
 * pastilles, pas d’icônes décoratives.
 *
 * Le bloc est un `<address>` : c’est le seul élément qui rattache des
 * coordonnées à l’entité éditrice, et Google s’appuie sur la cohérence NAP
 * (nom, adresse, téléphone) entre le site et la fiche Google Business pour le
 * classement local. Les valeurs affichées reprennent mot pour mot celles du
 * nœud `PostalAddress` de `lib/seo.ts` — `addressLocality` « Marseille » et
 * `addressRegion` « Provence-Alpes-Côte d’Azur ». Ni rue, ni code postal, ni
 * téléphone : aucune de ces données n’est publiable en l’état, et le JSON-LD ne
 * les déclare pas davantage.
 *
 * Les deux liens portent `.link-draw` et **aucun** utilitaire `transition-*` :
 * ce dernier redéfinirait `transition-property` et empêcherait le soulignement
 * de se dessiner. La couleur ne change pas au survol — le trait suffit, et
 * trois liens qui passeraient en terre cuite épuiseraient à eux seuls la règle
 * des trois de la charte §2.
 *
 * Composition par `clsx` et non `cn` : voir l’en-tête de
 * `components/ui/Button.tsx`.
 */
export function ContactChannels({ className }: { className?: string }) {
  return (
    <address className={clsx('not-italic', className)}>
      <ul className="grid gap-gap-md sm:grid-cols-3">
        <li className="rule-top">
          <p className="eyebrow">Où</p>
          <p className="mt-2.5 text-body-lg font-semibold text-ink">
            Marseille, Provence-Alpes-Côte d’Azur
          </p>
          <p className="mt-1.5 text-body text-ink-muted">
            Sur place dans le 13, à distance ailleurs.
          </p>
        </li>

        <li className="rule-top">
          <p className="eyebrow">E-mail</p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="link-draw mt-2.5 inline-block text-body-lg font-semibold text-ink"
          >
            {CONTACT_EMAIL}
          </a>
          <p className="mt-1.5 text-body text-ink-muted">Réponse écrite sous 48&nbsp;heures.</p>
        </li>

        <li className="rule-top">
          <p className="eyebrow">Snapchat</p>
          <a
            href={SNAPCHAT_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="link-draw mt-2.5 inline-block text-body-lg font-semibold text-ink"
          >
            @webtreize
            <span className="sr-only"> (nouvelle fenêtre)</span>
          </a>
          <p className="mt-1.5 text-body text-ink-muted">Pour les échanges rapides.</p>
        </li>
      </ul>
    </address>
  );
}
