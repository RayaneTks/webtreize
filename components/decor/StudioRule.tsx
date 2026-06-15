'use client';

import { cn } from '@/lib/utils';

export function StudioRule({ className }: { className?: string }) {
  return (
    <div
      className={cn('h-px w-20 origin-left bg-navy/20 motion-safe:animate-rule-grow', className)}
      aria-hidden
    />
  );
}
