import type { Route } from 'next';

/**
 * Les réalisations du studio.
 *
 * Une seule règle tient ce fichier : **tout y est vérifiable**. Chaque projet a
 * une URL publique, chaque capture est celle du site réellement en ligne, et la
 * description dit ce qui a été construit — pas ce que ça a rapporté. Aucun
 * chiffre de résultat n’est affiché : le studio ne les mesure pas encore, et un
 * « +40 % de commandes » invérifiable coûterait plus cher que le silence. Les
 * seuls chiffres cités sont ceux qu’on lit à l’écran sur le site lui-même.
 *
 * **Peu de projets, montrés en profondeur.** Deux études de cas à trois écrans
 * valent mieux que six vignettes : ce qui impressionne un prospect, ce n’est pas
 * le nombre de lignes du portfolio, c’est de voir un produit fonctionner. Un
 * projet dont on n’est pas fier n’entre pas ici — il tire tout le reste vers le
 * bas.
 */
export type Ecran = {
  readonly src: string;
  readonly alt: string;
};

export type Realisation = {
  readonly id: string;
  /** Nom du projet, tel qu’il s’affiche pour son public. */
  readonly nom: string;
  /** Le métier, en trois mots. Sert d’étiquette. */
  readonly secteur: string;
  /** Une phrase : le problème que ça règle pour le commerçant. */
  readonly promesse: string;
  /** Ce qui a été construit, en français, sans jargon. Deux à quatre points. */
  readonly livre: readonly string[];
  /** L’écran d’ouverture, en grand. */
  readonly ecranPrincipal: Ecran;
  /** Deux écrans de plus, en bande sous le principal. */
  readonly ecrans: readonly [Ecran, Ecran];
  /** URL publique. Absente si le projet n’est plus en ligne. */
  readonly url?: string;
  /** Le chantier du site auquel ce projet se rattache (cf. CRAFT_BLOCKS). */
  readonly chantier: 'site' | 'visibilite' | 'outils';
};

export const REALISATIONS: readonly Realisation[] = [
  {
    id: 'magda-mania',
    nom: 'Magda Mania',
    secteur: 'Restauration rapide · Marseille',
    promesse:
      'La file d’attente disparaît : on commande depuis le skatepark, on paie en ligne, on retire au comptoir sans quitter la session.',
    livre: [
      'Commande et paiement en ligne, du téléphone au comptoir',
      'Carte pilotée par le commerçant : prix, photos, ruptures en un geste',
      'Ouverture et fermeture de la cuisine en un bouton, visibles côté client',
      'Pensé pour le téléphone d’abord : c’est là que la commande se passe',
    ],
    ecranPrincipal: {
      src: '/images/realisations/magda-mania.jpg',
      alt: 'L’accueil de Magda Mania : les catégories de la carte, le bandeau du skatepark et l’état de la cuisine.',
    },
    ecrans: [
      {
        src: '/images/realisations/magda-carte.jpg',
        alt: 'La carte de Magda Mania : les menus avec photo, prix, et la mention « épuisé » sur un produit en rupture.',
      },
      {
        src: '/images/realisations/magda-mobile.jpg',
        alt: 'La même carte sur téléphone, format sur lequel la quasi-totalité des commandes est passée.',
      },
    ],
    url: 'https://magda-mania.vercel.app',
    chantier: 'outils',
  },
  {
    id: 'nurea-parfums',
    nom: 'Nuréa Parfums',
    secteur: 'Parfumerie · Marseille',
    promesse:
      'Un catalogue qui a l’air de ce qu’il vend : la vitrine remplace la liste de prix envoyée en message privé.',
    livre: [
      'Catalogue de 108 références, filtrable par marque et par gamme',
      'Fiche produit et recherche, tenues à jour par le commerçant',
      'Direction artistique sombre, photographie produit soignée',
      'Commande poursuivie sur le canal que ses clients utilisent déjà',
    ],
    ecranPrincipal: {
      src: '/images/realisations/nurea-parfums.jpg',
      alt: 'L’accueil de Nuréa Parfums : un flacon sur du marbre sombre et le titre « L’excellence du parfum ».',
    },
    ecrans: [
      {
        src: '/images/realisations/nurea-catalogue.jpg',
        alt: 'Le catalogue Nuréa : une fiche produit en haut, puis la recherche, les filtres et le compteur de 108 résultats.',
      },
      {
        src: '/images/realisations/nurea-marque.jpg',
        alt: 'La page des marques de Nuréa Parfums, qui regroupe les références par maison.',
      },
    ],
    url: 'https://nurea-parfums.vercel.app',
    chantier: 'site',
  },
];

/** L’accueil montre tout : le portfolio est court, et c’est un choix. */
export const REALISATIONS_A_LA_UNE = REALISATIONS;

export const REALISATIONS_HREF = '/realisations' satisfies Route;
