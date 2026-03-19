import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Archivo_Black, DM_Sans } from 'next/font/google';
import { SITE_URL, CONTACT_EMAIL, SNAPCHAT_URL } from '@/lib/constants';
import { FAQ_ITEMS } from '@/lib/data/faq';

const archivoBlack = Archivo_Black({
  subsets: ['latin'],
  variable: '--font-display',
  weight: '400',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});


const META_DESCRIPTION =
  "WebTreize est une agence web à Marseille (13) spécialisée en création de sites web, SEO, optimisation Google Business et développement d'applications sur-mesure. Audit gratuit en 48h.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'WebTreize | Agence Web Marseille (13) | Création Site Web & SEO',
    template: '%s | WebTreize',
  },
  description: META_DESCRIPTION,
  keywords: [
    'WebTreize',
    'Web Treize',
    'Webtreize',
    'agence web Marseille',
    'agence digitale Marseille',
    'création site web Marseille',
    'SEO Marseille',
    'fiche Google Business',
    'application web sur mesure',
    'Web 13',
    'Agence 13',
    'agence web 13',
  ],
  alternates: { canonical: SITE_URL },
  icons: { icon: '/logo.svg', apple: '/logo.svg' },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'WebTreize | Agence Web Marseille (13)',
    description: META_DESCRIPTION,
    siteName: 'WebTreize',
    locale: 'fr_FR',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'WebTreize — Agence web Marseille' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WebTreize | Agence Web Marseille (13)',
    description: META_DESCRIPTION,
    creator: '@webtreize',
    images: [{ url: '/og-image.jpg', alt: 'WebTreize — Agence web Marseille' }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#001F3F',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'WebTreize',
      alternateName: ['Web Treize', 'Webtreize', 'Web13', 'WebTreize Agence', 'Agence Web 13'],
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.svg` },
      description: META_DESCRIPTION,
      foundingDate: '2024',
      email: CONTACT_EMAIL,
      contactPoint: {
        '@type': 'ContactPoint',
        email: CONTACT_EMAIL,
        contactType: 'customer service',
        availableLanguage: 'French',
      },
      areaServed: [
        { '@type': 'City', name: 'Marseille' },
        { '@type': 'Country', name: 'France' },
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Marseille',
        addressRegion: "Provence-Alpes-Côte d'Azur",
        postalCode: '13000',
        addressCountry: 'FR',
      },
      sameAs: [
        'https://webtreize.fr',
        SNAPCHAT_URL,
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'WebTreize',
      description: 'Agence web Marseille — Sites web, SEO, Apps sur-mesure',
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'fr-FR',
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${SITE_URL}/#service`,
      name: 'WebTreize',
      image: `${SITE_URL}/og-image.jpg`,
      url: SITE_URL,
      priceRange: '€€',
      currenciesAccepted: 'EUR',
      areaServed: 'France',
      geo: { '@type': 'GeoCoordinates', latitude: 43.2965, longitude: 5.3698 },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Marseille',
        addressRegion: "Provence-Alpes-Côte d'Azur",
        postalCode: '13000',
        addressCountry: 'FR',
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Services WebTreize',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Création de site web', description: 'Sites vitrines et e-commerce rapides, sécurisés et optimisés SEO' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Référencement SEO', description: 'Optimisation pour les moteurs de recherche et visibilité locale' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Google Business Profile', description: 'Gestion et optimisation des fiches Google pour le référencement local' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Développement applicatif', description: "Applications web et outils métiers sur-mesure" } },
        ],
      },
    },
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map(item => ({
    '@type': 'Question' as const,
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer' as const,
      text: item.a,
    },
  })),
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${archivoBlack.variable} ${dmSans.variable} min-h-screen font-sans grain-texture`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:rounded-full focus:bg-[#001F3F] focus:text-white focus:font-bold focus:shadow-lg focus:outline-dashed focus:outline-white focus:ring-4 focus:ring-orange"
        >
          Aller au contenu principal
        </a>
        <div id="app-root" className="relative min-h-screen min-w-0">
          {children}
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </body>
    </html>
  );
}
