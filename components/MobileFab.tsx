'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { cn } from '@/lib/utils';

export function MobileFab() {
  const scroll = useSmoothScroll();
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [isContactVisible, setIsContactVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('hero');
    const contact = document.getElementById('contact');
    if (!hero || !contact) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === 'hero') setIsHeroVisible(entry.isIntersecting);
          if (entry.target.id === 'contact') setIsContactVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1, rootMargin: '0px' }
    );
    observer.observe(hero);
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  const showFab = !isHeroVisible && !isContactVisible;

  return (
    <div
      className={cn(
        'md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[85%] max-w-[280px] transition-all duration-300 ease-out',
        showFab
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      )}
    >
      <Link
        href="#contact"
        onClick={(e) => scroll(e, '#contact')}
        className="w-full flex items-center justify-center gap-2 bg-white text-black font-black py-3.5 px-5 text-sm sm:text-base rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.8)] border border-white/20 active:scale-95 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030303]"
      >
        <MessageCircle className="w-5 h-5" aria-hidden />
        Obtenir un Devis
      </Link>
    </div>
  );
}
