export const NAV_ITEMS = [
  { label: 'Approche', href: '#approche' },
  { label: "Ce qu'on fait", href: '#metier' },
  { label: 'Promesses', href: '#promesses' },
  { label: 'Questions', href: '#questions' },
] as const;

export const APPROACH = {
  quote: 'Nous ne livrons pas des sites. Nous livrons des clients qui vous trouvent.',
  emphasis: 'vous trouvent',
  body:
    "La plupart des entreprises perdent des clients avant même le premier bonjour : introuvables sur Google, un site qui ne dit pas quoi faire, des outils qui ne suivent plus. Nous partons de là, pas d'un gabarit.",
} as const;

/** Blocs texte / plaque alternés — un seul sujet par bloc. */
export const CRAFT_BLOCKS = [
  {
    id: 'site',
    eyebrow: 'Le site',
    title: 'Fait pour votre métier, pas pour un portfolio.',
    body:
      'On part de votre activité et de la façon dont vos clients vous appellent. Rapide sur téléphone, clair en trois secondes, et entièrement à vous : code, accès, nom de domaine.',
    plate: 'Capture — site client · 1600 × 1200',
  },
  {
    id: 'visibilite',
    eyebrow: 'La visibilité',
    title: "Être là au moment exact où l'on vous cherche.",
    body:
      "Fiche Google soignée, référencement local, avis suivis. La majorité de vos appels viennent d'une recherche faite à deux rues d'ici — c'est là qu'on travaille.",
    plate: 'Capture — fiche Google · 1600 × 1200',
  },
  {
    id: 'outils',
    eyebrow: 'Les outils',
    title: 'Votre quotidien, en un seul endroit.',
    body:
      'Devis, plannings, suivi de chantier, relances. On remplace le tableur et les notes éparpillées par un outil simple, taillé pour votre façon de travailler.',
    plate: 'Capture — outil métier · 1600 × 1200',
  },
] as const;

export const PROMISES = [
  {
    title: 'Des dates, pas des estimations',
    body: 'Chaque phase est datée au contrat. Un retard de notre côté, ce sont des pénalités de notre côté.',
  },
  {
    title: 'Tout vous appartient',
    body: 'Le code, les accès, le domaine. Aucun abonnement pour récupérer ce qui est déjà à vous.',
  },
  {
    title: 'Un seul interlocuteur',
    body: 'Vous parlez à la personne qui conçoit et qui développe. Pas à un intermédiaire, pas à un service.',
  },
] as const;

export const PROCESS_STEPS = [
  { title: 'On se rencontre', body: 'Votre métier, vos clients, ce qui marche déjà. On écoute avant de proposer.' },
  { title: 'On pose le plan', body: 'Priorités, calendrier, budget ligne par ligne. Vous validez avant qu\'on démarre.' },
  { title: 'On fabrique', body: "Vous voyez avancer chaque semaine. Rien n'est décidé sans vous le montrer." },
  { title: 'On met en ligne', body: 'Mise en ligne, prise en main ensemble, suivi les semaines qui suivent.' },
] as const;

export const AUDIT = {
  eyebrow: 'Premier pas',
  title: 'Commençons simplement.',
  body:
    'Vous nous parlez de votre activité. Nous regardons votre site et votre fiche Google, puis nous vous renvoyons par écrit ce qui vous freine et dans quel ordre le corriger.',
  delay: '48',
  delayUnit: 'heures',
  note: "Gratuit, et vous n'êtes engagé à rien.",
} as const;

/* --- Pages internes (/services) : conservé de la version précédente --- */

export const SERVICES = [
  {
    id: 'web',
    title: 'Sites web sur mesure',
    tag: 'Signature',
    description:
      'Vitrines et parcours de conversion pensés pour votre métier. Performance, SEO et design unique, sans template recyclé.',
    points: ['Architecture orientée conversion', 'Core Web Vitals au vert', 'Code que vous possédez'],
  },
  {
    id: 'seo',
    title: 'SEO et visibilité locale',
    description:
      'Référencement naturel, fiche Google Business, présence locale à Marseille et en PACA.',
    points: ['Audit technique complet', 'Stratégie locale 13', 'Suivi mesurable'],
  },
  {
    id: 'apps',
    title: 'Apps et outils métier',
    description:
      'Digitalisation de processus, MVP, tableaux de bord et automatisations sur mesure.',
    points: ['Stack moderne', 'Livraison itérative', 'Formation incluse'],
  },
] as const;

export const GOOGLE_BUSINESS_SERVICE = {
  id: 'google',
  title: 'Google Business Profile',
  description:
    'Votre fiche Google optimisée pour capter les recherches locales à Marseille et en PACA.',
  points: ['Profil structuré', 'Contenus réguliers', 'Cohérence NAP', 'Suivi des performances'],
} as const;
