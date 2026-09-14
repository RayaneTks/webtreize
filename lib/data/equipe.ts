/**
 * Les personnes réellement derrière WebTreize.
 *
 * Un prospect qui s’apprête à confier son activité veut savoir à qui il parle.
 * « Un seul interlocuteur » sans nom ni visage est une promesse creuse ; avec un
 * nom, une fonction et une photo, c’est un engagement.
 *
 * **Rien n’est inventé ici.** Tant que le tableau est vide, la section « Qui
 * vous répond » n’est pas rendue du tout — mieux vaut aucune section qu’une
 * silhouette générique ou un prénom de convenance.
 *
 * Pour ajouter une personne :
 * - `nom` : prénom et nom tels qu’ils apparaissent sur LinkedIn ou au Kbis ;
 * - `role` : ce qu’elle fait réellement sur un projet, en quelques mots ;
 * - `bio` : deux phrases au plus, factuelles ;
 * - `photo` : un vrai portrait, déposé dans `public/images/equipe/`, en lumière
 *   naturelle, cohérent avec la charte (voir docs/imagerie.md) ;
 * - `linkedin` : l’URL du profil, si elle existe.
 */
export type Membre = {
  readonly nom: string;
  readonly role: string;
  readonly bio: string;
  readonly photo?: { readonly src: string; readonly alt: string };
  readonly linkedin?: string;
};

export const EQUIPE: readonly Membre[] = [];
