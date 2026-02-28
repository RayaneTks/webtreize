import React from 'react';
import { cn } from '@/lib/utils';

const ITEMS = [
  { label: 'Accompagnement sur-mesure', color: 'blue' },
  { label: 'Interlocuteur unique', color: 'cyan' },
  { label: 'Solutions ROIstes', color: 'blue' },
] as const;

function MarqueeContent() {
  return (
    <>
      {ITEMS.map(({ label, color }, i) => (
        <span
          key={`${label}-${i}`}
          className="flex items-center gap-3 text-gray-300 font-semibold text-sm md:text-base tracking-widest uppercase"
        >
          <span
            className={cn(
              'w-1.5 h-1.5 rounded-full',
              color === 'cyan' ? 'bg-cyan-400 shadow-[0_0_10px_#22d3ee]' : 'bg-blue-500 shadow-[0_0_10px_#3b82f6]'
            )}
            aria-hidden
          />
          {label}
        </span>
      ))}
    </>
  );
}

export function MarqueeSection() {
  return (
    <div className="w-full bg-black/40 border-y border-white/5 py-4 overflow-hidden backdrop-blur-md relative z-20" role="region" aria-label="Points forts">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#030303] to-transparent z-10 pointer-events-none" aria-hidden />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#030303] to-transparent z-10 pointer-events-none" aria-hidden />
      <div className="relative z-10 flex w-max animate-marquee items-center whitespace-nowrap">
        <div className="flex shrink-0 items-center gap-12 md:gap-24">
          <MarqueeContent />
        </div>
        <div className="flex shrink-0 items-center gap-12 md:gap-24">
          <MarqueeContent />
        </div>
      </div>
    </div>
  );
}
