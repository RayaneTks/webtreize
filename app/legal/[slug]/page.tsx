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
    <section className="section-padding pt-32">
      <div className="section-max-width">
        <div className="glass-card border border-white/15 bg-black/50 p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            Légal
          </p>
          <h1 className="mt-2 text-2xl font-bold text-textPrimary sm:text-3xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-textSecondary">
            Rédaction en cours. Nos documents légaux seront bientôt disponibles.
            Nous mettons actuellement à jour nos mentions légales, notre
            politique de confidentialité et nos conditions générales de vente
            afin de vous offrir une information claire et conforme.
          </p>
          <p className="mt-3 text-xs text-textSecondary/80">
            En attendant, vous pouvez nous contacter directement pour toute
            question juridique ou demande d&apos;information complémentaire.
          </p>

          <div className="mt-5 flex flex-wrap gap-3 text-xs">
            <Link href="/" className="cta-button-primary flex items-center gap-2">
              <span>Retour à l&apos;accueil</span>
            </Link>
            <a
              href="mailto:contact@webtreize.com"
              className="cta-button-secondary flex items-center gap-2"
            >
              <span>Contacter WebTreize</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

