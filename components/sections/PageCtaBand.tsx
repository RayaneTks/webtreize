import Link from 'next/link';
import type { Route } from 'next';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { Reveal } from '@/components/motion/Reveal';

export function PageCtaBand({
  title = 'Prêt à clarifier vos priorités ?',
  description = 'Audit gratuit de votre présence en ligne. Réponse sous 48h, sans engagement.',
  href = '/#contact',
  label = 'Demander un audit gratuit',
}: {
  title?: string;
  description?: string;
  href?: string;
  label?: string;
}) {
  return (
    <section className="on-dark border-t border-line bg-navy">
      <div className="site-container flex flex-col items-start justify-between gap-8 py-14 md:flex-row md:items-center md:py-16">
        <Reveal>
          <h2 className="max-w-xl text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
          <p className="mt-3 max-w-lg text-base text-white/75">{description}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <Link
            href={href as Route}
            className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-accent px-8 text-base font-semibold text-white shadow-[0_4px_20px_-8px_rgba(217,72,15,0.4)] transition-[transform,background-color,box-shadow] hover:bg-accent-hover hover:shadow-[0_6px_28px_-8px_rgba(217,72,15,0.5)] active:scale-[0.97] motion-reduce:active:scale-100"
          >
            {label}
            <ArrowUpRight size={18} weight="bold" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
