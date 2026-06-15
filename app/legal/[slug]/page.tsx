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

        <div className="panel p-6 md:p-8">
          <h2 className="text-lg font-semibold text-ink">Besoin d&apos;une réponse rapide ?</h2>
          <p className="mt-2 text-muted">
            Utilisez le formulaire de contact ou l&apos;audit gratuit sur la page d&apos;accueil.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-full border border-line bg-surface px-6 text-sm font-semibold text-ink hover:border-line-strong"
            >
              Retour à l&apos;accueil
            </Link>
            <Link
              href="/#contact"
              className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-white hover:bg-accent-hover"
            >
              Demander une info
            </Link>
          </div>
        </div>
      </div>
    </LegalPageShell>
  );
}
