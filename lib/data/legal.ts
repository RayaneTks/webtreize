import { CONTACT_EMAIL, CONTENT_PUBLISHED_AT, SITE_URL } from '@/lib/constants';

/**
 * Contenu des trois pages légales.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * RÈGLE DE RÉDACTION — à lire avant toute modification.
 *
 * Rien n’est inventé. Les seuls trous laissés dans le texte sont les faits que
 * personne d’autre que le studio ne peut connaître : raison sociale, forme
 * juridique, capital, SIREN, adresse du siège, TVA, directeur de la publication,
 * hébergeur, tribunal compétent. Ils portent tous le marqueur
 * « [[À COMPLÉTER : … ]] » et sont récapitulés dans `LEGAL_TODO`.
 *
 * Un marqueur laissé en ligne vaut mieux qu’une donnée plausible : une mention
 * légale fausse expose davantage qu’une mention incomplète, et c’est la seule
 * page où un prospect vérifie que l’entreprise existe.
 *
 * Tout le reste est rédigé : les obligations tiennent de la loi (LCEN art. 6-III,
 * RGPD art. 13, code de commerce art. L441-10) ou de faits vérifiables dans ce
 * dépôt — quatre champs collectés, un seul sous-traitant, aucun cookie.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** Les trois seuls documents publiés. `generateStaticParams` s’y branche. */
export const LEGAL_SLUGS = ['mentions-legales', 'politique-confidentialite', 'cgv'] as const;

export type LegalSlug = (typeof LEGAL_SLUGS)[number];

/** Chemin d’une page légale, compatible avec les routes typées. */
export type LegalHref = `/legal/${LegalSlug}`;

export type LegalSection = {
  /** Destiné à un `h2`. */
  readonly heading: string;
  readonly paragraphs?: readonly string[];
  readonly bullets?: readonly string[];
};

export type LegalDocument = {
  readonly slug: LegalSlug;
  /** Titre de la page, rendu en `h1` et repris dans les métadonnées. */
  readonly title: string;
  readonly description: string;
  /** Date ISO de dernière révision du texte. */
  readonly updatedAt: string;
  readonly sections: readonly LegalSection[];
};

/** Domaine affiché en clair dans les textes, sans le protocole. */
const SITE_HOST = SITE_URL.replace(/^https?:\/\//, '');

/* -------------------------------------------------------------------------- */
/* Mentions légales — LCEN art. 6-III                                          */
/* -------------------------------------------------------------------------- */

const MENTIONS_LEGALES: LegalDocument = {
  slug: 'mentions-legales',
  title: 'Mentions légales',
  description: `Éditeur, directeur de la publication, hébergeur et propriété intellectuelle du site ${SITE_HOST}.`,
  updatedAt: CONTENT_PUBLISHED_AT,
  sections: [
    {
      heading: 'Éditeur du site',
      paragraphs: [
        'Le site ' + SITE_HOST + ' est édité par [[À COMPLÉTER : dénomination sociale]], [[À COMPLÉTER : forme juridique]] au capital de [[À COMPLÉTER : montant du capital social]], dont le siège social est situé [[À COMPLÉTER : adresse complète du siège]].',
        'WebTreize est un studio de conception de sites, de référencement local et d’outils métier, installé à Marseille.',
      ],
      bullets: [
        'Immatriculation : [[À COMPLÉTER : numéro SIREN et ville du greffe d’immatriculation au RCS]]',
        'Numéro de TVA intracommunautaire : [[À COMPLÉTER : numéro de TVA, ou la mention « TVA non applicable, article 293 B du code général des impôts » si le studio relève de la franchise en base]]',
        'Courriel : ' + CONTACT_EMAIL,
        'Téléphone : [[À COMPLÉTER : numéro de téléphone professionnel, si le studio choisit d’en publier un]]',
      ],
    },
    {
      heading: 'Directeur de la publication',
      paragraphs: [
        'Le directeur de la publication est [[À COMPLÉTER : nom et prénom du représentant légal]], en sa qualité de [[À COMPLÉTER : fonction du représentant légal]].',
      ],
    },
    {
      heading: 'Hébergement',
      paragraphs: [
        'Le site est hébergé par [[À COMPLÉTER : dénomination sociale de l’hébergeur]], dont le siège est situé [[À COMPLÉTER : adresse de l’hébergeur]], joignable au [[À COMPLÉTER : téléphone de l’hébergeur]].',
        'L’hébergeur assure la mise à disposition du site. Il n’intervient ni sur son contenu ni sur les demandes qui nous sont adressées.',
      ],
    },
    {
      heading: 'Propriété intellectuelle',
      paragraphs: [
        'Les textes, la charte graphique, la structure et le code de ce site sont la propriété de l’éditeur. Toute reproduction, adaptation ou diffusion, totale ou partielle, sans autorisation écrite préalable, est interdite.',
        'Les photographies publiées sur ce site : [[À COMPLÉTER : auteur des photographies et licence d’utilisation, ou mention indiquant qu’elles sont la propriété de l’éditeur]].',
        'Le code livré à un client lui est cédé dans les conditions prévues aux conditions générales de vente. Les bibliothèques libres utilisées restent régies par leurs licences respectives.',
      ],
    },
    {
      heading: 'Données personnelles',
      paragraphs: [
        'Le formulaire de contact collecte quatre informations et rien d’autre. Leur traitement est décrit en détail dans la politique de confidentialité, accessible depuis le pied de page.',
      ],
    },
    {
      heading: 'Accessibilité',
      paragraphs: [
        'Ce site est conçu pour atteindre le niveau AA des règles WCAG 2.2 : contrastes vérifiés, navigation au clavier complète, contenu lisible sans JavaScript. Aucun audit externe n’a été commandé à ce jour, et cette page ne prétend donc à aucune certification.',
        'Si une information de ce site vous reste inaccessible, écrivez-nous à ' +
          CONTACT_EMAIL +
          ' : nous corrigeons et nous vous transmettons l’information par un autre moyen entre-temps.',
      ],
    },
    {
      heading: 'Signalement d’un contenu',
      paragraphs: [
        `Pour signaler un contenu que vous estimez illicite, ou pour toute demande relative à ces mentions, écrivez à ${CONTACT_EMAIL} en précisant l’adresse de la page concernée.`,
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* Politique de confidentialité — RGPD art. 13                                 */
/* -------------------------------------------------------------------------- */

const POLITIQUE_CONFIDENTIALITE: LegalDocument = {
  slug: 'politique-confidentialite',
  title: 'Politique de confidentialité',
  description:
    'Ce que le formulaire de contact collecte, pourquoi, qui le reçoit, combien de temps nous le conservons, et comment faire supprimer vos données.',
  updatedAt: CONTENT_PUBLISHED_AT,
  sections: [
    {
      heading: 'En deux phrases',
      paragraphs: [
        'Ce site ne dépose aucun cookie, ne mesure pas son audience et ne suit personne. La seule collecte de données est le formulaire de contact : quatre champs, un seul destinataire, et une suppression sur simple demande.',
      ],
    },
    {
      heading: 'Qui est responsable du traitement',
      paragraphs: [
        'Le responsable du traitement est [[À COMPLÉTER : dénomination sociale]], dont le siège est situé [[À COMPLÉTER : adresse complète du siège]].',
        'Pour toute question relative à vos données, une seule adresse : ' + CONTACT_EMAIL + '.',
        'Le studio n’est pas tenu de désigner un délégué à la protection des données : il n’effectue ni suivi à grande échelle, ni traitement de données sensibles. Vos demandes sont traitées directement par la personne qui vous répond.',
      ],
    },
    {
      heading: 'Les données que nous collectons',
      paragraphs: [
        'Le formulaire de contact est le seul endroit du site où vous saisissez quelque chose. Il demande :',
      ],
      bullets: [
        'votre nom, pour savoir à qui nous répondons ;',
        'votre adresse électronique, qui est le canal de réponse ;',
        'votre numéro de téléphone, facultatif, si vous préférez que nous vous appelions ;',
        'votre message.',
      ],
    },
    {
      heading: 'Ce que nous ne demandons pas',
      paragraphs: [
        'Ni adresse postale, ni budget, ni taille d’entreprise, ni secteur d’activité. Aucune case pré-cochée, aucune inscription à une lettre d’information dissimulée dans l’envoi.',
        'Deux éléments techniques accompagnent l’envoi sans jamais être conservés : l’heure d’affichage du formulaire et un champ leurre invisible, tous deux destinés à écarter les envois automatisés. Votre adresse IP est retenue en mémoire vive pendant dix minutes, uniquement pour limiter le nombre d’envois par visiteur ; elle n’est écrite sur aucun disque et disparaît au redémarrage du serveur.',
      ],
    },
    {
      heading: 'Pourquoi nous les collectons',
      paragraphs: [
        'Une seule finalité : vous répondre, puis, si vous le souhaitez, préparer un devis. Vos données ne servent à rien d’autre.',
        'Elles ne sont ni vendues, ni louées, ni cédées, ni utilisées pour de la prospection, ni versées à un outil de publicité, ni exploitées pour établir un profil.',
      ],
    },
    {
      heading: 'Sur quelle base légale',
      paragraphs: [
        'Le traitement repose sur l’article 6.1.b du RGPD : l’exécution de mesures précontractuelles prises à votre demande. Vous nous écrivez pour obtenir une réponse, nous traitons vos données pour vous la donner.',
        'Le nom, l’adresse électronique et le message sont nécessaires : sans eux, nous ne pouvons pas répondre. Le téléphone est facultatif et son absence ne change rien à notre réponse.',
      ],
    },
    {
      heading: 'Qui reçoit vos données',
      paragraphs: [
        'Votre message est lu par le studio, et par personne d’autre. Deux prestataires techniques interviennent, en qualité de sous-traitants au sens de l’article 28 du RGPD :',
      ],
      bullets: [
        'Resend, Inc., aux États-Unis, qui achemine le courriel contenant votre demande ;',
        'l’hébergeur du site, [[À COMPLÉTER : dénomination et pays d’hébergement]], qui héberge les pages et conserve les journaux techniques du serveur.',
      ],
    },
    {
      heading: 'Transfert hors de l’Union européenne',
      paragraphs: [
        'L’acheminement du courriel par Resend implique un transfert de vos données vers les États-Unis. Ce transfert est encadré par [[À COMPLÉTER : mécanisme de transfert retenu — clauses contractuelles types de la Commission européenne ou certification Data Privacy Framework — tel qu’il figure à l’accord de sous-traitance signé avec Resend]].',
        `Une copie de cet accord peut vous être communiquée sur demande à ${CONTACT_EMAIL}.`,
      ],
    },
    {
      heading: 'Combien de temps nous les conservons',
      bullets: [
        'Demande restée sans suite : trois ans à compter de notre dernier échange, conformément à la recommandation de la CNIL en matière de prospection. Passé ce délai, le message et vos coordonnées sont supprimés.',
        'Demande devenue un contrat : les pièces liées à la relation commerciale sont conservées dix ans, en application de l’obligation comptable de l’article L123-22 du code de commerce.',
        'Adresse IP retenue pour la limitation des envois : dix minutes, en mémoire vive.',
        'Journaux techniques du serveur : [[À COMPLÉTER : durée de conservation des journaux appliquée par l’hébergeur]].',
      ],
    },
    {
      heading: 'Cookies et mesure d’audience',
      paragraphs: [
        'Ce site ne dépose aucun cookie, pas même un cookie de mesure d’audience. Il n’utilise ni Google Analytics, ni aucun autre outil de statistiques, ni pixel publicitaire, ni bouton de réseau social chargé depuis un serveur tiers. Les polices de caractères sont servies depuis notre propre domaine.',
        'C’est la raison pour laquelle vous ne voyez aucun bandeau de consentement : il n’y a rien à consentir.',
      ],
    },
    {
      heading: 'Vos droits',
      paragraphs: [
        'Le RGPD vous reconnaît sur vos données les droits suivants :',
      ],
      bullets: [
        'accéder aux données que nous détenons sur vous et en obtenir une copie ;',
        'les faire rectifier si elles sont inexactes ;',
        'en demander l’effacement ;',
        'demander la limitation de leur traitement ;',
        'vous opposer à leur traitement ;',
        'en demander la portabilité, dans un format lisible par machine ;',
        'définir des directives sur leur sort après votre décès, en application de l’article 85 de la loi Informatique et Libertés.',
      ],
    },
    {
      heading: 'Comment les exercer',
      paragraphs: [
        `Écrivez à ${CONTACT_EMAIL}. Une demande de suppression est exécutée sans discussion et sans contrepartie. Nous vous répondons dans un délai d’un mois, comme le prévoit l’article 12.3 du RGPD, et nous vous confirmons par écrit ce qui a été fait.`,
        'Aucune pièce d’identité ne vous est demandée pour une demande émise depuis l’adresse électronique que vous nous aviez communiquée.',
      ],
    },
    {
      heading: 'Réclamation auprès de la CNIL',
      paragraphs: [
        'Si notre réponse ne vous satisfait pas, vous pouvez introduire une réclamation auprès de la Commission nationale de l’informatique et des libertés : 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07, ou en ligne sur cnil.fr.',
      ],
    },
    {
      heading: 'Sécurité',
      paragraphs: [
        'Le site est servi exclusivement en HTTPS et porte des en-têtes de sécurité stricts, dont une politique de sécurité du contenu qui interdit tout appel à un domaine tiers. Le contenu de vos messages n’est jamais écrit dans les journaux du serveur, ni en production ni en développement. Le nombre d’envois par visiteur est limité afin d’écarter les robots.',
      ],
    },
    {
      heading: 'Modifications de cette politique',
      paragraphs: [
        'Cette politique peut évoluer, notamment si un nouveau prestataire technique intervient. La date de dernière mise à jour figure en tête de page. Aucune modification n’est appliquée rétroactivement à des données déjà collectées sans vous en informer.',
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* Conditions générales de vente                                               */
/* -------------------------------------------------------------------------- */

const CGV: LegalDocument = {
  slug: 'cgv',
  title: 'Conditions générales de vente',
  description:
    'Devis, périmètre, délais, prix, paiement, propriété du code et responsabilités des prestations WebTreize.',
  updatedAt: CONTENT_PUBLISHED_AT,
  sections: [
    {
      heading: 'Objet et champ d’application',
      paragraphs: [
        'Les présentes conditions régissent les prestations de conception de sites internet, de référencement local et de développement d’outils métier fournies par [[À COMPLÉTER : dénomination sociale]], ci-après « le studio », à ses clients, ci-après « le client ».',
        'Elles s’appliquent à toute commande. En cas de contradiction, le devis signé prévaut sur les présentes conditions, et les présentes conditions prévalent sur les conditions d’achat du client.',
      ],
    },
    {
      heading: 'Devis et commande',
      paragraphs: [
        'Toute prestation fait l’objet d’un devis écrit et gratuit, détaillé ligne par ligne. Le devis est valable trente jours à compter de son émission.',
        'La commande est formée par la signature du devis et par le versement de l’acompte qui y est indiqué. Aucun travail n’est engagé avant ces deux éléments.',
      ],
    },
    {
      heading: 'Ce qui est livré',
      paragraphs: [
        'Le périmètre de la prestation est décrit au devis. Il indique les livrables, les pages ou fonctionnalités prévues, et ce qui est explicitement exclu.',
        'Toute demande sortant de ce périmètre fait l’objet d’un avenant chiffré, accepté par écrit avant exécution. Le studio ne facture jamais un travail que le client n’a pas validé au préalable.',
      ],
    },
    {
      heading: 'Délais',
      paragraphs: [
        'Le calendrier est établi phase par phase dans le devis, avec une date pour chaque livraison.',
        'Les délais courent à compter de la réception des contenus, des accès et des validations attendus du client. Un retard du client dans la fourniture de ces éléments décale les dates suivantes d’autant, sans que le studio en soit responsable.',
        'Lorsque le retard est imputable au studio, la contrepartie due au client est écrite au devis, avec son mode de calcul et son plafond. Elle est portée à la connaissance du client avant la signature.',
      ],
    },
    {
      heading: 'Obligations du client',
      bullets: [
        'désigner un interlocuteur unique habilité à valider ;',
        'fournir les contenus, images, accès et informations nécessaires dans les délais convenus ;',
        'garantir qu’il détient les droits sur les éléments qu’il transmet, et garantir le studio contre toute réclamation d’un tiers à ce titre ;',
        'formuler ses retours de façon groupée à chaque étape de validation.',
      ],
    },
    {
      heading: 'Prix et paiement',
      paragraphs: [
        'Les prix sont exprimés en euros et hors taxes. Le régime de TVA applicable est celui indiqué au devis : [[À COMPLÉTER : régime de TVA du studio]].',
        'L’échéancier — acompte, versements intermédiaires, solde — est fixé au devis. Les factures sont payables à trente jours à compter de leur date d’émission, sans que ce délai puisse dépasser le maximum légal.',
        'Tout retard de paiement entraîne de plein droit, sans mise en demeure préalable, des pénalités calculées au taux d’intérêt légal majoré de dix points, ainsi que l’indemnité forfaitaire pour frais de recouvrement de 40 €, conformément à l’article L441-10 du code de commerce. Une indemnisation complémentaire peut être réclamée sur justificatifs.',
      ],
    },
    {
      heading: 'Propriété des livrables',
      paragraphs: [
        'Les droits d’exploitation sur les livrables sont cédés au client au jour du paiement intégral du prix. Jusqu’à ce paiement, le studio en demeure propriétaire.',
        'Une fois le solde réglé, le client dispose du code source, des accès, du nom de domaine et des comptes créés pour lui. Aucun abonnement, aucune redevance et aucune formalité ne conditionnent la conservation de ce qui lui a été livré.',
        'Les composants libres intégrés aux livrables restent régis par leurs licences propres, dont la liste est remise avec le projet.',
      ],
    },
    {
      heading: 'Hébergement, maintenance et abonnements',
      paragraphs: [
        'L’hébergement, la maintenance et le suivi ne sont jamais inclus d’office : ils font l’objet d’une ligne distincte au devis ou d’un contrat séparé, résiliable indépendamment.',
        'La fin d’un contrat de maintenance n’emporte aucune conséquence sur la propriété des livrables déjà réglés.',
      ],
    },
    {
      heading: 'Référencement : une obligation de moyens',
      paragraphs: [
        'Les prestations de référencement sont soumises à une obligation de moyens et non de résultat. Le studio ne contrôle ni les algorithmes des moteurs de recherche, ni l’activité des concurrents, ni les modifications que le client apporte à son site après livraison.',
        'Aucune position, aucun volume de trafic et aucun nombre de contacts ne sont garantis. Les engagements du studio portent sur les travaux réalisés, décrits au devis, et sur le compte rendu chiffré qui en est fait.',
      ],
    },
    {
      heading: 'Responsabilité',
      paragraphs: [
        'La responsabilité du studio est limitée aux dommages directs et prévisibles, et ne peut excéder le montant des sommes effectivement versées par le client au titre de la prestation concernée.',
        'Sont exclus les dommages indirects, notamment la perte de chiffre d’affaires, la perte de clientèle, la perte de données non sauvegardées par le client et le préjudice d’image.',
        'Le studio n’est pas responsable des interruptions imputables à l’hébergeur, au fournisseur d’accès du client ou à un service tiers, ni des conséquences d’une modification du site effectuée sans lui.',
      ],
    },
    {
      heading: 'Confidentialité et références',
      paragraphs: [
        'Chaque partie s’engage à ne pas divulguer les informations non publiques dont elle a connaissance à l’occasion du projet.',
        'Le studio peut citer le nom du client et présenter le travail réalisé à titre de référence. Le client peut s’y opposer par écrit, à tout moment et sans motif : la référence est alors retirée.',
      ],
    },
    {
      heading: 'Résiliation',
      paragraphs: [
        'Chaque partie peut mettre fin au contrat en cas de manquement grave de l’autre, non réparé dans les quinze jours suivant une mise en demeure écrite.',
        'En cas de résiliation, les travaux réalisés jusqu’à la date d’effet sont dus, au prorata des phases engagées, et les livrables correspondants sont remis au client après leur règlement.',
      ],
    },
    {
      heading: 'Droit de rétractation',
      paragraphs: [
        'Les prestations sont destinées à des professionnels agissant dans le cadre de leur activité : le droit de rétractation ne s’applique pas en principe.',
        'Il s’applique en revanche, dans le délai de quatorze jours prévu par le code de la consommation, lorsque le client est un consommateur, ou lorsqu’il est un professionnel employant au plus cinq salariés et que le contrat conclu hors établissement n’entre pas dans le champ de son activité principale, conformément à l’article L221-3 du code de la consommation.',
      ],
    },
    {
      heading: 'Données personnelles',
      paragraphs: [
        'Le traitement des données transmises par le client au studio est décrit dans la politique de confidentialité.',
        'Lorsque la prestation conduit le studio à traiter des données personnelles pour le compte du client — formulaire, base de contacts, outil métier — un accord de sous-traitance conforme à l’article 28 du RGPD est signé avant la mise en service.',
      ],
    },
    {
      heading: 'Droit applicable et litiges',
      paragraphs: [
        'Les présentes conditions sont soumises au droit français.',
        'En cas de différend, les parties s’engagent à rechercher une solution amiable avant toute action. Le client consommateur peut recourir gratuitement à un médiateur de la consommation : [[À COMPLÉTER : nom et coordonnées du médiateur de la consommation auquel le studio adhère]].',
        'À défaut d’accord, le litige est porté devant [[À COMPLÉTER : juridiction compétente — tribunal du ressort du siège du studio pour les litiges entre professionnels]].',
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */

export const LEGAL_DOCUMENTS: Record<LegalSlug, LegalDocument> = {
  'mentions-legales': MENTIONS_LEGALES,
  'politique-confidentialite': POLITIQUE_CONFIDENTIALITE,
  cgv: CGV,
};

/**
 * Liens du pied de page. Libellés courts : la colonne légale est une mention,
 * pas une invitation.
 */
export const LEGAL_LINKS = [
  { label: 'Mentions légales', href: '/legal/mentions-legales' },
  { label: 'Confidentialité', href: '/legal/politique-confidentialite' },
  { label: 'CGV', href: '/legal/cgv' },
] as const satisfies readonly { readonly label: string; readonly href: LegalHref }[];

export function isLegalSlug(slug: string): slug is LegalSlug {
  return (LEGAL_SLUGS as readonly string[]).includes(slug);
}

/**
 * Document correspondant à un segment d’URL, ou `undefined`.
 * La route appelle `notFound()` sur `undefined` : tout autre slug renvoyait
 * jusqu’ici un 200, ouvrant un espace d’URL infini (finding « seo-legal-slug-illimite »).
 */
export function getLegalDocument(slug: string): LegalDocument | undefined {
  if (!isLegalSlug(slug)) {
    return undefined;
  }

  return LEGAL_DOCUMENTS[slug];
}

export type LegalTodo = {
  readonly slug: LegalSlug;
  /** Ce qu’il faut fournir, en clair. */
  readonly label: string;
};

/**
 * Les seuls trous des trois documents, récapitulés.
 *
 * Chacun correspond à un marqueur « [[À COMPLÉTER : … ]] » présent dans le
 * texte. Aucun ne peut être comblé sans une information que seule l’entreprise
 * détient. Tant que cette liste n’est pas vide, les pages légales ne sont pas
 * conformes : elles sont honnêtes, ce qui n’est pas la même chose.
 */
export const LEGAL_TODO: readonly LegalTodo[] = [
  { slug: 'mentions-legales', label: 'Dénomination sociale et forme juridique' },
  { slug: 'mentions-legales', label: 'Montant du capital social' },
  { slug: 'mentions-legales', label: 'Adresse complète du siège social' },
  { slug: 'mentions-legales', label: 'Numéro SIREN et ville du greffe du RCS' },
  {
    slug: 'mentions-legales',
    label: 'Numéro de TVA intracommunautaire, ou mention de franchise en base',
  },
  { slug: 'mentions-legales', label: 'Numéro de téléphone professionnel, s’il est publié' },
  { slug: 'mentions-legales', label: 'Nom, prénom et fonction du directeur de la publication' },
  { slug: 'mentions-legales', label: 'Dénomination, adresse et téléphone de l’hébergeur' },
  { slug: 'mentions-legales', label: 'Auteur et licence des photographies publiées' },
  { slug: 'politique-confidentialite', label: 'Identité et adresse du responsable du traitement' },
  { slug: 'politique-confidentialite', label: 'Dénomination et pays d’hébergement du site' },
  {
    slug: 'politique-confidentialite',
    label: 'Mécanisme encadrant le transfert de données vers Resend, aux États-Unis',
  },
  {
    slug: 'politique-confidentialite',
    label: 'Durée de conservation des journaux techniques appliquée par l’hébergeur',
  },
  { slug: 'cgv', label: 'Dénomination sociale du studio' },
  { slug: 'cgv', label: 'Régime de TVA applicable' },
  { slug: 'cgv', label: 'Médiateur de la consommation auquel le studio adhère' },
  { slug: 'cgv', label: 'Juridiction compétente en cas de litige' },
];
