'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { cn } from '@/lib/utils';

export function MobileFab() {
  const scroll = useSmoothScroll();
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [isContactVisible, setIsContactVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleMenuToggle = (e: CustomEvent) => setIsMenuOpen(e.detail);
    window.addEventListener('mobileMenuToggle', handleMenuToggle as EventListener);

    const hero = document.getElementById('hero');
    const contact = document.getElementById('contact');
    if (!hero || !contact) {
      return () => window.removeEventListener('mobileMenuToggle', handleMenuToggle as EventListener);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target.id === 'hero') setIsHeroVisible(entry.isIntersecting);
          if (entry.target.id === 'contact') setIsContactVisible(entry.isIntersecting);
        });
      },
      { threshold: 0, rootMargin: '0px' }
    );
    observer.observe(hero);
    observer.observe(contact);
    return () => {
      observer.disconnect();
      window.removeEventListener('mobileMenuToggle', handleMenuToggle as EventListener);
    };
  }, []);

  const showFab = !isHeroVisible && !isContactVisible && !isMenuOpen;

  return (
    <div
      className={cn(
        'lg:hidden fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-50 w-[88%] max-w-[320px] transition-all duration-300 ease-out',
        showFab ? 'opacity-100 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
      )}
    >
      <Link
        href="#contact"
        onClick={(e) => scroll(e, '#contact')}
        className="w-full flex items-center justify-center gap-2 bg-orange border-2 border-navy text-white font-bold py-3 px-5 text-sm shadow-brutal-sm active:scale-95 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
      >
        Audit gratuit
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
