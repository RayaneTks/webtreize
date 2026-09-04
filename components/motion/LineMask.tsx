import { cn } from '@/lib/utils';

type LineMaskProps = {
  children: React.ReactNode;
  /** Balise rendue. Le cas d’usage prévu est le `h1` du héros. */
  as?: 'h1' | 'h2' | 'p' | 'span' | 'div';
  id?: string;
  className?: string;
};

/**
 * Découverte d’un titre par masque, **sans animation d’opacité**.
 *
 * Le titre du héros est l’élément LCP du site : une opacité animée le rendrait
 * invisible pour la mesure de Chrome autant que pour un visiteur sans
 * JavaScript. Ici l’opacité reste à 1 et c’est le découpage qui s’anime — un
 * `clip-path` qui remonte du bas vers le haut. Même lecture qu’un masque de
 * ligne, sans découper le DOM ni mesurer la moindre ligne en JavaScript.
 *
 * Composant **serveur**, CSS pur (app/globals.css, `html.js [data-line-mask]`) :
 * l’animation démarre à la lecture de la feuille de style, pas après
 * l’hydratation. Sans JavaScript, la classe « html.js » est absente et aucun
 * masque ne s’applique.
 */
export function LineMask({ children, as: Tag = 'h1', id, className }: LineMaskProps) {
  return (
    <Tag id={id} data-line-mask="" className={cn(className)}>
      {children}
    </Tag>
  );
}
