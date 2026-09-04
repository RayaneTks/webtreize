import { Reveal } from '@/components/motion/Reveal';
import { PROMISES } from '@/lib/data/site';

/**
 * Les trois engagements — composant serveur.
 *
 * ## Pourquoi une grille et non `flex-wrap`
 *
 * `flex flex-wrap` + `flex-[1_1_16.25rem]` faisait absorber toute la largeur
 * restante par le dernier élément renvoyé à la ligne : à 900 px, les filets
 * mesuraient 393 / 393 / 821 px, à 768 px 329 / 329 / 689 px (finding critique
 * « flexwrap-orphelin-filet-pleine-largeur »). Le filet est précisément
 * l’élément par lequel la charte marque le soin : un filet deux fois trop long
 * est un accident visible.
 *
 * Colonnes explicites, donc : une jusqu’à `md`, trois au-delà. Vérifié à 360,
 * 768, 900, 1024 et 1440 px — trois filets de largeur rigoureusement égale à
 * chacun de ces paliers, jamais d’orphelin.
 *
 * ## Accent
 *
 * Aucun. Avec le point du logotype du header collant, un sur trois.
 */
export function PromisesSection() {
  return (
    <section id="promesses" aria-labelledby="promesses-title" className="section-pad">
      <div className="site-container">
        <Reveal>
          <h2
            id="promesses-title"
            className="mx-auto max-w-[22ch] text-center text-display-md font-extrabold"
          >
            Trois choses que nous écrivons noir sur blanc.
          </h2>
        </Reveal>

        <ul className="mt-gap-lg grid list-none gap-gap-md md:grid-cols-3">
          {PROMISES.map((item, index) => (
            <Reveal key={item.title} as="li" delay={index * 60} className="rule-top">
              <h3 className="text-title-sm font-bold">{item.title}</h3>
              <p className="mt-gap-xs text-body text-ink-muted">{item.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
