'use client';

import React from 'react';

/**
 * NoiseOverlay
 * Léger bruit en overlay pour ajouter du grain premium à la DA.
 */
export function NoiseOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-20 hidden md:block h-full w-full opacity-[0.035] mix-blend-overlay">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  );
}

