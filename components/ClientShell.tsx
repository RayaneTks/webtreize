'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { MobileFab } from '@/components/MobileFab';
import { NAVBAR_OFFSET } from '@/hooks/useSmoothScroll';

export function ClientShell({ children }: { children: React.ReactNode }) {

  useEffect(() => {
    const hash = window.location.hash?.slice(1);
    if (hash && ['services', 'vision', 'contact'].includes(hash)) {
      const timer = setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
          window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

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
