'use client';

import React from 'react';
import { FadeUp } from '@/components/ui/FadeUp';

import { TECH_ICONS } from '@/components/ui/TechIconsPaths';

const TECH_STACK = [
  { name: 'Next.js', icon: 'nextdotjs' },
  { name: 'React', icon: 'react' },
  { name: 'TypeScript', icon: 'typescript' },
  { name: 'Tailwind CSS', icon: 'tailwindcss' },
  { name: 'Vercel', icon: 'vercel' },
  { name: 'Figma', icon: 'figma' },
  { name: 'Node.js', icon: 'nodedotjs' },
  { name: 'Serverless', icon: 'serverless' },
] as const;

function TechMarquee() {
  const items = [...TECH_STACK, ...TECH_STACK, ...TECH_STACK];
  return (
    <div className="w-full overflow-hidden relative py-4 lg:py-6">
      <div className="absolute inset-y-0 left-0 w-20 md:w-32 bg-gradient-to-r from-neutral-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 md:w-32 bg-gradient-to-l from-neutral-bg to-transparent z-10 pointer-events-none" />
      <div className="flex w-max animate-marquee items-center gap-4 lg:gap-8">
        {items.map((item, i) => (
          <div
            key={`${item.name}-${i}`}
            className="flex items-center justify-center gap-2 px-6 py-2 rounded-full border border-navy/10 bg-white shadow-sm"
          >
            {TECH_ICONS[item.icon] && (
              <svg className="w-4 h-4 text-navy/60 shrink-0" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d={TECH_ICONS[item.icon]} />
              </svg>
            )}
            <span className="text-xs md:text-sm font-bold tracking-wide text-navy/60 whitespace-nowrap select-none">
              {item.name}
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
