'use client';

import { ArrowRight } from '@phosphor-icons/react';
import { HoverLift } from '@/components/decor/HoverLift';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/motion/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';
import { PAIN_POINTS } from '@/lib/data/site';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

export function PainPointsSection() {
  const scroll = useSmoothScroll();

  return (
    <Section className="bg-surface-raised">
      <div className="site-container">
        <Reveal>
          <SectionHeading
            title={
              <>
                Ce qui freine
                <span className="block text-muted">votre croissance en ligne.</span>
              </>
            }
            description="La plupart des entreprises locales ont le même problème : une présence numérique qui ne reflète pas la qualité réelle de leur travail."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {PAIN_POINTS.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <HoverLift>
                <article className="panel h-full p-7 transition-[border-color,box-shadow] duration-300 hover:border-accent/15 hover:shadow-soft md:p-8">
                  <h3 className="text-xl font-semibold text-ink">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{item.body}</p>
                </article>
              </HoverLift>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-10">
          <Button onClick={(e) => scroll(e, '#contact')}>
            Identifier mes priorités
            <ArrowRight size={18} weight="bold" />
          </Button>
        </Reveal>
      </div>
    </Section>
  );
}
