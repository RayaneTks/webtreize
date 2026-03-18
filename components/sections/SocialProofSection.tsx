'use client';

import React from 'react';
import { FadeUp } from '@/components/ui/FadeUp';

const METRICS = [
  { value: '+75%', label: 'visibilité', sublabel: 'en moyenne' },
  { value: '100%', label: 'sur-mesure', sublabel: 'pas de template' },
  { value: '48h', label: 'réponse', sublabel: 'garantie' },
  { value: '0€', label: "d'engagement", sublabel: 'initial' },
];

export function SocialProofSection() {
  return (
    <section
      className="py-12 md:py-16 bg-white border-y-2 border-navy relative"
      aria-label="Nos résultats en chiffres"
    >
      <div className="container mx-auto px-5 lg:px-12 xl:px-16 max-w-screen-xl">
        <FadeUp>
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {METRICS.map((metric, i) => (
              <div
                key={i}
                className="text-center py-4 md:py-6 relative"
              >
                {i > 0 && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-2/3 bg-navy/10 hidden lg:block" aria-hidden="true" />
                )}
                {i === 2 && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-2/3 bg-navy/10 lg:hidden" aria-hidden="true" />
                )}
                <p className="font-display text-3xl md:text-4xl lg:text-5xl text-navy uppercase leading-none mb-1">
                  {metric.value}
                </p>
                <p className="text-xs md:text-sm font-bold text-navy/70 uppercase tracking-wide">
                  {metric.label}
                </p>
                <p className="text-[10px] md:text-xs text-neutral-text font-medium mt-0.5">
                  {metric.sublabel}
                </p>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
