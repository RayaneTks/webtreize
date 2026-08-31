import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/constants';
import { LegalPageShell } from '@/components/layout/LegalPageShell';

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
  const title = `${baseTitle} - WebTreize`;
  const description =
    'Documents légaux WebTreize : mentions légales, politique de confidentialité et conditions générales.';

  return {
    title,
    description,
    alternates: { canonical: `${SITE_URL}/legal/${slug}` },
    robots: { index: false, follow: false },
  };
}

export default async function LegalPage({ params }: LegalPageProps) {
  const { slug } = await params;
  const title = readableTitles[slug] ?? 'Informations légales';

  return (
    <LegalPageShell
      title={title}
      description="Ce document est en cours de finalisation. En attendant, contactez-nous pour toute question."
    >
      <div className="legal-prose space-y-8">
        <p>
          La version complète de cette page sera publiée prochainement. Si vous avez besoin d&apos;une
          information précise (données personnelles, conditions de prestation, mentions légales),
          écrivez-nous et nous vous répondrons sous 48h.
        </p>

        <div className="rule-top pt-8">
          <h2 className="text-xl font-bold tracking-[-0.025em] text-ink">
            Besoin d&apos;une réponse rapide ?
          </h2>
          <p className="mt-3">
            Écrivez-nous : nous répondons par écrit sous 48&nbsp;heures.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Link href="/contact" className="btn-primary">
              Nous écrire
            </Link>
            <Link href="/" className="btn-text">
              Retour à l&apos;accueil&nbsp;→
            </Link>
          </div>
        </div>
      </div>
    </LegalPageShell>
  );
}
