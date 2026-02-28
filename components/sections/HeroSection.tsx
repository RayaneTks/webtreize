'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { DigitalHeroBackground } from '@/components/background/DigitalHeroBackground';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

export function HeroSection() {
  const scroll = useSmoothScroll();

  return (
    <section
      id="hero"
      className="relative pt-40 pb-20 md:pt-48 md:pb-32 px-4 sm:px-6 min-h-[90vh] flex flex-col justify-center overflow-hidden"
      aria-labelledby="hero-title"
    >
      <DigitalHeroBackground />
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
        <Image
          src="/nd-bg.webp"
          alt=""
          fill
          sizes="(max-width: 640px) 320px, (max-width: 768px) 384px, 100vw"
          className="object-cover object-center opacity-[0.1]"
          priority
          fetchPriority="high"
          quality={35}
        />
      </div>
      <div className="container mx-auto max-w-5xl text-center relative z-10">
        <Reveal delay={100} direction="up">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-black/40 border border-white/10 text-gray-300 text-xs md:text-sm font-medium mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(0,194,255,0.05)]">
            <span className="relative flex h-2 w-2" aria-hidden>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>
            Votre croissance digitale simplifiée
          </div>
        </Reveal>

        <Reveal delay={200} direction="up" immediate>
          <h1 id="hero-title" className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[1.05]">
            Attirez plus de clients <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-600 bg-[length:200%_auto] animate-gradient">
              grâce au digital.
            </span>
          </h1>
        </Reveal>

        <Reveal delay={300} direction="up" immediate>
          <p className="text-lg md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto font-medium leading-relaxed">
            Bien plus qu&apos;une simple agence, nous sommes votre partenaire de croissance global. De la technique à la stratégie pure.
          </p>
        </Reveal>

        <Reveal delay={400} direction="up" immediate>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
            <Link
              href="#contact"
              onClick={(e) => scroll(e, '#contact')}
              className="group w-full sm:w-auto max-w-[280px] sm:max-w-none mx-auto sm:mx-0 px-6 py-3.5 sm:px-8 sm:py-4.5 rounded-full bg-blue-600 text-white font-bold text-base sm:text-lg transition-all active:scale-95 shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030303]"
            >
              Devis Gratuit <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" aria-hidden />
            </Link>
            <Link
              href="#services"
              onClick={(e) => scroll(e, '#services')}
              className="w-full sm:w-auto max-w-[280px] sm:max-w-none mx-auto sm:mx-0 px-6 py-3.5 sm:px-8 sm:py-4.5 rounded-full bg-black/40 border border-white/10 hover:bg-white/10 text-white font-bold text-base sm:text-lg transition-all active:scale-95 flex items-center justify-center gap-2 backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030303]"
            >
              Découvrir nos services
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
