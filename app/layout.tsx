import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Newsreader, Plus_Jakarta_Sans } from 'next/font/google';
import { SITE_URL, CONTACT_EMAIL, SNAPCHAT_URL } from '@/lib/constants';
import { FAQ_ITEMS } from '@/lib/data/faq';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const META_DESCRIPTION =
  "WebTreize, studio digital à Marseille (13) : sites sur mesure, visibilité locale, fiche Google et outils métier. Audit écrit et gratuit sous 48 heures.";

const TITLE = 'WebTreize | Studio digital à Marseille (13)';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: '%s | WebTreize' },
  description: META_DESCRIPTION,
  keywords: [
    'WebTreize',
    'Web Treize',
    'agence web Marseille',
    'studio digital Marseille',
    'création site web Marseille',
    'SEO Marseille',
    'fiche Google Business',
    'application web sur mesure',
    'agence web 13',
  ],
  alternates: { canonical: SITE_URL },
  icons: { icon: '/icon.svg', apple: '/icon.svg' },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: TITLE,
    description: META_DESCRIPTION,
    siteName: 'WebTreize',
    locale: 'fr_FR',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'WebTreize — Studio digital Marseille' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: META_DESCRIPTION,
    creator: '@webtreize',
    images: [{ url: '/og-image.jpg', alt: 'WebTreize — Studio digital Marseille' }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#f6f3ee',
  colorScheme: 'light',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'WebTreize',
      alternateName: ['Web Treize', 'Webtreize', 'Agence Web 13'],
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon.svg` },
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
      sameAs: ['https://webtreize.fr', SNAPCHAT_URL],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'WebTreize',
      description: 'Studio digital Marseille — sites, visibilité locale, outils métier',
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'fr-FR',
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
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Création de site web',
              description: 'Sites sur mesure rapides, sécurisés et optimisés pour la conversion',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Référencement local',
              description: 'Visibilité sur les recherches locales à Marseille et en PACA',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Google Business Profile',
              description: 'Optimisation et suivi de la fiche Google',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Outils métier',
              description: 'Applications web et outils sur mesure : devis, plannings, suivi',
            },
          },
        ],
      },
    },
  ],
};

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((item) => ({
    '@type': 'Question' as const,
    name: item.q,
    acceptedAnswer: { '@type': 'Answer' as const, text: item.a },
  })),
};

const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Accueil', item: SITE_URL }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body
        className={`${jakarta.variable} ${newsreader.variable} min-h-screen bg-canvas font-sans text-ink antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-6 focus:py-3 focus:font-semibold focus:text-canvas focus:outline-none focus:ring-2 focus:ring-accent"
        >
          Aller au contenu principal
        </a>
        <div id="app-root" className="relative min-h-screen min-w-0">
          {children}
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </body>
    </html>
  );
}
