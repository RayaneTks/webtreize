'use client';

import React from 'react';
import { FadeUp } from '@/components/ui/FadeUp';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, CalendarClock, LifeBuoy, Unlock } from 'lucide-react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const GUARANTEES = [
  {
    icon: ShieldCheck,
    title: 'Audit initial gratuit',
    description: "Sans engagement et sans condition cachée. Nous vous livrons une analyse concrète de ce qui ne fonctionne pas, que vous décidiez de travailler avec nous ou non.",
  },
  {
    icon: CalendarClock,
    title: 'Délais contractuels',
    description: "Les dates de livraison sont inscrites dans le devis. Un retard de notre part ? C'est nous qui payons des pénalités. Pas vous.",
  },
  {
    icon: LifeBuoy,
    title: '30 jours de suivi inclus',
    description: "Après livraison, nous restons à vos côtés pendant un mois complet pour assurer un lancement parfait et corriger le moindre détail.",
  },
  {
    icon: Unlock,
    title: 'Zéro abonnement forcé',
    description: "Vous êtes propriétaire de votre nom de domaine et de votre site. Aucun abonnement piège, vous êtes totalement libre.",
  },
] as const;

export function GuaranteesSection() {
  const scroll = useSmoothScroll();

  return (
    <section 
      id="engagements"
      className="py-20 md:py-32 bg-navy relative overflow-hidden"
      aria-labelledby="engagements-title"
    >
      {/* Background design */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] animate-spin-slow rotate-45"
             style={{ backgroundImage: 'repeating-linear-gradient(45deg, white 0px, white 2px, transparent 2px, transparent 40px)' }}
        />
      </div>

      <div className="container mx-auto px-5 lg:px-8 max-w-screen-xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* Titre et CTA - Sticky sur desktop */}
          <div className="w-full lg:w-1/3">
            <div className="lg:sticky lg:top-32">
              <FadeUp>
                <div className="w-16 h-1 bg-orange mb-8" />
                <h2 
                  id="engagements-title"
                  className="text-white font-black tracking-tight leading-[1.1] text-3xl md:text-5xl mb-6 uppercase"
                >
                  Nos engagements
                </h2>
                <p className="text-white/70 font-medium text-lg mb-8 leading-relaxed">
                  Contrairement aux "usines à sites", nous misons tout sur la qualité et la transparence. Voici nos standards non-négociables.
                </p>
                <Button 
                  size="lg"
                  className="w-full md:w-auto text-[15px] sm:text-lg"
                  onClick={(e) => scroll(e, '#contact')}
                >
                  Démarrer mon audit gratuit
                </Button>
              </FadeUp>
            </div>
          </div>

          {/* Grille de garanties */}
          <div className="w-full lg:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {GUARANTEES.map((item, index) => {
                const Icon = item.icon;
                return (
                  <FadeUp key={index} delay={index * 100}>
                    <Card className="h-full bg-navy/50 border border-white/10 backdrop-blur-sm p-6 md:p-8 hover:bg-white/5 hover:border-white/20 transition-all text-white">
                      <div className="w-14 h-14 rounded-2xl bg-orange/20 text-orange flex items-center justify-center mb-6">
                        <Icon strokeWidth={2.5} className="w-7 h-7" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-4">
                        {item.title}
                      </h3>
                      <p className="text-white/60 font-medium leading-relaxed">
                        {item.description}
                      </p>
                    </Card>
                  </FadeUp>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
