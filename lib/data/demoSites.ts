export type DemoSite = {
  slug: string;
  sector: string;
  tagline: string;
  highlights: string[];
  seoSnippet: string;
  competencies: Array<{
    key: 'design' | 'conversion' | 'seo' | 'quality';
    title: string;
    bullets: string[];
    badgeClass: string; // tailwind className
  }>;
  theme: {
    badge: string; // className
    mockBg: string; // className
  };
};

export const DEMO_SITES: DemoSite[] = [
  {
    slug: 'restauration-rapide',
    sector: 'Restauration rapide',
    tagline: 'De “je regarde” à “je commande” — en mobile, sans friction.',
    highlights: [
      'Hero ultra clair + menu visible en 1 écran',
      'CTA commande en sticky context (mobile)',
      'Bloc “horaires & retrait” optimisé pour le local',
    ],
    seoSnippet:
      'Maquette de site restauration rapide pensée pour convertir depuis les recherches locales (horaires, retrait, menu).',
    competencies: [
      {
        key: 'conversion',
        title: 'Conversion mobile',
        bullets: [
          'CTA “commander” visible sans chercher',
          'Friction réduite (menus + étapes courtes)',
          'Rassurance rapide (horaires, retrait, FAQ courte)',
        ],
        badgeClass: 'bg-orange text-white',
      },
      {
        key: 'design',
        title: 'Design UI',
        bullets: [
          'Hiérarchie typographique brutale et lisible',
          'Cartes structurées (pas de bloc “fourre-tout”)',
          'Contraste navy/orange cohérent',
        ],
        badgeClass: 'bg-navy text-white',
      },
      {
        key: 'seo',
        title: 'SEO & Performance',
        bullets: [
          'Contenu local indexable (horaires, retrait)',
          'Structure de page claire (H1/H2 cohérents)',
          'UI légère : maquette sans assets lourds',
        ],
        badgeClass: 'bg-navy/10 text-navy border-2 border-navy',
      },
      {
        key: 'quality',
        title: 'Qualité & Tests',
        bullets: [
          'Comportements mobile vérifiés (header, modal, CTA)',
          'Accès clavier : fermeture modal (Esc)',
          'Stabilité layout : pas de “jumps” sur scroll',
        ],
        badgeClass: 'bg-cream text-navy border-2 border-navy',
      },
    ],
    theme: {
      badge: 'bg-orange text-white',
      mockBg: 'bg-orange/5',
    },
  },
  {
    slug: 'cabinet-avocat',
    sector: 'Cabinet d’avocat',
    tagline: 'La confiance avant tout — structure crédible + prise de rendez-vous.',
    highlights: [
      'Page offre rassurante (process, expertise, délais)',
      'CTA RDV “sans jargon”',
      'Contenu éditorial orienté questions-réponses',
    ],
    seoSnippet:
      'Maquette cabinet d’avocat centrée conversion : confiance, clarté, et parcours de prise de rendez-vous.',
    competencies: [
      {
        key: 'design',
        title: 'Design UI (confiance)',
        bullets: [
          'Ton éditorial premium + contrastes contrôlés',
          'Grilles lisibles (mobile-first)',
          'Densité maîtrisée : pas de surcharge visuelle',
        ],
        badgeClass: 'bg-navy text-white',
      },
      {
        key: 'conversion',
        title: 'Parcours & RDV',
        bullets: [
          'CTA RDV évident (sans “chasse au bouton”)',
          'Structure “questions → réponses”',
          'Réduction d’anxiété : délais + process expliqués',
        ],
        badgeClass: 'bg-orange text-white',
      },
      {
        key: 'seo',
        title: 'SEO local',
        bullets: [
          'Sections indexables orientées intention',
          'Pages “offres” structurées pour attirer la bonne requête',
          'Copy humaine + sémantique propre',
        ],
        badgeClass: 'bg-navy/10 text-navy border-2 border-navy',
      },
      {
        key: 'quality',
        title: 'Qualité & Tests',
        bullets: [
          'Accords & interactions contrôlés',
          'Vérifications Playwright multi-viewport',
          'Prévention des bugs d’overlay (modal + focus)',
        ],
        badgeClass: 'bg-cream text-navy border-2 border-navy',
      },
    ],
    theme: {
      badge: 'bg-navy text-white',
      mockBg: 'bg-navy/5',
    },
  },
  {
    slug: 'dentaire',
    sector: 'Dentaire / médical',
    tagline: 'Un parcours patient net — horaires, urgences et explications simples.',
    highlights: [
      'Hero “prise de rendez-vous”',
      'Sections services lisibles (mobile-first)',
      'Bloc urgence + contact direct',
    ],
    seoSnippet:
      'Maquette médicale pensée pour réduire la friction : urgences, horaires, parcours patient et contact rapide.',
    competencies: [
      {
        key: 'conversion',
        title: 'Parcours patient',
        bullets: [
          'CTA “RDV” + contact direct',
          'Infos critiques en haut (horaires/urgences)',
          'Hiérarchie visuelle pour guider le geste',
        ],
        badgeClass: 'bg-orange text-white',
      },
      {
        key: 'design',
        title: 'Design UI (clarté)',
        bullets: [
          'Typographie lisible sur petits écrans',
          'Contrastes navy/orange adaptés à la lecture',
          'Espacements réguliers (pas d’impression d’écran “cassé”)',
        ],
        badgeClass: 'bg-navy text-white',
      },
      {
        key: 'seo',
        title: 'SEO & contenu utile',
        bullets: [
          'Structure sémantique (H1/H2/H3 propres)',
          'Sections par intention (soins, urgences, accès)',
          'Micro-copy rassurante et indexable',
        ],
        badgeClass: 'bg-navy/10 text-navy border-2 border-navy',
      },
      {
        key: 'quality',
        title: 'Tests & robustesse',
        bullets: [
          'Vérification des composants interactifs',
          'Comportements overlay cohérents',
          'Stabilité mobile (header fixe + scroll)',
        ],
        badgeClass: 'bg-cream text-navy border-2 border-navy',
      },
    ],
    theme: {
      badge: 'bg-orange text-white',
      mockBg: 'bg-orange/5',
    },
  },
  {
    slug: 'services-locaux',
    sector: 'Services locaux',
    tagline: 'Urgence ? On vous trouve. Puis on vous appelle.',
    highlights: [
      'CTA “Appeler maintenant” bien visible',
      'SEO local : zone + pages d’intention',
      'Preuves visuelles (process) + devis rapide',
    ],
    seoSnippet:
      'Maquette services locaux orientée SEO local et conversion : appel, devis, et zones couvertes.',
    competencies: [
      {
        key: 'seo',
        title: 'SEO local',
        bullets: [
          'Zones couvertes + pages d’intention',
          'Contenu orienté “problème → solution”',
          'Sémantique propre pour remonter sur mobile',
        ],
        badgeClass: 'bg-navy/10 text-navy border-2 border-navy',
      },
      {
        key: 'conversion',
        title: 'Action rapide',
        bullets: [
          'CTA appel/devis en 1 écran',
          'Réassurance (délai, méthode, contact)',
          'Micro-parcours pour transformer l’urgence',
        ],
        badgeClass: 'bg-orange text-white',
      },
      {
        key: 'design',
        title: 'Design UI (impact)',
        bullets: [
          'Grilles simples + typographie forte',
          'Bordures “brutal” pour ancrer la marque',
          'Densité utile, pas décorative',
        ],
        badgeClass: 'bg-navy text-white',
      },
      {
        key: 'quality',
        title: 'Qualité & Tests',
        bullets: [
          'Vérification mobile des CTA',
          'Modal accessible (Esc + overlay click)',
          'Pas de dépendance lourde : perf stable',
        ],
        badgeClass: 'bg-cream text-navy border-2 border-navy',
      },
    ],
    theme: {
      badge: 'bg-navy text-white',
      mockBg: 'bg-navy/5',
    },
  },
] as const;

