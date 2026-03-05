'use client';

import React from 'react';
import { Globe, MapPin, TrendingUp, Code2 } from 'lucide-react';
import { FadeUp } from '@/components/ui/FadeUp';
import { cn } from '@/lib/utils';

const SERVICES = [
  {
    id: '01',
    title: 'Création de Sites Web',
    desc: "Un design époustouflant couplé à une vitesse fulgurante. Nous concevons des vitrines et e-commerces pensés pour asseoir votre autorité.",
    tags: ['UI/UX Design', 'Vitrine', 'E-commerce'],
    bgColor: 'bg-white',
    textColor: 'text-[#001F3F]',
    visual: (
      <div className="w-full h-full relative flex items-center justify-center bg-[#F8FAFC]">
        <div className="w-[80%] h-[70%] bg-white rounded-xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden relative transform -rotate-2 hover:rotate-0 transition-transform duration-700">
          <div className="h-6 md:h-8 bg-gray-50 border-b border-gray-100 flex items-center px-3 gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-400" />
            <div className="w-2 h-2 rounded-full bg-amber-400" />
            <div className="w-2 h-2 rounded-full bg-green-400" />
          </div>
          <div className="p-4 flex-1 flex flex-col gap-3">
            <div className="w-full h-24 md:h-32 bg-gray-100 rounded-lg animate-pulse-slow" />
            <div className="flex gap-3">
              <div className="w-1/2 h-16 bg-[#001F3F]/5 rounded-lg" />
              <div className="w-1/2 h-16 bg-[#FF4500]/10 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: '02',
    title: 'Ingénierie Applicative',
    desc: 'Développement de logiciels métiers et Web Apps sur-mesure pour automatiser vos processus complexes et disrupter votre industrie.',
    tags: ['React / Next.js', 'Logiciel', 'Automatisation'],
    bgColor: 'bg-[#E2E8F0]',
    textColor: 'text-[#001F3F]',
    visual: (
      <div className="w-full h-full relative flex items-center justify-center bg-[#CBD5E1] overflow-hidden">
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute w-[120%] h-[120%] font-mono text-[8px] md:text-xs text-[#001F3F]/10 opacity-50 break-all leading-tight">
            {`function scale(biz){ return biz.revenue * 10; } `.repeat(50)}
          </div>
          <div className="relative z-10 grid grid-cols-3 gap-2 md:gap-4 items-end h-[60%]">
            <div className="w-10 md:w-16 bg-[#001F3F] rounded-t-lg animate-bar-grow" style={{ height: '40%' }} />
            <div
              className="w-10 md:w-16 bg-[#FF4500] rounded-t-lg animate-bar-grow shadow-[0_0_20px_rgba(255,69,0,0.5)]"
              style={{ height: '90%', animationDelay: '0.2s' as unknown as string }}
            />
            <div
              className="w-10 md:w-16 bg-white rounded-t-lg animate-bar-grow"
              style={{ height: '60%', animationDelay: '0.4s' as unknown as string }}
            />
          </div>
        </div>
      </div>
    ),
  },
  {
    id: '03',
    title: 'Visibilité Locale',
    desc: 'Dominez votre zone de chalandise. Nous optimisons votre présence sur Google Maps pour que vous soyez le choix évident de proximité.',
    tags: ['Google Maps', 'Trafic', 'Réputation'],
    bgColor: 'bg-[#001F3F]',
    textColor: 'text-white',
    visual: (
      <div className="w-full h-full relative flex items-center justify-center bg-[#001428] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-[40%] aspect-square border border-[#FF4500]/50 rounded-full animate-ping-slow" />
          <div
            className="absolute w-[70%] aspect-square border border-[#FF4500]/30 rounded-full animate-ping-slow"
            style={{ animationDelay: '1s' as unknown as string }}
          />
          <div
            className="absolute w-[100%] aspect-square border border-[#FF4500]/10 rounded-full animate-ping-slow"
            style={{ animationDelay: '2s' as unknown as string }}
          />
        </div>
        <div className="relative z-10 w-16 h-16 md:w-20 md:h-20 bg-[#FF4500] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(255,69,0,0.6)]">
          <div className="w-6 h-6 md:w-8 md:h-8 bg-white rounded-full animate-pulse" />
        </div>
      </div>
    ),
  },
  {
    id: '04',
    title: 'Acquisition & SEO',
    desc: "Positionnement stratégique et pérenne sur les moteurs de recherche. Ne cherchez plus vos clients, faites en sorte qu'ils vous trouvent.",
    tags: ['Ranking', 'Mots-clés', 'Conversion'],
    bgColor: 'bg-[#FF4500]',
    textColor: 'text-white',
    visual: (
      <div className="w-full h-full relative flex items-center justify-center bg-[#E63E00] overflow-hidden">
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-20">
          {Array.from({ length: 36 }).map((_, i) => (
            <ArrowUpRightIcon key={i} />
          ))}
        </div>
        <div className="relative z-10 bg-[#001F3F] p-6 md:p-10 rounded-3xl transform rotate-3 shadow-2xl">
          <TrendingUp className="w-16 h-16 md:w-24 md:h-24 text-[#FF4500]" />
        </div>
      </div>
    ),
  },
] as const;

function ArrowUpRightIcon() {
  return (
    <div className="flex items-center justify-center">
      <TrendingUp className="w-4 h-4 text-[#001F3F]" />
    </div>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className="py-24 md:py-40 bg-[#F8FAFC] relative" aria-labelledby="services-title">
      <div className="container mx-auto px-5 lg:px-8 max-w-screen-xl">
        <FadeUp className="mb-16 md:mb-32">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-8 rounded-full bg-[#FF4500] flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
            <span className="text-[#001F3F] font-bold tracking-[0.15em] uppercase text-sm">
              Pôles d&apos;Excellence
            </span>
          </div>
          <h2
            id="services-title"
            className="text-[10vw] sm:text-[5rem] font-black tracking-tighter text-[#001F3F] leading-[1]"
          >
            L&apos;expertise pure.
          </h2>
        </FadeUp>

        <div className="relative flex flex-col gap-6 md:gap-12 pb-24">
          {SERVICES.map((srv, idx) => (
            <FadeUp key={srv.id} delay={80 * idx}>
              <div
                className={cn(
                  'sticky w-full rounded-[2rem] md:rounded-[3rem] overflow-hidden border shadow-2xl flex flex-col lg:flex-row transition-all duration-500 min-h-[80vh] lg:min-h-[520px]',
                  srv.bgColor,
                  srv.id === '01' ? 'border-gray-200' : 'border-white/10'
                )}
                style={{ top: `calc(10vh + ${idx * 32}px)` }}
              >
                <div className="w-full lg:w-1/2 p-8 md:p-16 flex flex-col">
                  <span className={cn('text-5xl font-black mb-8 opacity-20', srv.textColor)}>{srv.id}</span>
                  <h3
                  className={cn(
                    'text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-[1.1]',
                    srv.textColor
                  )}
                  >
                    {srv.title}
                  </h3>
                  <p
                  className={cn(
                    'text-lg md:text-xl font-medium leading-relaxed mb-10',
                    srv.textColor,
                    srv.id === '03' || srv.id === '04' ? 'opacity-90' : 'opacity-70'
                  )}
                  >
                    {srv.desc}
                  </p>
                  <div className="flex flex-wrap gap-3 mt-auto">
                    {srv.tags.map((tag) => (
                      <span
                        key={tag}
                        className={cn(
                          'px-4 py-2 rounded-full text-xs md:text-sm font-bold border',
                          srv.id === '03' || srv.id === '04'
                            ? 'bg-white text-[#001F3F] border-transparent'
                            : 'border-[#001F3F]/20 text-[#001F3F]'
                        )}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="w-full lg:w-1/2 h-[40vh] lg:h-auto border-t lg:border-t-0 lg:border-l border-black/5">
                  {srv.visual}
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

