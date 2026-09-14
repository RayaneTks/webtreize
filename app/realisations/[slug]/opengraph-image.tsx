import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from '@/lib/og';
import { getRealisation, REALISATIONS } from '@/lib/data/realisations';

export const alt = 'WebTreize — étude de cas';
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return REALISATIONS.map((projet) => ({ slug: projet.id }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projet = getRealisation(slug);

  return ogImage({
    title: projet ? `Étude de cas : ${projet.nom}` : 'Étude de cas',
    subtitle: projet ? projet.secteur : 'Réalisations WebTreize',
  });
}
