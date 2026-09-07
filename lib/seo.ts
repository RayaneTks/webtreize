import type { Metadata } from 'next';
import { CONTACT_EMAIL, SITE_URL, SNAPCHAT_URL } from '@/lib/constants';

/**
 * Source unique des métadonnées et des données structurées.
 *
 * Deux règles gouvernent ce fichier :
 * 1. Chaque page déclare son propre canonical absolu. Rien n’est hérité du
 *    layout racine : une valeur héritée déclare toutes les pages duplicatas
 *    de l’accueil.
 * 2. Rien n’est affirmé aux machines qui ne soit vérifiable. Pas de profil
 *    social non détenu, pas de compte X, pas de fourchette de prix, pas de
 *    coordonnées inventées.
 */

export const SITE_NAME = 'WebTreize';

export type PageKey = 'home' | 'services' | 'realisations' | 'about' | 'contact';

type PageDefinition = {
  /** Chemin absolu depuis la racine, sans barre oblique finale (« / » pour l’accueil). */
  path: string;
  /** Titre de la page, sans la marque : le gabarit « %s | WebTreize » l’ajoute. */
  title: string;
  /** Méta-description, 150 à 158 caractères. */
  description: string;
  /** Ligne de titre de l’image OpenGraph, en display très resserré. */
  ogTitle: string;
  /** Ligne d’appui de l’image OpenGraph, sous le titre. */
  ogSubtitle: string;
};

/**
 * Les quatre pages indexables du site. Les pages légales et la 404 passent par
 * `customMetadata` : elles sont en `noindex` et ne figurent pas au sitemap.
 */
export const PAGES: Record<PageKey, PageDefinition> = {
  home: {
    path: '/',
    title: 'Création de site web et SEO à Marseille (13)',
    description:
      'Studio digital à Marseille, nous créons des sites sur mesure, travaillons votre visibilité locale dans le 13 et outillons votre quotidien. Audit écrit.',
    ogTitle: 'Création de site web et référencement local à Marseille',
    ogSubtitle: 'Studio digital — Marseille et Bouches-du-Rhône',
  },
  services: {
    path: '/services',
    title: 'Site web, SEO local et outils métier à Marseille',
    description:
      'Création de site, référencement local, fiche Google et outils métier : nos quatre chantiers pour les commerces et les artisans de Marseille et de PACA.',
    ogTitle: 'Sites web, SEO local et outils métier',
    ogSubtitle: 'Quatre chantiers, un seul objectif — que vos clients vous trouvent',
  },
  realisations: {
    path: '/realisations',
    title: 'Réalisations : sites et outils livrés à Marseille',
    description:
      'Les sites et les outils métier que nous avons livrés à des commerces de Marseille : commande en ligne, catalogue, caisse et coût de revient. Adresses publiques.',
    ogTitle: 'Ce que nous avons livré',
    ogSubtitle: 'Des sites et des outils qui tournent, aujourd’hui',
  },
  about: {
    path: '/about',
    title: 'Le studio : un interlocuteur unique à Marseille',
    description:
      'Nous sommes un studio digital installé à Marseille. Un seul interlocuteur du premier échange à la mise en ligne, et un site dont vous gardez tous les accès.',
    ogTitle: 'Le studio, en clair',
    ogSubtitle: 'Un interlocuteur unique, du premier échange à la mise en ligne',
  },
  contact: {
    path: '/contact',
    title: 'Contact : votre projet de site web à Marseille',
    description:
      'Parlons de votre projet de site, de visibilité locale ou d’outil métier à Marseille. Décrivez votre situation en quelques lignes, nous répondons par écrit.',
    ogTitle: 'Parlons de votre projet',
    ogSubtitle: 'Studio digital à Marseille — Bouches-du-Rhône et PACA',
  },
};

/** Construit une URL absolue sur le domaine canonique. */
export function absoluteUrl(path: string): string {
  if (!path || path === '/') return SITE_URL;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Construit les métadonnées d’une page, canonical absolu compris. */
export function pageMetadata(key: PageKey): Metadata {
  const page = PAGES[key];
  const url = absoluteUrl(page.path);
  const socialTitle = `${page.title} | ${SITE_NAME}`;

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title: socialTitle,
      description: page.description,
      siteName: SITE_NAME,
      locale: 'fr_FR',
      // Pas d’`images` ici : Next attache automatiquement le fichier
      // `opengraph-image.tsx` de la route. Le déclarer le désactiverait.
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description: page.description,
    },
    robots: { index: true, follow: true },
  };
}

/** Métadonnées d’une route hors catalogue (légal, 404). */
export function customMetadata(opts: {
  path: string;
  title: string;
  description: string;
  noindex?: boolean;
}): Metadata {
  const url = absoluteUrl(opts.path);
  const socialTitle = `${opts.title} | ${SITE_NAME}`;

  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      url,
      title: socialTitle,
      description: opts.description,
      siteName: SITE_NAME,
      locale: 'fr_FR',
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description: opts.description,
    },
    // `follow: true` même en noindex : les liens sortants de ces pages
    // (notamment vers /contact) doivent continuer à transmettre du signal.
    robots: opts.noindex ? { index: false, follow: true } : { index: true, follow: true },
  };
}

/* -------------------------------------------------------------------------- */
/*  Données structurées                                                        */
/*                                                                            */
/*  Chaque fonction renvoie un document JSON-LD complet, prêt à être injecté   */
/*  dans un unique <script type="application/ld+json">. Les nœuds se           */
/*  référencent par « @id » : Google recompose le graphe même quand les blocs  */
/*  sont séparés. Une page n’injecte que les types dont elle affiche réellement */
/*  le contenu.                                                                */
/* -------------------------------------------------------------------------- */

const SCHEMA_CONTEXT = 'https://schema.org';

/** Identifiants stables des nœuds partagés. */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const STUDIO_ID = `${SITE_URL}/#studio`;
const ADDRESS_ID = `${SITE_URL}/#address`;
const LOGO_ID = `${SITE_URL}/#logo`;

/** Zone couverte, déclarée une seule fois et partagée par les deux entités. */
const AREA_SERVED = [
  { '@type': 'City', name: 'Marseille' },
  { '@type': 'AdministrativeArea', name: 'Bouches-du-Rhône' },
  { '@type': 'AdministrativeArea', name: 'Provence-Alpes-Côte d’Azur' },
];

/**
 * L’entité de marque. Injectée une seule fois, dans le layout racine.
 *
 * Ni `streetAddress`, ni `postalCode`, ni `telephone` : aucune de ces données
 * n’est publiable en l’état. Une adresse partielle vaut mieux qu’un code postal
 * générique (13000, non distribué) ou qu’un numéro inventé.
 */
export function organizationJsonLd(): object {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: SITE_NAME,
    alternateName: ['Web Treize', 'Webtreize'],
    url: SITE_URL,
    email: CONTACT_EMAIL,
    description: PAGES.home.description,
    foundingDate: '2024',
    logo: {
      '@type': 'ImageObject',
      '@id': LOGO_ID,
      url: `${SITE_URL}/icons/icon-512.png`,
      width: 512,
      height: 512,
      caption: SITE_NAME,
    },
    image: { '@id': LOGO_ID },
    address: {
      '@type': 'PostalAddress',
      '@id': ADDRESS_ID,
      addressLocality: 'Marseille',
      addressRegion: 'Provence-Alpes-Côte d’Azur',
      addressCountry: 'FR',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: CONTACT_EMAIL,
      contactType: 'customer service',
      areaServed: 'FR',
      availableLanguage: 'French',
    },
    areaServed: AREA_SERVED,
    // Uniquement des profils réellement détenus. Le domaine webtreize.fr a été
    // retiré : un second domaine racine en `sameAs` dédouble l’entité.
    sameAs: [SNAPCHAT_URL],
  };
}

/** Le site lui-même. Injecté une seule fois, dans le layout racine. */
export function websiteJsonLd(): object {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    description: PAGES.home.description,
    publisher: { '@id': ORGANIZATION_ID },
    inLanguage: 'fr-FR',
  };
}

/**
 * L’activité de service local. Réservée à l’accueil.
 *
 * L’adresse n’est pas redupliquée : elle est référencée par « @id » sur le nœud
 * porté par `organizationJsonLd`. Pas de `priceRange` (la FAQ refuse d’afficher
 * un prix) et pas de `geo` (aucune coordonnée vérifiable).
 */
export function professionalServiceJsonLd(): object {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'ProfessionalService',
    '@id': STUDIO_ID,
    name: SITE_NAME,
    url: SITE_URL,
    email: CONTACT_EMAIL,
    image: { '@id': LOGO_ID },
    parentOrganization: { '@id': ORGANIZATION_ID },
    address: { '@id': ADDRESS_ID },
    areaServed: AREA_SERVED,
    currenciesAccepted: 'EUR',
    knowsLanguage: 'fr-FR',
    serviceType: [
      'Création de site web',
      'Référencement local',
      'Fiche Google Business',
      'Outils métier sur mesure',
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  };
}

export type WebPageType = 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage';

/** Le nœud de page. Un par page, jamais dans le layout. */
export function webPageJsonLd(key: PageKey, type: WebPageType = 'WebPage'): object {
  const page = PAGES[key];
  const url = absoluteUrl(page.path);

  return {
    '@context': SCHEMA_CONTEXT,
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name: `${page.title} | ${SITE_NAME}`,
    description: page.description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORGANIZATION_ID },
    inLanguage: 'fr-FR',
  };
}

/**
 * Fil d’Ariane. Le premier élément du parcours est l’accueil.
 * À n’injecter que sur les pages qui affichent réellement un fil d’Ariane.
 */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]): object {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((step, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: step.name,
      item: absoluteUrl(step.path),
    })),
  };
}

/**
 * FAQ. À n’injecter que sur la page qui affiche les questions à l’écran :
 * un balisage sans contenu correspondant viole les règles de Google.
 */
export function faqJsonLd(items: readonly { q: string; a: string }[]): object {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'FAQPage',
    '@id': `${absoluteUrl(PAGES.home.path)}#faq`,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

/** Liste ordonnée des prestations affichées sur /services. */
export function serviceListJsonLd(
  services: readonly { title: string; description: string }[],
): object {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'ItemList',
    '@id': `${absoluteUrl(PAGES.services.path)}#services`,
    name: PAGES.services.ogTitle,
    numberOfItems: services.length,
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.title,
        description: service.description,
        serviceType: service.title,
        provider: { '@id': ORGANIZATION_ID },
        areaServed: AREA_SERVED,
      },
    })),
  };
}
