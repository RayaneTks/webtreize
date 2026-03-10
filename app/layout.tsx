import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Montserrat, Open_Sans } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['700', '800', '900'],
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  weight: ['400', '500', '600'],
  display: 'swap',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.webtreize.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'WebTreize | Agence Digitale | Sites Web, SEO & Apps',
  description:
    "WebTreize conçoit votre site, optimise votre fiche Google et développe vos outils sur-mesure. Audit gratuit en 48h.",
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
    title: 'WebTreize | Agence Digitale | Sites Web, SEO & Apps',
    description:
      "WebTreize conçoit votre site, optimise votre fiche Google et développe vos outils sur-mesure. Audit gratuit en 48h.",
    siteName: 'WebTreize',
    locale: 'fr_FR',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'WebTreize - Agence digitale Marseille' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WebTreize | Agence Digitale | Sites Web, SEO & Apps',
    description:
      "WebTreize conçoit votre site, optimise votre fiche Google et développe vos outils sur-mesure. Audit gratuit en 48h.",
    images: [{ url: '/og-image.jpg', alt: 'WebTreize - Agence digitale Marseille' }],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#001F3F',
};

/* TODO : Remplacer le téléphone placeholder par le vrai numéro */
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
  name: 'WebTreize',
  url: SITE_URL,
  description:
    "Agence digitale basée à Marseille spécialisée en création de sites web et d'applications, optimisation de fiches Google Business Profile, SEO et accompagnement web global.",
  email: 'contact@webtreize.com',
  telephone: '+33 4 00 00 00 00',
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
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5',
    reviewCount: '14',
    bestRating: '5',
  },
  sameAs: [
    SITE_URL,
    'https://webtreize.fr',
    'https://www.snapchat.com/add/webtreize',
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
  mainEntity: [
    {
      '@type': 'Question',
      name: "Comment se déroule la création d'un site ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "On définit ensemble vos pages et le contenu dont vous avez besoin, puis nous avançons étape par étape : maquette, développement technique optimisé, configuration SEO, puis mise en ligne et formation pour votre autonomie. Vous validez au fur et à mesure.",
      },
    },
    {
      '@type': 'Question',
      name: 'Intervenez-vous uniquement à Marseille ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Nous sommes basés à Marseille mais accompagnons des clients partout en France. La majorité des échanges se fait à distance (visio, messagerie). Pour les entreprises locales, nous organisons des rendez-vous en présentiel.",
      },
    },
    {
      '@type': 'Question',
      name: 'Quels sont vos tarifs ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Chaque projet est différent : un site vitrine, une fiche Google optimisée ou une application sur mesure n'ont pas le même périmètre. Nous établissons un devis sur mesure après un échange sur vos objectifs et votre budget. Demandez un devis gratuit sans engagement.",
      },
    },
    {
      '@type': 'Question',
      name: "Pourquoi passer par WebTreize plutôt qu'un freelance ou une autre agence ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Nous combinons stratégie marketing, expertise technique et connaissance du terrain local. Un seul interlocuteur, une vision globale de votre croissance digitale, du site web à la fiche Google en passant par votre image de marque.",
      },
    },
    {
      '@type': 'Question',
      name: "Faut-il avoir une idée précise du projet ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Non. Beaucoup de nos clients arrivent avec un objectif (plus de visibilité, plus de prises de rendez-vous) sans savoir comment y arriver. Nous les aidons à définir le bon périmètre et à prioriser.",
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="dark">
      <body className={`${montserrat.variable} ${openSans.variable} min-h-screen font-sans`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:rounded-full focus:bg-[#001F3F] focus:text-white focus:font-bold focus:shadow-lg focus:outline-none"
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
      </body>
    </html>
  );
}
