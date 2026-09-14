import type { Metadata } from 'next';
import Link from 'next/link';
import type { Route } from 'next';
import { notFound } from 'next/navigation';
import { TrackView } from '@/components/analytics/TrackView';
import { PageShell } from '@/components/layout/PageShell';
import { Reveal } from '@/components/motion/Reveal';
import { PageCtaBand } from '@/components/sections/PageCtaBand';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { Plate } from '@/components/ui/Plate';
import {
  getRealisation,
  REALISATIONS,
  REALISATIONS_HREF,
  realisationHref,
  type Ecran,
} from '@/lib/data/realisations';
import { breadcrumbJsonLd, customMetadata } from '@/lib/seo';

/**
 * Étude de cas — une page par réalisation.
 *
 * Plan imposé, identique pour chaque projet : contexte, problème, solution,
 * interfaces, fonctionnalités, ce qui change au quotidien, appel à l’action.
 *
 * Aucun chiffre, aucun témoignage n’est écrit ici : tout vient de
 * `lib/data/realisations.ts`, où chaque fonctionnalité a été vérifiée dans le
 * code livré. La section des résultats mesurés et celle des avis ne sont rendues
 * que si des données réelles existent.
 */

type Props = { params: Promise<{ slug: string }> };

/** Seules les réalisations publiées existent : tout autre segment est un 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return REALISATIONS.map((projet) => ({ slug: projet.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const projet = getRealisation(slug);
  if (!projet) return {};

  return customMetadata({
    path: realisationHref(projet.id),
    title: `${projet.nom} — étude de cas`,
    description: projet.metaDescription,
  });
}

const MAIN_SIZES = '(min-width: 1280px) 1224px, 100vw';
const HALF_SIZES = '(min-width: 1120px) 540px, (min-width: 700px) 46vw, 100vw';

export default async function EtudeDeCasPage({ params }: Props) {
  const { slug } = await params;
  const projet = getRealisation(slug);
  if (!projet) notFound();

  const { etude } = projet;
  const index = REALISATIONS.findIndex((p) => p.id === projet.id);
  const suivant = REALISATIONS[(index + 1) % REALISATIONS.length];

  const jsonLd = breadcrumbJsonLd([
    { name: 'Accueil', path: '/' },
    { name: 'Réalisations', path: REALISATIONS_HREF },
    { name: projet.nom, path: realisationHref(projet.id) },
  ]);

  return (
    <>
      <TrackView event="visite_realisation" props={{ projet: projet.id }} />

      <PageShell eyebrow={`Étude de cas · ${projet.secteur}`} title={projet.nom} description={projet.promesse}>
        {/* Fil d’Ariane visible : il double le `BreadcrumbList` émis plus bas,
            comme Google l’exige, et redonne un chemin de retour sur mobile. */}
        <nav aria-label="Fil d’Ariane" className="site-container -mt-gap-sm pb-gap-md">
          <ol className="flex flex-wrap items-center gap-x-2 text-note text-ink-faint">
            <li>
              <Link href="/" className="nav-link inline-flex py-2">
                Accueil
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={REALISATIONS_HREF} className="nav-link inline-flex py-2">
                Réalisations
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="py-2 text-ink">
              {projet.nom}
            </li>
          </ol>
        </nav>

        {/* — L’écran d’ouverture — */}
        <div className="plate-container tirage">
          <Plate
            src={projet.ecranPrincipal.src}
            alt={projet.ecranPrincipal.alt}
            ratio="16/9"
            priority
            sizes={MAIN_SIZES}
          />
        </div>

        {projet.url ? (
          <p className="site-container mt-gap-sm text-note text-ink-faint">
            En ligne&#8239;:{' '}
            <a
              href={projet.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-draw font-semibold text-accent-deep"
            >
              {projet.url.replace(/^https?:\/\//, '')}
              <span className="sr-only"> (nouvelle fenêtre)</span>
            </a>
          </p>
        ) : null}

        {/* — Contexte et problème — */}
        <section aria-labelledby="contexte-title" className="section-pad">
          <div className="site-container grid gap-gap-lg md:grid-cols-2">
            <Reveal className="rule-top">
              <h2 id="contexte-title" className="eyebrow">
                Le contexte
              </h2>
              <Paragraphes textes={etude.contexte} />
            </Reveal>
            <Reveal delay={60} className="rule-top">
              <h2 className="eyebrow">Le problème</h2>
              <Paragraphes textes={etude.probleme} />
            </Reveal>
          </div>
        </section>

        {/* — Solution — */}
        <section aria-labelledby="solution-title" className="section-pad bg-surface">
          <div className="site-container">
            <Reveal>
              <p className="eyebrow">La solution</p>
              <h2 id="solution-title" className="sweep mt-gap-xs max-w-[22ch] text-display-sm font-extrabold">
                Ce que nous avons construit.
              </h2>
            </Reveal>
            <Reveal delay={60} className="max-w-[62ch]">
              <Paragraphes textes={etude.solution} large />
            </Reveal>
          </div>
        </section>

        {/* — Interfaces — */}
        <section aria-labelledby="interfaces-title" className="section-pad">
          <div className="site-container">
            <Reveal>
              <p className="eyebrow">Les interfaces</p>
              <h2 id="interfaces-title" className="sweep mt-gap-xs max-w-[22ch] text-display-sm font-extrabold">
                À l’écran, tel qu’il est en ligne.
              </h2>
            </Reveal>

            <div className="mt-gap-lg grid gap-gap-md md:grid-cols-2">
              {projet.ecrans.map((ecran, i) => (
                <Reveal key={ecran.src} delay={i * 60}>
                  <Interface ecran={ecran} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* — Fonctionnalités — */}
        <section aria-labelledby="fonctionnalites-title" className="section-pad bg-surface">
          <div className="site-container">
            <Reveal>
              <p className="eyebrow">Les fonctionnalités</p>
              <h2
                id="fonctionnalites-title"
                className="sweep mt-gap-xs max-w-[22ch] text-display-sm font-extrabold"
              >
                Ce que chacun peut faire.
              </h2>
            </Reveal>

            <div
              className={
                etude.fonctionnalites.length > 2
                  ? 'mt-gap-lg grid gap-gap-lg md:grid-cols-3'
                  : 'mt-gap-lg grid gap-gap-lg md:grid-cols-2'
              }
            >
              {etude.fonctionnalites.map((groupe, i) => (
                <Reveal key={groupe.titre} delay={i * 60}>
                  <h3 className="text-title-sm font-bold text-ink">{groupe.titre}</h3>
                  <ul className="mt-gap-sm grid gap-gap-xs">
                    {groupe.points.map((point) => (
                      <li key={point} className="rule-top pt-gap-xs text-body text-ink-muted">
                        {point}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* — Au quotidien — */}
        <section aria-labelledby="quotidien-title" className="section-pad">
          <div className="site-container">
            <Reveal>
              <p className="eyebrow">Le résultat pour le commerce</p>
              <h2 id="quotidien-title" className="sweep mt-gap-xs max-w-[22ch] text-display-sm font-extrabold">
                Ce qui change au quotidien.
              </h2>
            </Reveal>

            <ul className="mt-gap-lg grid gap-gap-md md:grid-cols-2">
              {etude.auQuotidien.map((ligne, i) => (
                <Reveal key={ligne} as="li" delay={i * 60} className="rule-top">
                  <p className="text-body-lg text-ink">{ligne}</p>
                </Reveal>
              ))}
            </ul>

            {etude.resultatsMesures.length > 0 ? (
              <div className="mt-gap-xl">
                <h3 className="eyebrow">Résultats mesurés, communiqués par le client</h3>
                <ul className="mt-gap-sm grid gap-gap-sm md:grid-cols-2">
                  {etude.resultatsMesures.map((ligne) => (
                    <li key={ligne} className="rule-top text-body-lg font-semibold text-ink">
                      {ligne}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <p className="mt-gap-lg text-note text-ink-faint">
              Construit avec&#8239;: {etude.technique.join(' · ')}
            </p>
          </div>
        </section>

        <TestimonialsSection realisationId={projet.id} className="section-pad bg-surface" />

        {/* — Réalisation suivante — */}
        {suivant && suivant.id !== projet.id ? (
          <nav aria-label="Autre réalisation" className="border-t border-line">
            <div className="site-container py-gap-lg">
              <p className="eyebrow">Étude de cas suivante</p>
              <Link
                href={realisationHref(suivant.id) as Route}
                className="link-draw mt-gap-xs inline-block text-display-sm font-extrabold text-ink"
              >
                {suivant.nom}
              </Link>
            </div>
          </nav>
        ) : null}

        <PageCtaBand
          title="Votre activité mérite le même soin."
          description="Décrivez-nous votre activité en quelques lignes. Nous vous répondons par écrit avec ce qui vous freine, et dans quel ordre le corriger."
          label="Demander mon audit gratuit"
        />
      </PageShell>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}

function Paragraphes({ textes, large = false }: { textes: readonly string[]; large?: boolean }) {
  return (
    <div className="mt-gap-sm space-y-4">
      {textes.map((texte) => (
        <p key={texte} className={large ? 'text-body-lg text-ink-muted' : 'text-body text-ink-muted'}>
          {texte}
        </p>
      ))}
    </div>
  );
}

function Interface({ ecran }: { ecran: Ecran }) {
  return (
    <figure>
      <Plate src={ecran.src} alt={ecran.alt} ratio="4/3" sizes={HALF_SIZES} />
      {ecran.legende ? (
        <figcaption className="mt-gap-xs text-note text-ink-muted">{ecran.legende}</figcaption>
      ) : null}
    </figure>
  );
}
