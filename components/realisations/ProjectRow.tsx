import type { Route } from 'next';
import Link from 'next/link';
import { Reveal } from '@/components/motion/Reveal';
import { Accrochage } from '@/components/realisations/Accrochage';
import {
  livrablesEnPhrase,
  metierEtLieu,
  realisationHref,
  type Realisation,
} from '@/lib/data/realisations';

/**
 * Une ligne de projet : l’accrochage, puis le cartel — numéro, nom, métier,
 * promesse, ce qui a été livré.
 *
 * Un seul lien par projet, le nom, étendu à toute la ligne (`.projet__lien`) :
 * une tabulation par projet, un nom accessible juste. Au survol, seuls le
 * soulignement du nom et la flèche bougent ; les écrans restent immobiles.
 */
export function ProjectRow({
  projet,
  numero,
  headingLevel = 'h3',
}: {
  projet: Realisation;
  numero: number;
  headingLevel?: 'h2' | 'h3';
}) {
  const Heading = headingLevel;
  const titleId = `projet-${projet.id}-titre`;

  return (
    <article id={`projet-${projet.id}`} aria-labelledby={titleId} className="projet relative">
      <Reveal className="plate-container">
        <Accrochage large={projet.accrochage.large} etroit={projet.accrochage.etroit} />
      </Reveal>

      <Reveal
        delay={60}
        className="site-container mt-gap-sm grid gap-x-gap-lg gap-y-gap-xs md:grid-cols-12"
      >
        <div className="md:col-span-6 lg:col-span-5">
          <span aria-hidden="true" className="projet__num">
            {String(numero).padStart(2, '0')}
          </span>
          <Heading id={titleId} className="text-display-sm font-extrabold">
            <Link href={realisationHref(projet.id) as Route} className="projet__lien link-draw">
              {projet.nom}
            </Link>
          </Heading>
          <p className="mt-2 text-body text-ink-muted">{metierEtLieu(projet)}</p>
        </div>

        <div className="md:col-span-6 md:col-start-7 md:pt-1.5">
          <p className="max-w-[46ch] text-body text-ink-muted">{projet.promesse}</p>
          <p className="mt-3 max-w-[52ch] text-body text-ink-muted">
            <b className="font-semibold text-ink">Livré</b>
            {' '}
            {livrablesEnPhrase(projet)}
          </p>
          <span aria-hidden="true" className="projet__cue mt-gap-xs">
            Lire l’étude de cas <i>→</i>
          </span>
        </div>
      </Reveal>
    </article>
  );
}

/** La liste des projets, identique sur l’accueil et sur /realisations. */
export function ProjectList({
  projets,
  headingLevel = 'h3',
}: {
  projets: readonly Realisation[];
  headingLevel?: 'h2' | 'h3';
}) {
  return (
    <ol role="list" className="grid gap-gap-xl">
      {projets.map((projet, index) => (
        <li key={projet.id}>
          <ProjectRow projet={projet} numero={index + 1} headingLevel={headingLevel} />
        </li>
      ))}
    </ol>
  );
}
