import type { Route } from 'next';
import Link from 'next/link';
import { clsx } from 'clsx';

/**
 * Bouton unique du site — SPEC 5.
 *
 * Composant **serveur** : aucun état, aucun hook, aucune frontière client. Il
 * choisit sa balise selon la destination — `next/link` pour une route interne,
 * `<a>` pour une adresse externe, `<button>` sans `href`.
 *
 * ## Pourquoi `clsx` et non `cn`
 *
 * `cn` passe par `tailwind-merge`, qui ne connaît pas l’échelle typographique du
 * projet : il classe `text-body-lg`, `text-note` ou `text-title-sm` dans le
 * groupe « couleur de texte » et supprime donc `text-canvas` — ou la taille,
 * selon l’ordre. Vérifié : `twMerge('text-body-lg', 'text-canvas')` rend
 * `text-canvas` seul. Tant que `lib/utils.ts` n’a pas déclaré l’échelle à
 * `extendTailwindMerge`, toute composition « taille + couleur » passée à `cn`
 * perd silencieusement une des deux classes. `clsx` concatène sans arbitrer :
 * les deux classes survivent. Le jour où `lib/utils.ts` sera corrigé, ce
 * fichier continuera de fonctionner à l’identique.
 *
 * ## Mouvement
 *
 * `.press` (globals.css) porte le `scale(0.985)` de l’appui ; l’utilitaire
 * `transition` porte la bascule de couleur du survol. Les deux cohabitent sur
 * la même balise, et la couche `utilities` de Tailwind l’emporte sur la couche
 * `components` : la durée effective du retour d’appui est celle du projet
 * (150 ms) et non les 80 ms déclarés par `.press`. Écart assumé — la seule
 * alternative serait de ne pas animer la couleur du survol.
 *
 * L’anneau de focus n’est écrit nulle part ici : il est posé globalement en
 * `@layer base` sur `a[href]` et `button`.
 */

type ButtonVariant = 'primary' | 'inverse' | 'quiet' | 'text';
type ButtonSize = 'sm' | 'md';

type ButtonBaseProps = {
  /** Défaut « primary ». */
  variant?: ButtonVariant;
  /** Défaut « md » (3,25 rem). Le CTA du header prend « sm » (2,25 rem). */
  size?: ButtonSize;
  /** Ajoute la flèche « → », décalée de 3 px au survol et au focus. */
  arrow?: boolean;
  /** Bouton natif uniquement : libellé remplacé, largeur figée, `aria-busy`. */
  loading?: boolean;
  className?: string;
  children: React.ReactNode;
};

type ButtonLinkProps = ButtonBaseProps & {
  /**
   * Route interne vérifiée par `typedRoutes`, ou adresse quelconque.
   *
   * L’intersection `string & {}` garde l’autocomplétion des routes connues sans
   * fermer le type aux ancres calculées (`/#audit`) ni aux protocoles
   * (`mailto:`, `https:`) — conformément à la signature du SPEC 5.
   */
  href: Route | (string & {});
  /** Force le rendu en `<a>` pour un chemin que le routeur ne doit pas gérer. */
  external?: boolean;
};

type ButtonNativeProps = ButtonBaseProps & {
  href?: undefined;
  type?: 'button' | 'submit';
};

export type ButtonProps = ButtonLinkProps | ButtonNativeProps;

/** Libellé de l’état de chargement. Le site n’a qu’un formulaire. */
const LOADING_LABEL = 'Envoi en cours…';

/**
 * Hauteurs du SPEC 5. Le socle n’expose pas de jeton de hauteur de contrôle et
 * l’échelle Tailwind n’a ni 3,25 rem ni 2,25 rem : ces deux valeurs sont donc
 * écrites ici, une seule fois, et `Field` s’aligne sur la première.
 */
const SHAPE: Record<ButtonSize, string> = {
  md: 'h-[3.25rem] px-8',
  sm: 'h-[2.25rem] px-5',
};

const LABEL_SIZE: Record<ButtonSize, string> = {
  md: 'text-body-lg',
  sm: 'text-note',
};

/**
 * Le survol bascule en `accent-deep` : 5,9:1 avec `text-white`, quand
 * `bg-accent` n’atteindrait que 4,49:1 et échouerait le seuil AA.
 */
const SURFACE: Record<Exclude<ButtonVariant, 'text'>, string> = {
  primary: 'bg-ink text-canvas hover:bg-accent-deep hover:text-white',
  inverse: 'bg-canvas text-ink hover:bg-accent-deep hover:text-white',
  quiet: 'border border-line-strong text-ink hover:border-accent-deep hover:text-accent-deep',
};

/** Interne au routeur : un chemin absolu, jamais une adresse sans hôte (`//`). */
function isInternalPath(href: string): boolean {
  return href.startsWith('/') && !href.startsWith('//');
}

/** Seules les adresses http(s) ouvrent un onglet ; `mailto:` et `tel:` non. */
function isHttpUrl(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

function rootClass(variant: ButtonVariant, size: ButtonSize, className?: string): string {
  if (variant === 'text') {
    // Pas d’utilitaire `transition` ici : il redéfinirait `transition-property`
    // et empêcherait `.link-draw` d’animer son `background-size`.
    return clsx(
      'group link-draw inline-flex items-center gap-2 font-semibold text-accent-deep',
      LABEL_SIZE[size],
      className,
    );
  }

  return clsx(
    'group press inline-flex items-center justify-center gap-2 rounded-full font-semibold transition',
    SHAPE[size],
    LABEL_SIZE[size],
    SURFACE[variant],
    className,
  );
}

/** Décalage de 3 px, jamais plus (SPEC 4.4). Purement décorative, donc masquée. */
function Arrow() {
  return (
    <span
      aria-hidden="true"
      className="transition-transform group-hover:translate-x-[3px] group-focus-visible:translate-x-[3px]"
    >
      →
    </span>
  );
}

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    arrow = false,
    loading = false,
    className,
    children,
  } = props;

  const root = rootClass(variant, size, className);
  const arrowNode = arrow ? <Arrow /> : null;

  if (props.href === undefined) {
    const { type = 'button' } = props;

    if (loading) {
      // Le libellé d’origine reste dans le flux, invisible et masqué aux
      // technologies d’assistance : il fige la largeur du bouton pendant
      // l’envoi. Le libellé de chargement se superpose, centré. Rien de tout
      // cela n’existe dans le HTML servi : `loading` vaut false par défaut.
      return (
        <button
          type={type}
          disabled
          aria-busy="true"
          className={clsx(root, 'relative disabled:cursor-not-allowed')}
        >
          <span aria-hidden="true" className="invisible">
            {children}
            {arrowNode}
          </span>
          <span className="absolute inset-0 flex items-center justify-center">{LOADING_LABEL}</span>
        </button>
      );
    }

    return (
      <button type={type} className={root}>
        {children}
        {arrowNode}
      </button>
    );
  }

  const { href, external = false } = props;

  if (external || !isInternalPath(href)) {
    const opensNewTab = isHttpUrl(href);

    return (
      <a
        href={href}
        target={opensNewTab ? '_blank' : undefined}
        rel={opensNewTab ? 'noreferrer noopener' : undefined}
        className={root}
      >
        {children}
        {/* `sr-only` est positionné en absolu : la mention n’ajoute aucun espace. */}
        {opensNewTab ? <span className="sr-only"> (nouvelle fenêtre)</span> : null}
        {arrowNode}
      </a>
    );
  }

  return (
    <Link href={href as Route} className={root}>
      {children}
      {arrowNode}
    </Link>
  );
}
