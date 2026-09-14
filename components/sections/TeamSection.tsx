import Image from 'next/image';
import { Reveal } from '@/components/motion/Reveal';
import { EQUIPE } from '@/lib/data/equipe';

/**
 * « Qui vous répond » — les personnes réellement derrière le studio.
 *
 * Ne rend rien tant que `lib/data/equipe.ts` est vide : aucune silhouette
 * générique, aucun prénom de convenance.
 */
export function TeamSection() {
  if (EQUIPE.length === 0) return null;

  return (
    <section aria-labelledby="equipe-title" className="section-pad bg-surface">
      <div className="site-container">
        <Reveal>
          <p className="eyebrow">Qui vous répond</p>
          <h2 id="equipe-title" className="sweep mt-gap-xs max-w-[20ch] text-display-sm font-extrabold">
            {EQUIPE.length === 1 ? 'La personne derrière chaque projet.' : 'Les personnes derrière chaque projet.'}
          </h2>
        </Reveal>

        <ul className="mt-gap-lg grid gap-gap-lg sm:grid-cols-2 lg:grid-cols-3">
          {EQUIPE.map((membre, index) => (
            <Reveal key={membre.nom} as="li" delay={index * 60}>
              {membre.photo ? (
                <div className="relative aspect-[4/5] overflow-hidden rounded-plate bg-sand">
                  <Image
                    src={membre.photo.src}
                    alt={membre.photo.alt}
                    fill
                    sizes="(min-width: 1024px) 340px, (min-width: 640px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : null}
              <h3 className="mt-gap-sm text-title font-bold text-ink">{membre.nom}</h3>
              <p className="text-note font-semibold text-ink-faint">{membre.role}</p>
              <p className="mt-gap-xs text-body text-ink-muted">{membre.bio}</p>
              {membre.linkedin ? (
                <a
                  href={membre.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-draw mt-gap-xs inline-block text-note font-semibold text-accent-deep"
                >
                  LinkedIn<span className="sr-only"> de {membre.nom} (nouvelle fenêtre)</span>
                </a>
              ) : null}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
