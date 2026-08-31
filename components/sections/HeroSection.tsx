'use client';

import { Reveal } from '@/components/motion/Reveal';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';

export function HeroSection() {
  const scroll = useSmoothScroll();

  return (
    <section id="hero" aria-labelledby="hero-title" className="pt-[clamp(3.5rem,10vw,8.25rem)] text-center">
      <div className="site-container">
        <Reveal>
          <p className="eyebrow">Studio digital · Marseille</p>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 id="hero-title" className="mx-auto mt-[clamp(1.25rem,2.6vw,1.875rem)] max-w-[19ch] text-display-xl font-extrabold">
            Votre savoir-faire mérite d&apos;être trouvé.
          </h1>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-[clamp(1.375rem,2.6vw,2rem)] max-w-[52ch] text-[clamp(1.0625rem,1.4vw,1.3125rem)] leading-[1.6] text-muted">
            Nous concevons des sites, des fiches Google et des outils sur mesure pour les entreprises
            du 13 — avec le même soin qu&apos;on met à recevoir un client.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-[clamp(1.875rem,3.4vw,2.75rem)] flex flex-wrap items-center justify-center gap-x-6 gap-y-3.5">
            <a href="#audit" onClick={(e) => scroll(e, '#audit')} className="btn-primary">
              Commencer par un audit
            </a>
            <a href="#approche" onClick={(e) => scroll(e, '#approche')} className="btn-text">
              Découvrir notre approche&nbsp;→
            </a>
          </div>
          <p className="mt-[clamp(1.125rem,2vw,1.625rem)] text-sm text-subtle">
            Gratuit · Réponse écrite sous 48 heures · Sans engagement
          </p>
        </Reveal>
      </div>

      {/* Plaque principale — remplacer par une vraie photo (2400×1350) */}
      <Reveal delay={0.2}>
        <div className="plate-container mt-[clamp(2.75rem,6vw,5.25rem)]">
          <div className="plate flex aspect-[16/9] items-end rounded-plate-lg bg-surface-sand p-[clamp(1.125rem,2.5vw,2rem)]">
            <span className="eyebrow">Photo — atelier, boutique ou projet client · 2400 × 1350</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
