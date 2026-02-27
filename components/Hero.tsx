'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const H1_TEXT = "Attirez plus de clients grâce au digital.";
const SUBTEXT = "Nous accompagnons particuliers et entreprises dans la création et l'optimisation de leur présence en ligne.";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.028,
      delayChildren: 0.12,
    },
  },
};

const letter = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

const graceWrapper = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.028, delayChildren: 0 },
  },
};

const BEFORE_H1 = "Attirez plus de clients ";
const GRACE = "grâce";
const AFTER_H1 = " au digital.";

function scrollToContact() {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[85vh] min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-5 py-20 sm:min-h-[88vh] sm:py-24 md:py-32"
      aria-label="Accroche principale"
    >
      {/* Grille néon très légère + visuel Marseille en fond */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.08]" aria-hidden>
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 194, 255, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 194, 255, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: 'min(3.5rem, 8vw) min(3.5rem, 8vw)',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-3xl text-center">
        <motion.p
          className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-neon sm:text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
        </motion.p>
        <motion.p
          className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400 sm:text-xs"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          Votre croissance digitale simplifiée
        </motion.p>
        <motion.h1
          className="font-display text-hero font-black tracking-tighter text-white"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {BEFORE_H1.split('').map((char, i) => (
            <motion.span
              key={`b-${i}`}
              variants={letter}
              className="inline-block"
              style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
            >
              {char}
            </motion.span>
          ))}
          <motion.span
            variants={graceWrapper}
            className="inline-block whitespace-nowrap"
          >
            {GRACE.split('').map((char, i) => (
              <motion.span key={`g-${i}`} variants={letter} className="inline-block">
                {char}
              </motion.span>
            ))}
          </motion.span>
          {AFTER_H1.split('').map((char, i) => (
            <motion.span
              key={`a-${i}`}
              variants={letter}
              className="inline-block"
              style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
            >
              {char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-300 sm:mt-6 sm:text-lg"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          {SUBTEXT}
        </motion.p>

        <motion.div
          className="mt-8 sm:mt-10"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.35 }}
        >
          <button
            type="button"
            onClick={scrollToContact}
            className="group relative inline-flex min-h-[48px] items-center justify-center overflow-hidden rounded-full bg-action px-8 py-4 text-base font-black text-white shadow-action transition hover:shadow-action-pulse sm:min-h-[52px] sm:px-10 sm:py-4 sm:text-lg"
          >
            <span className="relative z-10">DEVIS GRATUIT</span>
            <span
              className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition duration-700 group-hover:translate-x-full"
              aria-hidden
            />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
