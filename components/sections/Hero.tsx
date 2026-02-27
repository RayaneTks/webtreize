'use client';

import { motion } from 'framer-motion';

function scrollToContact() {
  if (typeof window === 'undefined') return;
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="flex min-h-[80vh] flex-col justify-center px-4 py-24 sm:px-6 md:px-8 md:py-32"
    >
      <div className="section-max-width mx-auto flex flex-col items-center text-center">
        <motion.h1
          className="max-w-4xl text-5xl font-extrabold tracking-tight text-white md:text-6xl lg:text-7xl"
          style={{
            textShadow: '0 0 40px rgba(0, 194, 255, 0.12)',
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Attirez plus de clients grâce au digital.
        </motion.h1>
        <motion.p
          className="mt-6 max-w-2xl text-base leading-relaxed text-gray-400 md:text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          Nous accompagnons particuliers et entreprises dans la création et
          l&apos;optimisation de leur présence en ligne.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10"
        >
          <button
            type="button"
            onClick={scrollToContact}
            className="rounded-full bg-[#FF5722] px-8 py-4 text-lg font-bold text-white shadow-[0_0_20px_rgba(255,87,34,0.3)] transition-transform hover:scale-105 hover:shadow-[0_0_28px_rgba(255,87,34,0.4)]"
          >
            Devis Gratuit
          </button>
        </motion.div>
      </div>
    </section>
  );
}
