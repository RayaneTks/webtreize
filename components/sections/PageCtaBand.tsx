import Link from 'next/link';
import type { Route } from 'next';
import { Reveal } from '@/components/motion/Reveal';

/**
 * Bande de fin de page interne — reprend la seule section sombre de la DA
 * (`AuditSection`) pour que toutes les pages se terminent de la même façon.
 */
export function PageCtaBand({
  title = 'Commençons simplement.',
  description = 'Vous nous parlez de votre activité, nous vous renvoyons par écrit ce qui vous freine. Gratuit, sous 48 heures, sans engagement.',
  href = '/#audit',
  label = 'Demander mon audit',
}: {
  title?: string;
  description?: string;
  href?: string;
  label?: string;
}) {
  return (
    <section className="bg-ink-deep py-[clamp(4rem,9vw,7rem)] text-center text-canvas">
      <div className="site-container">
        <Reveal>
          <h2 className="mx-auto max-w-[20ch] text-display-md font-extrabold text-canvas">
            {title}
          </h2>
          <p className="mx-auto mt-[clamp(1.125rem,2.2vw,1.625rem)] max-w-[54ch] text-[1.03125rem] leading-[1.7] text-canvas/70">
            {description}
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="mt-[clamp(1.75rem,3.4vw,2.75rem)]">
            <Link href={href as Route} className="btn-primary-inverse">
              {label}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
