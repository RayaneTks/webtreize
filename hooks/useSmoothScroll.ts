'use client';

import { useCallback } from 'react';

const NAVBAR_OFFSET = 80;

export function useSmoothScroll() {
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
        behavior: 'smooth',
      });

      try {
        window.history.pushState(null, '', href);
      } catch {
        // Silencieux : erreur possible en mode preview restreint (iframe)
      }
    }
  }, []);
}

export { NAVBAR_OFFSET };
