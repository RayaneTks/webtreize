'use client';

import { useEffect } from 'react';
import { GrainOverlay } from '@/components/decor/GrainOverlay';
import { Header } from '@/components/layout/Header';
import { MobileFab } from '@/components/MobileFab';
import { NAVBAR_OFFSET } from '@/hooks/useSmoothScroll';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

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
      <GrainOverlay />
      <Header />
      <main id="main-content" className="relative">
        {children}
      </main>
      <MobileFab />
    </>
  );
}
