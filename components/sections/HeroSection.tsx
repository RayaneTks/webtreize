'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { FadeUp } from '@/components/ui/FadeUp';

function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Grille isométrique animée */}
      <div
        className="absolute top-0 left-[-20%] w-[140%] h-[140%] opacity-[0.04] animate-grid-drift"
        style={{
          backgroundImage:
            'linear-gradient(#001F3F 2px, transparent 2px), linear-gradient(90deg, #001F3F 2px, transparent 2px)',
          backgroundSize: '80px 80px',
          transform: 'rotateX(60deg) rotateZ(45deg)',
        }}
        aria-hidden
      />
      {/* Halos de lumière */}
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#FF4500] blur-[150px] opacity-10 animate-pulse-slow" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#001F3F] blur-[150px] opacity-10" />
    </div>
  );
}

export function HeroSection() {
  const scroll = useSmoothScroll();

  return (
    <section
      id="hero"
      className="relative pt-40 pb-24 md:pt-56 md:pb-40 px-5 lg:px-8 min-h-[90vh] md:min-h-[95vh] flex flex-col justify-center bg-[#F8FAFC] overflow-hidden"
      aria-labelledby="hero-title"
    >
      <HeroBackground />

      <div className="container mx-auto max-w-screen-2xl relative z-10">
        <div className="max-w-5xl">
          <FadeUp delay={100}>
            <h1
              id="hero-title"
              className="text-[13vw] sm:text-[6rem] lg:text-[8rem] font-black tracking-tighter text-[#001F3F] leading-[0.9] uppercase mb-8 md:mb-12"
            >
              Votre <br />
              Croissance <br />
              Digitale <br />
              <span className="relative inline-block pb-1">
                <span className="text-transparent bg-clip-text stroke-text-navy">
                Simplifiée.
                </span>
                <div className="absolute bottom-[6%] left-0 w-full h-[6px] md:h-[12px] bg-[#FF4500] -z-10" />
              </span>
            </h1>
          </FadeUp>

          <div className="flex flex-col lg:flex-row gap-8 lg:items-end lg:justify-between">
            <FadeUp delay={200} className="lg:max-w-xl">
              <p className="text-lg md:text-2xl text-[#001F3F]/70 font-medium leading-relaxed">
                L&apos;ingénierie au service exclusif de vos résultats. Nous concevons des écosystèmes web de très
                haute volée pour dominer votre marché.
              </p>
            </FadeUp>

            <FadeUp delay={300}>
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 lg:mt-0">
                <Link
                  href="#contact"
                  onClick={(e) => scroll(e, '#contact')}
                  className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-5 rounded-full bg-[#FF4500] text-white font-bold text-lg shadow-[0_15px_30px_rgba(255,69,0,0.2)] active:scale-95 transition-transform duration-300"
                >
                  Démarrer un projet <ArrowUpRight className="w-5 h-5" />
                </Link>
                <Link
                  href="#services"
                  onClick={(e) => scroll(e, '#services')}
                  className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-5 rounded-full bg-white border border-[#001F3F]/10 text-[#001F3F] font-bold text-lg active:scale-95 transition-transform duration-300"
                >
                  Découvrir l&apos;expertise
                </Link>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}

