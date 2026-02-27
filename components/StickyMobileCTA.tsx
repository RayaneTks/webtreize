'use client';

import { Sparkles } from 'lucide-react';

function scrollToContact() {
  if (typeof window === 'undefined') return;
  const el = document.getElementById('contact');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export default function StickyMobileCTA() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 md:hidden">
      <div className="section-padding pb-4 pt-0">
        <div className="section-max-width pointer-events-auto glass-card border-white/30 bg-black/70 px-3 py-2">
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-col text-xs">
              <span className="font-semibold text-textPrimary">
                Un projet digital ?
              </span>
              <span className="text-[11px] text-textSecondary/75">
                Obtenez un devis gratuit en moins de 24h.
              </span>
            </div>
            <button
              type="button"
              onClick={scrollToContact}
              className="cta-button-primary flex items-center gap-1 rounded-full px-4 py-2 text-[11px]"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Devis gratuit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

