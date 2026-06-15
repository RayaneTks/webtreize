export const CAPABILITY_MARQUEE = [
  'Sites sur mesure',
  'SEO local Marseille',
  'Fiche Google Business',
  'Applications métier',
  'Core Web Vitals',
  'Design system',
  'Next.js 16',
  'Audit gratuit 48h',
] as const;

export const PAIN_POINTS = [
  {
    title: 'Invisible sur Google',
    body: 'Vos concurrents apparaissent en premier. Vous perdez des clients avant même le premier contact.',
  },
  {
    title: 'Un site qui ne convertit pas',
    body: 'Beau sur le papier, muet en ligne. Pas de parcours clair, pas de prise de contact simple.',
  },
  {
    title: 'Des outils qui ne suivent pas',
    body: 'Tableurs, WhatsApp, notes éparpillées. Votre activité grandit, vos process restent artisanaux.',
  },
] as const;

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

export const COMMITMENTS = [
  {
    title: 'Délais contractuels',
    body: 'Chaque phase est datée. Retard = pénalités inscrites au contrat.',
  },
  {
    title: 'Propriété totale',
    body: 'Votre site, votre code, vos accès. Aucun abonnement forcé pour récupérer ce qui est à vous.',
  },
  {
    title: 'Zéro template',
    body: 'Chaque interface est conçue pour votre activité, pas pour une démo générique.',
  },
] as const;

export const METHOD_STEPS = [
  {
    title: 'Diagnostic',
    body: 'Marché, concurrence, objectifs. On cartographie avant de produire.',
  },
  {
    title: 'Stratégie',
    body: 'Architecture, priorisation, roadmap. Chaque choix est argumenté.',
  },
  {
    title: 'Ingénierie',
    body: 'Design et développement en cycles courts, validation à chaque livrable.',
  },
  {
    title: 'Mise en ligne',
    body: 'Déploiement, formation, suivi. Opérationnel dès le jour J.',
  },
] as const;

export const PROOF_STAT = {
  value: '+75%',
  label: 'de visibilité gagnée en moyenne',
  note: 'Mesuré en moyenne sur nos accompagnements visibilité, dans les 90 jours suivant la mise en œuvre.',
} as const;

export const PROOF_POINTS = [
  'Délais inscrits au contrat, pénalités si retard',
  'Design unique sur chaque projet, aucun template réutilisé',
  'Votre site vous appartient dès le premier jour',
] as const;
