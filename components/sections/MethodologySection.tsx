'use client';

import React from 'react';
import { FadeUp } from '@/components/ui/FadeUp';

const STEPS = [
  { phase: '01', title: 'Diagnostic', desc: 'Analyse marché, concurrents, objectifs. Audit sur-mesure.' },
  { phase: '02', title: 'Stratégie', desc: 'Architecture, positionnement, roadmap. Chaque décision justifiée.' },
  { phase: '03', title: 'Ingénierie', desc: 'Développement, design, intégration. Validation à chaque étape.' },
  { phase: '04', title: 'Croissance', desc: 'Mise en ligne, formation, lancement. Opérationnel jour 1.' },
] as const;

export function MethodologySection() {
  return (
    <section id="method" className="py-24 md:py-36 bg-cream relative" aria-labelledby="methodology-title">
      <div className="container mx-auto px-5 lg:px-12 xl:px-16 max-w-screen-xl">
        <FadeUp>
          <div className="max-w-2xl mb-16 md:mb-24">
            <span className="inline-block px-4 py-2 mb-6 border-2 border-navy text-xs font-bold uppercase tracking-[0.15em] text-navy">
              Méthode
            </span>
            <h2
              id="methodology-title"
              className="font-display text-navy uppercase leading-[0.92]"
              style={{ fontSize: 'clamp(36px, 5.5vw, 56px)' }}
            >
              4 étapes.
              <br />
              Zéro improvisation.
            </h2>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, idx) => (
            <FadeUp key={step.phase} delay={idx * 100}>
              <div className="relative p-6 md:p-8 border-2 border-navy bg-cream group hover:bg-navy transition-colors duration-300 h-full">
                <span className="font-display text-6xl md:text-7xl text-navy/10 group-hover:text-white/10 transition-colors leading-none mb-6 block">
                  {step.phase}
                </span>
                <h3 className="font-display text-lg md:text-xl text-navy group-hover:text-white uppercase mb-3 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-neutral-text group-hover:text-white/80 font-medium leading-relaxed transition-colors duration-300 text-sm">
                  {step.desc}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
