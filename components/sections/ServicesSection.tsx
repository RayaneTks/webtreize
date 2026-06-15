'use client';

import { Code, GlobeHemisphereWest, MagnifyingGlass } from '@phosphor-icons/react';
import { HoverLift } from '@/components/decor/HoverLift';
import { Reveal } from '@/components/motion/Reveal';
import { Section, SectionHeading } from '@/components/ui/Section';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { SERVICES } from '@/lib/data/site';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

const ICONS = {
  web: GlobeHemisphereWest,
  seo: MagnifyingGlass,
  apps: Code,
} as const;

export function ServicesSection() {
  const scroll = useSmoothScroll();

  return (
    <Section id="services" aria-labelledby="services-title" className="bg-canvas">
      <div className="site-container">
        <Reveal>
          <SectionHeading
            title="Ce que nous construisons pour vous."
            description="Pas de catalogue figé : chaque mission part d'un diagnostic et d'objectifs mesurables."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {SERVICES.map((service, index) => {
            const Icon = ICONS[service.id as keyof typeof ICONS];
            const featured = index === 0;

            return (
              <Reveal key={service.id} delay={index * 0.06} className={featured ? 'lg:col-span-1' : ''}>
                <HoverLift className="h-full">
                  <ServiceCard
                    icon={Icon}
                    service={service}
                    featured={featured}
                    titleId={index === 0 ? 'services-title' : undefined}
                    onCta={(e) => scroll(e, '#contact')}
                  />
                </HoverLift>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
