import type { Metadata } from 'next';
import { ClientShell } from '@/components/ClientShell';
import { Footer } from '@/components/layout/Footer';
import { Reveal } from '@/components/motion/Reveal';
import { ProjectCard } from '@/components/realisations/ProjectCard';
import { ProjectIndex } from '@/components/realisations/ProjectIndex';
import { PageCtaBand } from '@/components/sections/PageCtaBand';
import { CATEGORIES, MENTION_DONNEES_EXEMPLE, REALISATIONS } from '@/lib/data/realisations';
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('realisations');

const JSON_LD = [
  webPageJsonLd('realisations', 'CollectionPage'),
  breadcrumbJsonLd([
    { name: 'Accueil', path: '/' },
    { name: 'Réalisations', path: '/realisations' },
  ]),
];

/** Deux cartes par rang à partir de `md`. */
const SIZES = '(min-width: 1120px) 540px, (min-width: 768px) 46vw, 92vw';

/**
 * L’index des réalisations : un titre, des filtres par type de projet, puis
 * toutes les cartes. Le détail vit dans chaque étude de cas.
 *
 * Aucun chiffre de résultat n’est affiché — voir la doctrine en tête de
 * `lib/data/realisations.ts`.
 */
export default function RealisationsPage() {
  return (
    <>
      <div className="min-h-screen bg-canvas text-ink">
        <ClientShell footer={<Footer />}>
          <section className="pb-section pt-gap-xl">
            <div className="site-container">
              <Reveal>
                <p className="eyebrow">Réalisations</p>
                <h1 className="mt-gap-sm text-display-lg font-extrabold">
                  Index des projets
                  <sup className="ml-1 align-super font-serif text-title font-light tracking-normal text-ink-muted">
                    {REALISATIONS.length}
                  </sup>
                </h1>
                <p className="lede mt-gap-sm max-w-[52ch]">
                  Sites, applications métier, outils de commande et de gestion. Chaque projet
                  s’ouvre sur son étude de cas.
                </p>
              </Reveal>

              <div className="mt-gap-lg">
                <ProjectIndex
                  categories={CATEGORIES}
                  entrees={REALISATIONS.map((projet, index) => ({
                    id: projet.id,
                    categories: projet.categories,
                    carte: (
                      <ProjectCard projet={projet} sizes={SIZES} priority={index < 2} headingLevel="h2" />
                    ),
                  }))}
                />
              </div>

              <p className="mt-gap-xl max-w-[60ch] border-t border-line pt-gap-md text-note text-ink-muted">
                {MENTION_DONNEES_EXEMPLE}
              </p>
            </div>
          </section>

          <PageCtaBand
            title="Le vôtre ressemblerait à quoi&#8239;?"
            description="Décrivez votre activité en quelques lignes. Nous vous répondons par écrit, avec ce que nous ferions et dans quel ordre."
          />
        </ClientShell>
      </div>

      {JSON_LD.map((node, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}
    </>
  );
}
