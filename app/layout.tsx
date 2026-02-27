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
  title: 'WebTreize | Agence Web Marseille - Site Vitrine & SEO',
  description:
    'Attirez plus de clients grâce au digital. Création de sites vitrines, optimisation Google et SEO à Marseille. Devis gratuit.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'WebTreize | Agence Web Marseille - Site Vitrine & SEO',
    description: 'Agence digitale Marseille : site vitrine, SEO, optimisation Google. Devis gratuit.',
    siteName: 'WebTreize',
    locale: 'fr_FR',
    images: [{ url: '/flyer.png', width: 1200, height: 630, alt: 'WebTreize - Agence Web Marseille' }],
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  name: 'WebTreize',
  url: SITE_URL,
  description: 'Agence web à Marseille : création de sites vitrines, SEO et optimisation Google.',
  email: 'contact@webtreize.com',
  areaServed: { '@type': 'City', name: 'Marseille' },
  address: { '@type': 'PostalAddress', addressLocality: 'Marseille', addressCountry: 'FR' },
  sameAs: [SITE_URL, 'https://webtreize.fr', 'https://www.snapchat.com/add/webtreize'],
  makesOffer: [
    { '@type': 'Offer', name: 'Création de site web vitrine' },
    { '@type': 'Offer', name: 'Optimisation fiche Google' },
    { '@type': 'Offer', name: 'SEO & Référencement' },
    { '@type': 'Offer', name: 'Applications sur mesure' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="dark">
      <body className={`${montserrat.variable} ${openSans.variable} min-h-screen`}>
        <div className="relative z-10 flex min-h-screen flex-col">
          <ScrollProgressBar />
          <Navbar />
          <main className="flex-1 pb-24 md:pb-0">{children}</main>
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
