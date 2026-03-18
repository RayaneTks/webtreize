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


export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'WebTreize | Agence Digitale Marseille | Création Site Web, SEO Marseille',
  description:
    "Agence digitale Marseille : création site web Marseille, SEO Marseille, référencement naturel Marseille. Sites web, fiches Google & apps sur-mesure. Audit gratuit en 48h.",
  keywords: [
    'agence digitale Marseille',
    'création site web Marseille',
    'SEO Marseille',
    'fiche Google Business',
    'application web sur mesure',
    'WebTreize',
  ],
  alternates: { canonical: '/' },
  icons: { icon: '/icon.svg', apple: '/icon.svg' },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'WebTreize | Agence Digitale Marseille | Création Site Web, SEO Marseille',
    description:
      "Agence digitale Marseille : création site web Marseille, SEO Marseille, référencement naturel Marseille. Sites web, fiches Google & apps sur-mesure. Audit gratuit en 48h.",
    siteName: 'WebTreize',
    locale: 'fr_FR',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'WebTreize - Agence digitale Marseille' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WebTreize | Agence Digitale Marseille | Création Site Web, SEO Marseille',
    description:
      "Agence digitale Marseille : création site web Marseille, SEO Marseille, référencement naturel Marseille. Sites web, fiches Google & apps sur-mesure. Audit gratuit en 48h.",
    images: [{ url: '/og-image.jpg', alt: 'WebTreize - Agence digitale Marseille' }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#001F3F',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
  name: 'WebTreize',
  url: SITE_URL,
  description:
    "Agence digitale basée à Marseille spécialisée en création de sites web et d'applications, optimisation de fiches Google Business Profile, SEO et accompagnement web global.",
  email: CONTACT_EMAIL,
  contactPoint: {
    '@type': 'ContactPoint',
    email: CONTACT_EMAIL,
    contactType: 'customer service',
    availableLanguage: 'French',
    areaServed: 'FR',
  },
  image: `${SITE_URL}/og-image.jpg`,
  priceRange: '€€',
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 43.2965,
    longitude: 5.3698,
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
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00',
  },
  sameAs: [
    SITE_URL,
    'https://webtreize.fr',
    SNAPCHAT_URL,
  ],
  makesOffer: [
    { '@type': 'Offer', name: 'Création de sites web vitrines et e-commerce' },
    { '@type': 'Offer', name: "Développement d'applications web sur mesure" },
    { '@type': 'Offer', name: 'Optimisation de fiche Google Business Profile' },
    { '@type': 'Offer', name: 'SEO & référencement naturel' },
    { '@type': 'Offer', name: 'Conseil et accompagnement digital' },
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
    <html lang="fr" className="dark">
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
