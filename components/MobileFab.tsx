'use client';

import React from 'react';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

export function MobileFab() {
  const scroll = useSmoothScroll();

  return (
    <div className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[85%] max-w-[280px] pointer-events-auto">
      <Link
        href="#contact"
        onClick={(e) => scroll(e, '#contact')}
        className="w-full flex items-center justify-center gap-2 bg-white text-black font-black py-3.5 px-5 text-sm sm:text-base rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.8)] border border-white/20 active:scale-95 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
      >
        <MessageCircle className="w-5 h-5" aria-hidden />
        Obtenir un Devis
      </Link>
    </div>
  );
}
