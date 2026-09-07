import type { Metadata } from 'next';
import { PageShell } from '@/components/layout/PageShell';
import { PageCtaBand } from '@/components/sections/PageCtaBand';
import { Reveal } from '@/components/motion/Reveal';
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
        description="Des commerces de Marseille, des besoins différents, des outils qui tournent tous les jours. Chaque adresse est publique : ouvrez-les."
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

        <section className="section-pad">
          <div className="site-container">
            <Reveal>
              <p className="eyebrow">Ce que vous ne verrez pas ici</p>
              <h2 className="mt-gap-xs max-w-[24ch] text-display-sm font-extrabold">
                Aucun chiffre que nous ne pouvons pas prouver.
              </h2>
              <p className="lede mt-gap-sm max-w-[52ch]">
                Pas de «&#8239;+40&#8239;% de commandes&#8239;», pas de note sur cinq, pas de logo
                posé en bandeau. Nous préférons vous donner les adresses et vous laisser juger. Le
                jour où un client acceptera de communiquer ses chiffres réels, ils arriveront ici
                avec son nom.
              </p>
            </Reveal>
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
