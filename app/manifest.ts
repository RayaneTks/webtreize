import type { MetadataRoute } from 'next';
import { SITE_NAME } from '@/lib/seo';

/**
 * Manifeste PWA, typé. Il a remplacé `public/manifest.json`, depuis supprimé du
 * dépôt (BOM UTF-8 en tête, thème bleu marine hors charte, « agence digitale »,
 * abréviation « W13 », icônes de l’ancienne identité).
 *
 * Les deux couleurs sont l’ivoire de la charte. `theme_color` doit rester
 * aligné sur `viewport.themeColor` du layout racine : deux valeurs
 * contradictoires donnaient une barre système bleu marine sur Android alors
 * que le site est ivoire. L’encre `#17130f` reste la couleur du monogramme
 * porté par les icônes elles-mêmes.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: SITE_NAME,
    short_name: SITE_NAME,
    description:
      'Studio digital à Marseille. Sites, visibilité locale et outils sur mesure pour les entreprises du 13.',
    lang: 'fr',
    dir: 'ltr',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#f6f3ee',
    theme_color: '#f6f3ee',
    categories: ['business', 'productivity'],
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/icons/icon-maskable-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
