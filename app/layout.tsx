import type { Metadata } from 'next';
import './globals.css';
import { Montserrat, Open_Sans } from 'next/font/google';
import Navbar from '@/components/Navbar';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import Footer from '@/components/Footer';

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
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'WebTreize | Agence digitale – Sites web, apps, fiches Google & SEO',
    description:
      "Agence digitale à Marseille : création de sites vitrines et applicatives, optimisation de fiche Google, SEO et accompagnement digital complet.",
    siteName: 'WebTreize',
    locale: 'fr_FR',
    images: [{ url: '/logo-full.png', width: 1200, height: 630, alt: 'WebTreize - Agence digitale' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WebTreize | Agence digitale – Sites web, apps, fiches Google & SEO',
    description:
      "Votre croissance digitale simplifiée. Création de sites web, applications sur mesure, fiches Google et SEO pour particuliers et entreprises.",
    images: ['/logo-full.png'],
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="dark">
      <body className={`${montserrat.variable} ${openSans.variable} min-h-screen`}>
        <div className="relative z-10 flex min-h-screen min-w-0 flex-col overflow-x-hidden">
          <ScrollProgressBar />
          <Navbar />
          <main className="flex-1 pb-8 md:pb-0 min-w-0">{children}</main>
          <Footer />
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
