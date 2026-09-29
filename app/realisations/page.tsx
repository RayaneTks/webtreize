import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';
import { MENTION_DONNEES_EXEMPLE, ProjectCard } from '@/components/realisations/ProjectCard';
import { PageCtaBand } from '@/components/sections/PageCtaBand';
import { REALISATIONS } from '@/lib/data/realisations';
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('realisations');

const JSON_LD = [
  webPageJsonLd('realisations', 'CollectionPage'),
  breadcrumbJsonLd([
    { name: 'Accueil', path: '/' },
    { name: 'Réalisations', path: '/realisations' },
  ]),
];

/**
 * Les réalisations, au complet : chaque projet en pleine largeur, avec la même
 * carte que l’accueil (`ProjectCard`) — l’aperçu et la page ne divergent pas.
 *
 * Aucun chiffre de résultat n’est affiché — voir la doctrine en tête de
 * `lib/data/realisations.ts`.
 */
export default function RealisationsPage() {
  return (
    <>
      <PageShell
        eyebrow="Réalisations"
        title="Ce que nous avons livré."
        description="Une parfumerie, un snack, une pâtisserie, une conciergerie. Pour chacun, ce qu’il fallait résoudre, et ce qui a été construit, écran par écran."
      >
        <section aria-label="Projets" className="section-pad border-t border-line">
          <div className="site-container grid gap-gap-xl">
            {REALISATIONS.map((projet, index) => (
              <ProjectCard
                key={projet.id}
                projet={projet}
                headingLevel="h2"
                // La première scène est l’élément le plus grand au chargement.
                priority={index === 0}
              />
            ))}
            <p className="max-w-[60ch] border-t border-line pt-gap-md text-note text-ink-faint">
              {MENTION_DONNEES_EXEMPLE}
            </p>
          </div>
        </section>

        <PageCtaBand
          title="Le vôtre ressemblerait à quoi&#8239;?"
          description="Décrivez votre activité en quelques lignes. Nous vous répondons par écrit, avec ce que nous ferions et dans quel ordre."
        />
      </PageShell>

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
