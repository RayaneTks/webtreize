'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/** Sélecteur des blocs encore masqués. */
const PENDING = '[data-reveal]:not([data-revealed])';

/** Part du bloc devant entrer dans le viewport pour déclencher l’apparition. */
const THRESHOLD = 0.15;

/**
 * Filet de sécurité, en millisecondes. Passé ce délai, plus aucun bloc ne peut
 * rester masqué, quelle qu’en soit la raison : observateur indisponible, onglet
 * resté en arrière-plan, contenu inséré hors du cycle de rendu.
 */
const SAFETY_NET_MS = 1200;

function markRevealed(element: Element): void {
  element.setAttribute('data-revealed', '');
}

function revealAll(): void {
  document.querySelectorAll(PENDING).forEach(markRevealed);
}

/**
 * Observateur unique des blocs `Reveal`.
 *
 * Monté une seule fois, dans `ClientShell`. Il ne rend rien : il se contente de
 * poser `data-revealed` sur les blocs qui entrent dans le viewport, le masquage
 * et la transition étant entièrement décrits en CSS — `app/globals.css`,
 * section « Mouvement piloté par attribut », sous le sélecteur `html.js`.
 *
 * Trois garanties :
 * 1. sous « prefers-reduced-motion : reduce », tout est révélé au montage et
 *    rien n’est observé ;
 * 2. au bout de {@link SAFETY_NET_MS}, tout bloc encore masqué est révélé
 *    d’office — le contenu ne peut pas rester invisible ;
 * 3. après une navigation client, les blocs de la nouvelle page sont observés à
 *    leur tour.
 */
export function RevealObserver() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const pathname = usePathname();

  useEffect(() => {
    // Moins d’animations demandées, ou navigateur sans IntersectionObserver :
    // on révèle tout et on n’observe rien.
    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          markRevealed(entry.target);
          observer.unobserve(entry.target);
        }
      },
      { threshold: THRESHOLD, rootMargin: '0px 0px -6% 0px' },
    );

    document.querySelectorAll(PENDING).forEach((element) => observer.observe(element));

    const safetyNet = window.setTimeout(() => {
      observer.disconnect();
      revealAll();
    }, SAFETY_NET_MS);

    return () => {
      window.clearTimeout(safetyNet);
      observer.disconnect();
    };
  }, [pathname, prefersReducedMotion]);

  return null;
}
