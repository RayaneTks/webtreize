import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from '@/lib/og';
import { PAGES } from '@/lib/seo';

export const alt = 'WebTreize — le studio digital marseillais, en clair';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return ogImage({ title: PAGES.about.ogTitle, subtitle: PAGES.about.ogSubtitle });
}
