import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from '@/lib/og';
import { PAGES } from '@/lib/seo';

export const alt = 'WebTreize — sites web, SEO local et outils métier';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return ogImage({ title: PAGES.services.ogTitle, subtitle: PAGES.services.ogSubtitle });
}
