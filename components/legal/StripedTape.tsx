'use client';

import React from 'react';

export function StripedTape() {
  return (
    <div className="w-full h-8 bg-yellow-400 overflow-hidden relative shadow-[0_0_20px_rgba(250,204,21,0.3)] z-50 transform -rotate-2 scale-105 origin-center border-y-2 border-yellow-500">
      <div className="absolute inset-0 w-[200%] h-full flex animate-stripes opacity-80">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="w-12 h-full bg-black/90 skew-x-[45deg] mx-4" aria-hidden />
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center gap-12 text-black font-black uppercase tracking-widest text-sm whitespace-nowrap overflow-hidden">
        <span>Zone de chantier juridique</span>
        <span>•</span>
        <span>Avocats en cours de chargement</span>
        <span>•</span>
        <span>Attention : Jargon lourd</span>
        <span>•</span>
        <span>Zone de chantier juridique</span>
      </div>
    </div>
  );
}
