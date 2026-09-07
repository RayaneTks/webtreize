import type { Route } from 'next';

/**
 * Les réalisations du studio.
 *
 * Une seule règle tient ce fichier : **tout y est vérifiable**. Chaque projet a
 * une URL publique, la capture est celle du site réellement en ligne, et la
 * description dit ce qui a été construit — pas ce que ça a rapporté. Aucun
 * chiffre de résultat n’est affiché : le studio ne les mesure pas encore, et un
 * « +40 % de commandes » invérifiable coûterait plus cher que le silence.
 *
 * Le jour où un client accepte de communiquer un chiffre réel, il vient ici avec
 * son nom, et pas avant.
 */
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
  /** Capture du site en ligne, dans `public/images/realisations/`. */
  readonly image: string;
  /** Alternative textuelle, décrivant ce que la capture montre vraiment. */
  readonly alt: string;
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
      'La file d’attente disparaît : on commande depuis le skatepark, on paie en ligne, on retire au comptoir.',
    livre: [
      'Commande et paiement en ligne, du téléphone au comptoir',
      'Carte pilotée par le commerçant : prix, photos, ruptures en un geste',
      'Ouverture et fermeture de la cuisine en un bouton, visibles côté client',
    ],
    image: '/images/realisations/magda-mania.jpg',
    alt: 'La carte en ligne de Magda Mania : catégories, menus avec photo et prix, et un bandeau indiquant que la cuisine est fermée.',
    url: 'https://magda-mania.vercel.app',
    chantier: 'outils',
  },
  {
    id: 'nurea-parfums',
    nom: 'Nuréa Parfums',
    secteur: 'Parfumerie · Marseille',
    promesse:
      'Un catalogue qui a l’air de ce qu’il vend : la vitrine remplace la liste de prix envoyée en message.',
    livre: [
      'Catalogue complet, filtrable, tenu à jour par le commerçant',
      'Direction artistique et photographie produit',
      'Prise de commande poursuivie sur le canal que ses clients utilisent déjà',
    ],
    image: '/images/realisations/nurea-parfums.jpg',
    alt: 'La page d’accueil de Nuréa Parfums : un flacon sur du marbre sombre, le titre « L’excellence du parfum » et deux boutons.',
    url: 'https://nurea-parfums.vercel.app',
    chantier: 'site',
  },
  {
    id: 'encore1dessert',
    nom: 'Encore1Dessert',
    secteur: 'Pâtisserie artisanale',
    promesse:
      'La caisse, les recettes et la marge dans le même outil : on sait ce que rapporte chaque gâteau.',
    livre: [
      'Caisse tactile, encaissement particulier et professionnel',
      'Coût de revient calculé depuis les matières premières et les recettes',
      'Marge affichée en direct, à la vente comme au bilan',
    ],
    image: '/images/realisations/encore1dessert.jpg',
    alt: 'L’écran de caisse d’Encore1Dessert sur téléphone : recherche produit, panier, liste des tartes, et le total avec la marge en bas.',
    url: 'https://encore1dessert.vercel.app',
    chantier: 'outils',
  },
  {
    id: 'qcm-frigorigenes',
    nom: 'QCM Fluides frigorigènes',
    secteur: 'Formation · Frigoriste',
    promesse:
      'Un outil de révision pour l’attestation d’aptitude, construit avec un professionnel du métier.',
    livre: [
      'Questionnaires calqués sur l’examen réel',
      'Correction immédiate et reprise des erreurs',
      'Utilisable au téléphone, entre deux interventions',
    ],
    image: '/images/realisations/driss.jpg',
    alt: 'L’outil de révision QCM Fluides frigorigènes sur téléphone : le titre et l’accès aux séries de questions.',
    url: 'https://driss-one.vercel.app',
    chantier: 'site',
  },
];

/** Les trois premières, pour l’aperçu de la page d’accueil. */
export const REALISATIONS_A_LA_UNE = REALISATIONS.slice(0, 3);

export const REALISATIONS_HREF = '/realisations' satisfies Route;
