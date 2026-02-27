'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Globe2, Smartphone, Sparkles } from 'lucide-react';
import Image from 'next/image';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="section-padding pt-28 sm:pt-28 md:pt-32 lg:pt-36"
    >
      <div className="section-max-width grid gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-center">
        <motion.div
          className="space-y-6"
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7, ease: 'easeOut' }}
          variants={containerVariants}
        >
          <div className="space-y-4">
            <div className="relative w-56 max-w-full sm:w-64">
              <Image
                src="/logo.png"
                alt="WebTreize - Votre croissance digitale simplifiée"
                width={256}
                height={128}
                className="h-auto w-full object-contain drop-shadow-[0_0_32px_rgba(0,194,255,0.6)]"
                priority
              />
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[11px] font-medium text-accent shadow-neon-accent">
              <span className="pill-dot" />
              <span>Agence digitale · Marseille · 100% à distance</span>
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-balance text-3xl font-extrabold tracking-tight text-textPrimary sm:text-4xl lg:text-5xl">
              Attirez plus de clients grâce au digital.
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-textSecondary">
              Nous accompagnons particuliers et entreprises dans la création et
              l&apos;optimisation de leur présence en ligne : site vitrine,
              fiche Google, SEO et applications sur mesure.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              className="cta-button-primary flex items-center gap-2 text-sm"
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              <Sparkles className="h-4 w-4" />
              <span>Devis gratuit</span>
            </button>
            <button
              type="button"
              className="cta-button-secondary flex items-center gap-2 text-xs"
              onClick={() => {
                const el = document.getElementById('services');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              <ArrowRight className="h-3.5 w-3.5" />
              <span>Voir nos services</span>
            </button>
          </div>

          <div className="mt-4 grid gap-4 text-xs text-textSecondary/80 sm:grid-cols-2">
            <div className="badge-pill">
              <Smartphone className="h-3.5 w-3.5 text-accent" />
              <span>Design mobile-first ultra moderne</span>
            </div>
            <div className="badge-pill">
              <Globe2 className="h-3.5 w-3.5 text-accent" />
              <span>Clients partout en France et à l&apos;international</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
        >
          <div className="glass-card glass-card-hover relative overflow-hidden border-accent/40 bg-white/5 p-4 sm:p-5">
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/15 via-transparent to-cta/20" />
            <div className="relative space-y-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-textSecondary/70">
                    Exemple de site vitrine
                  </p>
                  <p className="text-sm font-semibold text-textPrimary">
                    WebTreize Studio
                  </p>
                </div>
                <span className="rounded-full bg-black/60 px-3 py-1 text-[10px] font-semibold text-accent">
                  Score SEO 100/100
                </span>
              </div>

              <div className="relative h-40 w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40 sm:h-48">
                <Image
                  src="/flyer.png"
                  alt="Aperçu d'un visuel WebTreize"
                  fill
                  className="object-cover object-center opacity-90"
                  sizes="(min-width: 1024px) 360px, (min-width: 768px) 320px, 100vw"
                  priority
                />
              </div>

              <div className="grid grid-cols-2 gap-3 text-[11px] text-textSecondary">
                <div className="rounded-xl border border-white/10 bg-black/40 p-3">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-textSecondary/60">
                    Performance
                  </p>
                  <p className="mt-1 text-sm font-semibold text-textPrimary">
                    100 / 100
                  </p>
                  <p>Score Lighthouse visé sur chaque projet.</p>
                </div>
                <div className="rounded-xl border border-accent/40 bg-black/40 p-3 shadow-neon-accent">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-textSecondary/60">
                    Délai moyen
                  </p>
                  <p className="mt-1 text-sm font-semibold text-textPrimary">
                    7 à 15 jours
                  </p>
                  <p>De la maquette au site en ligne.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

