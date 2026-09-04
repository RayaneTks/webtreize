import { clsx } from 'clsx';

/**
 * Citation éditoriale en Newsreader — figure unique du site.
 *
 * La même figure était écrite deux fois, avec des valeurs différentes à chaque
 * fois : `ApproachSection` en `clamp(1.75rem, 4.6vw, 3.625rem)` / `leading-[1.16]`
 * et `app/about/page.tsx` en `clamp(1.625rem, 4vw, 3rem)` / `leading-[1.18]`
 * (finding « citation-serif-dupliquee »). Deux réglages voisins mais jamais
 * identiques : à l’œil, les deux pages ne parlent pas la même langue.
 *
 * Elle est désormais écrite ici, une seule fois, sur l’échelle fermée du
 * projet : `text-display-sm`, la seule taille de titre que Newsreader porte
 * bien en graisse 300.
 *
 * ## Pourquoi `clsx` et non `cn`
 *
 * `cn` passe par `tailwind-merge`, qui ne connaît pas l’échelle typographique
 * du projet et arbitre `text-display-sm` contre `text-ink` comme deux classes
 * du même groupe : l’une des deux disparaît silencieusement. `clsx` concatène
 * sans arbitrer.
 *
 * ## Emploi
 *
 * Newsreader est réservé aux citations et aux grands chiffres (charte § 3) :
 * ce composant est le seul endroit du site où une phrase entière passe en
 * serif. Une seule citation par page.
 */

export type SerifQuoteProps = {
  children: React.ReactNode;
  className?: string;
};

export function SerifQuote({ children, className }: SerifQuoteProps) {
  return (
    <p
      className={clsx(
        'mx-auto max-w-[30ch] font-serif text-display-sm font-light',
        'leading-tight tracking-tight text-ink',
        className,
      )}
    >
      {children}
    </p>
  );
}

/**
 * Mot mis en valeur dans une citation — italique et terre cuite.
 *
 * C’est l’une des trois fentes d’accent autorisées par écran, et la seule que
 * la charte accorde au texte courant. Toujours `accent-deep` (5,33:1) : la
 * terre cuite pleine ne sert qu’aux aplats et au point du logotype.
 */
export function SerifQuoteEmphasis({ children }: { children: React.ReactNode }) {
  return <em className="italic text-accent-deep">{children}</em>;
}
