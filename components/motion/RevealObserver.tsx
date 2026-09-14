'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/** Blocs `Reveal` que l’observateur n’a pas encore traités. */
const UNTREATED = '[data-reveal]:not([data-revealed]):not([data-reveal-pending])';

/** Blocs masqués en attendant leur entrée dans la fenêtre. */
const PENDING = '[data-reveal-pending]';

/** Part du bloc devant entrer dans le viewport pour déclencher l’apparition. */
const THRESHOLD = 0.15;

function reveal(element: Element): void {
  element.removeAttribute('data-reveal-pending');
  element.setAttribute('data-revealed', '');
}

function revealAll(): void {
  document.querySelectorAll(`${PENDING}, ${UNTREATED}`).forEach(reveal);
}

/**
 * Observateur unique des blocs `Reveal`.
 *
 * ## Ce qui est déjà à l’écran n’attend jamais le JavaScript
 *
 * Le masquage est posé **par cet observateur**, et seulement sur les blocs
 * situés sous la ligne de flottaison au moment où il s’exécute. Un bloc visible
 * au chargement n’est jamais voilé : il est peint avec le HTML, et le script le
 * marque simplement comme traité.
 *
 * L’ancienne logique voilait tous les blocs par CSS jusqu’au passage de
 * l’observateur, donc jusqu’à l’hydratation. Sur un téléphone moyen, le contenu
 * au-dessus de la ligne de flottaison attendait le JavaScript : le LCP mesuré
 * valait le temps d’interactivité (3,9 s), pas le temps de peinture (0,8 s).
 *
 * Voiler un bloc hors écran ne produit aucun clignotement — personne ne le voit
 * disparaître — et la règle CSS du voile désactive la transition pour ne rien
 * animer à ce moment-là.
 *
 * ## Garanties
 *
 * 1. Sous « prefers-reduced-motion : reduce », rien n’est jamais voilé.
 * 2. Sans `IntersectionObserver`, rien n’est voilé.
 * 3. À l’impression, tout ce qui était encore voilé est révélé.
 * 4. Après une navigation client, les blocs de la nouvelle page sont traités.
 */
export function RevealObserver() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      },
      { threshold: THRESHOLD, rootMargin: '0px 0px -6% 0px' },
    );

    // Une seule lecture de géométrie pour tous les blocs, avant toute écriture :
    // aucune alternance lecture-écriture, donc aucun recalcul de mise en page forcé.
    const viewportBottom = window.innerHeight;
    const blocks = Array.from(document.querySelectorAll(UNTREATED));
    const positions = blocks.map((element) => element.getBoundingClientRect().top);

    blocks.forEach((element, index) => {
      if (positions[index] < viewportBottom) {
        // Déjà à l’écran : peint avec le HTML, rien à animer.
        element.setAttribute('data-revealed', '');
      } else {
        element.setAttribute('data-reveal-pending', '');
        observer.observe(element);
      }
    });

    window.addEventListener('beforeprint', revealAll);

    return () => {
      observer.disconnect();
      window.removeEventListener('beforeprint', revealAll);
    };
  }, [pathname, prefersReducedMotion]);

  return null;
}
