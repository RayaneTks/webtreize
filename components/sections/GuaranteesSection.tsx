'use client';

import { ArrowRight } from '@phosphor-icons/react';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';
import { COMMITMENTS } from '@/lib/data/site';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

export function GuaranteesSection() {
  const scroll = useSmoothScroll();

  return (
    <Section id="engagements" aria-labelledby="engagements-title" className="bg-surface-raised">
      <div className="site-container">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <Reveal>
            <SectionHeading
              title={
                <span id="engagements-title">
                  Nos engagements,
                  <span className="block text-navy">sans petites lignes.</span>
                </span>
              }
              description="Jeune agence, oui. Mais des règles claires, des délais tenus, et une exigence technique visible dès cette page."
            />
            <Button className="mt-8" onClick={(e) => scroll(e, '#contact')}>
              Lancer un audit
              <ArrowRight size={18} weight="bold" />
            </Button>
          </Reveal>

          <div className="space-y-4">
            {COMMITMENTS.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.08}>
                <article className="panel p-6 transition-[border-color,box-shadow] duration-300 hover:border-accent/15 hover:shadow-soft md:p-7">
                  <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{item.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
