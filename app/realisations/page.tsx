import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';
import { ProjectList } from '@/components/realisations/ProjectRow';
import { PageCtaBand } from '@/components/sections/PageCtaBand';
import {
  livrablesEnPhrase,
  MENTION_DONNEES_EXEMPLE,
  metierEtLieu,
  REALISATIONS,
} from '@/lib/data/realisations';
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
 * Les réalisations, au complet.
 *
 * Un index d’abord — le sommaire d’un catalogue : en quatre lignes, le prospect
 * voit s’il y a un métier proche du sien. Puis les mêmes lignes de projet que
 * l’accueil (`ProjectList`), titrées en `h2`.
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
        <nav aria-label="Index des réalisations" className="site-container">
          <ol role="list" className="border-b border-line">
            {REALISATIONS.map((projet, index) => (
              <li key={projet.id} className="border-t border-line">
                <a
                  href={`#projet-${projet.id}`}
                  className="group grid items-baseline gap-x-gap-md py-3 md:grid-cols-12"
                >
                  <span aria-hidden="true" className="projet__num md:col-span-1 md:mb-0">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-title font-extrabold text-ink md:col-span-4">
                    <span className="link-draw">{projet.nom}</span>
                  </span>
                  <span className="text-note text-ink-muted md:col-span-3">{metierEtLieu(projet)}</span>
                  <span className="hidden text-note text-ink-muted md:col-span-4 md:block">
                    {livrablesEnPhrase(projet)}
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <section aria-label="Projets" className="section-pad">
          <ProjectList projets={REALISATIONS} headingLevel="h2" />
          <p className="site-container mt-gap-lg border-t border-line pt-gap-md text-note text-ink-muted">
            {MENTION_DONNEES_EXEMPLE}
          </p>
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
