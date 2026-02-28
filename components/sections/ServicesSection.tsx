'use client';

import React, { useState } from 'react';
import { Globe, MapPin, TrendingUp, Code2, ChevronRight, Infinity } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { GlowCard } from '@/components/ui/GlowCard';
import { ServiceModal } from '@/components/ui/ServiceModal';

const SERVICES = [
  {
    icon: Globe,
    title: 'Sites Web Prestigieux',
    desc: 'Des expériences vitrines et e-commerce qui convertissent et marquent les esprits.',
    extendedDesc: 'Nous concevons des sites web sur-mesure qui allient esthétique premium et performance technique. Chaque projet est unique : identité de marque forte, parcours utilisateur optimisé et technologies modernes pour une expérience mémorable.',
    bullets: ['Sites vitrines & e-commerce', 'Design sur-mesure & identité visuelle', 'Performance & optimisations techniques', 'Formation & suivi post-mise en ligne'],
    delay: 0,
  },
  {
    icon: MapPin,
    title: 'Visibilité Locale',
    desc: "Optimisation de votre Fiche Google pour capter 100% de votre zone de chalandise.",
    extendedDesc: "Votre Fiche Google Business Profile est le premier point de contact avec vos clients locaux. Nous l'optimisons pour qu'elle apparaisse en tête des recherches de votre secteur et convertisse en appels et visites.",
    bullets: ['Optimisation complète Fiche Google', 'Photos professionnelles & contenu', 'Avis clients & réputation', 'Résultats mesurables sur votre zone'],
    delay: 100,
  },
  {
    icon: TrendingUp,
    title: 'Acquisition & SEO',
    desc: 'Stratégies de référencement chirurgicales pour écraser la concurrence sur les moteurs.',
    extendedDesc: 'Le SEO est un investissement long terme qui paie. Nous mettons en place des stratégies de référencement naturelles, techniques et contentuelles pour positionner votre site devant vos concurrents sur Google.',
    bullets: ['Audit SEO & stratégie sur-mesure', 'Optimisation technique & contenu', 'Netlinking & autorité de domaine', 'Suivi & reporting des positions'],
    delay: 200,
  },
  {
    icon: Code2,
    title: 'Logiciel Sur-Mesure',
    desc: "Développement d'applications web et mobiles pour automatiser votre métier.",
    extendedDesc: "Des outils digitaux pensés pour votre métier : applications web, interfaces d'administration, automatisations. Nous développons des solutions sur-mesure qui simplifient vos process et augmentent votre productivité.",
    bullets: ['Apps web & mobiles sur-mesure', 'Automatisation de process', 'Interfaces d\'administration', 'Intégrations & API'],
    delay: 300,
  },
] as const;

export function ServicesSection() {
  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);

  return (
    <section id="services" className="py-24 md:py-40 px-4 sm:px-6 relative z-10" aria-labelledby="services-title">
      <div className="container mx-auto max-w-6xl">
        <Reveal className="text-center mb-16 md:mb-24">
          <h2 id="services-title" className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
            Notre Ingénierie.
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            L&apos;alliance parfaite entre design époustouflant et performance technique absolue.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {SERVICES.map((srv, idx) => (
            <Reveal key={idx} delay={srv.delay} direction="up" className="h-full">
              <GlowCard className="p-8 h-full flex flex-col justify-between group">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-900/50 to-blue-800/20 border border-blue-500/30 flex items-center justify-center mb-8 shadow-[inset_0_0_20px_rgba(59,130,246,0.2)] group-hover:scale-110 transition-transform duration-500 ease-out">
                    <srv.icon className="w-7 h-7 text-blue-400" aria-hidden />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight leading-snug">{srv.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm md:text-base">{srv.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpenModalIndex(idx)}
                  className="mt-8 pt-6 border-t border-white/5 flex items-center text-blue-400 font-semibold text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 w-full text-left hover:text-cyan-300 focus:outline-none focus-visible:opacity-100 focus-visible:translate-x-0 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset rounded"
                >
                  En savoir plus <ChevronRight className="w-4 h-4 ml-1" aria-hidden />
                </button>
              </GlowCard>
            </Reveal>
          ))}
        </div>

        {openModalIndex !== null && (
          <ServiceModal
            isOpen={openModalIndex !== null}
            onClose={() => setOpenModalIndex(null)}
            icon={SERVICES[openModalIndex].icon}
            title={SERVICES[openModalIndex].title}
            desc={SERVICES[openModalIndex].extendedDesc}
            bullets={SERVICES[openModalIndex].bullets}
          />
        )}

        <Reveal delay={400} direction="up" className="mt-4 md:mt-6">
          <GlowCard className="p-8 md:p-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none transform translate-x-1/4 -translate-y-1/4 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700" aria-hidden>
              <Infinity className="w-64 h-64 text-cyan-400" />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
              <div className="flex-shrink-0 w-20 h-20 rounded-[2rem] bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-[0_0_40px_rgba(34,211,238,0.3)] group-hover:shadow-[0_0_60px_rgba(34,211,238,0.6)] group-hover:scale-105 transition-all duration-500">
                <Infinity className="w-10 h-10 text-white" aria-hidden />
              </div>
              <div className="text-center md:text-left flex-1">
                <h3 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight">
                  Accompagnement à 360°
                </h3>
                <p className="text-gray-400 leading-relaxed text-base md:text-lg">
                  L&apos;ingénierie n&apos;est que la face visible de l&apos;iceberg. Chez WebTreize, nous sommes votre département digital externalisé.{' '}
                  <strong className="text-white font-semibold">
                    Conseil, stratégie de marque, analyse de data et suivi ROIste :
                  </strong>{' '}
                  nous vous accompagnons à chaque étape de votre croissance digitale, bien au-delà de la technique.
                </p>
              </div>
            </div>
          </GlowCard>
        </Reveal>
      </div>
    </section>
  );
}
