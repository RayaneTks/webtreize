'use client';

import React, { useState } from 'react';
import { FadeUp } from '@/components/ui/FadeUp';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FAQ_ITEMS } from '@/lib/data/faq';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="py-24 md:py-36 bg-white relative"
      aria-labelledby="faq-title"
    >
      <div className="container mx-auto px-5 lg:px-12 xl:px-16 max-w-screen-xl">
        <FadeUp>
          <div className="max-w-2xl mb-16 md:mb-20">
            <span className="inline-block px-4 py-2 mb-6 border-2 border-navy text-xs font-bold uppercase tracking-[0.15em] text-navy">
              FAQ
            </span>
            <h2
              id="faq-title"
              className="font-display text-navy uppercase leading-[0.92]"
              style={{ fontSize: 'clamp(36px, 5.5vw, 56px)' }}
            >
              Questions
              <br />
              fréquentes.
            </h2>
          </div>
        </FadeUp>

        <div className="max-w-3xl">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <FadeUp key={i} delay={i * 60}>
                <div className={cn("border-b-2 border-navy/15", i === 0 && "border-t-2")}>
                  <button
                    type="button"
                    id={`faq-btn-${i}`}
                    className="w-full flex items-center justify-between py-6 md:py-8 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-orange focus-visible:ring-offset-2 rounded-sm"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                  >
                    <span className="font-bold text-navy text-base md:text-lg pr-8">
                      {item.q}
                    </span>
                    {isOpen ? (
                      <Minus className="w-5 h-5 text-orange shrink-0" strokeWidth={2.5} />
                    ) : (
                      <Plus className="w-5 h-5 text-navy/30 shrink-0" strokeWidth={2.5} />
                    )}
                  </button>
                  <div
                    id={`faq-answer-${i}`}
                    role="region"
                    aria-labelledby={`faq-btn-${i}`}
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                      isOpen ? "grid-rows-[1fr] opacity-100 pb-6 md:pb-8" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="text-neutral-text font-medium leading-relaxed max-w-2xl">
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
