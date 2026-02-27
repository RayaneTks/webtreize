'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ITEMS = [
  'Accompagnement personnalisé',
  'Interlocuteur unique',
  'Solutions adaptées à votre budget',
];

function MarqueeContent() {
  return (
    <>
      {ITEMS.map((text) => (
        <span
          key={text}
          className="mx-6 flex shrink-0 items-center gap-2 text-slate-300 md:mx-10"
        >
          <span
            className="h-2 w-2 rounded-full bg-neon"
            style={{ boxShadow: '0 0 12px rgba(0, 194, 255, 0.6)' }}
          />
          <span className="text-sm font-medium md:text-base">{text}</span>
        </span>
      ))}
    </>
  );
}

export default function Rassurance() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      id="rassurance"
      ref={ref}
      className="bg-void-light/40 px-4 py-16 sm:py-20 md:py-28"
      aria-labelledby="rassurance-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.h2
          id="rassurance-heading"
          className="text-center text-2xl font-black tracking-tighter text-white sm:text-3xl md:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Un partenaire, pas juste un prestataire.
        </motion.h2>

        <motion.div
          className="relative mt-12 overflow-hidden md:mt-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="flex w-max animate-marquee items-center motion-reduce:animate-none">
            <MarqueeContent />
            <MarqueeContent />
            <MarqueeContent />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
