import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Newsreader, Plus_Jakarta_Sans } from 'next/font/google';
import { SITE_URL } from '@/lib/constants';
import { organizationJsonLd, PAGES, SITE_NAME, websiteJsonLd } from '@/lib/seo';

/**
 * Layout racine — ce qui est vrai de toutes les pages, et rien de plus.
 *
 * Trois choses en sont volontairement absentes :
 *
 * 1. `alternates`. Un `canonical` déclaré ici fuit sur les sept routes du site
 *    et déclare toutes les pages duplicatas de l’accueil (finding critique
 *    « seo-canonical-homepage-partout »). Chaque page appelle désormais
 *    `pageMetadata()` ou `customMetadata()`, qui posent son canonical absolu.
 * 2. `FAQPage` et `BreadcrumbList`. Ils étaient injectés ici, donc affirmés sur
 *    /contact et /services sans le contenu correspondant — ce que Google
 *    interdit. Ils descendent dans les pages qui affichent réellement les
 *    questions et le fil d’Ariane.
 * 3. `ProfessionalService`. Réservé à l’accueil, seule page qui présente
 *    l’offre. Il référence `Organization` par « @id » au lieu de redéclarer
 *    l’adresse.
 *
 * Ne subsistent ici que les deux nœuds réellement globaux : `Organization` et
 * `WebSite`.
 */

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

/**
 * Classe « js » posée sur `<html>` avant la première peinture.
 *
 * Tout le masquage du mouvement est écrit sous `html.js` (app/globals.css) :
 * sans ce script, `Reveal` et `LineMask` ne se déclenchent jamais ; posé plus
 * bas — dans `<body>`, ou après hydratation — le contenu est peint visible puis
 * masqué, ce qui produit un clignotement sur chaque bloc de chaque page.
 * Il est donc synchrone, sans `defer`, et dans le `<head>`.
 *
 * Conséquence : au moment où React hydrate, `<html>` porte une classe que le
 * rendu serveur ne contenait pas. D’où le `suppressHydrationWarning` posé sur
 * cette seule balise — c’est le motif documenté par Next.js pour les scripts de
 * thème, et il ne désactive la comparaison que sur `<html>` lui-même, jamais sur
 * son contenu.
 */
const JS_CLASS_SCRIPT = "document.documentElement.classList.add('js')";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    // Titre de repli : les quatre pages indexables déclarent le leur.
    default: `${SITE_NAME} — studio digital à Marseille (13)`,
    template: `%s | ${SITE_NAME}`,
  },
  description: PAGES.home.description,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: { telephone: false, address: false, email: false },
  // Valeurs communes seulement : chaque page remplace ce bloc par le sien.
  // Ni `images` ni `url` ici — Next attache l’`opengraph-image.tsx` de la route.
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    locale: 'fr_FR',
  },
  // Pas de `creator` : le compte @webtreize n’est pas vérifié, et une
  // métadonnée qui pointe dans le vide est un défaut de sérieux.
  twitter: { card: 'summary_large_image' },
  // Pas de `robots` ici. « index, follow » est déjà le comportement par défaut
  // d’un robot, les quatre pages indexables le déclarent explicitement via
  // `pageMetadata`, et hériter d’un « index, follow » posait une seconde balise
  // `robots` contradictoire sur la page 404, où Next écrit lui-même « noindex »
  // (vérifié dans .next/server/app/_not-found.html).
  // `icons` et `manifest` ne sont pas déclarés : `app/icon.svg`,
  // `app/apple-icon.png` et `app/manifest.ts` sont des conventions de fichier,
  // que Next relie lui-même. Les déclarer ici les remplacerait.
};

export const viewport: Viewport = {
  themeColor: '#f6f3ee',
  colorScheme: 'light',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: JS_CLASS_SCRIPT }} />
      </head>
      <body
        className={`${jakarta.variable} ${newsreader.variable} min-h-screen bg-canvas font-sans text-ink antialiased`}
      >
        {/* Le lien d’évitement vise le `<main>` de ClientShell, qui porte
            `tabIndex={-1}` : sans lui, Safari et plusieurs lecteurs d’écran
            renvoient le focus au début du document. L’anneau de focus vient de
            `@layer base` : rien à écrire ici. `z-[60]` passe au-dessus du
            header collant, qui est en `z-50`. */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-6 focus:py-3 focus:text-note focus:font-semibold focus:text-canvas"
        >
          Aller au contenu principal
        </a>

        <div id="app-root" className="relative min-h-screen min-w-0">
          {children}
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd()) }}
        />
      </body>
    </html>
  );
}
