import { clsx } from 'clsx';

export type AuditBriefProps = {
  /** Chiffre du délai. Chaîne rendue telle quelle côté serveur : jamais comptée, jamais animée. */
  delay: string;
  /** Unité affichée à côté du chiffre. */
  delayUnit: string;
  /**
   * Les trois lignes du livrable. Le tuple est volontairement de longueur fixe :
   * la forme du document appartient à la direction artistique, pas aux données.
   */
  lines: readonly [string, string, string];
  className?: string;
};

/**
 * La fiche — le seul objet en profondeur du site.
 *
 * Une feuille de papier ivoire qu’on vous glisse sur la table, et qui porte le
 * livrable : le délai, un filet, les trois lignes de ce qu’on va vous rendre, et
 * en pied un trait terre cuite — la marque du studio au bas d’une lettre. Le
 * prospect ne lit plus la promesse d’un audit, il voit la feuille qu’il va
 * recevoir.
 *
 * ## Pourquoi c’est ici, et nulle part ailleurs
 *
 * Sous le bord bas, trois pixels de sable : la tranche du papier. C’est le seul
 * fond du site où l’épaisseur est physiquement lisible — sur l’encre `#17130f`,
 * une bande `sand` est plus **claire** que le fond. Une ombre portée est plus
 * sombre que ce sur quoi elle tombe ; celle-ci est plus claire. Ce n’est donc
 * pas une ombre, et l’interdit du DESIGN.md n’est pas effleuré. Sur ivoire, la
 * même tranche n’aurait pu être qu’une ombre, donc interdite.
 *
 * ## Ce que le balisage interdit
 *
 * - `.brief__edge` est le **premier** enfant : l’ordre du DOM suffit à le peindre
 *   derrière la feuille opaque. Aucun `z-index`, donc aucun contexte
 *   d’empilement à raisonner — un `z-index: -1` peindrait la tranche par-dessus
 *   l’ivoire dès que le conteneur porte un `transform`.
 * - `text-left` explicite : la section est centrée, et une carte centrée avec
 *   étiquette, filet, liste et barre est la silhouette exacte d’une carte de
 *   tarif logiciel. Une lettre s’aligne à gauche.
 * - **Aucun rayon, aucun `aspect-ratio`.** Le papier n’a pas de coins arrondis,
 *   et il est coupé au texte : c’est ce qui le sépare d’une carte d’interface.
 * - Toutes les couleurs de texte sont explicites : la section hérite
 *   `text-canvas`, rien ne doit fuir sur la feuille ivoire.
 * - Jamais enveloppé dans `Reveal` : son voile rendrait `opacity: 0` sur un bloc
 *   qui porte du contenu, au moment précis où la fiche se pose.
 *
 * `clsx` et non `cn` : `tailwind-merge` range `text-display-sm` et `text-ink`
 * dans le même groupe et en supprime une — même raison que dans `Logo.tsx`.
 */
export function AuditBrief({ delay, delayUnit, lines, className }: AuditBriefProps) {
  return (
    <div className={clsx('brief', className)}>
      <div className="brief__stack mx-auto w-full max-w-sm">
        <span className="brief__edge" aria-hidden="true" />

        <article className="brief__sheet bg-canvas p-gap-md text-left">
          <p className="eyebrow text-ink-faint">Ce que vous recevez</p>

          <p className="mt-gap-xs font-serif text-display-sm font-light leading-none text-ink">
            {delay}
            <span className="ml-1 font-sans text-title-sm font-semibold text-ink-muted">
              {delayUnit}
            </span>
          </p>

          <div className="mt-gap-sm border-t border-line" />

          <ul className="mt-gap-sm grid list-none gap-gap-xs">
            {lines.map((line) => (
              <li key={line} className="text-note text-ink-muted">
                {line}
              </li>
            ))}
          </ul>

          {/* La signature du studio au bas d’une lettre. Aplat, donc `accent` et
              non `accent-deep` : c’est la seule terre cuite de cet écran. */}
          <span className="mt-gap-md block h-px w-8 bg-accent" aria-hidden="true" />
        </article>
      </div>
    </div>
  );
}
