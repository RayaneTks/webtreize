'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export function DigitalHeroBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none perspective-[1000px]">
      <div
        className={cn(
          'absolute bottom-[-20%] left-[-50%] w-[200%] h-[100%]',
          'bg-[size:4rem_4rem] origin-bottom animate-grid-scroll'
        )}
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,194,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,194,255,0.15) 1px, transparent 1px)',
          transform: 'rotateX(75deg)',
        }}
        aria-hidden
      />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-[600px] aspect-square bg-blue-600/20 rounded-full blur-[100px] animate-pulse"
        aria-hidden
      />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-blue-400/10 rounded-full border-dashed animate-spin-slow-centered"
        aria-hidden
      />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-cyan-400/5 rounded-full border-dashed animate-spin-reverse-slow"
        aria-hidden
      />
      <div
        className="absolute left-[15%] top-[-10%] w-px h-[120%] bg-gradient-to-b from-transparent via-blue-500/40 to-transparent animate-data-drop"
        aria-hidden
      />
      <div
        className="absolute left-[85%] top-[-10%] w-px h-[120%] bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent animate-data-drop-delay-1"
        aria-hidden
      />
      <div
        className="absolute left-[50%] top-[-10%] w-px h-[120%] bg-gradient-to-b from-transparent via-blue-300/30 to-transparent animate-data-drop-delay-2"
        aria-hidden
      />
      <div
        className="absolute top-[20%] left-[30%] w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_15px_#60a5fa] animate-float"
        aria-hidden
      />
      <div
        className="absolute top-[60%] left-[70%] w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_10px_#22d3ee] animate-float-delay-1"
        aria-hidden
      />
      <div
        className="absolute top-[40%] left-[80%] w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_15px_#3b82f6] animate-float-delay-2"
        aria-hidden
      />
    </div>
  );
}
