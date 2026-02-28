'use client';

import React from 'react';

export function AccelerateBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Même fond que VisionFaqSection — fusion totale */}
      <div className="absolute inset-0 bg-white/[0.01]" />

      {/* Grille ultra-subtile — bleu discret */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(59,130,246,0.2) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(59,130,246,0.2) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />
      <div
        className="absolute inset-0 animate-grid-scroll-fast opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,194,255,0.25) 1px, transparent 1px)`,
          backgroundSize: '100% 4rem',
        }}
      />

      {/* Traînées diagonales — bleu, accélérées */}
      <div className="absolute inset-0">
        {[...Array(4)].map((_, i) => (
          <div
            key={`streak-${i}`}
            className="absolute w-[150vw] h-px animate-streak-pass-fast will-change-transform"
            style={{
              top: `${15 + i * 25}%`,
              left: 0,
              background: `linear-gradient(90deg, transparent 0%, rgba(59,130,246,0.2) 30%, rgba(0,194,255,0.4) 50%, rgba(59,130,246,0.2) 70%, transparent 100%)`,
              transformOrigin: 'left center',
              animationDelay: `${i * 0.6}s`,
              opacity: 0.8,
            }}
          />
        ))}
      </div>

      {/* Étoiles / particules filantes — bleu, accélérées */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={`dot-${i}`}
            className="absolute w-1.5 h-1.5 rounded-full bg-blue-400/80 shadow-[0_0_6px_rgba(59,130,246,0.6)] animate-speed-dot-fast will-change-transform"
            style={{
              top: `${12 + (i * 14) % 75}%`,
              left: '-20px',
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Ligne horizon — bleu, accélérée */}
      <div className="absolute inset-0 opacity-[0.08]">
        <div className="absolute inset-0 bg-[length:200%_2px] bg-[linear-gradient(90deg,transparent_0%,rgba(59,130,246,0.5)_25%,rgba(0,194,255,0.6)_50%,rgba(59,130,246,0.5)_75%,transparent_100%)] animate-speed-lines-fast" />
      </div>
    </div>
  );
}
