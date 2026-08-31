'use client';

import { useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { NAVBAR_OFFSET } from '@/hooks/useSmoothScroll';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * Shell client. La nouvelle DA n'utilise plus GrainOverlay ni MobileFab :
 * pas de texture décorative, pas de bouton flottant — le header suffit.
 */
export function ClientShell({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const hash = window.location.hash?.slice(1);
    if (!hash) return;
    const timer = setTimeout(() => {
      const el = document.getElementById(hash);
      if (!el) return;
      const y = el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
      window.scrollTo({ top: Math.max(0, y), behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }, 400);
    return () => clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <>
      <Header />
      <main id="main-content" className="relative">
        {children}
      </main>
    </>
  );
}
