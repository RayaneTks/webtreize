import { Reveal } from '@/components/motion/Reveal';
import { SerifQuote, SerifQuoteEmphasis } from '@/components/sections/SerifQuote';
import { APPROACH } from '@/lib/data/site';

/**
 * Section « Approche » — composant serveur.
 *
 * Elle figure au plan du site (footer) et n’avait jusqu’ici aucun titre : un
 * lecteur d’écran arrivait sur une région anonyme (finding
 * « section-approche-sans-titre »). Le `h2` vient de `APPROACH.title`.
 *
 * Il est volontairement écrit au cran `title` et en `ink-muted` : la voix forte
 * de la section, c’est la citation juste en dessous. Deux titres display
 * consécutifs se neutraliseraient.
 *
 * Compte d’accent de l’écran : le mot mis en valeur dans la citation, et rien
 * d’autre. Avec le point du logotype du header collant, deux sur trois.
 */
export function ApproachSection() {
  const [before, after] = APPROACH.quote.split(APPROACH.emphasis);

  return (
    <section id="approche" aria-labelledby="approche-title" className="section-pad">
      <div className="site-container text-center">
        <Reveal>
          <h2
            id="approche-title"
            className="mx-auto max-w-[26ch] text-title font-bold text-ink-muted"
          >
            {APPROACH.title}
          </h2>

          <SerifQuote className="mt-gap-sm">
            {before}
            <SerifQuoteEmphasis>{APPROACH.emphasis}</SerifQuoteEmphasis>
            {after}
          </SerifQuote>
        </Reveal>

        <Reveal delay={60}>
          <p className="lede mx-auto mt-gap-md max-w-[56ch]">{APPROACH.body}</p>
        </Reveal>
      </div>
    </section>
  );
}
