'use client';

import React from 'react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { Button } from '@/components/ui/Button';
import { ArrowRight, TrendingUp, MapPin } from 'lucide-react';

function GoogleResultMockup() {
  return (
    <div className="relative">
      {/* "Before" card — faded, rotated behind */}
      <div className="absolute -top-6 -left-6 w-[90%] bg-white/5 border border-white/10 p-5 rotate-[-2deg] opacity-50">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 rounded-full bg-red-500/60" />
          <span className="text-white/40 text-xs font-bold">Position #48</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full w-3/4 mb-2" />
        <div className="h-2 bg-white/10 rounded-full w-1/2" />
        <p className="text-white/30 text-[11px] mt-3 font-medium">Invisible sur Google</p>
      </div>

      {/* "After" card — prominent Google result */}
      <div className="relative bg-cream border-2 border-navy shadow-brutal-orange-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-navy font-bold text-sm leading-none">Votre entreprise</p>
              <p className="text-neutral-text text-xs">votre-site.fr</p>
            </div>
          </div>
          <span className="bg-navy text-white text-xs font-bold px-2.5 py-1">#1</span>
        </div>

        {/* Description snippet */}
        <div className="space-y-2 mb-3">
          <div className="h-2 bg-navy/10 rounded-full w-full" />
          <div className="h-2 bg-navy/10 rounded-full w-4/5" />
          <div className="h-2 bg-navy/10 rounded-full w-3/5" />
        </div>

        <div className="mt-4 pt-4 border-t border-navy/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-orange" />
            <span className="text-xs font-bold text-navy">Marseille, 13</span>
          </div>
          <span className="text-xs font-bold text-orange">Ouvert maintenant</span>
        </div>
      </div>

      {/* Metric badge */}
      <div className="absolute -bottom-4 -right-4 bg-orange border-2 border-navy shadow-brutal-sm p-3">
        <p className="font-display text-white text-xl leading-none">+200%</p>
        <p className="text-white/80 text-[10px] font-bold mt-0.5">visibilité</p>
      </div>
    </div>
  );
}

export function HeroSection() {
  const scroll = useSmoothScroll();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-end md:items-center bg-cream overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-orange z-20" aria-hidden="true" />

      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(#001F3F 1px, transparent 1px),
            linear-gradient(90deg, #001F3F 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      {/* Brand watermark "13" */}
      <div
        className="absolute right-[-2%] top-1/2 -translate-y-1/2 font-display text-[40vw] leading-none text-navy/[0.02] pointer-events-none select-none hidden lg:block"
        aria-hidden="true"
      >
        13
      </div>

      <div className="container mx-auto px-5 lg:px-12 xl:px-16 max-w-screen-xl relative z-10 pt-28 pb-16 md:pt-40 md:pb-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text content */}
          <div>
            {/* Badge */}
            <div className="hero-enter inline-flex items-center gap-3 mb-8 md:mb-10">
              <span className="px-4 py-2 bg-orange text-white text-xs font-bold uppercase tracking-[0.15em] border-2 border-navy">
                Marseille
              </span>
              <span className="text-sm font-bold text-neutral-text">
                Audit gratuit · 48h
              </span>
            </div>

            {/* Headline */}
            <h1
              id="hero-title"
              className="hero-enter hero-enter-delay-1 font-display text-navy uppercase leading-[0.9] mb-8 md:mb-10"
              style={{ fontSize: 'clamp(40px, 5.5vw, 72px)' }}
            >
              Des sites qui
              <br />
              <span className="text-orange">ramènent</span>
              <br />
              des clients.
            </h1>

            {/* Subtitle */}
            <p className="hero-enter hero-enter-delay-2 text-lg md:text-xl text-neutral-text font-medium max-w-xl leading-relaxed mb-10 md:mb-12">
              Vos clients vous cherchent sur Google.
              On fait en sorte qu&apos;ils vous trouvent — pas vos concurrents.
            </p>

            {/* CTA */}
            <div className="hero-enter hero-enter-delay-3 mb-12 md:mb-14">
              <Button
                size="lg"
                className="group"
                onClick={(e) => scroll(e, '#contact')}
              >
                Obtenir mon audit gratuit
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            {/* Mobile compact mockup — inline in the text flow */}
            <div className="lg:hidden hero-enter hero-enter-delay-3 mb-10 -mx-5 px-5">
              <div className="relative bg-navy p-5">
                <div className="relative bg-cream border-2 border-navy shadow-brutal-orange p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 bg-orange flex items-center justify-center">
                        <TrendingUp className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div>
                        <p className="text-navy font-bold text-xs leading-none">Votre entreprise</p>
                        <p className="text-neutral-text text-[10px]">votre-site.fr</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-navy text-white text-[10px] font-bold px-2 py-0.5">#1</span>
                      <span className="bg-orange text-white text-[10px] font-bold px-2 py-0.5">+200%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Proof line */}
            <div className="hero-enter hero-enter-delay-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
              <span className="font-bold text-navy">Agence web Marseille (13)</span>
              <span className="hidden sm:block w-px h-4 bg-navy/20" aria-hidden="true" />
              <span className="text-neutral-text font-medium">Réponse sous 48h</span>
              <span className="hidden sm:block w-px h-4 bg-navy/20" aria-hidden="true" />
              <span className="text-neutral-text font-medium">0€ sans engagement</span>
            </div>
          </div>

          {/* Right: Google Result Mockup in navy container — desktop */}
          <div className="hidden lg:block hero-enter hero-enter-delay-2">
            <div className="relative bg-navy p-8 xl:p-10">
              <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{
                  backgroundImage: `
                    linear-gradient(white 1px, transparent 1px),
                    linear-gradient(90deg, white 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px',
                }}
                aria-hidden="true"
              />
              <div className="relative">
                <GoogleResultMockup />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
