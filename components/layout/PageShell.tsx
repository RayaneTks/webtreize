'use client';

import { ClientShell } from '@/components/ClientShell';
import { StudioRule } from '@/components/decor/StudioRule';
import { Footer } from '@/components/layout/Footer';
import { Reveal } from '@/components/motion/Reveal';
import type { ReactNode } from 'react';

export function PageShell({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <ClientShell>
        <section className="border-b border-line bg-surface bg-hero-light pt-[calc(var(--header-height)+2.5rem)] pb-14 md:pb-16">
          <div className="site-container">
            <Reveal>
              <p className="text-sm font-medium text-muted">WebTreize</p>
              <StudioRule className="mb-6 mt-4" />
              <h1 className="max-w-3xl text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
                {title}
              </h1>
              {description ? (
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{description}</p>
              ) : null}
            </Reveal>
          </div>
        </section>
        {children}
        <Footer />
      </ClientShell>
    </div>
  );
}
