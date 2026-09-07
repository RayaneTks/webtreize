import type { MetadataRoute } from 'next';
import { CONTENT_PUBLISHED_AT } from '@/lib/constants';
import { PAGES, type PageKey, absoluteUrl } from '@/lib/seo';

/**
 * Date de dernière modification réelle, par route.
 *
 * Jamais `new Date()` : le sitemap est généré au build, une date calculée
 * ferait passer les quatre pages pour modifiées à chaque déploiement et
 * détruirait le signal de fraîcheur. Ces valeurs se mettent à jour à la main,
 * quand le contenu de la page change vraiment.
 */
const LAST_MODIFIED: Record<PageKey, string> = {
  home: CONTENT_PUBLISHED_AT,
  services: CONTENT_PUBLISHED_AT,
  realisations: CONTENT_PUBLISHED_AT,
  about: CONTENT_PUBLISHED_AT,
  contact: CONTENT_PUBLISHED_AT,
};

/**
 * Les quatre pages indexables du site.
 *
 * `/legal/*` en est volontairement absent : ces pages portent `noindex`.
 * `/privacy` et `/terms` aussi : ce sont des redirections 308 déclarées dans
 * `next.config.ts`, pas des URLs à indexer.
 *
 * Ni `changeFrequency` ni `priority` : Google ignore les deux depuis des
 * années, et une valeur ignorée qui prétend hiérarchiser est du bruit.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return (Object.keys(PAGES) as PageKey[]).map((key) => ({
    url: absoluteUrl(PAGES[key].path),
    lastModified: LAST_MODIFIED[key],
  }));
}
