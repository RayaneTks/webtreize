import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/Button';
import { Plate } from '@/components/ui/Plate';
import {
  REALISATIONS_A_LA_UNE,
  REALISATIONS_HREF,
  type Ecran,
  type Realisation,
} from '@/lib/data/realisations';

/** L’écran d’ouverture occupe une colonne sur deux à partir de `md`. */
const MAIN_SIZES = '(min-width: 1120px) 520px, (min-width: 700px) 46vw, 100vw';

/** Les deux écrans de la bande sont deux fois plus étroits. */
const STRIP_SIZES = '(min-width: 1120px) 254px, (min-width: 700px) 23vw, 50vw';

/**
 * « Ce que nous avons livré » — l’aperçu des réalisations sur l’accueil.
 *
 * ## Pourquoi cette section existe
 *
 * Le site affirmait son sérieux sans jamais rien montrer : aucune réalisation,
 * aucun nom, aucune capture (finding « preuve-absente-plan-honnete »). C’était
 * le dernier trou de crédibilité. Il se comble avec des projets réellement en
 * ligne, dont l’URL est cliquable : le visiteur vérifie lui-même, ce qui vaut
 * infiniment plus qu’un témoignage recopié.
 *
 * ## Peu de projets, montrés en profondeur
 *
 * Deux études de cas à trois écrans plutôt que six vignettes. Ce qui convainc un
 * prospect, ce n’est pas la longueur du portfolio, c’est de voir un produit
 * fonctionner : l’accueil, la carte, le téléphone. Et un projet dont on n’est
 * pas fier tire tout le reste vers le bas — on le retire.
 *
 * ## Ce qui n’y figure pas
 *
 * Aucun chiffre de résultat. Pas de « +40 % de commandes », pas de note sur
 * cinq, pas de logo client posé en bandeau. Les seuls chiffres cités sont ceux
 * que le site affiche lui-même — les 108 références du catalogue Nuréa se
 * vérifient en un clic.
 */
export function WorkSection() {
  return (
    <section id="realisations" aria-labelledby="realisations-title" className="section-pad">
      <div className="site-container">
        <Reveal>
          <p className="eyebrow">Nos réalisations</p>
          <h2
            id="realisations-title"
            className="sweep mt-gap-xs max-w-[20ch] text-display-md font-extrabold"
          >
            Des sites et des outils qui tournent, aujourd’hui.
          </h2>
          <p className="lede mt-gap-sm max-w-[52ch]">
            Deux commerces marseillais, deux problèmes différents. Les adresses sont publiques,
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
              Voir le détail des réalisations
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Une réalisation : un écran d’ouverture, puis deux écrans en bande.
 *
 * Exportée — la page `/realisations` rend exactement la même figure, pour que
 * l’aperçu et la page ne divergent jamais.
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
        <div className="grid gap-gap-xs">
          <MainScreen
            ecran={projet.ecranPrincipal}
            url={projet.url}
            nom={projet.nom}
            priority={priority}
          />

          {/* Les deux écrans de détail ne portent pas de lien : un seul point
              d’entrée par projet suffit, et trois liens vers la même cible
              encombrent la navigation au clavier pour rien. */}
          <div className="grid grid-cols-2 gap-gap-xs">
            {projet.ecrans.map((ecran) => (
              <Plate
                key={ecran.src}
                src={ecran.src}
                alt={ecran.alt}
                ratio="4/3"
                sizes={STRIP_SIZES}
              />
            ))}
          </div>
        </div>
      </Reveal>
    </article>
  );
}

/** L’écran d’ouverture, cliquable quand le projet est en ligne. */
function MainScreen({
  ecran,
  url,
  nom,
  priority,
}: {
  ecran: Ecran;
  url?: string;
  nom: string;
  priority: boolean;
}) {
  const plate = (
    <Plate src={ecran.src} alt={ecran.alt} ratio="16/9" sizes={MAIN_SIZES} priority={priority} />
  );

  if (!url) return plate;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="work-plate"
      aria-label={`Ouvrir le site ${nom} (nouvelle fenêtre)`}
    >
      {plate}
    </a>
  );
}
