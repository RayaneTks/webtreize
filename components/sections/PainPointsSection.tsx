'use client';

import React from 'react';
import { FadeUp } from '@/components/ui/FadeUp';
import { Card, CardContent } from '@/components/ui/Card';
import { XCircle } from 'lucide-react';

const PAIN_POINTS = [
  "Vous avez un site, mais il ne génère aucun appel.",
  "Vos concurrents récupèrent les clients sur Google Maps.",
  "On vous a vendu un « template » basique au prix du sur-mesure.",
] as const;

export function PainPointsSection() {
  return (
    <section 
      className="py-16 md:py-24 bg-white relative overflow-hidden"
      aria-labelledby="pain-points-title"
    >
      {/* Abstract Glowing Backgrounds */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange/[0.03] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-navy/[0.02] rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="container mx-auto px-5 lg:px-8 max-w-screen-xl">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
          
          {/* Contenu - Gauche */}
          <div className="w-full lg:w-1/2">
            <FadeUp>
              <h2 
                id="pain-points-title"
                className="text-navy font-black tracking-tight leading-[1.1] mb-6 md:mb-8"
              >
                Avoir un site web ne suffit plus. <br />
                <span className="text-orange">Vos clients vont chez ceux qu'ils trouvent.</span>
              </h2>
            </FadeUp>
            
            <FadeUp delay={100}>
              <p className="text-base md:text-lg text-navy/70 mb-8 max-w-lg leading-relaxed font-medium">
                La majorité des prestataires vous livrent un joli site vide et vous laissent vous débrouiller. Résultat ? Vous êtes invisible sur Google, et votre investissement ne rapporte rien.
              </p>
            </FadeUp>

            <FadeUp delay={200}>
              <div className="flex flex-col gap-4">
                {PAIN_POINTS.map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                    <span className="text-navy/80 font-medium text-sm md:text-base leading-snug">{point}</span>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* Visuel Impactant - Droite */}
          <div className="w-full lg:w-1/2">
            <FadeUp delay={300} className="w-full">
              <div className="relative w-full aspect-square max-w-[500px] mx-auto">
                {/* Background décoratif */}
                <div className="absolute inset-0 bg-navy/5 rounded-full scale-90 blur-3xl opacity-50" />
                
                <Card className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] md:w-[80%] aspect-[4/3] bg-white/80 backdrop-blur-xl border border-navy/5 shadow-[0_20px_40px_-15px_rgba(0,31,63,0.1)] flex flex-col items-center justify-center p-6 text-center z-10 transition-transform duration-700 hover:scale-105">
                  <span className="text-4xl md:text-6xl mb-4 drop-shadow-sm">📉</span>
                  <p className="text-navy font-black text-xl md:text-2xl mb-2">0 contact généré</p>
                  <p className="text-navy/50 text-sm md:text-base font-medium">Le coût d'un site mal conçu.</p>
                </Card>

                {/* Éléments flottants pour l'effet de "perte" */}
                <Card className="absolute top-[10%] left-0 w-48 p-4 bg-white/90 backdrop-blur-md border-navy/5 shadow-lg rotate-[-6deg] z-20">
                  <div className="h-2 w-1/3 bg-red-100 rounded mb-3" />
                  <div className="h-2 w-full bg-navy/10 rounded mb-2" />
                  <div className="h-2 w-4/5 bg-navy/10 rounded" />
                </Card>
                
                <Card className="absolute bottom-[15%] right-[-5%] w-52 p-4 bg-white/90 backdrop-blur-md border-navy/5 shadow-lg rotate-[4deg] z-20 hidden sm:block">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 rounded-full border-2 border-orange/20 text-orange flex items-center justify-center text-xs font-bold">!</div>
                    <div className="h-2 w-1/2 bg-navy/10 rounded" />
                  </div>
                  <p className="text-xs text-navy/50">Position #48 sur Google</p>
                </Card>
              </div>
            </FadeUp>
          </div>

        </div>
      </div>
    </section>
  );
}
