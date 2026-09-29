import type { Route } from 'next';

/**
 * Les réalisations du studio, et leurs études de cas.
 *
 * ## Deux sortes d’écrans
 *
 * - Les **captures** (`donnees: 'reelles'`) photographient un site public tel
 *   qu’il est en ligne.
 * - Les **reconstitutions** (`donnees: 'exemple'`) reproduisent un écran
 *   réellement livré — back-office, écran cuisine, application de production —
 *   avec des données d’exemple. Les chiffres d’un client (ventes, marges,
 *   commandes) ne sortent jamais de chez lui ; le site le dit, sous les écrans.
 *   Les sources sont dans `design/maquettes/`, rendues par
 *   `node scripts/maquettes.mjs`.
 *
 * ## Ce qui n’y figure pas
 *
 * Aucun résultat chiffré présenté comme mesuré, aucun témoignage. Chaque
 * fonctionnalité citée a été vérifiée dans le code livré. `resultatsMesures`
 * reste vide tant qu’un client n’a pas communiqué et autorisé ses chiffres.
 */
export type Ecran = {
  readonly src: string;
  readonly alt: string;
  readonly format: 'ordinateur' | 'telephone';
  /** Capture d’un site public, ou écran livré montré avec des données d’exemple. */
  readonly donnees: 'reelles' | 'exemple';
  /** Libellé de la barre d’adresse (ordinateur) : domaine ou nom de l’outil. */
  readonly barre?: string;
  readonly legende?: string;
};

export type GroupeEcrans = {
  /** « Côté client », « Côté cuisine », « Côté gestion »… */
  readonly titre: string;
  readonly ecrans: readonly Ecran[];
};

export type GroupeFonctionnalites = {
  readonly titre: string;
  readonly points: readonly string[];
};

/**
 * Mise en scène d’un projet sur un aplat à ses couleurs.
 * Chaque composition correspond à un sélecteur `[data-composition]` de app/globals.css.
 */
export type Scene = {
  readonly composition: 'vitrine-gestion' | 'ordinateur-telephones' | 'trois-telephones' | 'ordinateur-telephone';
  /** Couleur de l’aplat, prise dans l’identité du client. */
  readonly fond: string;
  readonly ordinateurs: readonly Ecran[];
  readonly telephones: readonly Ecran[];
};

export type EtudeDeCas = {
  readonly contexte: readonly string[];
  readonly probleme: readonly string[];
  readonly solution: readonly string[];
  readonly interfaces: readonly GroupeEcrans[];
  readonly fonctionnalites: readonly GroupeFonctionnalites[];
  /** Conséquences opérationnelles de ce qui a été construit, sans chiffre. */
  readonly auQuotidien: readonly string[];
  readonly resultatsMesures: readonly string[];
  readonly technique: readonly string[];
};

export type Realisation = {
  /** Sert aussi de segment d’URL : `/realisations/<id>`. */
  readonly id: string;
  readonly nom: string;
  readonly secteur: string;
  /** Une phrase : ce que ça règle. */
  readonly promesse: string;
  /** Ce qui a été livré, en étiquettes courtes. */
  readonly livrables: readonly string[];
  readonly scene: Scene;
  /** Adresse publique, uniquement si le site est ouvert. */
  readonly url?: string;
  readonly metaDescription: string;
  readonly etude: EtudeDeCas;
};

const IMG = '/images/realisations';

const NUREA_ACCUEIL: Ecran = {
  src: `${IMG}/nurea-accueil.jpg`,
  alt: 'L’accueil du site Nuréa Parfums : un flacon sur un marbre sombre et le titre « L’excellence du parfum ».',
  format: 'ordinateur',
  donnees: 'reelles',
  barre: 'nureaparfums.fr',
  legende: 'L’accueil, à la hauteur des maisons représentées.',
};

const NUREA_ADMIN: Ecran = {
  src: `${IMG}/nurea-admin.jpg`,
  alt: 'Le tableau de bord de gestion Nuréa : chiffre d’affaires du mois, marge, lot d’achat en cours, ventes des trente derniers jours et meilleures ventes.',
  format: 'ordinateur',
  donnees: 'exemple',
  barre: 'Gestion · Nuréa Parfums',
  legende: 'Le tableau de bord : le mois, le lot en cours et sa rentabilité.',
};

const NUREA_CAISSE: Ecran = {
  src: `${IMG}/nurea-caisse.jpg`,
  alt: 'La caisse sur téléphone : deux parfums, le client, le mode de règlement et le bouton « Encaisser 291 € ».',
  format: 'telephone',
  donnees: 'exemple',
  legende: 'La caisse, sur le téléphone, au moment de la remise.',
};

const MAGDA_CUISINE: Ecran = {
  src: `${IMG}/magda-cuisine.jpg`,
  alt: 'L’écran cuisine de Magda Mania : trois colonnes « À préparer », « En préparation » et « Prêtes », avec un ticket par commande payée.',
  format: 'ordinateur',
  donnees: 'exemple',
  barre: 'Cuisine · Magda Mania',
  legende: 'L’écran cuisine : chaque commande payée arrive en temps réel, dans l’ordre.',
};

const MAGDA_CARTE: Ecran = {
  src: `${IMG}/magda-carte.jpg`,
  alt: 'La carte de Magda Mania sur téléphone : les menus avec photo et prix, un produit marqué « Épuisé » et le panier.',
  format: 'telephone',
  donnees: 'exemple',
  legende: 'La carte : un produit en rupture ne peut plus être commandé.',
};

const MAGDA_SUIVI: Ecran = {
  src: `${IMG}/magda-suivi.jpg`,
  alt: 'Le suivi de commande : la notification « Ta commande n° 47 est prête » et les étapes payée, en préparation, prête.',
  format: 'telephone',
  donnees: 'exemple',
  legende: 'Le suivi : le client est prévenu quand sa commande est prête.',
};

const E1D_FICHE: Ecran = {
  src: `${IMG}/e1d-fiche.jpg`,
  alt: 'La fiche technique d’une tarte : sa composition en grammes, son coût de revient, ses prix particulier et professionnel et leurs marges.',
  format: 'telephone',
  donnees: 'exemple',
  legende: 'La fiche technique : chaque grammage a un prix, chaque tarte une marge.',
};

const E1D_COMMANDES: Ecran = {
  src: `${IMG}/e1d-commandes.jpg`,
  alt: 'Les commandes du jour : ce qu’il faut produire, puis chaque commande de restaurant ou de particulier avec son statut.',
  format: 'telephone',
  donnees: 'exemple',
  legende: 'Les commandes du jour, et ce qu’il faut produire pour les honorer.',
};

const E1D_COMPTA: Ecran = {
  src: `${IMG}/e1d-compta.jpg`,
  alt: 'La comptabilité du mois : bénéfice net, chiffre d’affaires, coût matières et meilleures ventes.',
  format: 'telephone',
  donnees: 'exemple',
  legende: 'La comptabilité : bénéfice net, coût matières, meilleures ventes.',
};

const CONCIERGERIE_ACCUEIL: Ecran = {
  src: `${IMG}/conciergerie-accueil.jpg`,
  alt: 'L’accueil du site de la Conciergerie Nuréa : une villa face à la mer et le titre « Votre appartement génère des revenus. Vous ne gérez rien. »',
  format: 'ordinateur',
  donnees: 'reelles',
  barre: 'Conciergerie Nuréa',
  legende: 'L’accueil : la promesse, puis les conditions — commission, engagement, cautions.',
};

const CONCIERGERIE_DEMANDE: Ecran = {
  src: `${IMG}/conciergerie-demande.jpg`,
  alt: 'L’e-mail reçu par la conciergerie : le prénom du propriétaire, son tarif par nuit, ses nuits par mois et ses revenus nets estimés.',
  format: 'telephone',
  donnees: 'exemple',
  legende: 'La demande arrive par e-mail, avec les chiffres du bien.',
};

export const REALISATIONS: readonly Realisation[] = [
  {
    id: 'nurea-parfums',
    nom: 'Nuréa Parfums',
    secteur: 'Parfumerie · Marseille',
    promesse:
      'Un catalogue de plus de cent parfums à la hauteur des maisons représentées, et derrière, la caisse, les lots d’achat et la comptabilité.',
    livrables: ['Site catalogue', 'Back-office', 'Caisse mobile', 'Comptabilité'],
    url: 'https://nureaparfums.fr',
    scene: {
      composition: 'vitrine-gestion',
      fond: '#4a1d26',
      ordinateurs: [NUREA_ACCUEIL, NUREA_ADMIN],
      telephones: [NUREA_CAISSE],
    },
    metaDescription:
      'Étude de cas Nuréa Parfums : un catalogue de parfums en ligne, et un back-office avec caisse, lots d’achat et comptabilité pour une parfumerie de Marseille.',
    etude: {
      contexte: [
        'Nuréa Parfums vend à Marseille des parfums de grandes maisons, pour homme et pour femme. Les commandes se passent en direct, par message, et les flacons sont remis en main propre ou envoyés.',
      ],
      probleme: [
        'Vendre par messages fonctionne tant que le catalogue tient dans une conversation. Au-delà de cent références, un client ne peut plus parcourir l’offre seul, et chaque question sur un parfum devient un échange de plus.',
        'Côté gestion, le même canal ne dit rien de ce qui a été vendu, encaissé ou dépensé : il fallait un outil pour tenir les chiffres de l’activité, pas seulement une vitrine.',
      ],
      solution: [
        'Un site catalogue qui présente toute l’offre, par marque et par parfum, avec une fiche par référence et un bouton de commande qui nomme déjà le parfum voulu.',
        'Derrière, un espace de gestion privé, installable sur téléphone, qui suit l’activité de bout en bout : le client, la vente, le lot d’achat auquel elle se rattache, l’encaissement, et la comptabilité qui en découle.',
      ],
      interfaces: [
        {
          titre: 'Côté client',
          ecrans: [
            NUREA_ACCUEIL,
            {
              src: `${IMG}/nurea-grille.jpg`,
              alt: 'Le catalogue Nuréa : la recherche, les filtres par gamme et les fiches parfum en photo.',
              format: 'ordinateur',
              donnees: 'reelles',
              barre: 'nureaparfums.fr/parfums',
              legende: 'Le catalogue : recherche, filtres par gamme, une photo par référence.',
            },
            {
              src: `${IMG}/nurea-fiche.jpg`,
              alt: 'La fiche d’un parfum : la photo du flacon, la marque, la description et le bouton de commande.',
              format: 'ordinateur',
              donnees: 'reelles',
              barre: 'nureaparfums.fr/parfums/chanel',
              legende: 'Une fiche par parfum, et la commande en un geste.',
            },
            {
              src: `${IMG}/nurea-mobile.jpg`,
              alt: 'La même fiche parfum sur téléphone.',
              format: 'telephone',
              donnees: 'reelles',
              legende: 'Sur téléphone, là où la plupart des clients arrivent.',
            },
          ],
        },
        { titre: 'Côté gestion', ecrans: [NUREA_ADMIN, NUREA_CAISSE] },
      ],
      fonctionnalites: [
        {
          titre: 'Côté client',
          points: [
            'Catalogue complet, avec recherche, filtres par gamme et tri',
            'Une page par marque et une fiche par parfum',
            'Commande depuis chaque fiche, le parfum déjà nommé',
            'Affichage clair ou sombre, au choix du visiteur',
          ],
        },
        {
          titre: 'Côté gestion',
          points: [
            'Caisse sur téléphone : vendre, encaisser, suivre la journée',
            'Fiches clients et historique de leurs commandes',
            'Lots d’achat, avec leurs dépenses et les ventes rattachées',
            'Comptabilité, journal et export, statistiques de vente',
            'Catalogue, marques et publication des références',
          ],
        },
      ],
      auQuotidien: [
        'Un client parcourt tout le catalogue seul, et arrive avec une demande qui nomme déjà le parfum voulu.',
        'Chaque vente est rattachée à un lot d’achat : ce que coûte un lot et ce qu’il a rapporté se lisent au même endroit.',
        'Une vente, un encaissement et une dépense sont saisis au moment où ils ont lieu, depuis le téléphone.',
        'Une référence ajoutée ou retirée l’est par le commerçant, directement.',
      ],
      resultatsMesures: [],
      technique: ['Next.js', 'PostgreSQL', 'Prisma', 'Application installable'],
    },
  },
  {
    id: 'magda-mania',
    nom: 'Magda Mania',
    secteur: 'Snack · Skatepark de Marseille',
    promesse:
      'Commande et paiement depuis le téléphone, écran de préparation en cuisine, et une notification quand c’est prêt.',
    livrables: ['Click & collect', 'Paiement en ligne', 'Écran cuisine', 'Espace gérant'],
    scene: {
      composition: 'ordinateur-telephones',
      fond: '#0d1330',
      ordinateurs: [MAGDA_CUISINE],
      telephones: [MAGDA_CARTE, MAGDA_SUIVI],
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
      solution: [
        'Une application web en trois faces qui partagent la même base : la carte pour le client, un écran pour la cuisine, un espace de gestion pour le gérant.',
        'Le client commande et paie depuis son navigateur. La commande payée apparaît sur l’écran cuisine en quelques secondes, et le client suit son avancement sur une page dédiée, avec une notification s’il l’accepte.',
      ],
      interfaces: [
        { titre: 'Côté client', ecrans: [MAGDA_CARTE, MAGDA_SUIVI] },
        { titre: 'Côté cuisine', ecrans: [MAGDA_CUISINE] },
        {
          titre: 'Côté gérant',
          ecrans: [
            {
              src: `${IMG}/magda-gestion.jpg`,
              alt: 'L’espace gérant : la carte par catégorie, le prix, les options et un interrupteur de disponibilité par produit.',
              format: 'ordinateur',
              donnees: 'exemple',
              barre: 'Gestion · Magda Mania',
              legende: 'La carte : prix, photos, options, et une rupture en un geste.',
            },
          ],
        },
      ],
      fonctionnalites: [
        {
          titre: 'Côté client',
          points: [
            'Carte par catégories, menus composables avec options',
            'Paiement en ligne sécurisé, sans création de compte',
            'Page de suivi propre à chaque commande',
            'Notification quand la commande avance, sur abonnement',
            'Allergènes affichés depuis la carte',
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
          titre: 'Côté gérant',
          points: [
            'Édition de la carte : produits, photos, options, ordre d’affichage',
            'Ouverture et fermeture de la prise de commande',
            'Historique, remboursements et export',
            'Comptes d’accès pour l’équipe',
          ],
        },
      ],
      auQuotidien: [
        'Une commande n’existe en cuisine qu’une fois payée : plus d’encaissement au comptoir pendant le coup de feu.',
        'Un produit en rupture est marqué « épuisé » sur la carte, et ne peut plus être commandé.',
        'Quand la cuisine s’arrête, le site le dit : personne ne commande pour rien.',
        'Le gérant change un prix, une photo ou un menu lui-même, sans passer par nous.',
      ],
      resultatsMesures: [],
      technique: ['Next.js', 'Stripe', 'PostgreSQL', 'Temps réel (SSE)', 'Notifications Web Push'],
    },
  },
  {
    id: 'encore-un-dessert',
    nom: 'Encore 1 Dessert',
    secteur: 'Pâtisserie · production et vente',
    promesse:
      'Le coût de revient de chaque tarte, les commandes des particuliers et des restaurants, la comptabilité : toute la pâtisserie tient dans un téléphone.',
    livrables: ['Fiches techniques', 'Coût de revient', 'Commandes', 'Comptabilité'],
    scene: {
      composition: 'trois-telephones',
      fond: '#e9d9c4',
      ordinateurs: [],
      telephones: [E1D_COMMANDES, E1D_FICHE, E1D_COMPTA],
    },
    metaDescription:
      'Étude de cas Encore 1 Dessert : fiches techniques, coût de revient, commandes et comptabilité dans une application mobile sur mesure pour une pâtisserie.',
    etude: {
      contexte: [
        'Encore 1 Dessert fabrique des tartes et des desserts, vendus à des particuliers et à des restaurants, avec un prix pour chacun.',
        'La production se décide chaque matin en fonction des commandes, et les matières premières changent de prix d’un achat à l’autre.',
      ],
      probleme: [
        'Dans une pâtisserie, la marge se perd sans bruit : le beurre augmente, une recette s’alourdit de quelques grammes, et personne ne sait plus ce que coûte vraiment une tarte vendue à un restaurant.',
        'Les commandes, elles, vivaient entre des messages et un carnet. Il fallait un seul outil pour savoir quoi produire, à quel coût, et ce que le mois a rapporté.',
      ],
      solution: [
        'Une application mobile, installable, construite autour de la fiche technique : des ingrédients avec leur prix d’achat, des bases maison (pâte sucrée, caramel, crème d’amande) assemblées en desserts, et un coût de revient recalculé à chaque changement.',
        'Autour, les commandes avec leur statut, et une comptabilité qui enregistre chaque vente au moment de la livraison, figée à son prix du jour.',
      ],
      interfaces: [
        { titre: 'Production', ecrans: [E1D_FICHE, E1D_COMMANDES] },
        {
          titre: 'Gestion',
          ecrans: [
            {
              src: `${IMG}/e1d-ingredients.jpg`,
              alt: 'La liste des ingrédients : prix au kilo, conditionnement et variation depuis le dernier achat.',
              format: 'telephone',
              donnees: 'exemple',
              legende: 'Les ingrédients : un prix d’achat change, les fiches suivent.',
            },
            E1D_COMPTA,
          ],
        },
      ],
      fonctionnalites: [
        {
          titre: 'Production',
          points: [
            'Ingrédients avec prix d’achat, par catégorie',
            'Bases maison assemblées en fiches desserts',
            'Coût de revient et marge recalculés à chaque grammage',
            'Prix particulier et prix professionnel par dessert',
          ],
        },
        {
          titre: 'Commandes et comptabilité',
          points: [
            'Commandes avec statut : en attente, prête, livrée',
            'Rappels sur le téléphone avant une livraison',
            'La livraison enregistre la vente en comptabilité',
            'Chiffre d’affaires, bénéfice net et marges par période',
            'Données synchronisées, installable comme une application',
          ],
        },
      ],
      auQuotidien: [
        'Avant de fixer un prix, on voit la marge qu’il laisse, pour un particulier comme pour un restaurant.',
        'Quand un ingrédient augmente, chaque fiche qui l’utilise est recalculée : l’effet sur la marge se voit tout de suite.',
        'Une commande livrée devient une vente comptable, avec le prix du jour : l’historique ne bouge plus.',
        'Le bilan du mois se lit sur le téléphone, sans tableur.',
      ],
      resultatsMesures: [],
      technique: ['React', 'TypeScript', 'Supabase', 'Application installable'],
    },
  },
  {
    id: 'conciergerie-nurea',
    nom: 'Conciergerie Nuréa',
    secteur: 'Conciergerie Airbnb · Marseille',
    promesse:
      'Un site qui répond aux questions d’un propriétaire avant le premier appel, et un simulateur qui transforme la visite en demande chiffrée.',
    livrables: ['Site vitrine', 'Simulateur de revenus', 'Demandes par e-mail', 'Contact WhatsApp'],
    scene: {
      composition: 'ordinateur-telephone',
      fond: '#0f4c63',
      ordinateurs: [CONCIERGERIE_ACCUEIL],
      telephones: [CONCIERGERIE_DEMANDE],
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
      solution: [
        'Un site d’une page qui pose les conditions dès l’ouverture — commission, engagement, cautions — puis détaille les cinq missions prises en charge et le déroulé, du premier appel au premier virement.',
        'Au centre, un simulateur : le propriétaire règle son tarif par nuit et ses nuits par mois, voit ses revenus nets, et demande une étude. La conciergerie reçoit un e-mail avec ces chiffres, et répond directement au propriétaire.',
      ],
      interfaces: [
        {
          titre: 'Côté propriétaire',
          ecrans: [
            CONCIERGERIE_ACCUEIL,
            {
              src: `${IMG}/conciergerie-simulateur.jpg`,
              alt: 'Le simulateur de revenus : deux curseurs pour le tarif par nuit et les nuits louées, le revenu net estimé et le formulaire de demande.',
              format: 'ordinateur',
              donnees: 'reelles',
              barre: 'Conciergerie Nuréa',
              legende: 'Le simulateur : commission et occupation déjà déduites.',
            },
            {
              src: `${IMG}/conciergerie-services.jpg`,
              alt: 'Les cinq missions de la conciergerie, chacune avec sa description.',
              format: 'ordinateur',
              donnees: 'reelles',
              barre: 'Conciergerie Nuréa',
              legende: 'Cinq missions, définies clairement.',
            },
            {
              src: `${IMG}/conciergerie-mobile.jpg`,
              alt: 'L’accueil du site sur téléphone, avec le bouton WhatsApp.',
              format: 'telephone',
              donnees: 'reelles',
              legende: 'Sur téléphone, avec WhatsApp à portée de pouce.',
            },
          ],
        },
        { titre: 'Côté conciergerie', ecrans: [CONCIERGERIE_DEMANDE] },
      ],
      fonctionnalites: [
        {
          titre: 'Côté propriétaire',
          points: [
            'Conditions lisibles dès l’ouverture : commission, engagement, cautions',
            'Les cinq missions prises en charge, et les options sur devis',
            'Simulateur de revenus nets, commission et occupation déduites',
            'Contact direct par WhatsApp, questions fréquentes',
          ],
        },
        {
          titre: 'Côté conciergerie',
          points: [
            'Chaque demande arrive par e-mail avec le tarif, les nuits et le revenu estimé',
            'Répondre à l’e-mail répond directement au propriétaire',
            'Pages légales, référencement et partage prêts dès la mise en ligne',
          ],
        },
      ],
      auQuotidien: [
        'Un propriétaire connaît un ordre de grandeur de ses revenus avant même d’appeler.',
        'La demande arrive avec les chiffres du bien : la réponse peut être une étude, pas une liste de questions.',
        'Les conditions sont écrites avant le premier échange : personne ne découvre la commission au rendez-vous.',
      ],
      resultatsMesures: [],
      technique: ['Next.js', 'Resend', 'Radix UI'],
    },
  },
];

export const REALISATIONS_HREF = '/realisations' satisfies Route;

export function realisationHref(id: string): string {
  return `${REALISATIONS_HREF}/${id}`;
}

export function getRealisation(id: string): Realisation | undefined {
  return REALISATIONS.find((projet) => projet.id === id);
}

/** Vrai si au moins un écran du projet est montré avec des données d’exemple. */
export function aDesDonneesExemple(projet: Realisation): boolean {
  return projet.etude.interfaces.some((groupe) => groupe.ecrans.some((e) => e.donnees === 'exemple'));
}
