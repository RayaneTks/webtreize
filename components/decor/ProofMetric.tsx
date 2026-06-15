'use client';

import { motion, useReducedMotion } from 'motion/react';

export function ProofMetric({ value, label }: { value: string; label: string }) {
  const reduce = useReducedMotion();

  return (
    <div>
      <motion.p
        className="font-display text-[clamp(3.25rem,7.5vw,5.5rem)] font-semibold leading-none tracking-[-0.04em] text-navy"
        initial={reduce ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        {value}
      </motion.p>
      <p className="mt-3 max-w-xs text-base font-medium text-ink">{label}</p>
    </div>
  );
}
