'use client';

import { Code, GlobeHemisphereWest, MagnifyingGlass, MapPin } from '@phosphor-icons/react';
import { Reveal } from '@/components/motion/Reveal';
import { ServiceCard } from '@/components/ui/ServiceCard';
import { GOOGLE_BUSINESS_SERVICE, SERVICES } from '@/lib/data/site';

const ICONS = {
  web: GlobeHemisphereWest,
  seo: MagnifyingGlass,
  apps: Code,
  google: MapPin,
} as const;

const ALL_SERVICES = [...SERVICES, GOOGLE_BUSINESS_SERVICE];

export function ServicesPageContent() {
  return (
    <section className="section-pad">
      <div className="site-container grid gap-5 md:grid-cols-2">
        {ALL_SERVICES.map((service, index) => {
          const Icon = ICONS[service.id as keyof typeof ICONS];
          return (
            <Reveal key={service.id} delay={index * 0.05}>
              <ServiceCard
                icon={Icon}
                service={service}
                featured={index === 0}
                ctaHref="/#contact"
              />
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
