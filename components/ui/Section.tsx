import { StudioRule } from '@/components/decor/StudioRule';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type SectionProps = {
  id?: string;
  className?: string;
  children: ReactNode;
  'aria-labelledby'?: string;
  'aria-label'?: string;
};

export function Section({ id, className, children, ...aria }: SectionProps) {
  return (
    <section id={id} className={cn('section-pad relative', className)} {...aria}>
      {children}
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn('max-w-3xl', className)}>
      {eyebrow ? (
        <>
          <p className="text-sm font-medium text-subtle">{eyebrow}</p>
          <StudioRule className="mb-5 mt-3" />
        </>
      ) : null}
      <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{description}</p>
      ) : null}
    </div>
  );
}
