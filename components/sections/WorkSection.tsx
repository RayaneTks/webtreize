import { Reveal } from '@/components/motion/Reveal';
import { MENTION_DONNEES_EXEMPLE, ProjectGrid } from '@/components/realisations/ProjectCard';
import { Button } from '@/components/ui/Button';
import { REALISATIONS, REALISATIONS_HREF } from '@/lib/data/realisations';

/**
 * « Réalisations » — la section qui fait basculer un visiteur hésitant.
 *
 * ## Montrer des outils, pas des pages d’accueil
 *
 * Un prospect ne doute pas qu’un studio sache faire une page d’accueil. Il doute
 * qu’on comprenne son métier. Chaque projet est donc mis en scène avec ce qui
 * se passe derrière la vitrine : la caisse d’une parfumerie, l’écran de la
 * cuisine d’un snack, le coût de revient d’une tarte, la demande chiffrée
 * d’un propriétaire. C’est ce qui distingue un studio d’un générateur de sites.
 *
 * ## Ce qui n’y figure pas
 *
 * Aucun résultat chiffré présenté comme mesuré, aucun logo en bandeau, aucun
 * avis. Les écrans de gestion portent des données d’exemple, et la section le
 * dit : les chiffres d’un client ne se publient pas pour vendre au suivant.
 */
export function WorkSection() {
  return (
    <section id="realisations" aria-labelledby="realisations-title" className="section-pad">
      <div className="site-container">
        <Reveal className="grid items-end gap-gap-md md:grid-cols-[minmax(0,1fr)_auto]">
          <div>
            <p className="eyebrow">Réalisations</p>
            <h2
              id="realisations-title"
              className="sweep mt-gap-xs max-w-[18ch] text-display-md font-extrabold"
            >
              Quatre métiers, quatre outils sur mesure.
            </h2>
            <p className="lede mt-gap-sm max-w-[56ch]">
              Une parfumerie, un snack de skatepark, une pâtisserie, une conciergerie. Chaque fois,
              la vitrine et ce qu’il y a derrière&#8239;: la caisse, la cuisine, les marges, les
              demandes.
            </p>
          </div>
          <div className="hidden md:block">
            <Button href={REALISATIONS_HREF} variant="quiet" arrow>
              Toutes les réalisations
            </Button>
          </div>
        </Reveal>

        <div className="mt-gap-xl">
          <ProjectGrid projets={REALISATIONS} />
        </div>

        <div className="mt-gap-lg flex flex-col gap-gap-md border-t border-line pt-gap-md md:flex-row md:items-center md:justify-between">
          <p className="max-w-[60ch] text-note text-ink-faint">{MENTION_DONNEES_EXEMPLE}</p>
          <div className="md:hidden">
            <Button href={REALISATIONS_HREF} variant="quiet" arrow>
              Toutes les réalisations
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
