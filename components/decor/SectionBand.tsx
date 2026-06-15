import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function SectionBand({
  children,
  tone = 'light',
  className,
}: {
  children: ReactNode;
  tone?: 'light' | 'raised' | 'navy' | 'accent';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'relative overflow-hidden',
        tone === 'light' && 'bg-canvas',
        tone === 'raised' && 'bg-surface-raised',
        tone === 'navy' && 'bg-navy text-white',
        tone === 'accent' && 'bg-accent text-white',
        className,
      )}
    >
      {tone === 'navy' ? (
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          aria-hidden
          style={{
            background:
              'radial-gradient(ellipse 50% 80% at 100% 0%, rgba(217,72,15,0.35), transparent 55%)',
          }}
        />
      ) : null}
      <div className="relative">{children}</div>
    </div>
  );
}
