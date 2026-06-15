'use client';

import { Reveal } from '@/components/motion/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';
import { METHOD_STEPS } from '@/lib/data/site';

export function MethodologySection() {
  return (
    <Section id="method" aria-labelledby="method-title" className="bg-surface">
      <div className="site-container">
        <Reveal>
          <SectionHeading
            title={<span id="method-title">Quatre étapes. Zéro improvisation.</span>}
            description="Un cadre clair, des livrables à chaque phase, et une transparence totale sur les priorités."
          />
        </Reveal>

        <ol className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {METHOD_STEPS.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.07}>
              <li className="panel h-full p-6 transition-[border-color,box-shadow] duration-300 hover:border-accent/15 hover:shadow-soft">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-accent">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
