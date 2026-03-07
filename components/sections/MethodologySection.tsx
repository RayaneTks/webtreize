'use client';

import React from 'react';
import { Lightbulb, Compass, Code2, Rocket } from 'lucide-react';
import { FadeUp } from '@/components/ui/FadeUp';

const STEPS = [
  {
    icon: Lightbulb,
    phase: '01',
    title: 'Diagnostic',
    desc: 'Nous analysons votre marché, vos concurrents et vos objectifs. Pas de brief générique — un audit sur-mesure.',
    accent: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
  },
  {
    icon: Compass,
    phase: '02',
    title: 'Stratégie',
    desc: "Nous définissons l'architecture, le positionnement et la roadmap technique. Chaque décision est justifiée par un ROI.",
    accent: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  },
  {
    icon: Code2,
    phase: '03',
    title: 'Ingénierie',
    desc: 'Développement, design et intégration. Vous validez chaque étape. Pas de mauvaise surprise à la livraison.',
    accent: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
  },
  {
    icon: Rocket,
    phase: '04',
    title: 'Croissance',
    desc: 'Mise en ligne, formation à la prise en main et lancement de votre stratégie de visibilité. Vous êtes opérationnel dès le premier jour.',
    accent: 'bg-[#FF4500]/10 text-[#FF4500] border-[#FF4500]/20',
  },
] as const;

export function MethodologySection() {
  return (
    <section className="py-24 md:py-40 bg-[#F8FAFC] relative overflow-hidden" aria-labelledby="methodology-title">
      <div className="container mx-auto px-5 lg:px-8 max-w-screen-xl">
        <FadeUp className="mb-16 md:mb-24">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-8 rounded-full bg-[#001F3F] flex items-center justify-center">
              <div className="w-2 h-2 bg-[#FF4500] rounded-full" />
            </div>
            <span className="text-[#001F3F] font-bold tracking-[0.15em] uppercase text-sm">
              Notre Méthode
            </span>
          </div>
          <h2
            id="methodology-title"
            className="text-[9vw] sm:text-[3.5rem] md:text-[4.5rem] font-black tracking-tighter text-[#001F3F] leading-[1] mb-6"
          >
            Partenaire, pas prestataire.
          </h2>
          <p className="text-lg md:text-xl text-[#001F3F]/60 font-medium max-w-2xl leading-relaxed">
            Chaque projet passe par un processus rigoureux en 4 phases.
            Pas de template, pas de raccourci — un accompagnement intégral.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <FadeUp key={step.phase} delay={idx * 100}>
                <div className="group relative bg-white rounded-[2rem] p-8 md:p-10 border border-[#001F3F]/5 hover:border-[#001F3F]/15 transition-all duration-500 h-full">
                  <div className="flex items-start justify-between mb-8">
                    <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center ${step.accent}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-6xl font-black text-[#001F3F]/[0.04] leading-none select-none">
                      {step.phase}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black tracking-tight text-[#001F3F] mb-4">
                    {step.title}
                  </h3>
                  <p className="text-[#001F3F]/60 font-medium leading-relaxed">
                    {step.desc}
                  </p>
                  <div className="absolute bottom-0 left-8 right-8 h-[2px] bg-gradient-to-r from-transparent via-[#FF4500]/0 to-transparent group-hover:via-[#FF4500]/30 transition-all duration-700" />
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
