import type { Route } from 'next';
import ECRANS from './ecrans-realisations.json';

/**
 * Les réalisations du studio, et leurs études de cas.
 *
 * ## Les écrans
 *
 * Chaque projet a son dossier `design/maquettes/<projet>/` et sa note
 * `DA.md`. Les écrans montrés sont soit des **captures du produit réel**, lancé
 * en local avec des données d’exemple (Nuréa Parfums, Encore 1 Dessert), soit
 * des **versions de présentation** fidèles à ce que le produit fait, refaites
 * dans sa direction artistique. Aucun lien vers les sites des clients n’est
 * publié.
 *
 * `donnees: 'exemple'` signale un écran rempli de données d’exemple : les
 * chiffres d’un client (ventes, marges, commandes) ne sortent jamais de chez
 * lui. Sources HTML dans `design/maquettes/`, rendues par
 * `node scripts/maquettes.mjs`.
 *
 * ## Ce qui n’y figure pas
 *
 * Aucun résultat chiffré présenté comme mesuré, aucun témoignage. Chaque
 * fonctionnalité citée a été vérifiée dans le code livré. `annee` et `role` ne
 * sont affichés que s’ils sont renseignés : rien n’est inventé.
 */
export type Ecran = {
  readonly src: string;
  readonly alt: string;
  readonly format: 'ordinateur' | 'telephone';
  /** Écran rempli de données d’exemple (gestion, commandes, chiffres). */
  readonly donnees: 'reelles' | 'exemple';
  /** Légende complète, sous l’écran dans l’étude de cas. */
  readonly legende: string;
};

/** Un écran tel qu’il est accroché sur la plaque, avec sa légende courte. */
export type EcranAccroche = {
  readonly ecran: Ecran;
  /** Cinq mots au plus : « Le site, côté client », « La caisse »… */
  readonly legende: string;
};

/**
 * L’accrochage d’un projet : des écrans nus, côte à côte, à la même hauteur.
 * `large` se lit de gauche à droite — la vitrine, puis ce qu’il y a derrière.
 * `etroit` remplace l’écran d’ordinateur par un second téléphone sous 768 px,
 * plutôt que de le réduire à une vignette illisible.
 */
export type Accrochage = {
  readonly large: readonly EcranAccroche[];
  readonly etroit: readonly [EcranAccroche, EcranAccroche];
};

/** Un côté du produit : ce qu’on y fait, et les écrans qui le montrent. */
export type Cote = {
  /** « Côté client », « Côté cuisine », « Côté gestion »… */
  readonly titre: string;
  readonly fonctionnalites: readonly string[];
  readonly ecrans: readonly Ecran[];
};

export type EtudeDeCas = {
  readonly contexte: readonly string[];
  readonly probleme: readonly string[];
  readonly reponse: readonly string[];
  /** Ce que l’outil change au quotidien — opérationnel, sans chiffre. */
  readonly changements: readonly string[];
  readonly resultatsMesures: readonly string[];
  readonly cotes: readonly Cote[];
  readonly technique: readonly string[];
};

/** L’image d’un projet dans les listes : une composition 4:3 à ses couleurs. */
export type Couverture = {
  readonly src: string;
  readonly alt: string;
};

export type Realisation = {
  /** Sert aussi de segment d’URL : `/realisations/<id>`. */
  readonly id: string;
  readonly nom: string;
  /** Ce qui a été fait, en deux ou trois catégories : sert de filtre sur /realisations. */
  readonly categories: readonly string[];
  readonly couverture: Couverture;
  /** « Parfumerie », « Snack de skatepark »… */
  readonly metier: string;
  readonly lieu?: string;
  /** À renseigner par le studio. Absent = non affiché. */
  readonly annee?: string;
  /** À renseigner par le studio. Absent = non affiché. */
  readonly role?: readonly string[];
  /** Une phrase : ce que ça règle. */
  readonly promesse: string;
  /** Ce qui a été livré, rendu en une phrase. */
  readonly livrables: readonly string[];
  readonly accrochage: Accrochage;
  readonly metaDescription: string;
  readonly etude: EtudeDeCas;
};

/**
 * Chemin courant d’un écran, empreinte de contenu comprise (voir
 * `scripts/maquettes.mjs`). Un écran absent du manifeste casse le build : mieux
 * vaut une erreur qu’une image manquante en production.
 */
function img(projet: string, ecran: string): string {
  const src = (ECRANS as Record<string, string>)[`${projet}/${ecran}`];
  if (!src) throw new Error(`Écran introuvable : ${projet}/${ecran} — lancer node scripts/maquettes.mjs --index`);
  return src;
}

/* — Nuréa Parfums — */

const NUREA = {
  accueil: {
    src: img('nurea-parfums', 'boutique-accueil'),
    alt: 'L’accueil sombre de Nuréa Parfums : la barre de recherche, le titre « Nuréa, votre parfum sans le prix des grandes marques. », les boutons « Voir le catalogue » et « Commander sur Snapchat », et la photographie d’un flacon Nuréa dans une lumière dorée.',
    format: 'ordinateur',
    donnees: 'reelles',
    legende: 'L’accueil de la vitrine : la marque, le catalogue et Snapchat en un geste.',
  },
  fiche: {
    src: img('nurea-parfums', 'boutique-fiche'),
    alt: 'La fiche « Contre Moi » de Louis Vuitton ouverte par-dessus l’accueil : la photo du flacon, « Prix et disponibilité : écrivez-nous », le bouton « Commander sur Snapchat » et la mention qui précise que le parfum est remis dans un flacon Nuréa.',
    format: 'ordinateur',
    donnees: 'reelles',
    legende: 'Une fiche par parfum, qui s’ouvre sans quitter le catalogue.',
  },
  ficheMobile: {
    src: img('nurea-parfums', 'boutique-fiche-mobile'),
    alt: 'La fiche « Tobacco Vanille » de Tom Ford sur téléphone, avec des flèches vers les parfums voisins et le bouton « Commander sur Snapchat » en bas de l’écran.',
    format: 'telephone',
    donnees: 'reelles',
    legende: 'Sur téléphone, on passe d’un parfum à l’autre du doigt, la commande toujours à portée.',
  },
  gestionAccueil: {
    src: img('nurea-parfums', 'gestion-accueil'),
    alt: 'L’accueil de la gestion sur téléphone : six choses à faire (une commande en retard, des clients à relancer, des coûts d’achat à compléter, des parfums en rupture), puis l’encaissé du jour et les livraisons du jour et du lendemain.',
    format: 'telephone',
    donnees: 'exemple',
    legende: 'L’accueil de la gestion : ce qu’il reste à faire, puis la journée.',
  },
  caisse: {
    src: img('nurea-parfums', 'gestion-caisse'),
    alt: 'L’écran « Vendre » sur téléphone : le choix entre vente et commande, un flacon déjà en stock, la recherche d’un parfum et les parfums vendus récemment avec leur contenance et leur prix.',
    format: 'telephone',
    donnees: 'exemple',
    legende: 'Vendre : le parfum, la contenance, puis l’encaissement.',
  },
  lot: {
    src: img('nurea-parfums', 'gestion-lot'),
    alt: 'Un lot d’achat dans la gestion : 580 € encaissés, 155,35 € de marge nette, le coût d’achat des parfums, les frais du lot et les ventes qui y sont rattachées.',
    format: 'telephone',
    donnees: 'exemple',
    legende: 'Un lot d’achat : ce qu’il a coûté, ce qu’il a rapporté, ce qu’il reste à encaisser.',
  },
} as const satisfies Record<string, Ecran>;

/* — Magda Mania — */

const MAGDA = {
  carte: {
    src: img('magda-mania', 'client-carte'),
    alt: 'La carte Magda Mania sur fond clair : pastilles de catégories, encart « Bienvenue au skatepark », menus en cartes arrondies avec photo, prix et bouton rose, et la barre « Voir ma commande ».',
    format: 'telephone',
    donnees: 'exemple',
    legende: 'La carte : les catégories, les menus en photo, le panier toujours à portée.',
  },
  panier: {
    src: img('magda-mania', 'client-panier'),
    alt: 'La fiche du Menu Paninis ouverte en bas de l’écran : photo, choix du panini avec Raclette sélectionné, choix de la boisson, bouton rose « Ajouter · 8,90 € ».',
    format: 'telephone',
    donnees: 'exemple',
    legende: 'Composer un menu : le panini, la boisson, puis l’ajout au panier.',
  },
  suivi: {
    src: img('magda-mania', 'client-suivi'),
    alt: 'Le suivi de la commande MM-135 : le grand numéro, les étapes reçue, en préparation, prête, l’heure annoncée par la cuisine et le reçu de 12,90 €.',
    format: 'telephone',
    donnees: 'exemple',
    legende: 'Le suivi en direct, avec l’heure annoncée par la cuisine et le reçu.',
  },
  cuisine: {
    src: img('magda-mania', 'cuisine'),
    alt: 'L’écran cuisine sombre avec quatre tickets — prête, en retard, en préparation, nouvelle — aux grands numéros, avec articles, options, temps restant et bouton d’action.',
    format: 'ordinateur',
    donnees: 'exemple',
    legende: 'L’écran cuisine en temps réel, lisible à deux mètres.',
  },
  gerant: {
    src: img('magda-mania', 'gerant-carte'),
    alt: 'La page « Carte & stocks » de l’espace gérant : produits par catégorie avec interrupteur de disponibilité, un menu en rupture, le stock bas et les sauces à activer.',
    format: 'ordinateur',
    donnees: 'exemple',
    legende: 'L’espace gérant : la carte, les ruptures, le stock bas, les sauces.',
  },
} as const satisfies Record<string, Ecran>;

/* — Encore 1 Dessert — */

const E1D = {
  fiche: {
    src: img('encore-un-dessert', 'fiche-dessert'),
    alt: 'L’atelier, onglet Desserts : la tarte cacahuète caramel dépliée, avec son coût de revient de 4,71 € (0,59 € la part), son bénéfice particulier (39,29 €, 89 %) et pro (33,29 €, 88 %), puis sa composition.',
    format: 'telephone',
    donnees: 'exemple',
    legende: 'La fiche d’une tarte : son coût de revient, ce qu’elle rapporte en particulier et en pro, sa composition.',
  },
  caisse: {
    src: img('encore-un-dessert', 'caisse'),
    alt: 'La caisse : les livraisons du jour en rappel, les desserts en cartes, trois articles touchés et en bas le total de 128 €, le bénéfice de 113,03 € et le bouton « Encaisser 128,00 € ».',
    format: 'telephone',
    donnees: 'exemple',
    legende: 'La caisse : on touche les desserts, le total et le bénéfice s’affichent, on encaisse.',
  },
  commandes: {
    src: img('encore-un-dessert', 'commandes'),
    alt: 'Les commandes rangées par échéance, aujourd’hui puis demain : restaurants et particuliers, leurs desserts, leur avancement en cuisine, leurs notes de livraison et leur statut.',
    format: 'telephone',
    donnees: 'exemple',
    legende: 'Les commandes par échéance, avec leur avancement en cuisine.',
  },
  cuisine: {
    src: img('encore-un-dessert', 'cuisine'),
    alt: 'L’onglet Cuisine : 8 desserts faits sur 25, et la liste des desserts à produire, chacun avec son avancement, un bouton pour adapter la recette et un bouton pour le marquer fait.',
    format: 'telephone',
    donnees: 'exemple',
    legende: 'La cuisine : toutes les commandes regroupées par dessert, cochées au fil de la production.',
  },
  courses: {
    src: img('encore-un-dessert', 'courses'),
    alt: 'L’onglet Courses : 19 ingrédients à acheter pour 17 desserts, environ 87 €, classés par rayon avec la quantité et le coût de chacun, et un bouton « Copier ».',
    format: 'telephone',
    donnees: 'exemple',
    legende: 'La liste de courses, calculée à partir des commandes à préparer.',
  },
  ventes: {
    src: img('encore-un-dessert', 'ventes'),
    alt: 'Les ventes des 30 derniers jours : l’argent encaissé, le bénéfice, le coût des ingrédients et le pourcentage de bénéfice, puis les desserts les plus rentables.',
    format: 'telephone',
    donnees: 'exemple',
    legende: 'Le bilan : argent encaissé, bénéfice et desserts les plus rentables.',
  },
} as const satisfies Record<string, Ecran>;

/* — Conciergerie Nuréa — */

const CONCIERGERIE = {
  accueil: {
    src: img('conciergerie-nurea', 'accueil'),
    alt: 'L’accueil du site de la Conciergerie Nuréa : les calanques en plein cadre, le titre « Votre appartement génère des revenus. Vous ne gérez rien. », le bouton « Simuler mes revenus » et un bandeau commission, engagement, cautions.',
    format: 'ordinateur',
    donnees: 'reelles',
    legende: 'L’accueil : la promesse, une action principale, puis les conditions.',
  },
  simulateur: {
    src: img('conciergerie-nurea', 'simulateur'),
    alt: 'Le simulateur de revenus sur fond bleu profond : curseurs du tarif par nuit et des nuits disponibles, carte blanche avec 1 755 € nets par mois, le détail du calcul et le formulaire de demande d’étude.',
    format: 'ordinateur',
    donnees: 'exemple',
    legende: 'Le simulateur : le revenu net et son calcul, puis la demande d’étude.',
  },
  services: {
    src: img('conciergerie-nurea', 'services'),
    alt: 'Les cinq missions de la conciergerie, chacune avec son icône et sa description, puis les options sur devis : maintenance, photographie, blanchisserie.',
    format: 'ordinateur',
    donnees: 'reelles',
    legende: 'Cinq missions, définies clairement, et les options sur devis.',
  },
  accueilMobile: {
    src: img('conciergerie-nurea', 'accueil-mobile'),
    alt: 'L’accueil du site sur téléphone : les calanques, le titre, les trois conditions et la barre Appeler / WhatsApp.',
    format: 'telephone',
    donnees: 'reelles',
    legende: 'Sur téléphone, les conditions tout de suite et WhatsApp à portée de pouce.',
  },
  demande: {
    src: img('conciergerie-nurea', 'demande-recue'),
    alt: 'L’e-mail reçu par la conciergerie : le prénom et l’e-mail de la propriétaire, 130 € par nuit, 24 nuits par mois, 1 755 € nets estimés avec leur calcul, et le bouton pour lui répondre directement.',
    format: 'telephone',
    donnees: 'exemple',
    legende: 'La demande arrive par e-mail, avec les chiffres du bien.',
  },
} as const satisfies Record<string, Ecran>;

export const REALISATIONS: readonly Realisation[] = [
  {
    id: 'nurea-parfums',
    nom: 'Nuréa Parfums',
    categories: ['Site web', 'Application métier'],
    couverture: { src: img('nurea-parfums', 'couverture'), alt: 'La vitrine Nuréa Parfums sur un écran d’ordinateur, accueil sombre avec la photographie d’un flacon Nuréa, et devant elle un téléphone affichant un lot d’achat dans l’outil de gestion, sur fond bordeaux.' },
    metier: 'Parfumerie',
    lieu: 'Marseille',
    promesse:
      'Un catalogue de plus de deux cents parfums qu’on parcourt seul et qu’on commande en un message, et derrière, la caisse, les lots d’achat et la comptabilité.',
    livrables: ['site catalogue', 'espace de gestion', 'caisse sur téléphone', 'comptabilité'],
    accrochage: {
      large: [
        { ecran: NUREA.accueil, legende: 'La vitrine, côté client' },
        { ecran: NUREA.lot, legende: 'La gestion, derrière le comptoir' },
      ],
      etroit: [
        { ecran: NUREA.ficheMobile, legende: 'La vitrine' },
        { ecran: NUREA.lot, legende: 'La gestion' },
      ],
    },
    metaDescription:
      'Étude de cas Nuréa Parfums : un catalogue de parfums commandé sur Snapchat, une caisse, des lots d’achat et une comptabilité pour une parfumerie de Marseille.',
    etude: {
      contexte: [
        'Nuréa Parfums propose à Marseille un catalogue de parfums de marque, pour homme et pour femme, servis dans un flacon Nuréa personnalisé. Les commandes se passent en direct, sur Snapchat, et les flacons sont remis en main propre ou envoyés.',
      ],
      probleme: [
        'Vendre par messages fonctionne tant que le catalogue tient dans une conversation. Au-delà de deux cents références, un client ne peut plus parcourir l’offre seul, et chaque question sur un parfum devient un échange de plus.',
        'Côté gestion, le même canal ne dit rien de ce qui a été vendu, encaissé ou dépensé : il fallait un outil pour tenir les chiffres de l’activité, pas seulement une vitrine.',
      ],
      reponse: [
        'Une vitrine qui présente toute l’offre, par marque et par parfum, en clair comme en sombre. Le client cherche, garde ses parfums dans une sélection, et l’envoie en un seul message qui nomme déjà chaque parfum.',
        'Derrière, un espace de gestion privé, installable sur téléphone, qui suit l’activité de bout en bout : le client, la vente ou la commande, le lot d’achat auquel elle se rattache, l’encaissement, et la comptabilité qui en découle.',
      ],
      changements: [
        'Un client parcourt tout le catalogue seul, et arrive avec une demande qui nomme déjà les parfums voulus.',
        'Chaque vente est rattachée à un lot d’achat : ce que coûte un lot et ce qu’il a rapporté se lisent au même endroit.',
        'L’accueil de la gestion dit ce qu’il reste à faire : commandes en retard, clients à relancer, parfums en rupture.',
        'Une référence ajoutée ou retirée l’est par le commerçant, directement.',
      ],
      resultatsMesures: [],
      cotes: [
        {
          titre: 'Côté client',
          fonctionnalites: [
            'Catalogue complet, avec recherche en direct et index des marques',
            'Une fiche par parfum, qui s’ouvre sans quitter le catalogue',
            'Une sélection gardée sur le téléphone, envoyée en un seul message',
            'Affichage clair ou sombre, au choix du visiteur',
          ],
          ecrans: [NUREA.accueil, NUREA.fiche, NUREA.ficheMobile],
        },
        {
          titre: 'Côté gestion',
          fonctionnalites: [
            'Caisse sur téléphone : vendre, prendre une commande, encaisser',
            'Fiches clients, historique et relances',
            'Lots d’achat, avec leurs frais, leur marge et les ventes rattachées',
            'Comptabilité, journal et export, statistiques de vente',
            'Catalogue, stock et publication des références',
          ],
          ecrans: [NUREA.gestionAccueil, NUREA.caisse, NUREA.lot],
        },
      ],
      technique: ['Next.js', 'PostgreSQL', 'Prisma', 'Application installable'],
    },
  },
  {
    id: 'magda-mania',
    nom: 'Magda Mania',
    categories: ['Commande en ligne', 'Application métier'],
    couverture: { src: img('magda-mania', 'couverture'), alt: 'Le logo Magda Mania sur fond rose, l’écran cuisine sur tablette avec ses tickets de commande colorés, et un téléphone affichant la carte client avec les menus en photo.' },
    metier: 'Snack de skatepark',
    lieu: 'Marseille',
    promesse:
      'Commande et paiement depuis le téléphone, écran de préparation en cuisine, et une notification quand c’est prêt.',
    livrables: ['commande et paiement en ligne', 'écran cuisine', 'notifications', 'espace gérant'],
    accrochage: {
      large: [
        { ecran: MAGDA.cuisine, legende: 'L’écran de la cuisine' },
        { ecran: MAGDA.carte, legende: 'La carte, côté client' },
      ],
      etroit: [
        { ecran: MAGDA.carte, legende: 'La carte' },
        { ecran: MAGDA.suivi, legende: 'Le suivi' },
      ],
    },
    metaDescription:
      'Étude de cas Magda Mania : commande et paiement en ligne, écran cuisine en temps réel et notifications pour un snack de skatepark à Marseille.',
    etude: {
      contexte: [
        'Magda Mania tient un snack dans un skatepark de Marseille : paninis, pasta box, hot-dogs, crêpes, glaces et boissons.',
        'Sa clientèle est sur place pour rouler. Elle commande entre deux passages, le téléphone à la main.',
      ],
      probleme: [
        'Sur un stand, la commande prise à la voix a deux coûts : le client attend au comptoir au lieu de profiter de sa session, et une personne reste mobilisée à prendre les commandes et à encaisser pendant que la cuisine tourne.',
        'Il fallait que la commande arrive en cuisine déjà claire et déjà payée, et que le client sache quand revenir — sans lui demander d’installer quoi que ce soit.',
      ],
      reponse: [
        'Une application web en trois faces qui partagent la même base : la carte pour le client, un écran pour la cuisine, un espace de gestion pour le gérant.',
        'Le client commande et paie depuis son navigateur. La commande payée apparaît sur l’écran cuisine en quelques secondes, et le client suit son avancement sur une page dédiée, avec une notification s’il l’accepte.',
      ],
      changements: [
        'Une commande n’existe en cuisine qu’une fois payée : plus d’encaissement au comptoir pendant le coup de feu.',
        'Un produit en rupture est marqué « épuisé » sur la carte, et ne peut plus être commandé.',
        'Quand la cuisine s’arrête, le site le dit : personne ne commande pour rien.',
        'Le gérant change un prix, une photo ou un menu lui-même, sans passer par nous.',
      ],
      resultatsMesures: [],
      cotes: [
        {
          titre: 'Côté client',
          fonctionnalites: [
            'Carte par catégories, menus composables avec options',
            'Paiement en ligne sécurisé, sans création de compte',
            'Page de suivi propre à chaque commande',
            'Notification quand la commande avance, sur abonnement',
            'Allergènes affichés depuis la carte',
          ],
          ecrans: [MAGDA.carte, MAGDA.panier, MAGDA.suivi],
        },
        {
          titre: 'Côté cuisine',
          fonctionnalites: [
            'Écran de préparation mis à jour en temps réel',
            'Les commandes arrivent payées, dans l’ordre',
            'Installable sur une tablette comme une application',
          ],
          ecrans: [MAGDA.cuisine],
        },
        {
          titre: 'Côté gérant',
          fonctionnalites: [
            'Édition de la carte : produits, photos, options, ordre d’affichage',
            'Ouverture et fermeture de la prise de commande',
            'Historique, remboursements et export',
            'Comptes d’accès pour l’équipe',
          ],
          ecrans: [MAGDA.gerant],
        },
      ],
      technique: ['Next.js', 'Stripe', 'PostgreSQL', 'Temps réel (SSE)', 'Notifications Web Push'],
    },
  },
  {
    id: 'encore-un-dessert',
    nom: 'Encore 1 Dessert',
    categories: ['Application mobile', 'Application métier'],
    couverture: { src: img('encore-un-dessert', 'couverture'), alt: 'Trois écrans de l’application Encore 1 Dessert sur fond caramel : la cuisine avec 8 desserts faits sur 25, la fiche de la tarte cacahuète caramel et ses bénéfices, et le bilan des ventes du mois.' },
    metier: 'Pâtisserie',
    promesse:
      'Le coût de revient de chaque tarte, la caisse, les commandes des particuliers et des restaurants, la liste de courses : toute la pâtisserie tient dans un téléphone.',
    livrables: ['application mobile', 'caisse', 'commandes et production', 'liste de courses', 'suivi des ventes'],
    accrochage: {
      large: [
        { ecran: E1D.fiche, legende: 'La fiche d’une tarte' },
        { ecran: E1D.cuisine, legende: 'La production du jour' },
        { ecran: E1D.ventes, legende: 'Le bilan du mois' },
      ],
      etroit: [
        { ecran: E1D.fiche, legende: 'La fiche d’une tarte' },
        { ecran: E1D.caisse, legende: 'La caisse' },
      ],
    },
    metaDescription:
      'Étude de cas Encore 1 Dessert : coût de revient, caisse, commandes, courses et ventes dans une application mobile sur mesure pour une pâtisserie.',
    etude: {
      contexte: [
        'Encore 1 Dessert fabrique des tartes, des flans et des tiramisus, vendus à des particuliers et à des restaurants, avec un prix pour chacun.',
        'La production se décide chaque matin en fonction des commandes, et les ingrédients changent de prix d’un achat à l’autre.',
      ],
      probleme: [
        'Dans une pâtisserie, la marge se perd sans bruit : le beurre augmente, une recette s’alourdit de quelques grammes, et personne ne sait plus ce que coûte vraiment une tarte vendue à un restaurant.',
        'Les commandes, elles, vivaient entre des messages et un carnet. Il fallait un seul outil pour savoir quoi produire, quoi acheter, à quel coût, et ce que le mois a rapporté.',
      ],
      reponse: [
        'Une application mobile, installable, construite autour de la fiche technique : des ingrédients avec leur prix d’achat, des préparations maison (pâte sucrée, caramel, appareil à flan) assemblées en desserts, et un coût de revient recalculé à chaque changement.',
        'Autour, une caisse au centre de l’écran, les commandes avec leur production et la liste de courses qui en découle, et un suivi des ventes qui enregistre chaque vente à son prix du jour.',
      ],
      changements: [
        'Avant de fixer un prix, on voit ce qu’il rapporte, pour un particulier comme pour un restaurant.',
        'Quand un ingrédient augmente, chaque dessert qui l’utilise est recalculé : l’effet sur le bénéfice se voit tout de suite.',
        'La liste de courses se fait seule, à partir des commandes à préparer.',
        'Une vente encaissée ou une commande livrée est enregistrée avec le prix du jour : l’historique ne bouge plus.',
      ],
      resultatsMesures: [],
      cotes: [
        {
          titre: 'L’atelier',
          fonctionnalites: [
            'Ingrédients avec prix d’achat, par rayon',
            'Préparations maison, avec leurs variantes et leur rendement',
            'Coût de revient et bénéfice recalculés à chaque grammage',
            'Prix particulier et prix professionnel par dessert',
          ],
          ecrans: [E1D.fiche, E1D.caisse],
        },
        {
          titre: 'Les commandes et les ventes',
          fonctionnalites: [
            'Commandes rangées par échéance, avec leur statut',
            'Production cochée dessert par dessert',
            'Liste de courses calculée depuis les commandes',
            'Rappels sur le téléphone avant une livraison',
            'Argent encaissé, bénéfice et desserts les plus rentables par période',
          ],
          ecrans: [E1D.commandes, E1D.cuisine, E1D.courses, E1D.ventes],
        },
      ],
      technique: ['React', 'TypeScript', 'PostgreSQL', 'Application installable'],
    },
  },
  {
    id: 'conciergerie-nurea',
    nom: 'Conciergerie Nuréa',
    categories: ['Site web', 'Simulateur de revenus'],
    couverture: { src: img('conciergerie-nurea', 'couverture'), alt: 'Le simulateur de revenus du site, qui estime 1 755 € nets par mois pour 130 € la nuit et 24 nuits, et sur téléphone l’e-mail de demande d’étude reçu par la conciergerie avec les mêmes chiffres, sur fond azur.' },
    metier: 'Conciergerie de location courte durée',
    lieu: 'Marseille',
    promesse:
      'Un site qui répond aux questions d’un propriétaire avant le premier appel, et un simulateur qui transforme la visite en demande chiffrée.',
    livrables: ['site vitrine', 'simulateur de revenus', 'demandes chiffrées par e-mail', 'contact WhatsApp'],
    accrochage: {
      large: [
        { ecran: CONCIERGERIE.accueil, legende: 'Le site, côté propriétaire' },
        { ecran: CONCIERGERIE.demande, legende: 'La demande reçue' },
      ],
      etroit: [
        { ecran: CONCIERGERIE.accueilMobile, legende: 'Le site' },
        { ecran: CONCIERGERIE.demande, legende: 'La demande reçue' },
      ],
    },
    metaDescription:
      'Étude de cas Conciergerie Nuréa : un site vitrine et un simulateur de revenus qui envoie des demandes chiffrées, pour une conciergerie Airbnb à Marseille.',
    etude: {
      contexte: [
        'La Conciergerie Nuréa gère des logements en location courte durée à Marseille pour le compte de leurs propriétaires : accueil des voyageurs, ménage, réservations, cautions et remise des clés.',
      ],
      probleme: [
        'Un propriétaire qui hésite à confier son bien se pose trois questions : combien ça rapporte, qu’est-ce qui est pris en charge, et combien ça coûte. Tant qu’un site n’y répond pas, chaque contact commence par un appel pour rien.',
        'Et une demande qui arrive sans le tarif ni l’occupation du bien oblige à tout redemander avant de pouvoir répondre.',
      ],
      reponse: [
        'Un site d’une page qui pose les conditions dès l’ouverture — commission, engagement, cautions — puis détaille les cinq missions prises en charge et le déroulé, du premier appel au premier virement.',
        'Au centre, un simulateur : le propriétaire règle son tarif par nuit et ses nuits par mois, voit le calcul ligne à ligne, et demande une étude. La conciergerie reçoit un e-mail avec ces chiffres, et répond directement au propriétaire.',
      ],
      changements: [
        'Un propriétaire connaît un ordre de grandeur de ses revenus avant même d’appeler.',
        'La demande arrive avec les chiffres du bien : la réponse peut être une étude, pas une liste de questions.',
        'Les conditions sont écrites avant le premier échange : personne ne découvre la commission au rendez-vous.',
      ],
      resultatsMesures: [],
      cotes: [
        {
          titre: 'Côté propriétaire',
          fonctionnalites: [
            'Conditions lisibles dès l’ouverture : commission, engagement, cautions',
            'Les cinq missions prises en charge, et les options sur devis',
            'Simulateur de revenus nets, commission et occupation déduites',
            'Contact direct par WhatsApp, questions fréquentes',
          ],
          ecrans: [CONCIERGERIE.accueil, CONCIERGERIE.simulateur, CONCIERGERIE.services, CONCIERGERIE.accueilMobile],
        },
        {
          titre: 'Côté conciergerie',
          fonctionnalites: [
            'Chaque demande arrive par e-mail avec le tarif, les nuits et le revenu estimé',
            'Répondre à l’e-mail répond directement au propriétaire',
            'Pages légales, référencement et partage prêts dès la mise en ligne',
          ],
          ecrans: [CONCIERGERIE.demande],
        },
      ],
      technique: ['Next.js', 'Resend', 'Radix UI'],
    },
  },
];

export const REALISATIONS_HREF = '/realisations' satisfies Route;

/**
 * Les projets montrés sur l’accueil : trois, pas davantage. L’accueil donne
 * envie ; /realisations montre tout ; l’étude de cas détaille.
 */
export const REALISATIONS_A_LA_UNE: readonly Realisation[] = ['nurea-parfums', 'magda-mania', 'encore-un-dessert']
  .map((id) => REALISATIONS.find((projet) => projet.id === id))
  .filter((projet): projet is Realisation => Boolean(projet));

/** Les catégories présentes, dans l’ordre de première apparition. */
export const CATEGORIES: readonly string[] = [...new Set(REALISATIONS.flatMap((projet) => projet.categories))];

export function realisationHref(id: string): string {
  return `${REALISATIONS_HREF}/${id}`;
}

export function getRealisation(id: string): Realisation | undefined {
  return REALISATIONS.find((projet) => projet.id === id);
}

/** « Parfumerie, Marseille » — et l’année si elle est renseignée. */
export function metierEtLieu(projet: Realisation): string {
  return [projet.metier, projet.lieu, projet.annee].filter(Boolean).join(', ');
}

/** « Site catalogue, espace de gestion, caisse sur téléphone, comptabilité. » */
export function livrablesEnPhrase(projet: Realisation): string {
  const phrase = projet.livrables.join(', ');
  return `${phrase.charAt(0).toUpperCase()}${phrase.slice(1)}.`;
}

/** La mention qui accompagne les écrans remplis de données d’exemple. */
export const MENTION_DONNEES_EXEMPLE =
  'Les écrans de gestion sont présentés avec des données d’exemple : les chiffres de nos clients restent chez eux.';
