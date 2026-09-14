import type { MetadataRoute } from 'next';
import { CONTENT_PUBLISHED_AT } from '@/lib/constants';
import { isLegalDraft, LEGAL_DOCUMENTS, LEGAL_SLUGS } from '@/lib/data/legal';
import { REALISATIONS, realisationHref } from '@/lib/data/realisations';
import { PAGES, type PageKey, absoluteUrl } from '@/lib/seo';

/**
 * Le sitemap déclare exactement les URL indexables, et aucune autre.
 *
 * - Les pages du catalogue `PAGES`.
 * - Chaque étude de cas publiée.
 * - Les documents légaux **publiés** : un document en brouillon porte `noindex`,
 *   le déclarer ici enverrait deux signaux contradictoires. Dès qu’un document
 *   est complété, il entre de lui-même dans le sitemap.
 *
 * Toutes les URL sont construites sur l’hôte canonique (`SITE_URL`) : jamais une
 * adresse qui redirige.
 *
 * `lastModified` n’est jamais `new Date()` : une date calculée au build ferait
 * passer toutes les pages pour modifiées à chaque déploiement. Ni
 * `changeFrequency` ni `priority` : Google ignore les deux.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = (Object.keys(PAGES) as PageKey[]).map((key) => ({
    url: absoluteUrl(PAGES[key].path),
    lastModified: CONTENT_PUBLISHED_AT,
  }));

  const etudes = REALISATIONS.map((projet) => ({
    url: absoluteUrl(realisationHref(projet.id)),
    lastModified: CONTENT_PUBLISHED_AT,
  }));

  const legal = LEGAL_SLUGS.filter((slug) => !isLegalDraft(slug)).map((slug) => ({
    url: absoluteUrl(`/legal/${slug}`),
    lastModified: LEGAL_DOCUMENTS[slug].updatedAt,
  }));

  return [...pages, ...etudes, ...legal];
}
