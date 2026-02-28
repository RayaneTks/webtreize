'use client';

import React, { useState } from 'react';
import { Globe, MapPin, TrendingUp, Code2, Sparkles, ChevronRight, type LucideIcon } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { CardStack, type CardStackItem } from '@/components/ui/card-stack';
import { ServiceModal } from '@/components/ui/ServiceModal';

const SERVICE_GRADIENTS = [
  'from-blue-900/60 via-blue-800/30 to-cyan-900/40',
  'from-emerald-900/50 via-teal-800/30 to-cyan-900/40',
  'from-violet-900/50 via-purple-800/30 to-blue-900/40',
  'from-slate-900/60 via-blue-900/30 to-cyan-900/40',
  'from-cyan-900/50 via-blue-800/30 to-indigo-900/40',
];

/** Fonds thématiques créatifs, DA WebTreize (bleu / cyan / teal / violet) */
function CardBackgroundPattern({ serviceIndex }: { serviceIndex: number }) {
  const base = 'absolute inset-0 pointer-events-none overflow-hidden';
  const opacity = 'opacity-[0.08]';
  const textCyan = 'text-cyan-400/90';
  const textTeal = 'text-teal-400/90';
  const textViolet = 'text-violet-400/80';
  const fontCode = 'font-mono text-[10px] sm:text-[11px] leading-relaxed';

  switch (serviceIndex) {
    case 0: // Sites Web Prestigieux — balises HTML très légères
      return (
        <div className={`${base} ${opacity}`}>
          <div className={`absolute left-2 top-3 ${fontCode} ${textCyan} whitespace-pre rotate-[-4deg] scale-95`}>
            {`<header>\n  <nav>\n    <a>`}
          </div>
          <div className={`absolute right-4 top-8 ${fontCode} ${textCyan} whitespace-pre rotate-[2deg] scale-90`}>
            {`</section>\n  <footer>`}
          </div>
          <div className={`absolute left-6 bottom-12 ${fontCode} ${textCyan} whitespace-pre rotate-[1deg] scale-90`}>
            {`className="..."\n<div>`}
          </div>
          <div className={`absolute right-2 bottom-6 ${fontCode} ${textCyan} whitespace-pre rotate-[-2deg] scale-95`}>
            {`<main>\n  <article>`}
          </div>
        </div>
      );
    case 1: // Visibilité Locale — carte stylisée + pin
      return (
        <svg className={`${base} ${opacity} w-full h-full ${textTeal}`} viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id={`map-grid-${serviceIndex}`} width="16" height="16" patternUnits="userSpaceOnUse">
              <path d="M 16 0 L 0 0 0 16" fill="none" stroke="currentColor" strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="240" height="240" fill={`url(#map-grid-${serviceIndex})`} />
          <path d="M30 120h40v-30h50v50h40M70 90v80M120 60v100" stroke="currentColor" strokeWidth="0.6" />
          <path d="M120 100c0-22 18-40 40-40s40 18 40 40c0 24-40 80-80 80" stroke="currentColor" strokeWidth="1.2" fill="none" />
          <circle cx="160" cy="100" r="5" fill="currentColor" />
        </svg>
      );
    case 2: // Acquisition & SEO — barre de recherche + courbes de position
      return (
        <div className={`${base} ${opacity}`}>
          <svg viewBox="0 0 240 240" fill="none" className="w-full h-full text-teal-400/90">
            <rect x="20" y="40" width="200" height="28" rx="6" stroke="currentColor" strokeWidth="0.8" fill="none" />
            <circle cx="44" cy="54" r="4" stroke="currentColor" strokeWidth="0.6" fill="none" />
            <path d="M20 100 L70 70 L120 55 L170 40 L220 30" stroke="currentColor" strokeWidth="1.2" opacity="0.9" />
            <path d="M20 130 L65 95 L110 75 L160 58 L220 45" stroke="currentColor" strokeWidth="0.9" opacity="0.6" />
            <path d="M20 160 L60 130 L100 100 L150 75 L220 55" stroke="currentColor" strokeWidth="0.7" opacity="0.4" />
          </svg>
        </div>
      );
    case 3: // Logiciel Sur-Mesure — lignes de code réelles
      return (
        <div className={`${base} ${opacity}`}>
          <div className={`absolute left-2 top-2 ${fontCode} ${textCyan} whitespace-pre`}>
            {`const app = () => {\n  return (\n    <View>`}
          </div>
          <div className={`absolute right-3 top-14 ${fontCode} ${textCyan} whitespace-pre`}>
            {`function fetchData() {\n  await api.get()`}
          </div>
          <div className={`absolute left-4 bottom-16 ${fontCode} ${textCyan} whitespace-pre`}>
            {`useEffect(() => {\n  // sync`}
          </div>
          <div className={`absolute right-2 bottom-4 ${fontCode} ${textCyan} whitespace-pre`}>
            {`export default\n  <Component />`}
          </div>
        </div>
      );
    case 4: // Conseil & Stratégie — nœuds connectés / schéma stratégie
      return (
        <svg className={`${base} ${opacity} w-full h-full ${textViolet}`} viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <path d="M120 30 L120 70 M120 70 L70 110 M120 70 L170 110 M70 110 L50 170 M70 110 L90 170 M170 110 L150 170 M170 110 L190 170 M120 70 L120 130 M120 130 L80 190 M120 130 L160 190" stroke="currentColor" strokeWidth="0.7" />
          <circle cx="120" cy="30" r="6" fill="currentColor" />
          <circle cx="120" cy="70" r="8" fill="currentColor" />
          <circle cx="70" cy="110" r="5" fill="currentColor" />
          <circle cx="170" cy="110" r="5" fill="currentColor" />
          <circle cx="120" cy="130" r="5" fill="currentColor" />
          <circle cx="50" cy="170" r="4" fill="currentColor" />
          <circle cx="90" cy="170" r="4" fill="currentColor" />
          <circle cx="150" cy="170" r="4" fill="currentColor" />
          <circle cx="190" cy="170" r="4" fill="currentColor" />
          <circle cx="80" cy="190" r="4" fill="currentColor" />
          <circle cx="160" cy="190" r="4" fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
}

const SERVICES = [
  {
    icon: Globe,
    title: 'Sites Web Prestigieux',
    desc: 'Vitrines et e-commerce qui convertissent.',
    extendedDesc: 'Nous concevons des sites web sur-mesure qui allient esthétique premium et performance technique. Chaque projet est unique : identité de marque forte, parcours utilisateur optimisé et technologies modernes pour une expérience mémorable.',
    bullets: ['Sites vitrines & e-commerce', 'Design sur-mesure & identité visuelle', 'Performance & optimisations techniques', 'Formation & suivi post-mise en ligne'],
  },
  {
    icon: MapPin,
    title: 'Visibilité Locale',
    desc: "Fiche Google pour capter 100% de votre zone.",
    extendedDesc: "Votre Fiche Google Business Profile est le premier point de contact avec vos clients locaux. Nous l'optimisons pour qu'elle apparaisse en tête des recherches de votre secteur et convertisse en appels et visites.",
    bullets: ['Optimisation complète Fiche Google', 'Photos professionnelles & contenu', 'Avis clients & réputation', 'Résultats mesurables sur votre zone'],
  },
  {
    icon: TrendingUp,
    title: 'Acquisition & SEO',
    desc: 'Référencement chirurgical pour écraser la concurrence.',
    extendedDesc: 'Le SEO est un investissement long terme qui paie. Nous mettons en place des stratégies de référencement naturelles, techniques et contentuelles pour positionner votre site devant vos concurrents sur Google.',
    bullets: ['Audit SEO & stratégie sur-mesure', 'Optimisation technique & contenu', 'Netlinking & autorité de domaine', 'Suivi & reporting des positions'],
  },
  {
    icon: Code2,
    title: 'Logiciel Sur-Mesure',
    desc: "Apps web et mobiles pour automatiser votre métier.",
    extendedDesc: "Des outils digitaux pensés pour votre métier : applications web, interfaces d'administration, automatisations. Nous développons des solutions sur-mesure qui simplifient vos process et augmentent votre productivité.",
    bullets: ['Apps web & mobiles sur-mesure', 'Automatisation de process', 'Interfaces d\'administration', 'Intégrations & API'],
  },
  {
    icon: Sparkles,
    title: 'Conseil & Stratégie',
    desc: 'Votre département digital externalisé.',
    extendedDesc: "L'ingénierie n'est que la face visible. Conseil, stratégie de marque, analyse de data et suivi ROIste : nous vous accompagnons à chaque étape de votre croissance digitale, bien au-delà de la technique.",
    bullets: ['Stratégie digitale & positionnement', 'Analytics & suivi de performance', 'Conseil en transformation digitale', 'Accompagnement opérationnel'],
  },
] as const;

type ServiceCardStackItem = CardStackItem & {
  icon: LucideIcon;
  extendedDesc: string;
  bullets: readonly string[];
  gradient: string;
  serviceIndex: number;
};

export function ServicesSection() {
  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);

  const cardItems: ServiceCardStackItem[] = SERVICES.map((srv, i) => ({
    id: i + 1,
    title: srv.title,
    description: srv.desc,
    serviceIndex: i,
    icon: srv.icon,
    extendedDesc: srv.extendedDesc,
    bullets: srv.bullets,
    gradient: SERVICE_GRADIENTS[i % SERVICE_GRADIENTS.length]!,
  }));

  const renderServiceCard = (item: ServiceCardStackItem, state: { active: boolean }) => {
    const Icon = item.icon;
    return (
      <div className="relative h-full w-full overflow-hidden group">
        <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`} />
        <CardBackgroundPattern serviceIndex={item.serviceIndex} />
        <div className="absolute top-0 right-0 w-32 h-32 -translate-y-1/2 translate-x-1/2 rounded-full bg-white/5 blur-2xl" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="relative z-10 flex h-full flex-col p-6">
          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <Icon className="w-7 h-7 text-cyan-300" aria-hidden />
          </div>
          <h3 className="text-xl font-black text-white tracking-tight mb-2">{item.title}</h3>
          <p className="text-sm text-white/80 line-clamp-2 flex-1">{item.description}</p>

          {state.active && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setOpenModalIndex(item.serviceIndex);
              }}
              className="mt-4 flex items-center gap-2 text-cyan-400 font-bold text-sm hover:text-cyan-300 transition-colors w-fit focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded"
            >
              En savoir plus <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          )}
        </div>
      </div>
    );
  };

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

        <Reveal delay={100}>
          <CardStack<ServiceCardStackItem>
            items={cardItems}
            initialIndex={0}
            maxVisible={5}
            cardWidth={380}
            cardHeight={260}
            overlap={0.5}
            spreadDeg={42}
            activeScale={1.04}
            inactiveScale={0.92}
            autoAdvance
            intervalMs={3500}
            pauseOnHover
            showDots
            renderCard={renderServiceCard}
          />
        </Reveal>

        {openModalIndex !== null && (
          <ServiceModal
            isOpen={true}
            onClose={() => setOpenModalIndex(null)}
            icon={SERVICES[openModalIndex]!.icon}
            title={SERVICES[openModalIndex]!.title}
            desc={SERVICES[openModalIndex]!.extendedDesc}
            bullets={SERVICES[openModalIndex]!.bullets}
          />
        )}

      </div>
    </section>
  );
}
