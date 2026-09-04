import Link from 'next/link';
import { clsx } from 'clsx';

/**
 * Logotype WebTreize.
 *
 * Toujours en minuscules : `webtreize.` Le point terre cuite est l’élément de
 * marque — il ferme le mot comme on termine une phrase.
 *
 * La charte §4 arrête une liste fermée d’interdits : ombre, contour, dégradé,
 * rotation, majuscules, italique, **changement de couleur du point**. Le point
 * est donc `accent` sur tous les fonds, clairs comme sombres. Sur l’encre
 * #17130F, la terre cuite ressort à 4,3:1 : largement suffisant pour un point,
 * et de toute façon exempté du seuil de contraste au titre du logotype.
 *
 * `leading-none` n’est pas un détail : le mot fait 19 px et la barre du header
 * 60 px. Avec l’interligne du corps de texte (1,7) la boîte de ligne montait à
 * 30 px et ne laissait que 15 px de respiration, sous la hauteur du mot exigée
 * par la charte §4. Ramenée à 19 px, la respiration passe à 20,5 px.
 *
 * Composition par `clsx` et non `cn` : `tailwind-merge` range `text-title-sm`
 * dans les couleurs de texte et supprimerait `text-ink`. Détail dans l’en-tête
 * de `components/ui/Button.tsx`.
 */
export function Logo({
  className,
  tone = 'ink',
}: {
  className?: string;
  tone?: 'ink' | 'canvas';
}) {
  return (
    <span
      className={clsx(
        'inline-flex items-baseline gap-px text-title-sm font-extrabold leading-none tracking-[-0.045em]',
        tone === 'ink' ? 'text-ink' : 'text-canvas',
        className,
      )}
    >
      webtreize
      <span className="text-accent">.</span>
    </span>
  );
}

export function LogoLink({
  className,
  tone = 'ink',
}: {
  className?: string;
  tone?: 'ink' | 'canvas';
}) {
  return (
    <Link href="/" aria-label="WebTreize, accueil" className={clsx('shrink-0', className)}>
      <Logo tone={tone} />
    </Link>
  );
}

/**
 * Monogramme carré : avatar de réseau social, favicon, tampon.
 *
 * La taille de la boîte est décidée par l’appelant (`h-9 w-9`, `h-12 w-12`…) ;
 * le cran typographique se surcharge par `className` si la boîte grandit. Le
 * carré arrondi prend `rounded-xl`, le seul rayon du socle à l’échelle d’une
 * pastille — `rounded-plate` monte à 26 px et arrondirait le carré en galet.
 *
 * La variante terre cuite écrit en ivoire, pas en blanc pur : la charte ne
 * connaît que ses cinq valeurs. Le contraste du chiffre est celui d’un
 * logotype, exempté du seuil 1.4.3 — et le monogramme est de toute façon
 * décoratif, donc masqué aux technologies d’assistance.
 */
export function Monogram({
  className,
  variant = 'ink',
}: {
  className?: string;
  variant?: 'ink' | 'accent';
}) {
  return (
    <span
      className={clsx(
        'inline-flex items-center justify-center rounded-xl text-note font-extrabold leading-none tracking-[-0.04em]',
        variant === 'ink' ? 'bg-ink text-canvas' : 'bg-accent text-canvas',
        className,
      )}
      aria-hidden="true"
    >
      13
    </span>
  );
}
