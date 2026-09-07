import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/Button';
import { Plate } from '@/components/ui/Plate';
import {
  REALISATIONS_A_LA_UNE,
  REALISATIONS_HREF,
  type Realisation,
} from '@/lib/data/realisations';

/** Largeurs servies pour les captures — deux colonnes à partir de `md`. */
const WORK_SIZES = '(min-width: 1120px) 520px, (min-width: 700px) 46vw, 100vw';

/**
 * « Ce que nous avons livré » — l’aperçu des réalisations sur l’accueil.
 *
 * ## Pourquoi cette section existe
 *
 * Le site affirmait son sérieux sans jamais rien montrer : aucune réalisation,
 * aucun nom, aucune capture (finding « preuve-absente-plan-honnete »). C’était
 * le dernier trou de crédibilité. Il se comble avec des projets réellement en
 * ligne, dont l’URL est cliquable : le visiteur peut vérifier lui-même, ce qui
 * vaut infiniment plus qu’un témoignage recopié.
 *
 * ## Ce qui n’y figure pas, et pourquoi
 *
 * Aucun chiffre de résultat. Pas de « +40 % de commandes », pas de note sur
 * cinq, pas de logo client posé en bandeau. Le studio ne mesure pas encore ces
 * chiffres, et un résultat invérifiable sur la page qui sert à prouver le
 * sérieux détruit exactement ce qu’elle cherche à établir. Chaque ligne dit ce
 * qui a été **construit**, un fait que la capture confirme à l’écran.
 *
 * ## Mise en page
 *
 * Même grammaire que `CraftSection` : grille à colonnes explicites, alternance
 * à partir de `md`, ordre du DOM toujours texte puis image. Aucune carte
 * bordée — un filet et un changement de fond suffisent, comme partout ailleurs.
 */
export function WorkSection() {
  return (
    <section id="realisations" aria-labelledby="realisations-title" className="section-pad">
      <div className="site-container">
        <Reveal>
          <p className="eyebrow">Nos réalisations</p>
          <h2
            id="realisations-title"
            className="mt-gap-xs max-w-[20ch] text-display-md font-extrabold"
          >
            Des sites et des outils qui tournent, aujourd’hui.
          </h2>
          <p className="lede mt-gap-sm max-w-[52ch]">
            Trois commerces marseillais, trois problèmes différents. Les adresses sont publiques,
            allez voir par vous-même.
          </p>
        </Reveal>

        <div className="mt-gap-xl grid gap-gap-xl">
          {REALISATIONS_A_LA_UNE.map((projet, index) => (
            <WorkEntry key={projet.id} projet={projet} plateFirst={index % 2 === 1} />
          ))}
        </div>

        <Reveal delay={60}>
          <div className="mt-gap-lg">
            <Button href={REALISATIONS_HREF} variant="quiet" arrow>
              Voir toutes les réalisations
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Une réalisation. Exportée : la page `/realisations` rend la liste complète
 * avec exactement la même figure, pour que l’aperçu et la page ne divergent
 * jamais.
 */
export function WorkEntry({
  projet,
  plateFirst,
  priority = false,
}: {
  projet: Realisation;
  plateFirst: boolean;
  priority?: boolean;
}) {
  const titleId = `realisation-${projet.id}-title`;

  return (
    <article aria-labelledby={titleId} className="grid items-center gap-gap-lg md:grid-cols-2">
      <Reveal className={plateFirst ? 'md:order-2' : undefined}>
        <p className="eyebrow">{projet.secteur}</p>
        <h3 id={titleId} className="mt-gap-xs text-display-sm font-extrabold">
          {projet.nom}
        </h3>
        <p className="lede mt-gap-sm max-w-[46ch]">{projet.promesse}</p>

        <ul className="mt-gap-sm grid max-w-[46ch] gap-gap-xs">
          {projet.livre.map((point) => (
            <li key={point} className="rule-top pt-gap-xs text-body text-ink-muted">
              {point}
            </li>
          ))}
        </ul>

        {projet.url ? (
          <p className="mt-gap-sm">
            <a
              href={projet.url}
              target="_blank"
              rel="noopener noreferrer"
              className="link-draw text-body font-semibold text-accent-deep"
            >
              Voir le site en ligne
              <span className="sr-only"> (nouvelle fenêtre)</span>
            </a>
          </p>
        ) : null}
      </Reveal>

      <Reveal delay={60} className={plateFirst ? 'md:order-1' : undefined}>
        {projet.url ? (
          <a
            href={projet.url}
            target="_blank"
            rel="noopener noreferrer"
            className="work-plate"
            aria-label={`Ouvrir le site ${projet.nom} (nouvelle fenêtre)`}
          >
            <Plate
              src={projet.image}
              alt={projet.alt}
              ratio="16/9"
              sizes={WORK_SIZES}
              priority={priority}
            />
          </a>
        ) : (
          <Plate
            src={projet.image}
            alt={projet.alt}
            ratio="16/9"
            sizes={WORK_SIZES}
            priority={priority}
          />
        )}
      </Reveal>
    </article>
  );
}
