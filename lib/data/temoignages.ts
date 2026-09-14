/**
 * Témoignages clients — uniquement de vrais avis.
 *
 * Règles, sans exception :
 * - un avis n’entre ici que s’il a été donné par écrit par la personne citée,
 *   avec son accord explicite pour publication ;
 * - la citation est recopiée mot pour mot : on peut couper, jamais reformuler ;
 * - la source est indiquée — avis Google, courriel, message — et, quand l’avis
 *   est public, son lien est fourni pour que le visiteur puisse le vérifier.
 *
 * Tant que le tableau est vide, aucune section n’est rendue. Un bloc
 * « témoignages » vide ou garni de citations génériques coûte plus de
 * crédibilité qu’il n’en rapporte.
 *
 * Aucune donnée structurée `Review` n’est émise pour ces avis : Google exclut des
 * résultats enrichis les avis qu’une entreprise publie sur elle-même, et les
 * baliser malgré tout expose à une action manuelle.
 */
export type Temoignage = {
  readonly citation: string;
  readonly auteur: string;
  /** Fonction et entreprise, par exemple « Gérante, Magda Mania ». */
  readonly fonction: string;
  readonly source: { readonly label: string; readonly href?: string };
  /** Date ISO de l’avis. */
  readonly date: string;
  /** Identifiant de la réalisation concernée, si l’avis porte sur un projet précis. */
  readonly realisationId?: string;
};

export const TEMOIGNAGES: readonly Temoignage[] = [];
