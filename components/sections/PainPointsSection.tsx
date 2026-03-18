'use client';

import React from 'react';
import { FadeUp } from '@/components/ui/FadeUp';
import { X, BarChart3, PhoneOff, UserX } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const PAIN_POINTS = [
  "Votre site existe, mais il ne génère aucun appel.",
  "Vos concurrents récupèrent les clients que vous devriez avoir.",
  "Vous avez payé cher pour un site qui ne convertit pas.",
] as const;

const CHART_BARS = [8, 14, 6, 18, 4, 10, 5, 15, 3, 8, 5, 10];

function AnalyticsDashboard() {
  return (
    <div className="relative">
      <div className="border border-white/10 overflow-hidden">
        {/* Terminal header */}
        <div className="px-5 py-3 border-b border-white/10 bg-white/[0.02] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-full bg-red-500/80" />
            <span className="text-white/30 text-[11px] font-mono font-bold tracking-wide">analytics — votre-site.fr</span>
          </div>
          <span className="text-white/15 text-[10px] font-mono">30 derniers jours</span>
        </div>

        {/* Metrics row */}
        <div className="grid grid-cols-3 gap-px bg-white/[0.06]">
          {[
            { value: '0', label: 'visites', icon: BarChart3 },
            { value: '0', label: 'appels', icon: PhoneOff },
            { value: '0', label: 'clients', icon: UserX },
          ].map((m, i) => {
            const Icon = m.icon;
            return (
              <div key={i} className="bg-navy p-5 text-center">
                <Icon className="w-4 h-4 text-white/15 mx-auto mb-2" strokeWidth={1.5} />
                <p className="font-display text-4xl xl:text-5xl text-white/90 leading-none">{m.value}</p>
                <p className="text-white/25 text-[10px] font-bold mt-1.5 uppercase tracking-wider">{m.label}</p>
              </div>
            );
          })}
        </div>

        {/* Flat-line chart */}
        <div className="p-5 bg-white/[0.01]">
          <div className="flex items-end gap-[3px] h-20">
            {CHART_BARS.map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-white/[0.07] rounded-sm"
                style={{ height: `${h}%`, minHeight: '2px' }}
              />
            ))}
          </div>
          <div className="flex items-center justify-between mt-3">
            <span className="text-[10px] text-white/15 font-mono">1 mars</span>
            <span className="text-[10px] text-red-400/60 font-mono font-bold">— aucune donnée —</span>
            <span className="text-[10px] text-white/15 font-mono">aujourd&apos;hui</span>
          </div>
        </div>
      </div>

      {/* Position badge */}
      <div className="absolute -bottom-4 -right-4 bg-cream border-2 border-navy px-5 py-3 shadow-brutal-sm">
        <p className="text-[10px] font-bold text-navy/60 uppercase tracking-wide">Position moyenne</p>
        <p className="font-display text-navy text-xl leading-none mt-0.5">#48 sur Google</p>
      </div>
    </div>
  );
}

export function PainPointsSection() {
  const scroll = useSmoothScroll();

  return (
    <section
      className="py-24 md:py-36 bg-navy relative overflow-hidden"
      aria-labelledby="pain-title"
    >
      {/* Large "0" watermark */}
      <div
        className="absolute right-[-5%] top-1/2 -translate-y-1/2 font-display text-[50vw] md:text-[35vw] leading-none text-white/[0.02] pointer-events-none select-none"
        aria-hidden="true"
      >
        0
      </div>

      <div className="container mx-auto px-5 lg:px-12 xl:px-16 max-w-screen-xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <FadeUp>
              <h2
                id="pain-title"
                className="font-display text-white uppercase leading-[0.92] mb-6 md:mb-8"
                style={{ fontSize: 'clamp(36px, 6vw, 64px)' }}
              >
                Avoir un site
                <br />
                ne suffit plus.
              </h2>
              <p className="text-white/80 font-medium text-lg md:text-xl leading-relaxed mb-12 max-w-xl">
                Un site sans stratégie, c&apos;est de l&apos;argent jeté par la fenêtre.
                Voici ce qu&apos;on voit chez 90% des entreprises qui nous contactent.
              </p>
            </FadeUp>

            <div className="flex flex-col gap-3 mb-12">
              {PAIN_POINTS.map((point, i) => (
                <FadeUp key={i} delay={i * 80}>
                  <div className="flex items-start gap-4 p-5 border border-white/15 bg-white/5 hover:bg-white/[0.08] transition-colors">
                    <div className="w-8 h-8 flex items-center justify-center bg-orange/20 shrink-0 mt-0.5">
                      <X className="w-4 h-4 text-orange" strokeWidth={3} />
                    </div>
                    <p className="text-white/90 font-medium text-base md:text-lg leading-relaxed">
                      {point}
                    </p>
                  </div>
                </FadeUp>
              ))}
            </div>

            <FadeUp delay={300}>
              <Button
                variant="default"
                size="lg"
                onClick={(e) => scroll(e, '#contact')}
              >
                Corriger ça maintenant
              </Button>
            </FadeUp>
          </div>

          {/* Right: Analytics dashboard mockup */}
          <FadeUp delay={200} className="hidden lg:block">
            <AnalyticsDashboard />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
