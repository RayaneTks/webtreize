'use client';

import React from 'react';
import { FadeUp } from '@/components/ui/FadeUp';
import { Shield, Gauge, Code2 } from 'lucide-react';

const TECH_STACK = [
  'Next.js',
  'React',
  'TypeScript',
  'Tailwind CSS',
  'Vercel',
  'Figma',
  'Node.js',
  'PostgreSQL',
] as const;

const STANDARDS = [
  {
    icon: Gauge,
    title: 'Performance optimale',
    desc: "Chaque projet web est conçu pour charger vite, convertir mieux et offrir une expérience irréprochable sur mobile comme desktop.",
    accent: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
  },
  {
    icon: Code2,
    title: 'Stratégie 100% sur-mesure',
    desc: "Pas de template. Site web, fiche Google, SEO, image de marque — chaque levier est pensé pour vos objectifs et votre marché.",
    accent: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  },
  {
    icon: Shield,
    title: 'Expertise & transparence',
    desc: "Un interlocuteur unique, des livrables clairs et un devis détaillé. Vous savez exactement ce que vous obtenez.",
    accent: 'bg-[#FF4500]/10 text-[#FF4500] border-[#FF4500]/20',
  },
] as const;

function TechMarquee() {
  const items = [...TECH_STACK, ...TECH_STACK];
  return (
    <div className="w-full overflow-hidden relative py-6 md:py-10">
      <div className="absolute inset-y-0 left-0 w-20 md:w-32 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 md:w-32 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none" />
      <div className="flex w-max animate-marquee items-center">
        {items.map((name, i) => (
          <div
            key={`${name}-${i}`}
            className="mx-3 md:mx-5 flex items-center justify-center px-6 py-3 rounded-full border border-[#001F3F]/8 bg-white"
          >
            <span className="text-sm font-bold tracking-wide text-[#001F3F]/40 whitespace-nowrap select-none">
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
    <section className="py-16 md:py-28 bg-[#F8FAFC] relative overflow-hidden" aria-labelledby="expertise-title">
      <div className="container mx-auto px-5 lg:px-8 max-w-screen-xl">
        <FadeUp>
          <div className="text-center mb-10 md:mb-16">
            <span className="text-[#FF4500] font-bold tracking-[0.15em] uppercase text-xs md:text-sm mb-3 block">
              Notre stack technique
            </span>
            <h2
              id="expertise-title"
              className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tighter text-[#001F3F] leading-[1.1]"
            >
              Construit avec les meilleurs outils.
            </h2>
          </div>
        </FadeUp>

        <FadeUp delay={100}>
          <TechMarquee />
        </FadeUp>

        <FadeUp delay={200}>
          <div className="mt-12 md:mt-20">
            <p className="text-center text-xs md:text-sm font-bold text-[#001F3F]/30 uppercase tracking-[0.15em] mb-8 md:mb-12">
              Nos standards d&apos;excellence
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
              {STANDARDS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-[#001F3F]/5"
                  >
                    <div className={`w-11 h-11 md:w-12 md:h-12 rounded-xl border flex items-center justify-center mb-5 ${item.accent}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base md:text-lg font-black text-[#001F3F] tracking-tight mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#001F3F]/50 font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
