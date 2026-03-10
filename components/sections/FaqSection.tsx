'use client';

import React, { useState } from 'react';
import { FadeUp } from '@/components/ui/FadeUp';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const FAQ_ITEMS = [
  {
    q: "Vous êtes nouveaux, pourquoi vous confier ça ?",
    a: "Justement, on a tout à prouver. On a faim, on est à la pointe technique, et nos tarifs sont justes car on n'a pas les locaux de 300m² à rentabiliser.",
  },
  {
    q: "Combien ça coûte réellement ?",
    a: "Chaque projet est unique, chaque devis aussi. On ne pratique pas les tarifs au forfait générique. Après votre audit gratuit, vous recevez un devis détaillé ligne par ligne, adapté exactement à votre besoin. Aucune surprise.",
  },
  {
    q: "En combien de temps j'ai des résultats ?",
    a: "Ça dépend. Optimiser une fiche Google peut prendre 30 jours. Refaire un site prend 4 à 8 semaines. L'audit vous donnera une date exacte.",
  },
  {
    q: "Et si je ne comprends rien à l'informatique ?",
    a: "C'est pour ça qu'on est là. On s'occupe de la technique, vous vous occupez des clients qu'on va vous ramener.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      id="faq"
      className="py-20 md:py-32 bg-neutral-bg relative"
      aria-labelledby="faq-title"
    >
      <div className="container mx-auto px-5 lg:px-8 max-w-screen-md">
        <FadeUp>
          <div className="text-center mb-12 md:mb-16">
            <h2 
              id="faq-title"
              className="text-navy font-black tracking-tight leading-[1.1] text-3xl md:text-5xl mb-6"
            >
              Les questions qui fâchent.
            </h2>
            <p className="text-navy/70 font-medium text-lg">
              Et nos réponses honnêtes.
            </p>
          </div>
        </FadeUp>

        <div className="flex flex-col gap-4">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <FadeUp key={i} delay={i * 100}>
                <div 
                  className={cn(
                    "rounded-2xl border transition-colors duration-300 overflow-hidden",
                    isOpen ? "bg-neutral-bg border-navy/10" : "bg-white border-navy/5 hover:border-navy/15"
                  )}
                >
                  <button
                    type="button"
                    className="w-full flex items-center justify-between p-6 text-left min-h-[56px] focus:outline-none focus-visible:ring-2 focus-visible:ring-orange"
                    onClick={() => toggleItem(i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                  >
                    <span className="font-bold text-navy pr-4 text-[15px] sm:text-base">
                      {item.q}
                    </span>
                    <ChevronRight 
                      className={cn(
                        "w-5 h-5 text-orange shrink-0 transition-transform duration-300 ease-out",
                        isOpen && "rotate-90"
                      )} 
                    />
                  </button>
                  <div 
                    id={`faq-answer-${i}`}
                    className={cn(
                      "grid transition-all duration-300 ease-out",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="p-6 pt-0 text-neutral-text font-medium leading-relaxed whitespace-pre-line text-sm sm:text-base">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
