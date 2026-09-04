import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/seo';

/**
 * Une seule règle générique suffit : les blocs Googlebot et Bingbot d’avant
 * étaient identiques au bloc `*` et n’apportaient rien.
 *
 * `/_next/` n’est plus interdit. Ce répertoire sert tout le CSS et tous les
 * chunks JavaScript : le bloquer empêchait Googlebot de rendre la page, donc
 * d’en voir la mise en forme et le contenu révélé au défilement.
 *
 * `host` a été retiré : directive Yandex non standard, ignorée par Google
 * et par Bing.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Seules les routes d’API sont fermées. Les pages légales restent
      // explorables : c’est leur balise `noindex` qui les tient hors de l’index,
      // et il faut pouvoir la lire pour l’appliquer.
      disallow: '/api/',
    },
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
