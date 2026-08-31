'use client';

import { useCallback } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const NAVBAR_OFFSET = 76;

export function useSmoothScroll() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return useCallback((e: React.MouseEvent, href: string) => {
    if (!href.startsWith('#')) return;

    e.preventDefault();
    const id = href.slice(1);
    const element = document.getElementById(id);

    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - NAVBAR_OFFSET;

      window.scrollTo({
        top: offsetPosition,
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
      });

      try {
        window.history.pushState(null, '', href);
      } catch {
        // Silencieux : erreur possible en mode preview restreint (iframe)
      }
    }
  }, [prefersReducedMotion]);
}

export { NAVBAR_OFFSET };
