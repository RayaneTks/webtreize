'use client';

import React from 'react';
import { FadeUp } from '@/components/ui/FadeUp';

const TECH_STACK = [
  'Next.js',
  'React',
  'TypeScript',
  'Tailwind CSS',
  'Vercel',
  'Figma',
  'Node.js',
  'Serverless',
] as const;

function TechMarquee() {
  const items = [...TECH_STACK, ...TECH_STACK, ...TECH_STACK];
  return (
    <div className="w-full overflow-hidden relative py-4 lg:py-6">
      <div className="absolute inset-y-0 left-0 w-20 md:w-32 bg-gradient-to-r from-neutral-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 md:w-32 bg-gradient-to-l from-neutral-bg to-transparent z-10 pointer-events-none" />
      <div className="flex w-max animate-marquee items-center gap-4 lg:gap-8">
        {items.map((name, i) => (
          <div
            key={`${name}-${i}`}
            className="flex items-center justify-center px-6 py-2 rounded-full border border-navy/10 bg-white shadow-sm"
          >
            <span className="text-xs md:text-sm font-bold tracking-wide text-navy/60 whitespace-nowrap select-none">
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SocialProofSection() {
  return (
    <section className="pt-12 pb-16 md:pt-20 md:pb-28 bg-neutral-bg relative overflow-hidden" aria-labelledby="expertise-title">
      <div className="container mx-auto px-5 lg:px-8 max-w-screen-xl">
        <FadeUp>
          <div className="text-center mb-8 md:mb-12">
            <span className="text-orange font-bold tracking-[0.15em] uppercase text-[10px] md:text-xs mb-3 block">
              On ne bricole pas.
            </span>
            <h2
              id="expertise-title"
              className="text-navy leading-[1.1] max-w-2xl mx-auto"
            >
              Des fondations bâties pour le top 1%
            </h2>
            <p className="mt-4 text-xs md:text-sm text-navy/50 font-bold uppercase tracking-widest">
              Coder avec les outils des leaders mondiaux
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={100}>
          <TechMarquee />
        </FadeUp>
      </div>
    </section>
  );
}
