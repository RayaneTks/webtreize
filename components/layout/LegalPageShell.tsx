import { ClientShell } from '@/components/ClientShell';
import { StudioRule } from '@/components/decor/StudioRule';
import { Footer } from '@/components/layout/Footer';
import { Reveal } from '@/components/motion/Reveal';
import type { ReactNode } from 'react';

export function LegalPageShell({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-canvas text-ink" data-legal-page>
      <ClientShell>
        <section className="border-b border-line bg-surface bg-hero-light pt-[calc(var(--header-height)+2.5rem)] pb-12 md:pb-14">
          <div className="site-container max-w-3xl">
            <Reveal>
              <p className="text-sm font-medium text-muted">Informations légales</p>
              <StudioRule className="mb-6 mt-4" />
              <h1 className="text-[clamp(2rem,4.5vw,3.25rem)] font-semibold leading-tight tracking-tight">
                {title}
              </h1>
              {description ? (
                <p className="mt-4 text-lg leading-relaxed text-muted">{description}</p>
              ) : null}
            </Reveal>
          </div>
        </section>
        <div className="site-container max-w-3xl py-12 md:py-16">{children}</div>
        <Footer />
      </ClientShell>
    </div>
  );
}
