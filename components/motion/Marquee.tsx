'use client';

import { cn } from '@/lib/utils';

type MarqueeProps = {
  items: readonly string[];
  className?: string;
};

export function Marquee({ items, className }: MarqueeProps) {
  const track = [...items, ...items];

  return (
    <div className={cn('relative overflow-hidden border-y border-line', className)} aria-hidden>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-canvas to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-canvas to-transparent" />
      <div className="flex w-max motion-safe:animate-marquee motion-reduce:animate-none">
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex items-center gap-8 px-8 py-4 text-sm font-medium tracking-wide text-muted"
          >
            <span className="h-1 w-1 rounded-full bg-accent" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
