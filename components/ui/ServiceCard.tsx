'use client';

import Link from 'next/link';
import type { Route } from 'next';
import { ArrowRight } from '@phosphor-icons/react';
import type { Icon } from '@phosphor-icons/react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export type ServiceCardData = {
  title: string;
  description: string;
  points: readonly string[];
  tag?: string;
};

export function ServiceCard({
  icon: IconComponent,
  service,
  featured = false,
  titleId,
  onCta,
  ctaHref,
}: {
  icon: Icon;
  service: ServiceCardData;
  featured?: boolean;
  titleId?: string;
  onCta?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  ctaHref?: string;
}) {
  return (
    <article
      className={cn(
        'panel flex h-full flex-col p-7 transition-[border-color,box-shadow,transform] duration-300 hover:border-line-strong hover:shadow-soft md:p-8',
        featured && 'border-accent/15 bg-surface',
      )}
    >
      <div className="mb-5 flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
          <IconComponent size={22} weight="duotone" />
        </div>
        {service.tag ? (
          <span className="text-sm font-medium text-accent">{service.tag}</span>
        ) : null}
      </div>

      <h3 id={titleId} className={cn('font-semibold text-ink', featured ? 'text-3xl' : 'text-2xl')}>
        {service.title}
      </h3>
      <p className="mt-3 flex-1 leading-relaxed text-muted">{service.description}</p>

      <ul className="mt-6 space-y-2.5">
        {service.points.map((point) => (
          <li key={point} className="flex items-start gap-2.5 text-sm text-ink/90">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
            {point}
          </li>
        ))}
      </ul>

      {onCta ? (
        <Button
          variant={featured ? 'primary' : 'secondary'}
          className="mt-8 w-fit"
          onClick={onCta}
        >
          En parler
          <ArrowRight size={18} weight="bold" />
        </Button>
      ) : ctaHref ? (
        <Link
          href={(ctaHref ?? '/#contact') as Route}
          className="mt-8 inline-flex h-12 w-fit items-center justify-center gap-2 rounded-full border border-line bg-surface px-6 text-sm font-semibold text-ink transition-colors hover:border-line-strong hover:shadow-soft"
        >
          En parler
          <ArrowRight size={18} weight="bold" />
        </Link>
      ) : null}
    </article>
  );
}
