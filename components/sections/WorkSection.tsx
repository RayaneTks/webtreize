import { Reveal } from '@/components/motion/Reveal';
import { ProjectCard } from '@/components/realisations/ProjectCard';
import { SectionHead } from '@/components/sections/SectionHead';
import { Button } from '@/components/ui/Button';
import {
  MENTION_DONNEES_EXEMPLE,
  REALISATIONS,
  REALISATIONS_A_LA_UNE,
  REALISATIONS_HREF,
} from '@/lib/data/realisations';

/** Trois cartes par rang à partir de `md` : une carte vaut un tiers du conteneur. */
const SIZES = '(min-width: 1120px) 352px, (min-width: 768px) 31vw, 92vw';

/**
 * « Réalisations » — un aperçu, pas le portfolio.
 *
 * Trois projets, une couverture chacun, le nom et ce qui a été fait. L’accueil
 * donne envie d’en voir plus ; /realisations montre tout ; l’étude de cas
 * détaille. Sur le modèle des bons portfolios de studios : peu de texte, des
 * images fortes, un seul chemin vers la suite.
 */
export function WorkSection() {
  const autres = REALISATIONS.length - REALISATIONS_A_LA_UNE.length;

  return (
    <section id="realisations" aria-labelledby="realisations-title" className="section-pad">
      <div className="site-container">
        <SectionHead
          id="realisations-title"
          title="Quelques réalisations."
          lede="Des sites et des outils sur mesure, pour des commerces qui tournent tous les jours."
        />

        <ul role="list" className="mt-gap-lg grid gap-x-gap-md gap-y-gap-lg md:grid-cols-3">
          {REALISATIONS_A_LA_UNE.map((projet, index) => (
            <Reveal key={projet.id} as="li" delay={index * 60}>
              <ProjectCard projet={projet} sizes={SIZES} />
            </Reveal>
          ))}
        </ul>

        <Reveal delay={60} className="mt-gap-lg flex flex-col items-center gap-gap-sm text-center">
          <Button href={REALISATIONS_HREF} variant="quiet" size="pill" arrow>
            {autres > 0 ? `Voir les ${REALISATIONS.length} réalisations` : 'Voir les réalisations'}
          </Button>
          <p className="max-w-[56ch] text-note text-ink-muted">{MENTION_DONNEES_EXEMPLE}</p>
        </Reveal>
      </div>
    </section>
  );
}
