'use client';

import React from 'react';
import { FadeUp } from '@/components/ui/FadeUp';
import { Button } from '@/components/ui/Button';
import { Search, MonitorSmartphone, Code2 } from 'lucide-react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const SERVICES = [
  {
    title: 'SEO & Visibilité Locale',
    icon: Search,
    tag: 'Le + demandé',
    description: "Vos clients cherchent sur Google. On vous place devant vos concurrents. Fiche Google, référencement local, SEO technique.",
    bullets: ['Optimisation fiche Google Business', 'Référencement naturel & local', "Stratégie d'acquisition digitale"],
    cta: 'Auditer ma visibilité',
    featured: true,
  },
  {
    title: 'Sites Web Sur-Mesure',
    icon: MonitorSmartphone,
    description: "Sites vitrines et e-commerce conçus pour convertir. Rapides, sécurisés, 100% responsive.",
    bullets: ['Design unique, pas de template', 'Performance & Core Web Vitals', 'Optimisé pour la conversion'],
    cta: 'Lancer mon projet',
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <FadeUp key={index} delay={index * 100}>
                <div className={`h-full flex flex-col p-6 md:p-8 border-2 border-navy transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 ${
                  service.featured
                    ? 'bg-navy text-white shadow-brutal-orange hover:shadow-[8px_8px_0_#D9480F]'
                    : 'bg-cream shadow-brutal hover:shadow-brutal-lg'
                }`}>
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-12 h-12 flex items-center justify-center border-2 ${
                      service.featured
                        ? 'border-white/30 bg-orange text-white'
                        : 'border-navy bg-navy text-white'
                    }`}>
                      <Icon className="w-5 h-5" strokeWidth={2.5} />
                    </div>
                    {service.tag && (
                      <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-orange text-white">
                        {service.tag}
                      </span>
                    )}
                  </div>

                  <h3 className={`font-display text-xl md:text-2xl uppercase leading-tight mb-4 ${
                    service.featured ? 'text-white' : 'text-navy'
                  }`}>
                    {service.title}
                  </h3>

                  <p className={`font-medium leading-relaxed mb-6 flex-grow ${
                    service.featured ? 'text-white/80' : 'text-neutral-text'
                  }`}>
                    {service.description}
                  </p>

                  <ul className="space-y-2.5 mb-8">
                    {service.bullets.map((bullet, i) => (
                      <li key={i} className={`flex items-center gap-3 text-sm font-bold ${
                        service.featured ? 'text-white/90' : 'text-navy'
                      }`}>
                        <span className="w-1.5 h-1.5 shrink-0 bg-orange" />
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={service.featured ? 'outline' : 'default'}
                    className={`w-full mt-auto ${
                      service.featured
                        ? 'border-white text-white hover:bg-white hover:text-navy bg-transparent'
                        : ''
                    }`}
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
    </section>
  );
}
