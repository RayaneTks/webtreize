'use client';

import React from 'react';
import { FadeUp } from '@/components/ui/FadeUp';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Search, MonitorSmartphone, Code2 } from 'lucide-react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const SERVICES = [
  {
    title: 'Visibilité Locale (SEO & Maps)',
    icon: Search,
    description: "La majorité de vos clients cherchent d'abord sur Google. Nous optimisons votre présence pour que vous apparaissiez avant vos concurrents, exactement là où l'intention d'achat est la plus forte.",
    bullets: [
      'Optimisation Fiche Google Profile',
      'Référencement local (SEO)',
      'Génération d\'appels et d\'itinéraires',
    ],
    cta: 'Auditer ma fiche Google',
    href: '#contact',
    accent: 'text-orange',
    accentBg: 'bg-orange/10',
    delay: 100,
  },
  {
    title: 'Création de Sites Web',
    icon: MonitorSmartphone,
    description: "Un site vitrine ou e-commerce qui ne se contente pas d'être beau, mais qui est conçu pour convertir vos visiteurs en clients. Rapide, sécurisé et 100% adapté aux mobiles.",
    bullets: [
      'Design sur-mesure (pas de template)',
      'Développement ultra-rapide',
      'Optimisation pour la conversion',
    ],
    cta: "Voir ce qu'on peut construire",
    href: '#contact',
    accent: 'text-navy',
    accentBg: 'bg-navy/10',
    delay: 200,
  },
  {
    title: 'Ingénierie Applicative',
    icon: Code2,
    description: "Vous avez une idée complexe ou un processus métier à digitaliser ? Nous concevons et développons des applications sur-mesure (web et mobile) robustes et évolutives.",
    bullets: [
      'Applications Métier sur-mesure',
      'Développement MVP / SaaS',
      'Automatisation de processus',
    ],
    cta: 'Estimer mon projet',
    href: '#contact',
    accent: 'text-orange-hover',
    accentBg: 'bg-orange-hover/10',
    delay: 300,
  },
];

export function ServicesSection() {
  const scroll = useSmoothScroll();

  return (
    <section 
      id="services" 
      className="py-20 md:py-32 bg-[#F8F9FA] relative overflow-hidden"
      aria-labelledby="services-title"
    >
      {/* Pattern de fond subtil Themed for Services */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#001F3F 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white to-transparent pointer-events-none" />
      <div className="container mx-auto px-5 lg:px-8 max-w-screen-xl">
        <FadeUp>
          <div className="text-center mb-16 md:mb-20">
            <h2 
              id="services-title"
              className="text-navy font-black tracking-tight leading-[1.1] max-w-2xl mx-auto uppercase"
            >
              Ce que l'on fait pour vous
            </h2>
            <p className="mt-6 text-base md:text-lg text-navy/70 font-medium max-w-2xl mx-auto">
              Nous nous concentrons sur les actions qui ont un impact mesurable et direct sur votre activité.
            </p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <FadeUp key={index} delay={service.delay}>
                <Card className="h-full flex flex-col p-6 md:p-8 bg-white/80 backdrop-blur-md border border-navy/5 hover:border-navy/15 hover:shadow-[0_20px_40px_-15px_rgba(0,31,63,0.1)] hover:-translate-y-1.5 transition-all duration-500 relative overflow-hidden group">
                  {/* Subtle hover glow */}
                  <div className={`absolute top-0 right-0 w-32 h-32 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 ${service.accentBg}`} />
                  
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 relative z-10 transition-transform duration-500 group-hover:scale-110 ${service.accentBg} ${service.accent}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <h3 className="text-xl md:text-2xl font-black text-navy mb-4 tracking-tight leading-snug flex items-start sm:items-center justify-between gap-2 flex-col sm:flex-row">
                    <span>{service.title}</span>
                    {index === 0 && (
                      <span className="text-[10px] uppercase font-black tracking-widest bg-orange text-white px-2.5 py-1 rounded-full whitespace-nowrap self-start sm:self-auto">
                        Populaire
                      </span>
                    )}
                  </h3>
                  
                  <p className="text-navy/80 font-medium leading-relaxed mb-6 flex-grow text-[15px]">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {service.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-navy/30 mt-2 shrink-0" />
                        <span className="text-sm font-bold text-navy/80">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    variant={index === 0 ? 'default' : 'outline'} 
                    className="w-full mt-auto"
                    onClick={(e) => scroll(e, service.href)}
                  >
                    {service.cta}
                  </Button>
                </Card>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
