'use client';

import React from 'react';

const BANDEAU_ITEMS = [
  'Zone de chantier juridique',
  '•',
  'Avocats en cours de chargement',
  '•',
  'Attention : Jargon lourd',
  '•',
] as const;

function BandeauText() {
  return (
    <>
      {BANDEAU_ITEMS.map((item, i) => (
        <span key={i} className="shrink-0">
          {item}
        </span>
      ))}
    </>
  );
}

export function StripedTape() {
  return (
    <div className="w-full h-14 md:h-8 bg-yellow-400 overflow-hidden relative shadow-[0_0_20px_rgba(250,204,21,0.3)] z-50 transform -rotate-2 scale-[1.02] md:scale-105 origin-center border-y-2 border-yellow-500 px-2 md:px-0">
      <div className="absolute inset-0 w-[200%] h-full flex animate-stripes opacity-80">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="w-12 h-full bg-black/90 skew-x-[45deg] mx-4 shrink-0" aria-hidden />
        ))}
      </div>
      <div className="absolute inset-0 flex items-center overflow-hidden">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-6 md:gap-12 text-black font-black uppercase tracking-widest text-xs sm:text-sm w-max min-w-full">
          <BandeauText />
          <BandeauText />
        </div>
      </div>
    </div>
  );
}
