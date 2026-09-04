import type { Route } from 'next';

/**
 * Contenu éditorial du site — source unique.
 *
 * Trois règles gouvernent ce fichier :
 *
 * 1. **Une seule voix : « nous ».** Le studio ne dit jamais « on ». Le tutoiement
 *    du lecteur n’existe pas non plus : le vouvoiement partout.
 * 2. **Typographie française.** Apostrophes courbes (U+2019), guillemets français,
 *    espace fine insécable (U+202F) devant « : ; ! ? », espace insécable (U+00A0)
 *    devant les unités. Ces chaînes partent aussi dans les métadonnées : ce sont
 *    des caractères réels, jamais des entités HTML.
 * 3. **Rien d’invérifiable.** Aucun chiffre, aucun nom, aucun témoignage qui ne
 *    puisse être montré à un client. Une promesse qui n’est pas écrite au devis
 *    n’est pas écrite ici.
 */

/** Entrée de navigation. `href` est typé `Route` : une cible morte casse la compilation. */
export type NavItem = {
  readonly label: string;
  readonly href: Route;
};

/**
 * Navigation principale — header et footer.
 *
 * Ce tableau ne contenait que les quatre ancres de l’accueil : `/services`,
 * `/about` et `/contact` n’avaient alors **aucun lien entrant** dans tout le
 * site (finding critique « seo-pages-orphelines »). Les ancres sont descendues
 * dans `HOME_SECTIONS`, réservé au plan du footer.
 */
export const NAV_ITEMS = [
  { label: 'Services', href: '/services' },
  { label: 'Le studio', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const satisfies readonly NavItem[];

/**
 * Ancres des sections de l’accueil — colonne « L’accueil » du footer.
 *
 * Les liens sont préfixés par `/` : ils fonctionnent depuis n’importe quelle
 * page, sans que le composant ait à connaître la route courante.
 */
export const HOME_SECTIONS = [
  { label: 'Approche', href: '/#approche' },
  { label: 'Ce que nous faisons', href: '/#metier' },
  { label: 'Promesses', href: '/#promesses' },
  { label: 'Questions', href: '/#questions' },
] as const satisfies readonly NavItem[];

/**
 * Section « Approche ».
 *
 * `title` est destiné au `h2` de la section : elle figure au plan du site et
 * n’avait jusqu’ici aucun titre, donc aucun repère pour un lecteur d’écran.
 * `emphasis` doit rester un fragment exact de `quote` : le composant scinde la
 * citation dessus pour poser l’italique.
 */
export const APPROACH = {
  title: 'Avant le site, ce que vos clients cherchent.',
  quote: 'Nous ne livrons pas des sites. Nous livrons des clients qui vous trouvent.',
  emphasis: 'vous trouvent',
  body:
    'La plupart des entreprises perdent des clients avant même le premier bonjour : introuvables sur Google, un site qui ne dit pas quoi faire, des outils qui ne suivent plus. Nous partons de là, pas d’un gabarit.',
} as const;

export type CraftBlock = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  /**
   * Libellé du cadrage en attente, affiché à la place de la photo.
   * Les trois blocs ont leur image : ce repli n’est plus alimenté, il reste
   * pour un futur bloc dont la photo ne serait pas encore livrée.
   */
  plate?: string;
  /** Chemin dans /public/images — absent tant que la photo n’est pas livrée. */
  imageSrc?: string;
  /** Alternative textuelle définitive, écrite avant la photo (cf. docs/imagerie.md). */
  imageAlt: string;
};

/** Blocs texte / plaque alternés — un seul sujet par bloc. */
export const CRAFT_BLOCKS: readonly CraftBlock[] = [
  {
    id: 'site',
    eyebrow: 'Le site',
    title: 'Fait pour votre métier, pas pour un portfolio.',
    body:
      'Nous partons de votre activité et de la façon dont vos clients vous appellent. Rapide sur téléphone, clair en trois secondes, et entièrement à vous : code, accès, nom de domaine.',
    imageSrc: '/images/craft-site.jpg',
    imageAlt:
      'Les mains d’un commerçant tiennent un téléphone à l’écran éteint au-dessus d’un comptoir en bois clair, à côté d’un carnet ouvert et d’un stylo en laiton.',
  },
  {
    id: 'visibilite',
    eyebrow: 'La visibilité',
    title: 'Être là quand quelqu’un cherche votre métier.',
    body:
      'Fiche Google soignée, référencement local, avis suivis. La majorité de vos appels viennent d’une recherche faite à deux rues d’ici — c’est là que nous travaillons.',
    imageSrc: '/images/craft-visibilite.jpg',
    imageAlt:
      'Devanture d’un petit commerce marseillais en fin d’après-midi, vue depuis le trottoir d’en face.',
  },
  {
    id: 'outils',
    eyebrow: 'Les outils',
    title: 'Votre quotidien, en un seul endroit.',
    body:
      'Devis, plannings, suivi de chantier, relances. Nous remplaçons le tableur et les notes éparpillées par un outil simple, taillé pour votre façon de travailler.',
    imageSrc: '/images/craft-outils.jpg',
    imageAlt:
      'Établi d’artisan rangé : un carnet de notes, un mètre pliant et une tablette posés côte à côte sur du bois clair.',
  },
];

/**
 * Trois engagements, trois faits vérifiables.
 *
 * La première promesse annonçait des « pénalités de notre côté » alors qu’aucune
 * CGV n’était publiée : une clause pénale citée publiquement sans barème, sans
 * plafond et sans définition du retard imputable (finding critique
 * « penalites-sans-cgv »). La formulation retenue est plus forte parce qu’elle
 * est opposable : le prospect peut la vérifier sur son propre devis, avant de
 * signer. Elle est adossée à l’article « Délais » des CGV (lib/data/legal.ts).
 */
export const PROMISES = [
  {
    title: 'Des dates, pas des estimations',
    body:
      'Le calendrier est écrit dans le devis, phase par phase, et ce qui se passe si le retard vient de nous y est écrit aussi. Vous le lisez avant de signer, pas après.',
  },
  {
    title: 'Tout vous appartient',
    body: 'Le code, les accès, le domaine. Aucun abonnement pour récupérer ce qui est déjà à vous.',
  },
  {
    title: 'Un seul interlocuteur',
    body:
      'Vous parlez à la personne qui conçoit et qui développe. Pas à un intermédiaire, pas à un service.',
  },
] as const;

export const PROCESS_STEPS = [
  {
    title: 'Nous nous rencontrons',
    body: 'Votre métier, vos clients, ce qui marche déjà. Nous écoutons avant de proposer.',
  },
  {
    title: 'Nous posons le plan',
    body: 'Priorités, calendrier, budget ligne par ligne. Vous validez avant que nous démarrions.',
  },
  {
    title: 'Nous fabriquons',
    body: 'Vous voyez avancer chaque semaine. Rien n’est décidé sans vous le montrer.',
  },
  {
    title: 'Nous mettons en ligne',
    body: 'Mise en ligne, prise en main ensemble, suivi les semaines qui suivent.',
  },
] as const;

/**
 * Bloc sombre de l’accueil — le point de bascule de la page.
 *
 * `title` annonçait « Commençons simplement. » : une invitation sans contenu sur
 * le titre le plus visible du site. Il annonce désormais le livrable, le chiffre
 * juste dessous annonçant le délai.
 *
 * `note` qualifie ce délai. Il était donné en heures calendaires alors que le
 * studio affiche des horaires du lundi au vendredi : une demande déposée le
 * vendredi soir ne pouvait pas être tenue (finding « promesse-48h-contredit-
 * horaires »). C’est la seule occurrence du délai dans ce fichier : il ne doit
 * pas être répété ailleurs sur la même page.
 */
export const AUDIT = {
  eyebrow: 'Premier pas',
  title: 'Ce qui vous freine, par écrit.',
  body:
    'Vous nous parlez de votre activité. Nous regardons votre site et votre fiche Google, puis nous vous renvoyons par écrit ce qui vous freine et dans quel ordre le corriger.',
  delay: '48',
  delayUnit: 'heures',
  note: 'Gratuit, sans engagement. Le délai court les jours ouvrés.',
} as const;

/* -------------------------------------------------------------------------- */
/* Prestations — page /services                                               */
/* -------------------------------------------------------------------------- */

export type ServiceEntry = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly points: readonly string[];
};

/**
 * Les prestations, dans la voix du reste du site — les trois principales ici,
 * la fiche Google juste en dessous.
 *
 * Cette page était restée en jargon d’agence — « architecture orientée
 * conversion », « Core Web Vitals au vert », « stack moderne », « livraison
 * itérative », « cohérence NAP » — sur la seule page où un commerçant vient
 * chercher ce qu’il achète (finding « services-jargon-agence »). Les
 * identifiants sont conservés : `EYEBROWS` dans ServicesPageContent et le
 * JSON-LD `ItemList` s’y branchent.
 *
 * Chaque point est un fait que le client peut constater lui-même, jamais une
 * performance chiffrée qui dépend du réseau ou de Google.
 */
export const SERVICES = [
  {
    id: 'web',
    title: 'Création de site internet',
    description:
      'Un site pensé pour la façon dont vos clients vous appellent. Rapide sur téléphone, clair en trois secondes, et sans modèle recyclé.',
    points: [
      'Une seule action évidente sur chaque page',
      'Vérifié sur téléphone et sur connexion lente avant la mise en ligne',
      'Le code, les accès et le domaine sont à vous',
    ],
  },
  {
    id: 'seo',
    title: 'Référencement local',
    description:
      'Apparaître dans les recherches faites autour de vous. Nous travaillons le site, la fiche Google et les avis ensemble, parce que Google les lit ensemble.',
    points: [
      'Nous regardons tout ce qui bloque, et nous vous l’écrivons',
      'Les recherches faites à deux rues de chez vous',
      'Un point chiffré chaque mois, en français',
    ],
  },
  {
    id: 'apps',
    title: 'Outils métier',
    description:
      'Devis, plannings, suivi de chantier, relances : un seul endroit, taillé pour votre façon de travailler, à la place du tableur et des notes éparpillées.',
    points: [
      'Nous partons de votre façon de faire, pas d’un logiciel',
      'Une première version entre vos mains avant la fin du chantier',
      'Prise en main avec vous, sans jargon',
    ],
  },
] as const satisfies readonly ServiceEntry[];

/**
 * Quatrième bloc de /services, tenu à part : c’est la seule prestation qui ne
 * produit aucun livrable hébergé chez nous.
 */
export const GOOGLE_BUSINESS_SERVICE = {
  id: 'google',
  title: 'Fiche Google Business',
  description:
    'La fiche que vos clients voient avant votre site : horaires justes, photos réelles, avis suivis, et les mêmes coordonnées partout sur le web.',
  points: [
    'Horaires, photos et coordonnées tenus à jour',
    'Les mêmes informations partout, sans contradiction',
    'Vous répondez aux avis, nous vous montrons comment',
    'Ce que la fiche rapporte, en appels et en itinéraires',
  ],
} as const satisfies ServiceEntry;
