import type { Metadata } from 'next';
import './globals.css';
import { Montserrat, Open_Sans } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['600', '700', '800'],
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  weight: ['400', '500'],
  display: 'swap',
});

const SITE_URL = 'https://www.webtreize.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'WebTreize - Agence digitale à Marseille',
    template: '%s | WebTreize',
  },
  description:
    'Attirez plus de clients grâce au digital. WebTreize crée des sites web vitrines performants, optimise votre visibilité Google et développe des applications sur mesure.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'WebTreize - Agence digitale à Marseille',
    description:
      'Agence digitale spécialisée en création de sites web vitrines, optimisation Google et solutions sur mesure pour particuliers et entreprises.',
    siteName: 'WebTreize',
    locale: 'fr_FR',
    images: [
      {
        url: '/flyer.png',
        width: 1200,
        height: 630,
        alt: 'WebTreize - Agence digitale à Marseille',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  name: 'WebTreize',
  url: SITE_URL,
  description:
    'Agence digitale à Marseille spécialisée dans la création de sites web vitrines, SEO et solutions digitales sur mesure.',
  email: 'contact@webtreize.com',
  areaServed: {
    '@type': 'City',
    name: 'Marseille',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Marseille',
    addressCountry: 'FR',
  },
  sameAs: [
    'https://www.webtreize.com',
    'https://webtreize.fr',
    'https://www.snapchat.com/add/webtreize',
  ],
  makesOffer: [
    { '@type': 'Offer', name: 'Création de site web vitrine' },
    { '@type': 'Offer', name: 'Optimisation fiche Google Business Profile' },
    { '@type': 'Offer', name: 'SEO & Référencement naturel' },
    { '@type': 'Offer', name: 'Applications web sur mesure' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark">
      <body
        className={`${montserrat.variable} ${openSans.variable} page-gradient min-h-screen text-textSecondary`}
      >
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1 pt-20">{children}</main>
          <Footer />
        </div>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}

