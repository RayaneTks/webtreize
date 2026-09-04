'use client';

import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Une seule `MediaQueryList` pour tout le site. Chaque appel du hook s’abonne à
 * la même source : il n’y a jamais plusieurs écoutes en parallèle de la même
 * requête média, quel que soit le nombre de composants qui la consultent.
 */
let mediaQuery: MediaQueryList | null = null;

function getMediaQuery(): MediaQueryList | null {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return null;
  if (!mediaQuery) mediaQuery = window.matchMedia(QUERY);
  return mediaQuery;
}

function subscribe(onStoreChange: () => void): () => void {
  const mq = getMediaQuery();
  if (!mq) return () => {};
  mq.addEventListener('change', onStoreChange);
  return () => mq.removeEventListener('change', onStoreChange);
}

function getSnapshot(): boolean {
  return getMediaQuery()?.matches ?? false;
}

function getServerSnapshot(): boolean {
  return false;
}

/**
 * `true` si l’utilisateur a demandé moins d’animations (réglage du système ou
 * du navigateur).
 *
 * La valeur est lue par `useSyncExternalStore` : elle est donc juste dès le
 * premier rendu client, sans passer par un `useState` corrigé au montage. Les
 * effets qui en dépendent ne sont plus relancés une seconde fois après
 * l’hydratation — c’était la cause du décalage du défilement vers une ancre.
 *
 * C’est la seule implémentation du site : `useReducedMotion` de `motion/react`
 * ne doit plus être importé nulle part.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
