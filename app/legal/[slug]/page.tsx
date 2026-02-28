import type { Metadata } from 'next';
import { LegalWipContent } from '@/components/legal/LegalWipContent';

type LegalPageProps = {
  params: Promise<{ slug: string }>;
};

const readableTitles: Record<string, string> = {
  'mentions-legales': 'Mentions légales',
  'politique-confidentialite': 'Politique de confidentialité',
  'politique-de-confidentialite': 'Politique de confidentialité',
  cgv: 'Conditions générales de vente',
};

export async function generateMetadata({ params }: LegalPageProps): Promise<Metadata> {
  const { slug } = await params;
  const baseTitle = readableTitles[slug] ?? 'Informations légales WebTreize';

  return {
    title: `${baseTitle} - Rédaction en cours`,
    description:
      'Rédaction en cours. Nos documents légaux seront bientôt disponibles. Retrouvez prochainement les mentions légales, la politique de confidentialité et les CGV de WebTreize.',
    alternates: {
      canonical: `/legal/${slug}`,
    },
  };
}

export default function LegalPage({ params }: LegalPageProps) {
  return <LegalWipContent />;
}
