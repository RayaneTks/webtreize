import Image from 'next/image';
import type { CSSProperties } from 'react';
import type { Ecran, EcranAccroche } from '@/lib/data/realisations';
import { cn } from '@/lib/utils';

/** Largeur / hauteur de chaque format d’écran. */
const RATIO: Record<Ecran['format'], number> = {
  ordinateur: 1440 / 900,
  telephone: 390 / 844,
};

/** Dimensions intrinsèques transmises à `next/image`. */
const DIMENSIONS: Record<Ecran['format'], { width: number; height: number }> = {
  ordinateur: { width: 1440, height: 900 },
  telephone: { width: 390, height: 844 },
};

/**
 * Somme de ratios qui fixe la hauteur commune des écrans : un ordinateur et un
 * téléphone côte à côte. Un rang plus court se centre sans grandir — d’un projet
 * à l’autre, les écrans ont la même hauteur, le regard compare des métiers.
 */
export const REFERENCE_ACCUEIL = RATIO.ordinateur + RATIO.telephone;

export type Sizes = Record<Ecran['format'], string>;

/** Tailles servies sur l’accueil et en tête d’étude de cas (plaque de 1224 px au plus). */
export const SIZES_ACCROCHAGE: Sizes = {
  ordinateur: '(min-width: 1280px) 800px, (min-width: 768px) 66vw, 88vw',
  telephone: '(min-width: 1280px) 232px, (min-width: 768px) 20vw, 42vw',
};

type Rang = {
  ecrans: readonly EcranAccroche[];
  /** `large` : 768 px et plus ; `etroit` : en dessous ; `unique` : toujours. */
  variante: 'large' | 'etroit' | 'unique';
};

/**
 * L’accrochage : une plaque sable, des écrans nus posés côte à côte, alignés en
 * haut et tous à la même hauteur, une légende courte sous chacun.
 *
 * Aucun appareil dessiné, aucune ombre, aucune superposition : un écran est une
 * pièce, pas un accessoire. Le filet intérieur de la charte détache l’écran du
 * sable. Les colonnes sont proportionnelles au ratio de chaque écran, ce qui
 * donne des hauteurs égales sans aucune mesure.
 */
export function Accrochage({
  large,
  etroit,
  reference = REFERENCE_ACCUEIL,
  sizes = SIZES_ACCROCHAGE,
  priority = false,
  decoratif = false,
  className,
}: {
  large: readonly EcranAccroche[];
  /** Écrans à montrer sous 768 px. Absent : le rang `large` est montré partout. */
  etroit?: readonly EcranAccroche[];
  reference?: number;
  sizes?: Sizes;
  /** Réservé à l’écran d’ordinateur du héros d’une étude de cas. */
  priority?: boolean;
  /** Dans un lien qui porte déjà son nom : images `alt=""`, sans légende. */
  decoratif?: boolean;
  className?: string;
}) {
  const rangs: Rang[] = etroit
    ? [
        { ecrans: large, variante: 'large' },
        { ecrans: etroit, variante: 'etroit' },
      ]
    : [{ ecrans: large, variante: 'unique' }];

  return (
    <div className={cn('accrochage', className)} style={{ '--ref': reference } as CSSProperties}>
      {rangs.map((rang) => {
        const ratios = rang.ecrans.map(({ ecran }) => RATIO[ecran.format]);
        const style = {
          // ×10 : une somme de `fr` inférieure à 1 ne remplit qu’une fraction du
          // rang — un téléphone seul (0,46 fr) n’en occuperait que 46 %.
          '--cols': ratios.map((r) => `${(r * 10).toFixed(3)}fr`).join(' '),
          '--somme': ratios.reduce((a, b) => a + b, 0).toFixed(4),
          '--n': rang.ecrans.length,
        } as CSSProperties;

        return (
          <div
            key={rang.variante}
            className={cn(
              'accrochage__rang',
              rang.variante === 'large' && 'accrochage__rang--large',
              rang.variante === 'etroit' && 'accrochage__rang--etroit',
              rang.variante === 'unique' &&
                rang.ecrans.every(({ ecran }) => ecran.format === 'telephone') &&
                'accrochage__rang--telephones',
            )}
            style={style}
          >
            {rang.ecrans.map(({ ecran, legende }, index) => (
              <figure
                key={`${ecran.src}-${index}`}
                className={ecran.format === 'telephone' ? 'ecran ecran--telephone' : 'ecran ecran--ordinateur'}
              >
                <div className="ecran__dalle">
                  <Image
                    src={ecran.src}
                    alt={decoratif ? '' : ecran.alt}
                    {...DIMENSIONS[ecran.format]}
                    sizes={sizes[ecran.format]}
                    priority={priority && rang.variante !== 'etroit' && ecran.format === 'ordinateur'}
                  />
                </div>
                {decoratif ? null : <figcaption>{legende}</figcaption>}
              </figure>
            ))}
          </div>
        );
      })}
    </div>
  );
}
