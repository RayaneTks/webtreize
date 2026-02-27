import type { Metadata } from 'next';
import Link from 'next/link';

type LegalPageProps = {
  params: {
    slug: string;
  };
};

const readableTitles: Record<string, string> = {
  'mentions-legales': 'Mentions légales',
  'politique-de-confidentialite': 'Politique de confidentialité',
  cgv: 'Conditions générales de vente',
};

export function generateMetadata({ params }: LegalPageProps): Metadata {
  const baseTitle =
    readableTitles[params.slug] ?? 'Informations légales WebTreize';

  return {
    title: `${baseTitle} - Rédaction en cours`,
    description:
      'Rédaction en cours. Nos documents légaux seront bientôt disponibles. Retrouvez prochainement les mentions légales, la politique de confidentialité et les CGV de WebTreize.',
    alternates: {
      canonical: `/legal/${params.slug}`,
    },
  };
}

export default function LegalPage({ params }: LegalPageProps) {
  const title =
    readableTitles[params.slug] ?? 'Documents légaux en préparation';

  return (
    <section className="px-4 py-24 pt-36 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-neon">
            Légal
          </p>
          <h1 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
            {title}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            Rédaction en cours. Nos documents légaux seront bientôt disponibles.
            Nous mettons actuellement à jour nos mentions légales, notre
            politique de confidentialité et nos conditions générales de vente
            afin de vous offrir une information claire et conforme.
          </p>
          <p className="mt-3 text-xs text-slate-500">
            En attendant, vous pouvez nous contacter directement pour toute
            question juridique ou demande d&apos;information complémentaire.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-full bg-action px-6 py-3 text-sm font-black text-white shadow-action transition hover:shadow-action-pulse"
            >
              Retour à l&apos;accueil
            </Link>
            <a
              href="mailto:contact@webtreize.com"
              className="rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Contacter WebTreize
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
