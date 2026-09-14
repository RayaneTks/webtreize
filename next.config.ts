import type { NextConfig } from 'next';

/**
 * `unsafe-eval` n’est requis que par le rechargement à chaud du serveur de
 * développement. Le build de production de Next ne l’utilise pas : l’autoriser
 * en production élargissait la surface d’attaque sans aucun bénéfice.
 */
const isDev = process.env.NODE_ENV === 'development';

/**
 * Origine du script de mesure, autorisée seulement si la mesure est activée.
 * Écrite en dur plutôt qu’importée de `lib/analytics.ts` : ce fichier est lu par
 * Node avant la résolution des alias `@/`.
 */
const analyticsOrigin = process.env.NEXT_PUBLIC_ANALYTICS === 'plausible' ? ' https://plausible.io' : '';

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // `unsafe-inline` reste requis : le script qui pose `html.js` et les blocs
      // JSON-LD sont inline. Le remplacer par un nonce demande un middleware, qui
      // basculerait les routes prérendues en rendu dynamique.
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}${analyticsOrigin}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
      `connect-src 'self'${analyticsOrigin}`,
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  // N’annonce plus le framework et sa famille de CVE à chaque réponse.
  poweredByHeader: false,
  turbopack: {
    // Fix: avoid Next.js inferring a wrong workspace root on Windows
    // when multiple lockfiles exist outside the repo.
    root: __dirname,
  },
  images: {
    // AVIF d’abord, WebP en repli. Sans cette ligne, Next ne sert que du WebP.
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [384, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Les photos d’un site vitrine ne changent pas : un an de cache.
    minimumCacheTTL: 31536000,
  },
  // Les images OpenGraph lisent les polices dans `assets/fonts` : on garde ces
  // fichiers dans la trace de sortie des quatre routes concernées.
  outputFileTracingIncludes: {
    '/opengraph-image': ['./assets/fonts/**'],
    '/services/opengraph-image': ['./assets/fonts/**'],
    '/about/opengraph-image': ['./assets/fonts/**'],
    '/contact/opengraph-image': ['./assets/fonts/**'],
  },
  /**
   * Redirections permanentes (308), au niveau du routeur.
   *
   * Elles remplacent deux pages `app/privacy` et `app/terms`, supprimées du
   * dépôt, qui appelaient `redirect()` : cette fonction émet toujours un 307
   * temporaire, lequel dit à Google que l’ancienne URL reviendra et bloque
   * la consolidation des signaux vers /legal/*.
   */
  async redirects() {
    return [
      { source: '/privacy', destination: '/legal/politique-confidentialite', permanent: true },
      { source: '/terms', destination: '/legal/cgv', permanent: true },
    ];
  },
  async headers() {
    return [
      { source: '/(.*)', headers: securityHeaders },
      {
        source: '/_next/static/css/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          { key: 'Content-Type', value: 'text/css' },
        ],
      },
    ];
  },
};

export default nextConfig;
