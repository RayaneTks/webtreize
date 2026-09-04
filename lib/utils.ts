import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * Échelle typographique du projet, telle qu’elle est déclarée dans
 * `tailwind.config.ts`. Elle doit être répétée ici, et c’est la seule
 * duplication tolérée du socle.
 *
 * Pourquoi : `tailwind-merge` ne lit pas la configuration Tailwind. Il connaît
 * les tailles natives (`text-sm`, `text-lg`, `text-2xl`…) et range **tout autre**
 * `text-*` dans le groupe « couleur de texte ». Sans cette déclaration,
 * `cn('text-body-lg', 'text-canvas')` rend `text-canvas` seul : la taille
 * disparaît en silence, sans erreur de compilation ni avertissement de lint.
 *
 * Toute taille ajoutée à `fontSize` dans `tailwind.config.ts` doit être ajoutée
 * ici le même jour.
 */
const FONT_SIZES = [
  'label',
  'note',
  'body',
  'body-lg',
  'title-sm',
  'title',
  'display-sm',
  'display-md',
  'display-lg',
  'display-xl',
] as const;

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: [...FONT_SIZES] }],
    },
  },
});

/** Concatène des classes puis arbitre les conflits Tailwind. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
