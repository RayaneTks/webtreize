'use client';

import React from 'react';
import { FadeUp } from '@/components/ui/FadeUp';

const PROOF_POINTS = [
  'Délais inscrits au contrat — pénalités si retard',
  'Design unique sur chaque projet, aucun template réutilisé',
  'Votre site vous appartient dès le premier jour, aucun abonnement forcé',
];

export function SocialProofSection() {
  return (
    <section
      className="py-10 md:py-14 bg-white border-y-2 border-navy"
      aria-label="Résultats et engagements"
    >
      <div className="container mx-auto px-5 lg:px-12 xl:px-16 max-w-screen-xl">
        <FadeUp>
          <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-0">

            {/* Stat principale */}
            <div className="md:w-5/12 md:pr-12 md:border-r-2 md:border-navy/15">
              <p
                className="font-display text-navy uppercase leading-none"
                style={{ fontSize: 'clamp(56px, 7vw, 88px)' }}
              >
                +75%
              </p>
              <p className="text-sm font-bold text-navy mt-2 leading-snug">
                de visibilité gagnée en moyenne
              </p>
              <p className="text-xs text-neutral-text font-medium mt-1">
                dans les 90 jours suivant notre intervention
              </p>
            </div>

            {/* Preuves qualitatives */}
            <ul className="md:w-7/12 md:pl-12 flex flex-col gap-4">
              {PROOF_POINTS.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-[7px] w-1.5 h-1.5 shrink-0 bg-orange" aria-hidden="true" />
                  <span className="text-sm md:text-[15px] font-medium text-navy leading-snug">
                    {point}
                  </span>
                </li>
              ))}
            </ul>

          </div>
        </FadeUp>
      </div>
    </section>
  );
}
