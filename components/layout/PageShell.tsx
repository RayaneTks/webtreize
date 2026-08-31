'use client';

import { ClientShell } from '@/components/ClientShell';
import { Footer } from '@/components/layout/Footer';
import { Reveal } from '@/components/motion/Reveal';
import type { ReactNode } from 'react';

/**
 * En-tête de page interne : même respiration que le hero de l'accueil.
 * Pas de cadre, pas de fond distinct — un filet suffit à séparer.
 */
export function PageShell({
  eyebrow = 'WebTreize',
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <ClientShell>
        <section className="pb-[clamp(2.75rem,6vw,4.5rem)] pt-[calc(var(--header-height)+clamp(2.75rem,7vw,5.5rem))]">
          <div className="site-container">
            <Reveal>
              <p className="eyebrow">{eyebrow}</p>
              <h1 className="mt-[clamp(1.125rem,2.4vw,1.75rem)] max-w-[16ch] text-display-lg font-extrabold">
                {title}
              </h1>
              {description ? <p className="lede mt-6 max-w-[52ch]">{description}</p> : null}
            </Reveal>
          </div>
        </section>
        {children}
        <Footer />
      </ClientShell>
    </div>
  );
}
