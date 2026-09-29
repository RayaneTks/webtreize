import type { Route } from 'next';
import ECRANS from './ecrans-realisations.json';

/**
 * Les réalisations du studio, et leurs études de cas.
 *
 * ## Les écrans
 *
 * Chaque projet a sa propre direction artistique, écrite avant de dessiner
 * (`design/maquettes/<projet>/DA.md`). Les écrans montrés sont des **versions
 * de présentation** : fidèles à ce que le produit fait réellement, épurées pour
 * être montrées. Aucun lien vers les sites des clients n’est publié.
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

export type Realisation = {
  /** Sert aussi de segment d’URL : `/realisations/<id>`. */
  readonly id: string;
  readonly nom: string;
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
    alt: 'L’accueil sombre de Nuréa Parfums : le titre « Les grands parfums, choisis un par un. », deux boutons cuivre et trois parfums de la sélection du moment.',
    format: 'ordinateur',
    donnees: 'reelles',
    legende: 'L’accueil de la boutique : l’accroche, la commande et trois parfums du catalogue.',
  },
  fiche: {
    src: img('nurea-parfums', 'boutique-fiche'),
    alt: 'La fiche « Contre Moi » de Louis Vuitton : la photo du flacon, les formats 10, 50 et 80 ml et le bouton cuivre « Commander sur Snapchat ».',
    format: 'ordinateur',
    donnees: 'reelles',
    legende: 'Une fiche par parfum : le flacon, les formats, la commande en un geste.',
  },
  ficheMobile: {
    src: img('nurea-parfums', 'boutique-fiche-mobile'),
    alt: 'La fiche « Tobacco Vanille » de Tom Ford sur téléphone, avec le bouton « Commander sur Snapchat » fixé en bas.',
    format: 'telephone',
    donnees: 'reelles',
    legende: 'Sur téléphone, le bouton de commande toujours visible.',
  },
  tableau: {
    src: img('nurea-parfums', 'gestion-tableau'),
    alt: 'Le tableau de bord de la gestion : l’encaissé du mois en grand avec la marge nette, ce qu’il reste à faire, la journée, les parfums les plus vendus et les lots ouverts.',
    format: 'ordinateur',
    donnees: 'exemple',
    legende: 'L’accueil de la gestion : le mois, ce qu’il reste à faire, les parfums qui se vendent.',
  },
  caisse: {
    src: img('nurea-parfums', 'gestion-caisse'),
    alt: 'L’écran « Vendre » sur téléphone : un parfum en 50 ml à 85 €, le montant reçu en espèces et le bouton bordeaux « Encaisser 85 € ».',
    format: 'telephone',
    donnees: 'exemple',
    legende: 'La vente au comptoir : l’article, le montant reçu, puis « Encaisser ».',
  },
  gestionAccueil: {
    src: img('nurea-parfums', 'gestion-accueil'),
    alt: 'L’accueil de la gestion sur téléphone : les commandes en retard, les clients à relancer, l’encaissé du mois et de la journée.',
    format: 'telephone',
    donnees: 'exemple',
    legende: 'La gestion sur téléphone : ce qu’il reste à faire, le mois, la journée.',
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
    alt: 'La recette de la tarte cacahuète caramel : coût de revient de 5,99 €, soit 0,75 € la part, la composition en cinq lignes avec grammages et coûts, puis le prix particulier (44 €, 86,4 % de marge) et pro (38 €, 84,2 %).',
    format: 'telephone',
    donnees: 'exemple',
    legende: 'La fiche d’une tarte : sa composition, son coût de revient, sa marge particulier et pro.',
  },
  commandes: {
    src: img('encore-un-dessert', 'commandes'),
    alt: 'Les commandes du mercredi 30 septembre : restaurants et particuliers, leurs desserts, leurs notes de livraison, leur statut et leur avancement en cuisine.',
    format: 'telephone',
    donnees: 'exemple',
    legende: 'Les commandes du jour, leur statut et leur avancement en cuisine.',
  },
  production: {
    src: img('encore-un-dessert', 'production'),
    alt: 'La vue Cuisine : 10 pièces faites sur 22 ; la tarte cacahuète caramel est dépliée, avec une pastille par tarte pour chaque client.',
    format: 'telephone',
    donnees: 'exemple',
    legende: 'La cuisine : toutes les commandes regroupées par dessert, cochées tarte par tarte.',
  },
  ingredients: {
    src: img('encore-un-dessert', 'ingredients'),
    alt: 'Les matières premières classées par rayon : pour chacune, le conditionnement acheté et le prix au kilo, au litre ou à l’unité.',
    format: 'telephone',
    donnees: 'exemple',
    legende: 'Les matières premières par rayon, avec leur prix au kilo, au litre ou à l’unité.',
  },
  compta: {
    src: img('encore-un-dessert', 'compta'),
    alt: 'Le tableau de bord des 30 derniers jours : chiffre d’affaires, bénéfice net, coût matières, marge globale, puis les desserts les plus rentables.',
    format: 'telephone',
    donnees: 'exemple',
    legende: 'Le bilan du mois : chiffre d’affaires, bénéfice, marge et desserts les plus rentables.',
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
    metier: 'Parfumerie',
    lieu: 'Marseille',
    promesse:
      'Un catalogue de plus de cent parfums à la hauteur des maisons représentées, et derrière, la caisse, les lots d’achat et la comptabilité.',
    livrables: ['site catalogue', 'espace de gestion', 'caisse sur téléphone', 'comptabilité'],
    accrochage: {
      large: [
        { ecran: NUREA.accueil, legende: 'La boutique, côté client' },
        { ecran: NUREA.caisse, legende: 'La caisse, derrière le comptoir' },
      ],
      etroit: [
        { ecran: NUREA.ficheMobile, legende: 'La boutique' },
        { ecran: NUREA.caisse, legende: 'La caisse' },
      ],
    },
    metaDescription:
      'Étude de cas Nuréa Parfums : une boutique de parfums en ligne, et derrière, une caisse, des lots d’achat et une comptabilité pour une parfumerie de Marseille.',
    etude: {
      contexte: [
        'Nuréa Parfums vend à Marseille des parfums de grandes maisons, pour homme et pour femme. Les commandes se passent en direct, par message, et les flacons sont remis en main propre ou envoyés.',
      ],
      probleme: [
        'Vendre par messages fonctionne tant que le catalogue tient dans une conversation. Au-delà de cent références, un client ne peut plus parcourir l’offre seul, et chaque question sur un parfum devient un échange de plus.',
        'Côté gestion, le même canal ne dit rien de ce qui a été vendu, encaissé ou dépensé : il fallait un outil pour tenir les chiffres de l’activité, pas seulement une vitrine.',
      ],
      reponse: [
        'Une boutique qui présente toute l’offre, par marque et par parfum, avec une fiche par référence et une commande qui nomme déjà le parfum voulu.',
        'Derrière, un espace de gestion privé, installable sur téléphone, qui suit l’activité de bout en bout : le client, la vente, le lot d’achat auquel elle se rattache, l’encaissement, et la comptabilité qui en découle.',
      ],
      changements: [
        'Un client parcourt tout le catalogue seul, et arrive avec une demande qui nomme déjà le parfum voulu.',
        'Chaque vente est rattachée à un lot d’achat : ce que coûte un lot et ce qu’il a rapporté se lisent au même endroit.',
        'Une vente, un encaissement et une dépense sont saisis au moment où ils ont lieu, depuis le téléphone.',
        'Une référence ajoutée ou retirée l’est par le commerçant, directement.',
      ],
      resultatsMesures: [],
      cotes: [
        {
          titre: 'Côté client',
          fonctionnalites: [
            'Catalogue complet, avec recherche, filtres par gamme et tri',
            'Une page par marque et une fiche par parfum',
            'Commande depuis chaque fiche, le parfum déjà nommé',
            'Affichage clair ou sombre, au choix du visiteur',
          ],
          ecrans: [NUREA.accueil, NUREA.fiche, NUREA.ficheMobile],
        },
        {
          titre: 'Côté gestion',
          fonctionnalites: [
            'Caisse sur téléphone : vendre, encaisser, suivre la journée',
            'Fiches clients et historique de leurs commandes',
            'Lots d’achat, avec leurs dépenses et les ventes rattachées',
            'Comptabilité, journal et export, statistiques de vente',
            'Catalogue, marques et publication des références',
          ],
          ecrans: [NUREA.tableau, NUREA.gestionAccueil, NUREA.caisse],
        },
      ],
      technique: ['Next.js', 'PostgreSQL', 'Prisma', 'Application installable'],
    },
  },
  {
    id: 'magda-mania',
    nom: 'Magda Mania',
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
    metier: 'Pâtisserie',
    promesse:
      'Le coût de revient de chaque tarte, les commandes des particuliers et des restaurants, la comptabilité : toute la pâtisserie tient dans un téléphone.',
    livrables: ['application mobile de production', 'fiches techniques', 'commandes', 'comptabilité'],
    accrochage: {
      large: [
        { ecran: E1D.fiche, legende: 'La fiche d’une tarte' },
        { ecran: E1D.production, legende: 'La production du jour' },
        { ecran: E1D.compta, legende: 'Le bilan du mois' },
      ],
      etroit: [
        { ecran: E1D.fiche, legende: 'La fiche technique' },
        { ecran: E1D.production, legende: 'La production' },
      ],
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
      reponse: [
        'Une application mobile, installable, construite autour de la fiche technique : des ingrédients avec leur prix d’achat, des bases maison (pâte sucrée, caramel, crème d’amande) assemblées en desserts, et un coût de revient recalculé à chaque changement.',
        'Autour, les commandes avec leur statut, et une comptabilité qui enregistre chaque vente au moment de la livraison, figée à son prix du jour.',
      ],
      changements: [
        'Avant de fixer un prix, on voit la marge qu’il laisse, pour un particulier comme pour un restaurant.',
        'Quand un ingrédient augmente, chaque fiche qui l’utilise est recalculée : l’effet sur la marge se voit tout de suite.',
        'Une commande livrée devient une vente comptable, avec le prix du jour : l’historique ne bouge plus.',
        'Le bilan du mois se lit sur le téléphone, sans tableur.',
      ],
      resultatsMesures: [],
      cotes: [
        {
          titre: 'La production',
          fonctionnalites: [
            'Ingrédients avec prix d’achat, par catégorie',
            'Bases maison assemblées en fiches desserts',
            'Coût de revient et marge recalculés à chaque grammage',
            'Prix particulier et prix professionnel par dessert',
          ],
          ecrans: [E1D.fiche, E1D.ingredients],
        },
        {
          titre: 'Les commandes et la compta',
          fonctionnalites: [
            'Commandes avec statut : en attente, prête, livrée',
            'Rappels sur le téléphone avant une livraison',
            'La livraison enregistre la vente en comptabilité',
            'Chiffre d’affaires, bénéfice net et marges par période',
            'Données synchronisées, installable comme une application',
          ],
          ecrans: [E1D.commandes, E1D.production, E1D.compta],
        },
      ],
      technique: ['React', 'TypeScript', 'Supabase', 'Application installable'],
    },
  },
  {
    id: 'conciergerie-nurea',
    nom: 'Conciergerie Nuréa',
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
