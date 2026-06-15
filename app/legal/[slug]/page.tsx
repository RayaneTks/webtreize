import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/constants';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

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

export default async function LegalPage({ params }: LegalPageProps) {
  const { slug } = await params;
  const title = readableTitles[slug] ?? 'Informations légales';

  return (
    <div className="min-h-screen bg-cream text-navy overflow-x-clip">
      <Navbar />
      <main id="main-content" className="relative z-10 pt-28 pb-20 md:pt-36">
        <section className="container mx-auto px-5 lg:px-12 xl:px-16 max-w-screen-xl">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 mb-8">
              <span className="px-4 py-2 bg-orange text-white text-xs font-bold uppercase tracking-[0.15em] border-2 border-navy">
                Légal
              </span>
              <span className="text-sm font-bold text-neutral-text">Documents</span>
            </div>

            <h1
              className="font-display text-navy uppercase leading-[0.92] mb-5"
              style={{ fontSize: 'clamp(34px, 6vw, 56px)' }}
            >
              {/** Le titre “réel” est géré par metadata; UI alignée avec le slug */}
              {title}
            </h1>

            <p className="text-lg text-neutral-text font-medium leading-relaxed mb-10">
              Cette page est en cours de finalisation. En attendant, si vous avez besoin d&apos;une info précise, contactez-nous.
            </p>

            <div className="grid gap-6">
              <div className="bg-white border-2 border-navy shadow-brutal p-6 md:p-8">
                <h2 className="font-display text-2xl uppercase text-navy mb-3">
                  Où trouver les documents ?
                </h2>
                <p className="text-neutral-text font-medium leading-relaxed mb-6">
                  Mentions légales, politique de confidentialité et CGV seront publiées ici très prochainement.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center h-12 px-8 py-3 border-2 border-navy bg-cream text-navy font-bold rounded-sm hover:bg-navy hover:text-white transition-all"
                  >
                    Retour au site
                  </Link>
                  <Link
                    href="/#contact"
                    className="inline-flex items-center justify-center h-12 px-8 py-3 border-2 border-navy bg-orange text-white font-bold rounded-sm shadow-brutal-sm hover:bg-orange-hover hover:-translate-x-0.5 hover:-translate-y-0.5 motion-reduce:hover:translate-x-0 motion-reduce:hover:translate-y-0 transition-all motion-reduce:transition-none"
                  >
                    Demander une info
                  </Link>
                </div>
              </div>

              <div className="bg-navy border-2 border-navy shadow-brutal-orange p-6 md:p-8">
                <p className="text-white/80 font-mono text-sm md:text-base leading-relaxed">
                  <span className="text-orange font-bold">&gt;</span>{' '}
                  Génération des documents… statut : <span className="text-white font-bold">en cours</span>
                  <br />
                  <span className="text-orange font-bold">&gt;</span>{' '}
                  Publication : <span className="text-white/90">très bientôt</span>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
