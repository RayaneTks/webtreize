import type { Route } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/motion/Reveal';
import { ProjectStage } from '@/components/realisations/ProjectStage';
import { Button } from '@/components/ui/Button';
import { realisationHref, type Realisation } from '@/lib/data/realisations';
import { cn } from '@/lib/utils';

/**
 * Un projet : sa scène, son nom, ce qu’il règle, ce qui a été livré.
 *
 * Toute la scène mène à l’étude de cas. Le lien porte un nom court
 * (`aria-label`) : sans lui, son nom accessible serait la concaténation des
 * textes alternatifs de trois écrans.
 */
export function ProjectCard({
  projet,
  width = 'full',
  priority = false,
  headingLevel = 'h3',
}: {
  projet: Realisation;
  width?: 'full' | 'half';
  priority?: boolean;
  headingLevel?: 'h2' | 'h3';
}) {
  const href = realisationHref(projet.id) as Route;
  const titleId = `projet-${projet.id}-titre`;
  const Heading = headingLevel;

  return (
    <article aria-labelledby={titleId}>
      <Reveal>
        <Link href={href} aria-label={`Étude de cas ${projet.nom}`} className="stage-link block">
          <ProjectStage projet={projet} width={width} priority={priority} />
        </Link>
      </Reveal>

      <div
        className={cn(
          'mt-gap-md grid gap-gap-sm',
          width === 'full' && 'md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:gap-gap-lg',
        )}
      >
        <div>
          <p className="eyebrow">{projet.secteur}</p>
          <Heading id={titleId} className="mt-gap-xs text-display-sm font-extrabold">
            <Link href={href} className="link-draw">
              {projet.nom}
            </Link>
          </Heading>
          <p className="mt-gap-xs max-w-[54ch] text-body text-ink-muted">{projet.promesse}</p>
        </div>

        <div className={cn('flex flex-col gap-gap-sm', width === 'full' && 'md:items-start md:pt-7')}>
          <ul aria-label="Ce qui a été livré" className="flex flex-wrap gap-2">
            {projet.livrables.map((livrable) => (
              <li
                key={livrable}
                className="rounded-full border border-line px-3 py-1 text-note text-ink-muted"
              >
                {livrable}
              </li>
            ))}
          </ul>
          <div>
            <Button href={href} variant="quiet" size="sm" arrow>
              Voir l’étude de cas
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}

/**
 * La grille des projets, identique sur l’accueil et sur /realisations : un
 * projet en grand, deux côte à côte, puis un en grand. Un rythme de magazine,
 * plutôt qu’une liste où tous les projets pèsent le même poids.
 */
export function ProjectGrid({ projets, headingLevel = 'h3' }: { projets: readonly Realisation[]; headingLevel?: 'h2' | 'h3' }) {
  const [premier, deuxieme, troisieme, ...suite] = projets;

  return (
    <div className="grid gap-gap-xl">
      {premier ? <ProjectCard projet={premier} priority={false} headingLevel={headingLevel} /> : null}
      {deuxieme ? (
        <div className="grid gap-gap-xl md:grid-cols-2 md:gap-gap-lg">
          <ProjectCard projet={deuxieme} width="half" headingLevel={headingLevel} />
          {troisieme ? <ProjectCard projet={troisieme} width="half" headingLevel={headingLevel} /> : null}
        </div>
      ) : null}
      {suite.map((projet) => (
        <ProjectCard key={projet.id} projet={projet} headingLevel={headingLevel} />
      ))}
    </div>
  );
}

/** La mention qui accompagne les écrans reconstitués. */
export const MENTION_DONNEES_EXEMPLE =
  'Les écrans de gestion sont présentés avec des données d’exemple : les chiffres de nos clients restent chez eux.';
