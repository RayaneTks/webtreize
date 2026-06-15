'use client';

import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { MobileFab } from '@/components/MobileFab';
import { NAVBAR_OFFSET } from '@/hooks/useSmoothScroll';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export function ClientShell({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const hash = window.location.hash?.slice(1);
    if (hash) {
      const timer = setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
          window.scrollTo({
            top: Math.max(0, y),
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
          });
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [prefersReducedMotion]);

  return (
    <>
      <Navbar />
      <main id="main-content" className="relative z-10">
        {children}
      </main>
      <MobileFab />
    </>
  );
}
