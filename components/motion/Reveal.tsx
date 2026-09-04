import { cn } from '@/lib/utils';

/** Au-delà de ce seuil, l’entrée d’un bloc cesse d’être un décalage et devient une attente. */
const MAX_DELAY = 300;

/** Le décalage se lit sur une grille de 60 ms — cinq crans, pas un de plus. */
const DELAY_STEP = 60;

type RevealProps = {
  children: React.ReactNode;
  /** Décalage d’entrée en millisecondes. Arrondi au multiple de 60, plafonné à 300. */
  delay?: number;
  /** Balise rendue. `li` sert aux listes, dont le modèle de contenu refuse les `div`. */
  as?: 'div' | 'li' | 'section' | 'p';
  className?: string;
};

function normalizeDelay(delay: number): number {
  if (!Number.isFinite(delay) || delay <= 0) return 0;
  return Math.min(Math.round(delay / DELAY_STEP) * DELAY_STEP, MAX_DELAY);
}

/**
 * Apparition d’un bloc à son entrée dans le viewport.
 *
 * Composant **serveur** : il n’importe rien de `motion/react` et ne rend aucun
 * masquage. Le HTML servi contient le contenu visible — ni `opacity: 0`, ni
 * `visibility: hidden`. C’est la condition pour que le site existe sans
 * JavaScript et pour que le titre du héros soit peint immédiatement.
 *
 * Le masquage n’existe que sous « html.js » (app/globals.css, section
 * « Mouvement piloté par attribut »), classe posée avant la première peinture
 * par le script inline du <head>. L’attribut `data-revealed` est posé par
 * `RevealObserver`, monté une seule fois dans `ClientShell`.
 */
export function Reveal({ children, delay = 0, as: Tag = 'div', className }: RevealProps) {
  const revealDelay = normalizeDelay(delay);

  return (
    <Tag
      data-reveal=""
      className={cn(className)}
      style={
        revealDelay > 0
          ? ({ '--reveal-delay': `${revealDelay}ms` } as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </Tag>
  );
}
