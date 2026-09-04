'use client';

import { useCallback } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * Défilement vers une ancre du document courant.
 *
 * Le décalage du header collant n’est plus recalculé ici. `app/globals.css`
 * pose `scroll-margin-top: calc(var(--header-height) + 1rem)` sur tout élément
 * porteur d’un `id` : `scrollIntoView` le respecte, exactement comme le
 * navigateur le fait sur un `href="#ancre"` ordinaire. La constante 76 qui
 * doublait le jeton — et le `getBoundingClientRect` qu’elle imposait à chaque
 * appel — ont disparu ; une seule valeur gouverne désormais le décalage, celle
 * du socle.
 *
 * Ce hook ne sert plus qu’aux ancres écrites dans un composant déjà client. Un
 * simple `<a href="#audit">` obtient le même résultat sans une ligne de
 * JavaScript : `scroll-behavior: smooth` et `scroll-padding-top` sont déclarés
 * sur `html`, et la requête média « moins d’animations » y bascule seule en
 * défilement instantané.
 */
export function useSmoothScroll() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return useCallback(
    (event: React.MouseEvent, href: string) => {
      if (!href.startsWith('#')) return;

      // Cible absente : on laisse le navigateur faire ce qu’il sait faire du
      // lien, plutôt que d’annuler la navigation pour ne rien exécuter.
      const element = document.getElementById(href.slice(1));
      if (!element) return;

      event.preventDefault();
      element.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });

      try {
        window.history.pushState(null, '', href);
      } catch {
        // Silencieux : `pushState` échoue dans une prévisualisation en bac à sable.
      }
    },
    [prefersReducedMotion],
  );
}
