import { Reveal } from '@/components/motion/Reveal';
import { PROCESS_STEPS } from '@/lib/data/site';

/**
 * La méthode, en quatre temps — composant serveur.
 *
 * ## Sémantique
 *
 * L’`<ol>` contenait des `<div>` Motion à la place des `<li>` : modèle de
 * contenu invalide et sémantique de liste détruite — un lecteur d’écran
 * n’annonçait ni le nombre d’étapes ni le rang de chacune (findings
 * « ol-contient-des-div » et « a11y-ol-li-casse-par-motion-div »). `Reveal`
 * rend désormais le `<li>` lui-même, par sa prop `as`.
 *
 * ## Mise en page
 *
 * `flex flex-wrap` + `flex-[1_1_13.75rem]` donnait 292 / 292 / 292 / 945 px à
 * 1024 px — la largeur d’un MacBook Air (finding critique
 * « flexwrap-orphelin-filet-pleine-largeur »). Colonnes explicites : une
 * jusqu’à `sm`, deux jusqu’à `lg`, quatre au-delà. Quatre étapes se répartissent
 * exactement sur ces trois paliers, donc jamais de ligne incomplète — vérifié à
 * 360 (1 × 4), 768 et 900 (2 × 2), 1024 et 1440 px (4 × 1).
 *
 * ## Accent
 *
 * Les quatre numéros d’étape étaient en terre cuite : à eux seuls, ils
 * dépassaient le quota de l’écran (finding critique
 * « regle-trois-terres-cuites-explosee »). Ils passent en `.eyebrow`, dont
 * c’est exactement le rôle — une étiquette discrète —, en chiffres tabulaires
 * pour que « 01 » et « 04 » aient la même chasse.
 */
export function ProcessSection() {
  return (
    <section id="methode" aria-labelledby="methode-title" className="section-pad bg-surface">
      <div className="site-container">
        <Reveal>
          <p className="eyebrow">Comment ça se passe</p>
          <h2 id="methode-title" className="mt-gap-xs max-w-[20ch] text-display-md font-extrabold">
            Quatre temps, sans mauvaise surprise.
          </h2>
        </Reveal>

        <ol className="mt-gap-lg grid list-none gap-gap-md sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS_STEPS.map((step, index) => (
            <Reveal key={step.title} as="li" delay={index * 60} className="rule-top">
              <span className="eyebrow tabular-nums">{String(index + 1).padStart(2, '0')}</span>
              <h3 className="mt-gap-xs text-title-sm font-bold">{step.title}</h3>
              <p className="mt-gap-xs text-body text-ink-muted">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
