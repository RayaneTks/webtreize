'use client';

import { ProofMetric } from '@/components/decor/ProofMetric';
import { Reveal } from '@/components/motion/Reveal';
import { PROOF_POINTS, PROOF_STAT } from '@/lib/data/site';

export function SocialProofSection() {
  return (
    <section className="section-pad bg-canvas" aria-label="Résultats et engagements">
      <div className="site-container">
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="panel-elevated p-8 md:p-10">
              <ProofMetric value={PROOF_STAT.value} label={PROOF_STAT.label} />
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{PROOF_STAT.note}</p>
            </div>

            <div className="panel-navy relative overflow-hidden p-8 md:p-10">
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/10 blur-2xl"
                aria-hidden
              />
              <ul className="relative space-y-5">
                {PROOF_POINTS.map((point) => (
                  <li
                    key={point}
                    className="border-l-2 border-accent/50 pl-5 text-base leading-relaxed text-white/85"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
