'use client';

import React from 'react';
import { FadeUp } from '@/components/ui/FadeUp';
import { ShieldCheck, CalendarClock, LifeBuoy, Unlock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const GUARANTEES = [
  {
    icon: ShieldCheck,
    title: 'Audit gratuit',
    description: "Analyse complète, sans engagement. Que vous travailliez avec nous ou non.",
  },
  {
    icon: CalendarClock,
    title: 'Délais garantis',
    description: "Dates inscrites au contrat. Un retard ? On paye des pénalités.",
  },
  {
    icon: LifeBuoy,
    title: '30 jours de suivi',
    description: "Un mois d'accompagnement après livraison. Ajustements inclus.",
  },
  {
    icon: Unlock,
    title: 'Zéro piège',
    description: "Propriétaire de votre site et domaine. Aucun abonnement forcé.",
  },
] as const;

export function GuaranteesSection() {
  const scroll = useSmoothScroll();

  return (
    <section
      id="engagements"
      className="py-24 md:py-36 bg-white relative"
      aria-labelledby="engagements-title"
    >
      <div className="container mx-auto px-5 lg:px-12 xl:px-16 max-w-screen-xl">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left: Headline + CTA */}
          <div className="lg:col-span-4">
            <FadeUp>
              <span className="inline-block px-4 py-2 mb-6 border-2 border-navy text-xs font-bold uppercase tracking-[0.15em] text-navy">
                Engagements
              </span>
              <h2
                id="engagements-title"
                className="font-display text-navy uppercase leading-[0.92] mb-6"
                style={{ fontSize: 'clamp(32px, 4.5vw, 48px)' }}
              >
                Pas de belles
                <br />
                paroles.
                <br />
                Des garanties.
              </h2>
              <p className="text-neutral-text font-medium leading-relaxed mb-8 max-w-sm">
                On ne livre pas du bruit. On livre du sérieux — et du résultat mesurable.
              </p>
              <Button size="lg" onClick={(e) => scroll(e, '#contact')}>
                Démarrer mon audit
              </Button>
            </FadeUp>
          </div>

          {/* Right: 2x2 grid with border separators */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-navy/15 border-2 border-navy/15">
              {GUARANTEES.map((item, index) => {
                const Icon = item.icon;
                return (
                  <FadeUp key={index} delay={index * 80}>
                    <div className="p-8 md:p-10 bg-white h-full">
                      <Icon className="w-7 h-7 text-orange mb-6" strokeWidth={2} />
                      <h3 className="font-display text-lg md:text-xl text-navy uppercase mb-3">
                        {item.title}
                      </h3>
                      <p className="text-neutral-text font-medium leading-relaxed text-sm">
                        {item.description}
                      </p>
                    </div>
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
