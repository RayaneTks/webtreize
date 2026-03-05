import type { Metadata } from 'next';
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

const SITE_URL = 'https://www.webtreize.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'WebTreize | Agence digitale Marseille – Sites web, apps & SEO',
  description:
    "Votre croissance digitale simplifiée. WebTreize est une agence digitale basée à Marseille spécialisée en création de sites web, applications sur mesure, fiches Google Business Profile et SEO.",
  keywords: [
    'agence digitale Marseille',
    'création site web Marseille',
    'SEO Marseille',
    'fiche Google Business',
    'application web sur mesure',
    'WebTreize',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'WebTreize | Agence digitale – Sites web, apps, fiches Google & SEO',
    description:
      "Agence digitale à Marseille : création de sites vitrines et applicatives, optimisation de fiche Google, SEO et accompagnement digital complet.",
    siteName: 'WebTreize',
    locale: 'fr_FR',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'WebTreize - Agence digitale Marseille' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WebTreize | Agence digitale – Sites web, apps, fiches Google & SEO',
    description:
      "Votre croissance digitale simplifiée. Création de sites web, applications sur mesure, fiches Google et SEO pour particuliers et entreprises.",
    images: [{ url: '/logo.png', alt: 'WebTreize - Agence digitale Marseille' }],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
  name: 'WebTreize',
  url: SITE_URL,
  description:
    "Agence digitale basée à Marseille spécialisée en création de sites web et d'applications, optimisation de fiches Google Business Profile, SEO et accompagnement web global.",
  email: 'contact@webtreize.com',
  areaServed: { '@type': 'City', name: 'Marseille' },
  address: { '@type': 'PostalAddress', addressLocality: 'Marseille', addressCountry: 'FR' },
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
        text: "Audit de vos besoins, conception UX/UI sur-mesure, développement technique optimisé, configuration SEO, puis mise en ligne et formation pour votre autonomie.",
      },
    },
    {
      '@type': 'Question',
      name: 'Intervenez-vous uniquement à Marseille ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Notre base est à Marseille, mais notre expertise est sans frontière. Nous collaborons avec des entreprises dans toute la francophonie via des process ultra-optimisés.",
      },
    },
    {
      '@type': 'Question',
      name: 'Quels sont vos tarifs ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Chaque projet est unique. Nous réalisons une proposition sur-mesure adaptée à vos enjeux de rentabilité et à vos objectifs sous 24h ouvrées.",
      },
    },
    {
      '@type': 'Question',
      name: "Faut-il avoir une idée précise du projet ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Absolument pas. C'est notre métier de traduire vos objectifs commerciaux en stratégie digitale performante. Venez avec un problème, nous construirons la solution.",
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="dark">
      <body className={`${montserrat.variable} ${openSans.variable} min-h-screen font-sans`}>
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
