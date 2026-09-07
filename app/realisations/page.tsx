import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';
import { PageCtaBand } from '@/components/sections/PageCtaBand';
import { WorkEntry } from '@/components/sections/WorkSection';
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
 * Les réalisations, au complet.
 *
 * La page rend exactement la même figure que l’aperçu de l’accueil
 * (`WorkEntry`) : l’aperçu et la page ne peuvent pas diverger, et il n’y a
 * qu’un endroit à corriger quand la présentation d’un projet change.
 *
 * Aucun chiffre de résultat n’est affiché — voir la doctrine en tête de
 * `lib/data/realisations.ts`. Ce que le visiteur peut faire à la place, et qui
 * vaut mieux : ouvrir chaque site et juger sur pièce.
 */
export default function RealisationsPage() {
  return (
    <>
      <PageShell
        eyebrow="Réalisations"
        title="Ce que nous avons livré."
        description="Deux commerces de Marseille, deux besoins différents, des outils qui tournent tous les jours. Chaque adresse est publique : ouvrez-les."
      >
        <section className="section-pad border-t border-line bg-surface">
          <div className="site-container grid gap-gap-xl">
            {REALISATIONS.map((projet, index) => (
              <WorkEntry
                key={projet.id}
                projet={projet}
                plateFirst={index % 2 === 1}
                // La première capture est l’élément le plus grand au chargement.
                priority={index === 0}
              />
            ))}
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
