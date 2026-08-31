import { ClientShell } from '@/components/ClientShell';
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
        <section className="pb-[clamp(2.25rem,5vw,3.5rem)] pt-[calc(var(--header-height)+clamp(2.75rem,7vw,5.5rem))]">
          <div className="site-container max-w-[46rem]">
            <Reveal>
              <p className="eyebrow">Informations légales</p>
              <h1 className="mt-[clamp(1.125rem,2.4vw,1.75rem)] text-display-sm font-extrabold">
                {title}
              </h1>
              {description ? <p className="lede mt-5">{description}</p> : null}
            </Reveal>
          </div>
        </section>
        <div className="site-container max-w-[46rem] border-t border-line pb-[clamp(3.5rem,8vw,6rem)] pt-10">
          {children}
        </div>
        <Footer />
      </ClientShell>
    </div>
  );
}
