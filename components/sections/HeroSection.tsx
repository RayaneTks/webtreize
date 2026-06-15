'use client';

import { ArrowUpRight } from '@phosphor-icons/react';
import { AmbientField } from '@/components/decor/AmbientField';
import { RankPreview } from '@/components/decor/RankPreview';
import { StudioRule } from '@/components/decor/StudioRule';
import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/Button';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

export function HeroSection() {
  const scroll = useSmoothScroll();

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-canvas bg-hero-light pt-[var(--header-height)]"
      aria-labelledby="hero-title"
    >
      <AmbientField />

      <div className="site-container relative grid items-center gap-12 py-14 md:py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div>
          <Reveal>
            <p className="text-sm font-medium text-muted">Agence digitale à Marseille</p>
            <StudioRule className="mb-7 mt-4" />
          </Reveal>

          <Reveal delay={0.05}>
            <h1
              id="hero-title"
              className="max-w-[12ch] text-[clamp(2.75rem,6.5vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.04em]"
            >
              Votre activité{' '}
              <span className="text-navy">enfin prise</span>{' '}
              <span className="text-accent">au sérieux.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              Site, visibilité locale, SEO et outils sur mesure. Le niveau d&apos;exigence que vous
              attendez pour vos clients, appliqué à votre propre présence en ligne.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-9 flex flex-wrap items-center gap-4">
            <Button size="lg" onClick={(e) => scroll(e, '#contact')}>
              Demander un audit gratuit
              <ArrowUpRight size={18} weight="bold" />
            </Button>
            <Button variant="ghost" size="lg" onClick={(e) => scroll(e, '#services')}>
              Voir nos expertises
            </Button>
          </Reveal>
        </div>

        <Reveal delay={0.12} className="lg:max-w-lg lg:justify-self-end">
          <RankPreview />
        </Reveal>
      </div>
    </section>
  );
}
