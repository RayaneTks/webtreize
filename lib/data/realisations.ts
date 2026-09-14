import type { Route } from 'next';

/**
 * Les réalisations du studio, et leurs études de cas.
 *
 * ## La règle : tout est vérifiable
 *
 * Chaque projet a une URL publique et chaque capture est celle du site en ligne.
 * Chaque fonctionnalité citée a été **vérifiée dans le code source livré** —
 * une route, un modèle de données, un écran — et non déduite d’une dépendance
 * ou d’une intention. Une bibliothèque installée n’est pas une fonctionnalité.
 *
 * ## Ce qui n’y figure pas
 *
 * Aucun chiffre de résultat, aucun témoignage, aucun pourcentage. Le studio ne
 * dispose pas encore de mesures communiquées par ses clients, et un « +40 % de
 * commandes » invérifiable sur la page qui sert à prouver le sérieux détruit
 * exactement ce qu’elle cherche à établir.
 *
 * La section « Ce qui change au quotidien » décrit donc des conséquences
 * **opérationnelles** de ce qui a été construit — une commande arrive payée,
 * une rupture s’affiche d’elle-même — jamais un gain chiffré.
 *
 * `resultatsMesures` reste vide tant qu’un client n’a pas communiqué de chiffres
 * réels et accepté leur publication. La section n’est alors pas rendue.
 */
export type Ecran = {
  readonly src: string;
  readonly alt: string;
  /** Légende affichée sous l’écran dans l’étude de cas. */
  readonly legende?: string;
};

export type GroupeFonctionnalites = {
  /** « Côté client », « Côté cuisine », « Côté gestion »… */
  readonly titre: string;
  readonly points: readonly string[];
};

export type EtudeDeCas = {
  /** Qui est le commerce, ce qu’il fait. Faits publics uniquement. */
  readonly contexte: readonly string[];
  /** Le problème que pose l’activité — jamais une douleur prêtée au client. */
  readonly probleme: readonly string[];
  /** La réponse construite, en une vue d’ensemble. */
  readonly solution: readonly string[];
  readonly fonctionnalites: readonly GroupeFonctionnalites[];
  /** Conséquences opérationnelles vérifiables, sans chiffre. */
  readonly auQuotidien: readonly string[];
  /** Résultats chiffrés communiqués par le client — vide tant qu’il n’y en a pas. */
  readonly resultatsMesures: readonly string[];
  /** Les briques techniques, pour les lecteurs qui les cherchent. */
  readonly technique: readonly string[];
};

export type Realisation = {
  /** Sert aussi de segment d’URL : `/realisations/<id>`. */
  readonly id: string;
  readonly nom: string;
  /** Le métier, en trois mots. Sert d’étiquette. */
  readonly secteur: string;
  /** Une phrase : ce que ça règle. */
  readonly promesse: string;
  /** Résumé en quatre points pour l’aperçu. */
  readonly livre: readonly string[];
  readonly ecranPrincipal: Ecran;
  /** Deux écrans de plus, en bande sous le principal. */
  readonly ecrans: readonly [Ecran, Ecran];
  readonly url?: string;
  readonly chantier: 'site' | 'visibilite' | 'outils';
  /** Description courte pour les métadonnées de l’étude de cas (150-158 caractères). */
  readonly metaDescription: string;
  readonly etude: EtudeDeCas;
};

export const REALISATIONS: readonly Realisation[] = [
  {
    id: 'magda-mania',
    nom: 'Magda Mania',
    secteur: 'Restauration rapide · Marseille',
    promesse:
      'On commande depuis le skatepark, on paie en ligne, et la cuisine reçoit la commande en quelques secondes — sans quitter la session.',
    livre: [
      'Commande et paiement en ligne depuis le téléphone',
      'Écran cuisine en temps réel pour préparer dans l’ordre',
      'Notification au client quand sa commande avance',
      'Carte, ruptures et remboursements gérés par le commerçant',
    ],
    ecranPrincipal: {
      src: '/images/realisations/magda-mania.jpg',
      alt: 'L’accueil de Magda Mania : les catégories de la carte, le bandeau du skatepark et l’état de la cuisine.',
      legende: 'L’accueil : la carte, le partenariat avec le club, et l’état de la cuisine en direct.',
    },
    ecrans: [
      {
        src: '/images/realisations/magda-carte.jpg',
        alt: 'La carte de Magda Mania : les menus avec photo, prix, et la mention « épuisé » sur un produit en rupture.',
        legende: 'La carte : un produit en rupture s’affiche « épuisé » sans intervention.',
      },
      {
        src: '/images/realisations/magda-mobile.jpg',
        alt: 'La même carte sur téléphone, format sur lequel la commande est passée.',
        legende: 'Sur téléphone, là où la commande se passe vraiment.',
      },
    ],
    url: 'https://magda-mania.vercel.app',
    chantier: 'outils',
    metaDescription:
      'Étude de cas Magda Mania : commande et paiement en ligne, écran cuisine en temps réel et notifications pour un stand de restauration à Marseille.',
    etude: {
      contexte: [
        'Magda Mania tient un stand de restauration dans un skatepark de Marseille, en partenariat avec les Spartiates de Marseille : paninis pressés, hot-dogs, crêpes, glaces et boissons.',
        'Sa clientèle est sur place pour rouler. Elle commande entre deux passages, souvent le téléphone à la main.',
      ],
      probleme: [
        'Sur un stand, la commande prise à la voix a deux coûts : le client attend au comptoir au lieu de profiter de sa session, et une personne reste mobilisée à prendre les commandes et à encaisser pendant que la cuisine tourne.',
        'Il fallait que la commande arrive déjà claire et déjà payée en cuisine, et que le client sache quand revenir — sans lui demander d’installer quoi que ce soit.',
      ],
      solution: [
        'Une application web en trois faces, qui partagent la même base : la carte pour le client, un écran pour la cuisine, un espace de gestion pour le commerçant.',
        'Le client commande et paie depuis son navigateur. La commande payée apparaît sur l’écran cuisine en quelques secondes, et le client suit son avancement sur une page dédiée, avec une notification s’il l’accepte.',
      ],
      fonctionnalites: [
        {
          titre: 'Côté client',
          points: [
            'Carte par catégories, menus composables avec options',
            'Paiement en ligne sécurisé, sans création de compte',
            'Page de suivi de commande propre à chaque client',
            'Notification quand la commande avance, sur abonnement',
            'Informations allergènes accessibles depuis la carte',
          ],
        },
        {
          titre: 'Côté cuisine',
          points: [
            'Écran de préparation mis à jour en temps réel',
            'Les commandes arrivent payées, dans l’ordre',
            'Installable sur une tablette comme une application',
          ],
        },
        {
          titre: 'Côté gestion',
          points: [
            'Édition de la carte : produits, photos, catégories, options, ordre d’affichage',
            'Ouverture et fermeture de la prise de commande',
            'Historique des commandes, remboursements et export',
            'Comptes d’accès pour l’équipe',
          ],
        },
      ],
      auQuotidien: [
        'Une commande n’existe en cuisine qu’une fois payée : plus d’encaissement au comptoir pendant le coup de feu.',
        'Un produit en rupture est marqué « épuisé » sur la carte, et ne peut plus être commandé.',
        'Quand la cuisine s’arrête, le site le dit : personne ne commande pour rien.',
        'Le commerçant change un prix, une photo ou un menu lui-même, sans passer par nous.',
      ],
      resultatsMesures: [],
      technique: ['Next.js', 'Stripe', 'PostgreSQL', 'Server-Sent Events', 'Web Push'],
    },
  },
  {
    id: 'nurea-parfums',
    nom: 'Nuréa Parfums',
    secteur: 'Parfumerie · Marseille',
    promesse:
      'Une vitrine à la hauteur des marques vendues, et derrière, un outil qui tient les commandes, les lots, la caisse et la comptabilité.',
    livre: [
      'Catalogue de 108 références, filtrable par marque et par gamme',
      'Demande de commande pré-remplie depuis chaque fiche',
      'Caisse, fiches clients et suivi des commandes',
      'Lots d’achat avec leurs dépenses, et comptabilité exportable',
    ],
    ecranPrincipal: {
      src: '/images/realisations/nurea-parfums.jpg',
      alt: 'L’accueil de Nuréa Parfums : un flacon sur du marbre sombre et le titre « L’excellence du parfum ».',
      legende: 'L’accueil : une direction artistique à la hauteur des maisons représentées.',
    },
    ecrans: [
      {
        src: '/images/realisations/nurea-catalogue.jpg',
        alt: 'Le catalogue Nuréa : une fiche produit en haut, puis la recherche, les filtres et le compteur de 108 résultats.',
        legende: 'Le catalogue : recherche, filtres par gamme, et une demande de commande depuis chaque fiche.',
      },
      {
        src: '/images/realisations/nurea-marque.jpg',
        alt: 'La page des marques de Nuréa Parfums, qui regroupe les références par maison.',
        legende: 'La page des marques, pour parcourir le catalogue par maison.',
      },
    ],
    url: 'https://nurea-parfums.vercel.app',
    chantier: 'site',
    metaDescription:
      'Étude de cas Nuréa Parfums : catalogue de 108 références, demande de commande pré-remplie, caisse, lots d’achat et comptabilité pour une parfumerie.',
    etude: {
      contexte: [
        'Nuréa Parfums vend à Marseille des parfums de grandes maisons, pour homme et pour femme. Les commandes se passent en direct, par message, et les flacons sont remis en main propre.',
      ],
      probleme: [
        'Vendre par messages fonctionne tant que le catalogue tient dans une conversation. Au-delà de cent références, un client ne peut plus parcourir l’offre seul, et chaque question sur un prix ou une disponibilité devient un échange de plus.',
        'Côté gestion, le même canal ne dit rien de ce qui a été commandé, encaissé ou dépensé : il fallait un outil pour tenir les chiffres de l’activité, pas seulement une vitrine.',
      ],
      solution: [
        'Une boutique en ligne qui présente tout le catalogue et oriente chaque intérêt vers une demande de commande déjà remplie avec le parfum et la marque.',
        'Derrière, un espace de gestion privé, installable sur téléphone, qui suit l’activité de bout en bout : le client, sa commande, le lot d’achat auquel elle se rattache, l’encaissement, et la comptabilité qui en découle.',
      ],
      fonctionnalites: [
        {
          titre: 'Côté client',
          points: [
            'Catalogue complet, avec recherche, filtres par gamme et tri',
            'Navigation par marque',
            'Demande de commande pré-remplie depuis chaque fiche produit',
            'Affichage clair ou sombre, au choix du visiteur',
          ],
        },
        {
          titre: 'Côté gestion',
          points: [
            'Catalogue, marques et publication des références',
            'Fiches clients et historique de leurs commandes',
            'Caisse pour enregistrer une vente et un encaissement',
            'Lots d’achat, avec leurs dépenses et les commandes rattachées',
            'Comptabilité et export, classement des meilleures ventes',
            'Accès sécurisé, fonctionnement sur téléphone même avec un réseau instable',
          ],
        },
      ],
      auQuotidien: [
        'Un client parcourt les 108 références seul, et arrive avec une demande qui nomme déjà le parfum voulu.',
        'Chaque commande est rattachée à un lot d’achat : ce que coûte un lot et ce qu’il a rapporté se lisent au même endroit.',
        'Une vente, un encaissement et une dépense sont saisis au moment où ils ont lieu, et se retrouvent dans la comptabilité.',
        'Une référence retirée ou ajoutée l’est par le commerçant, directement.',
      ],
      resultatsMesures: [],
      technique: ['Next.js', 'PostgreSQL', 'Prisma', 'Application installable'],
    },
  },
];

/** L’accueil montre tout : le portfolio est court, et c’est un choix. */
export const REALISATIONS_A_LA_UNE = REALISATIONS;

export const REALISATIONS_HREF = '/realisations' satisfies Route;

export function realisationHref(id: string): string {
  return `${REALISATIONS_HREF}/${id}`;
}

export function getRealisation(id: string): Realisation | undefined {
  return REALISATIONS.find((projet) => projet.id === id);
}
