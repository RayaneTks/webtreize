'use client';

import React from 'react';
import { FadeUp } from '@/components/ui/FadeUp';
import { Button } from '@/components/ui/Button';
import { Search, MonitorSmartphone, Code2 } from 'lucide-react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const SERVICES = [
  {
    title: 'Sites Web Sur-Mesure',
    icon: MonitorSmartphone,
    description: "Sites vitrines et e-commerce conçus pour convertir. Rapides, sécurisés, 100% responsive.",
    bullets: ['Design unique, pas de template', 'Performance & Core Web Vitals', 'Optimisé pour la conversion'],
    cta: 'Lancer mon projet',
    featured: true,
    tag: 'Le + demandé',
  },
  {
    title: 'SEO & Visibilité Locale',
    icon: Search,
    description: "Vos clients cherchent sur Google. On vous place devant vos concurrents. Fiche Google, référencement local, SEO technique.",
    bullets: ['Optimisation fiche Google Business', 'Référencement naturel & local', "Stratégie d'acquisition digitale"],
    cta: 'Auditer ma visibilité',
    featured: false,
  },
  {
    title: 'Applications & Outils',
    icon: Code2,
    description: "Applications web et mobile robustes. Digitalisation de processus, MVP, outils métiers sur-mesure.",
    bullets: ['Applications métier', 'MVP & prototypage rapide', 'Automatisation de processus'],
    cta: 'Estimer mon projet',
    featured: false,
  },
];

export function ServicesSection() {
  const scroll = useSmoothScroll();

  return (
    <section
      id="services"
      className="py-24 md:py-36 bg-cream relative"
      aria-labelledby="services-title"
    >
      <div className="container mx-auto px-5 lg:px-12 xl:px-16 max-w-screen-xl">
        <FadeUp>
          <div className="max-w-2xl mb-16 md:mb-24">
            <span className="inline-block px-4 py-2 mb-6 border-2 border-navy text-xs font-bold uppercase tracking-[0.15em] text-navy">
              Services
            </span>
            <h2
              id="services-title"
              className="font-display text-navy uppercase leading-[0.92] mb-4"
              style={{ fontSize: 'clamp(36px, 5.5vw, 56px)' }}
            >
              Ce qu&apos;on fait.
              <br />
              Concrètement.
            </h2>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Featured card — 7 colonnes, dominante */}
          {(() => {
            const s = SERVICES[0];
            const Icon = s.icon;
            return (
              <FadeUp className="lg:col-span-7">
                <div className="h-full flex flex-col p-8 md:p-10 border-2 border-navy bg-navy text-white shadow-brutal-orange transition-[transform,box-shadow] duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-orange-lg">
                  <div className="flex items-start justify-between mb-8">
                    <div className="w-14 h-14 flex items-center justify-center border-2 border-white/30 bg-orange text-white">
                      <Icon className="w-6 h-6" strokeWidth={2.5} />
                    </div>
                    <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-orange text-white">
                      {s.tag}
                    </span>
                  </div>

                  <h3
                    className="font-display text-white uppercase leading-[0.92] mb-5"
                    style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}
                  >
                    {s.title}
                  </h3>

                  <p className="text-white/80 font-medium leading-relaxed mb-8 text-base md:text-lg">
                    {s.description}
                  </p>

                  <ul className="space-y-3 mb-10">
                    {s.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-bold text-white/90">
                        <span className="w-1.5 h-1.5 shrink-0 bg-orange" />
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <div className="flex-1" />

                  <Button
                    variant="outline"
                    className="w-full mt-auto border-white text-white hover:bg-white hover:text-navy bg-transparent"
                    onClick={(e) => scroll(e, '#contact')}
                  >
                    {s.cta}
                  </Button>
                </div>
              </FadeUp>
            );
          })()}

          {/* Colonne secondaire — 5 colonnes, 2 cartes empilées */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {SERVICES.slice(1).map((service, index) => {
              const Icon = service.icon;
              return (
                <FadeUp key={index} delay={(index + 1) * 120} className="flex-1">
                  <div className="h-full flex flex-col p-6 md:p-7 border-2 border-navy bg-cream shadow-brutal transition-[transform,box-shadow] duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-lg">
                    <div className="mb-5">
                      <div className="w-11 h-11 flex items-center justify-center border-2 border-navy bg-navy text-white">
                        <Icon className="w-5 h-5" strokeWidth={2.5} />
                      </div>
                    </div>

                    <h3 className="font-display text-navy text-lg md:text-xl uppercase leading-tight mb-3">
                      {service.title}
                    </h3>

                    <p className="text-neutral-text font-medium leading-relaxed mb-5 flex-grow text-sm">
                      {service.description}
                    </p>

                    <ul className="space-y-2 mb-6">
                      {service.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-center gap-3 text-xs font-bold text-navy">
                          <span className="w-1.5 h-1.5 shrink-0 bg-orange" />
                          {bullet}
                        </li>
                      ))}
                    </ul>

                    <Button
                      variant="default"
                      className="w-full mt-auto"
                      onClick={(e) => scroll(e, '#contact')}
                    >
                      {service.cta}
                    </Button>
                  </div>
                </FadeUp>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
