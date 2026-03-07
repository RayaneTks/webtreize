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

const SITE_URL = 'https://www.webtreize.com';

export async function generateMetadata({ params }: LegalPageProps): Promise<Metadata> {
  const { slug } = await params;
  const baseTitle = readableTitles[slug] ?? 'Informations légales WebTreize';
  const title = `${baseTitle} - WebTreize`;
  const description =
    'Rédaction en cours. Nos documents légaux seront bientôt disponibles. Retrouvez prochainement les mentions légales, la politique de confidentialité et les CGV de WebTreize.';

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/legal/${slug}` },
    robots: { index: false, follow: false },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/legal/${slug}`,
    },
    twitter: { card: 'summary', title, description },
  };
}

export default function LegalPage({ params }: LegalPageProps) {
  return <LegalWipContent />;
}
