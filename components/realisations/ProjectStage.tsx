import { BrowserFrame, PhoneFrame } from '@/components/realisations/Devices';
import type { Realisation } from '@/lib/data/realisations';
import { cn } from '@/lib/utils';

/**
 * Largeur maximale de la scène, en pixels CSS : pleine largeur du conteneur
 * (1224 px) ou demi-largeur dans la grille de l’accueil.
 */
type StageWidth = 'full' | 'half';

/** Part de la scène occupée par chaque écran, reprise des règles `[data-composition]` de app/globals.css. */
const PART: Record<Realisation['scene']['composition'], { o: number[]; t: number[] }> = {
  'vitrine-gestion': { o: [0.58, 0.54], t: [0.16] },
  'ordinateur-telephones': { o: [0.68], t: [0.18, 0.18] },
  'trois-telephones': { o: [], t: [0.22, 0.22, 0.22] },
  'ordinateur-telephone': { o: [0.7], t: [0.2] },
};

/**
 * `sizes` exact pour un écran qui occupe `part` de la scène : sans lui,
 * `next/image` servirait une capture de 2 400 px pour un téléphone de 90 px.
 */
function sizesFor(part: number, width: StageWidth): string {
  const desktop = Math.round((width === 'full' ? 1224 : 600) * part);
  const tablet = Math.round(part * (width === 'full' ? 94 : 46));
  return `(min-width: 1280px) ${desktop}px, (min-width: 768px) ${tablet}vw, ${Math.round(part * 92)}vw`;
}

/**
 * Noms de classe écrits en toutes lettres : Tailwind purge de la couche
 * `components` toute classe qu’il ne trouve pas littéralement dans le code.
 * Un nom construit (`stage__o${i}`) serait supprimé du CSS de production.
 */
const ORDINATEUR_CLASS = ['stage__o1', 'stage__o2'] as const;
const TELEPHONE_CLASS = ['stage__t1', 'stage__t2', 'stage__t3'] as const;

/** Vrai si l’aplat est assez sombre pour porter un texte clair (luminance relative < 0,35). */
export function fondSombre(hex: string): boolean {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.35;
}

/**
 * La scène d’un projet : l’aplat aux couleurs du client, et ses écrans posés
 * dessus selon sa composition. Purement visuelle — les écrans gardent leur
 * texte alternatif, mais le lien qui l’entoure porte le nom du projet.
 */
export function ProjectStage({
  projet,
  width = 'full',
  priority = false,
  className,
}: {
  projet: Realisation;
  width?: StageWidth;
  priority?: boolean;
  className?: string;
}) {
  const { scene } = projet;
  const part = PART[scene.composition];

  return (
    <div
      data-composition={scene.composition}
      className={cn('stage rounded-plate-lg', className)}
      style={{ backgroundColor: scene.fond }}
    >
      {scene.ordinateurs.map((ecran, i) => (
        <BrowserFrame
          key={ecran.src}
          ecran={ecran}
          sizes={sizesFor(part.o[i] ?? 0.6, width)}
          // Seul l’écran principal du premier projet est candidat au LCP.
          priority={priority && i === 0}
          className={ORDINATEUR_CLASS[i]}
        />
      ))}
      {scene.telephones.map((ecran, i) => (
        <PhoneFrame
          key={ecran.src}
          ecran={ecran}
          sizes={sizesFor(part.t[i] ?? 0.2, width)}
          className={TELEPHONE_CLASS[i]}
        />
      ))}
    </div>
  );
}
