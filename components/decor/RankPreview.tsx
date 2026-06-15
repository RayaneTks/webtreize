'use client';

import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

const BARS = [1, 0.82, 0.58] as const;

export function RankPreview() {
  const reduce = useReducedMotion();

  return (
    <div className="panel-elevated p-6 md:p-8">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-subtle">Résultat local type</p>
          <p className="mt-2 text-lg font-semibold text-ink">Votre entreprise</p>
          <p className="text-sm text-muted">votre-site.fr</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-semibold tracking-tight text-navy">#1</p>
          <p className="text-xs text-muted">Marseille</p>
        </div>
      </div>

      <div className="space-y-2.5" aria-hidden>
        {BARS.map((width, i) => (
          <div key={i} className="h-2 overflow-hidden rounded-full bg-surface-muted">
            <motion.div
              className={cn(
                'h-full origin-left rounded-full',
                i === 0 ? 'bg-accent' : 'bg-navy/15',
              )}
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.1, ease: [0.23, 1, 0.32, 1] }}
              style={{ width: `${width * 100}%` }}
            />
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-end justify-between border-t border-line pt-5">
        <p className="max-w-[11rem] text-sm leading-snug text-muted">
          Exemple de progression après optimisation SEO locale
        </p>
        <p className="text-right text-2xl font-semibold text-accent">+200% visibilité</p>
      </div>
    </div>
  );
}
