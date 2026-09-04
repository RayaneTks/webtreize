'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

/** Cadrages autorisés — le ratio est une décision de DA, pas un réglage libre. */
type PlateRatio = '16/9' | '4/3' | '1/1' | '3/4';

type PlateCommonProps = {
  /** Cadrage appliqué en `aspect-ratio` : jamais de hauteur fixe, donc jamais de CLS. */
  ratio?: PlateRatio;
  /** Réservé au LCP — une seule plaque du site doit le porter. */
  priority?: boolean;
  /** Largeurs servies, à recopier depuis docs/imagerie.md. */
  sizes?: string;
  /** Libellé du cadrage en attente, visible uniquement sans photo. */
  caption?: string;
  className?: string;
};

/**
 * Type discriminé : dès qu’une photo est fournie, l’alternative textuelle l’est
 * aussi. Une image purement décorative doit passer `alt=""` explicitement — le
 * build casse si on l’oublie.
 */
export type PlateProps =
  | (PlateCommonProps & { src: string; alt: string })
  | (PlateCommonProps & { src?: undefined; alt?: never });

const RATIO_CLASS: Record<PlateRatio, string> = {
  '16/9': 'aspect-[16/9]',
  '4/3': 'aspect-[4/3]',
  '1/1': 'aspect-square',
  '3/4': 'aspect-[3/4]',
};

/** Les grandes plaques prennent le rayon large, les autres le rayon courant. */
const RADIUS_CLASS: Record<PlateRatio, string> = {
  '16/9': 'rounded-plate-lg',
  '4/3': 'rounded-plate',
  '1/1': 'rounded-plate',
  '3/4': 'rounded-plate',
};

/** Rayures d’attente : un filet répété, ni motif décoratif ni dégradé. */
const WAITING_STRIPES =
  'repeating-linear-gradient(115deg, rgba(28, 24, 20, 0.045) 0 10px, transparent 10px 20px)';

/** Repères d’angle : le cadrage d’un studio qui attend sa photo. */
const CORNER_MARKS = [
  'left-3 top-3 border-l border-t',
  'right-3 top-3 border-r border-t',
  'bottom-3 left-3 border-b border-l',
  'bottom-3 right-3 border-b border-r',
];

/** Aplat sable (#EAE3D8) 8 × 6 en PNG : la plaque ne clignote jamais en blanc. */
const SAND_BLUR_DATA_URL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAMAAADJ2y/JAAAAA1BMVEXq49j+VJJlAAAACXBIWXMAAAPoAAAD6AG1e1JrAAAADElEQVR42mNgIAcAAAA2AAGIiWqBAAAAAElFTkSuQmCC';

/**
 * Plaque image du site. Avec `src`, sert une vraie photo via `next/image` ;
 * sans `src`, affiche le cadrage en attente décrit par `caption`.
 * Aucune ombre, aucun dégradé, aucun arrondi hors des tokens `rounded-plate`.
 *
 * ## Le fondu n’est plus écrit en classe utilitaire
 *
 * Le voile de chargement était posé par `opacity-0` dans le rendu serveur, puis
 * levé par `onLoad`. Sans JavaScript, `onLoad` n’est jamais appelé : les quatre
 * photos de l’accueil restaient invisibles pour toujours — le même défaut que
 * l’ancien `Reveal`, appliqué cette fois aux images. Vérifié dans le HTML
 * prérendu : quatre `opacity-0` sur `.next/server/app/index.html`.
 *
 * Le voile est donc décrit en CSS sous `html.js` (app/globals.css, section
 * « Mouvement piloté par attribut »), exactement comme celui de `Reveal` : sans
 * JavaScript la classe « js » est absente, aucune règle ne s’applique et les
 * photos sont peintes dès leur arrivée. `data-plate-loaded` est posé au
 * chargement, et la requête média « moins d’animations » neutralise le voile.
 */
export function Plate(props: PlateProps) {
  const { ratio = '4/3', priority = false, sizes = '100vw', caption, className } = props;
  const [isLoaded, setIsLoaded] = useState(false);

  const frame = cn(
    'relative isolate overflow-hidden bg-sand',
    RATIO_CLASS[ratio],
    RADIUS_CLASS[ratio],
    className,
  );

  if (props.src) {
    return (
      <div className={frame}>
        <Image
          src={props.src}
          alt={props.alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder="blur"
          blurDataURL={SAND_BLUR_DATA_URL}
          onLoad={() => setIsLoaded(true)}
          data-plate-image=""
          // `undefined` retire l’attribut : le sélecteur `:not([data-plate-loaded])`
          // du socle ne le voit donc pas tant que la photo n’est pas arrivée.
          data-plate-loaded={isLoaded ? '' : undefined}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className={cn(frame, 'flex items-center justify-center')}>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: WAITING_STRIPES }}
      />
      {CORNER_MARKS.map((mark) => (
        <span
          key={mark}
          aria-hidden="true"
          className={cn('pointer-events-none absolute h-3.5 w-3.5 border-line', mark)}
        />
      ))}
      {/* `text-ink-muted` et non la teinte d’étiquette par défaut : sur le sable
          de la plaque, `ink-faint` tombe à 4,03:1, sous le seuil AA. */}
      {caption ? (
        <span className="eyebrow relative max-w-[26ch] px-8 text-center text-ink-muted">
          {caption}
        </span>
      ) : null}
    </div>
  );
}
