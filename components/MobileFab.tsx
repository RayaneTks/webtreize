'use client';

import Link from 'next/link';
import { ArrowUpRight } from '@phosphor-icons/react';
import { useEffect, useState } from 'react';
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
      { threshold: 0 },
    );
    observer.observe(hero);
    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  const showFab = !isHeroVisible && !isContactVisible;

  return (
    <div
      className={cn(
        'fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] left-1/2 z-50 w-[88%] max-w-[320px] -translate-x-1/2 transition-[opacity,transform] duration-300 lg:hidden',
        showFab ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
      )}
    >
      <Link
        href="#contact"
        onClick={(e) => scroll(e, '#contact')}
        className="flex w-full items-center justify-center gap-2 rounded-full border border-accent/20 bg-accent py-3.5 text-sm font-semibold text-white shadow-[0_4px_24px_-8px_rgba(217,72,15,0.45)] transition-[transform,box-shadow] active:scale-[0.97] motion-reduce:active:scale-100"
      >
        Audit gratuit
        <ArrowUpRight size={16} weight="bold" />
      </Link>
    </div>
  );
}
