'use client';

import { useReducedMotion } from 'motion/react';
import { CAPABILITY_MARQUEE } from '@/lib/data/site';
import { SectionBand } from '@/components/decor/SectionBand';

export function CapabilityRail() {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <SectionBand tone="navy" className="border-y border-white/10">
        <section className="site-container py-5" aria-label="Domaines d'expertise">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {CAPABILITY_MARQUEE.map((item) => (
              <li key={item} className="text-sm font-medium text-white/80">
                {item}
              </li>
            ))}
          </ul>
        </section>
      </SectionBand>
    );
  }

  const items = [...CAPABILITY_MARQUEE, ...CAPABILITY_MARQUEE];

  return (
    <SectionBand tone="navy" className="border-y border-white/10">
      <section className="relative overflow-hidden py-5" aria-label="Domaines d'expertise">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-navy to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-navy to-transparent"
          aria-hidden
        />

        <div className="flex w-max animate-marquee">
          {items.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="flex shrink-0 items-center gap-8 px-8 text-sm font-medium text-white/80 md:text-[0.9rem]"
            >
              <span className="h-1 w-1 rounded-full bg-accent" aria-hidden />
              {item}
            </span>
          ))}
        </div>
      </section>
    </SectionBand>
  );
}
