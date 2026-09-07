import { Reveal } from '@/components/motion/Reveal';
import { Accordion } from '@/components/ui/Accordion';
import { FAQ_ITEMS } from '@/lib/data/faq';

/**
 * Questions fréquentes — composant serveur.
 *
 * ## Alignement
 *
 * La section vivait dans un conteneur `max-w-[50rem]` centré : son titre
 * démarrait 160 px à droite de tous les autres titres du site, sur la dernière
 * section avant le footer — le défaut d’alignement le plus visible de la page
 * (finding « faq-container-desaligne-160px »). Elle passe en `.site-container`,
 * la colonne de tout le site, et c’est la **colonne de lecture des réponses**
 * qui est limitée à l’intérieur. L’alignement des titres est retrouvé, la
 * longueur de ligne reste tenue.
 *
 * ## Ouverture
 *
 * `<details>` natif via `Accordion` : l’animation vient de `app/globals.css`
 * (`interpolate-size` et `::details-content`), sans une ligne de JavaScript
 * (finding « faq-details-sans-animation »). Le signe pivote en `--dur-state`.
 *
 * ## Accent
 *
 * Aucun : le signe des quatre questions est en `ink-muted` depuis le socle.
 * Avec le point du logotype, un sur trois.
 */
export function FaqSection() {
  return (
    <section id="questions" aria-labelledby="questions-title" className="section-pad">
      <div className="site-container">
        <Reveal>
          <h2 id="questions-title" className="sweep max-w-[16ch] text-display-sm font-extrabold">
            Questions fréquentes
          </h2>
        </Reveal>

        <div className="mt-gap-lg max-w-[50rem]">
          {FAQ_ITEMS.map((item, index) => (
            <Reveal key={item.q} delay={index * 60}>
              <Accordion question={item.q}>
                <p>{item.a}</p>
              </Accordion>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
