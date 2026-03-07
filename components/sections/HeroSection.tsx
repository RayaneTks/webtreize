'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { FadeUp } from '@/components/ui/FadeUp';

function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div
        className="absolute top-0 left-[-20%] w-[140%] h-[140%] opacity-[0.04] md:animate-grid-drift motion-reduce:animate-none"
        style={{
          backgroundImage:
            'linear-gradient(#001F3F 2px, transparent 2px), linear-gradient(90deg, #001F3F 2px, transparent 2px)',
          backgroundSize: '80px 80px',
          transform: 'rotateX(60deg) rotateZ(45deg)',
        }}
        aria-hidden
      />
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#FF4500] blur-[150px] opacity-[0.08]" aria-hidden />
      <div className="absolute bottom-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#001F3F] blur-[150px] opacity-[0.06]" aria-hidden />
    </div>
  );
}

export function HeroSection() {
  const scroll = useSmoothScroll();

  return (
    <section
      id="hero"
      className="relative pt-36 pb-20 md:pt-48 md:pb-32 lg:pt-56 lg:pb-40 px-5 lg:px-8 min-h-[85vh] md:min-h-[90vh] flex flex-col justify-center bg-[#F8FAFC] overflow-hidden"
      aria-labelledby="hero-title"
    >
      <HeroBackground />

      <div className="container mx-auto max-w-screen-xl relative z-10">
        {/* Titre — flux vertical naturel */}
        <FadeUp>
          <h1
            id="hero-title"
            className="text-[11vw] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[7rem] font-black tracking-[-0.04em] text-[#001F3F] leading-[0.92] uppercase mb-8 md:mb-10"
          >
            Votre <br />
            Croissance <br />
            Digitale <br />
            <span className="relative inline-block">
              <span className="text-transparent stroke-text-navy">
                Simplifiée.
              </span>
              <span className="absolute bottom-[8%] left-0 w-full h-[5px] md:h-[8px] bg-[#FF4500] -z-10 rounded-full" aria-hidden />
            </span>
          </h1>
        </FadeUp>

        {/* Sous-titre — directement sous le titre, largeur contrôlée */}
        <FadeUp delay={150}>
          <p className="text-base sm:text-lg md:text-xl text-[#001F3F]/60 font-medium leading-relaxed max-w-xl mb-10 md:mb-12">
            Site web, référencement, fiche Google, image de marque — nous construisons
            la présence digitale qui vous apporte des clients. Pas du bruit.
          </p>
        </FadeUp>

        {/* CTAs — côte à côte, taille cohérente, whitespace-nowrap */}
        <FadeUp delay={250}>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <Link
              href="#contact"
              onClick={(e) => scroll(e, '#contact')}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-4 min-h-[52px] rounded-full bg-[#FF4500] text-white font-bold text-[0.95rem] whitespace-nowrap shadow-[0_12px_24px_rgba(255,69,0,0.15)] hover:shadow-[0_16px_32px_rgba(255,69,0,0.25)] hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-300"
            >
              Démarrer un projet <ArrowUpRight className="w-4 h-4 shrink-0" />
            </Link>
            <Link
              href="#services"
              onClick={(e) => scroll(e, '#services')}
              className="inline-flex items-center justify-center px-7 py-4 min-h-[52px] rounded-full bg-white border border-[#001F3F]/10 text-[#001F3F] font-bold text-[0.95rem] whitespace-nowrap hover:border-[#001F3F]/25 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-300 shadow-sm"
            >
              Découvrir nos services
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
