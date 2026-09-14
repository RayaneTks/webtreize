import { Reveal } from '@/components/motion/Reveal';
import { TEMOIGNAGES, type Temoignage } from '@/lib/data/temoignages';

const DATE_FORMAT = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric', timeZone: 'UTC' });

/**
 * Témoignages — rendus uniquement s’il en existe de vrais.
 *
 * Le composant ne rend **rien** quand la liste est vide : pas de titre, pas
 * d’espace réservé. Voir les règles d’admission en tête de
 * `lib/data/temoignages.ts`.
 *
 * `realisationId` restreint l’affichage aux avis d’un projet, pour la page
 * d’étude de cas correspondante.
 */
export function TestimonialsSection({
  realisationId,
  className,
}: {
  realisationId?: string;
  className?: string;
}) {
  const avis = realisationId
    ? TEMOIGNAGES.filter((t) => t.realisationId === realisationId)
    : TEMOIGNAGES;

  if (avis.length === 0) return null;

  return (
    <section aria-labelledby="temoignages-title" className={className ?? 'section-pad'}>
      <div className="site-container">
        <Reveal>
          <p className="eyebrow">Ils en parlent</p>
          <h2 id="temoignages-title" className="sweep mt-gap-xs max-w-[20ch] text-display-sm font-extrabold">
            {avis.length === 1 ? 'Ce qu’en dit la personne concernée.' : 'Ce qu’en disent les personnes concernées.'}
          </h2>
        </Reveal>

        <ul className="mt-gap-lg grid gap-gap-md md:grid-cols-2">
          {avis.map((temoignage, index) => (
            <Reveal key={`${temoignage.auteur}-${temoignage.date}`} as="li" delay={index * 60} className="rule-top">
              <Avis temoignage={temoignage} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Avis({ temoignage }: { temoignage: Temoignage }) {
  return (
    <figure>
      <blockquote className="font-serif text-title font-light text-ink">
        <p>«&#8239;{temoignage.citation}&#8239;»</p>
      </blockquote>
      <figcaption className="mt-gap-sm text-note text-ink-muted">
        <span className="font-semibold text-ink">{temoignage.auteur}</span>, {temoignage.fonction}
        <span className="block text-ink-faint">
          {temoignage.source.href ? (
            <a href={temoignage.source.href} target="_blank" rel="noopener noreferrer" className="link-draw">
              {temoignage.source.label}
            </a>
          ) : (
            temoignage.source.label
          )}
          {' · '}
          <time dateTime={temoignage.date}>{DATE_FORMAT.format(new Date(temoignage.date))}</time>
        </span>
      </figcaption>
    </figure>
  );
}
