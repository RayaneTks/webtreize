'use client';

import { useState } from 'react';
import { Minus, Plus } from '@phosphor-icons/react';
import { Reveal } from '@/components/motion/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';
import { FAQ_ITEMS } from '@/lib/data/faq';
import { cn } from '@/lib/utils';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq" aria-labelledby="faq-title" className="bg-canvas">
      <div className="site-container max-w-3xl">
        <Reveal>
          <SectionHeading title={<span id="faq-title">Questions fréquentes</span>} />
        </Reveal>

        <div className="mt-10">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={item.q} delay={i * 0.05}>
                <div className={cn('border-b border-line', i === 0 && 'border-t')}>
                  <button
                    type="button"
                    id={`faq-btn-${i}`}
                    className="flex w-full items-center justify-between gap-6 rounded-lg py-6 text-left transition-colors duration-200 hover:bg-surface-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                  >
                    <span className="text-base font-medium text-ink md:text-lg">{item.q}</span>
                    {isOpen ? (
                      <Minus size={20} weight="bold" className="shrink-0 text-accent" />
                    ) : (
                      <Plus size={20} weight="bold" className="shrink-0 text-muted" />
                    )}
                  </button>
                  <div
                    id={`faq-answer-${i}`}
                    role="region"
                    aria-labelledby={`faq-btn-${i}`}
                    aria-hidden={!isOpen}
                    className={cn(
                      'grid transition-[grid-template-rows,opacity] duration-300 ease-out',
                      isOpen ? 'grid-rows-[1fr] pb-6 opacity-100' : 'grid-rows-[0fr] opacity-0',
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="leading-relaxed text-muted">{item.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
