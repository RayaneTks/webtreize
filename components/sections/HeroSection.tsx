import { Reveal } from '@/components/motion/Reveal';
import { LineMask } from '@/components/motion/LineMask';
import { ProjectCard } from '@/components/realisations/ProjectCard';
import { Button } from '@/components/ui/Button';
import {
  MENTION_DONNEES_EXEMPLE,
  REALISATIONS,
  REALISATIONS_A_LA_UNE,
  REALISATIONS_HREF,
} from '@/lib/data/realisations';
import { AVIS_GOOGLE } from '@/lib/data/site';

/** Trois cartes par rang à partir de `md` : une carte vaut un tiers du conteneur. */
const SIZES = '(min-width: 1120px) 352px, (min-width: 768px) 31vw, 82vw';

/**
 * Héros de l’accueil — composant serveur.
 *
 * La promesse, puis la preuve sans attendre : les projets livrés montent sous
 * les boutons, la première couverture affleure dès le premier écran. Le `h1`
 * passe par `LineMask`, jamais par `Reveal` : son opacité reste à 1 (LCP).
 */
export function HeroSection() {
  return (
    <section id="hero" aria-labelledby="hero-title" className="pt-gap-xl text-center">
      <div className="site-container">
        <Reveal>
          <p className="eyebrow">Studio digital · Marseille</p>
        </Reveal>

        <LineMask
          as="h1"
          id="hero-title"
          className="mx-auto mt-gap-sm max-w-[19ch] text-display-xl font-extrabold"
        >
          Votre <span className="whitespace-nowrap">savoir-faire</span> mérite d’être trouvé.
        </LineMask>

        <Reveal delay={60}>
          <p className="lede mx-auto mt-gap-sm max-w-[46ch]">
            Sites, fiches Google et outils sur mesure pour les commerces et les artisans de
            Marseille. Un seul interlocuteur, qui conçoit et qui développe.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-gap-md flex flex-wrap items-center justify-center gap-x-gap-sm gap-y-gap-xs">
            <Button href="/contact" track="clic_audit">
              Demander mon audit
            </Button>
            <Button href="#methode" variant="quiet">
              Comment ça se passe
            </Button>
          </div>
          {/* Le délai de 48 heures est annoncé une seule fois par page : il est
              porté par la section « audit », dont c’est le chiffre principal. */}
          <p className="mt-gap-sm text-note text-ink-faint">
            Gratuit · Réponse écrite · Sans engagement
            {AVIS_GOOGLE ? (
              <>
                {' · '}
                <a href={AVIS_GOOGLE.href} className="link-draw text-ink-muted">
                  {`${AVIS_GOOGLE.note.toLocaleString('fr-FR')} sur Google`}
                </a>
              </>
            ) : null}
          </p>
        </Reveal>

        {/* La preuve : de vrais projets, chacun mène à son étude de cas. */}
        <div id="realisations" className="mt-gap-xl text-left">
          <Reveal>
            <h2 className="eyebrow text-center">Derniers projets livrés</h2>
          </Reveal>

          <ul role="list" className="projet-rail mt-gap-sm">
            {REALISATIONS_A_LA_UNE.map((projet, index) => (
              <Reveal key={projet.id} as="li" delay={180 + index * 60}>
                <ProjectCard projet={projet} sizes={SIZES} priority={index === 0} />
              </Reveal>
            ))}
          </ul>

          <Reveal delay={60} className="mt-gap-md flex flex-col items-center gap-gap-sm text-center">
            <Button href={REALISATIONS_HREF} variant="quiet" size="pill" arrow>
              {`Voir les ${REALISATIONS.length} réalisations`}
            </Button>
            <p className="max-w-[56ch] text-note text-ink-muted">{MENTION_DONNEES_EXEMPLE}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
