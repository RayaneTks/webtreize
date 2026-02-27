'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, User, Wallet, Headphones } from 'lucide-react';

const bullets = [
  {
    icon: User,
    title: 'Interlocuteur unique',
    description:
      'Un seul contact qui suit votre projet de A à Z, sans perte d’information.',
  },
  {
    icon: Wallet,
    title: 'Adapté à votre budget',
    description:
      'Des offres claires, sans surprise, et des options évolutives au rythme de votre activité.',
  },
  {
    icon: Headphones,
    title: 'Accompagnement personnalisé',
    description:
      'Nous vulgarisons chaque choix technique pour que vous restiez maître de vos décisions.',
  },
];

export default function Rassurance() {
  return (
    <section id="rassurance" className="section-padding">
      <div className="section-max-width grid gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-center">
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            Rassurance
          </p>
          <h2 className="text-2xl font-bold text-textPrimary sm:text-3xl">
            Un partenaire, pas juste un prestataire.
          </h2>
          <p className="max-w-xl text-sm text-textSecondary">
            Notre objectif est simple : vous aider à gagner du temps, de la
            visibilité et des clients, sans jargon inutile ni tunnel
            administratif.
          </p>

          <ul className="mt-4 space-y-3 text-sm">
            {bullets.map((item) => (
              <li
                key={item.title}
                className="flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-3"
              >
                <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 text-accent shadow-neon-accent">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <p className="flex items-center gap-2 text-xs font-semibold text-textPrimary">
                    {item.title}
                  </p>
                  <p className="text-[11px] leading-relaxed text-textSecondary/90">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="glass-card glass-card-hover space-y-3 border border-accent/35 bg-gradient-to-br from-black/60 via-black/40 to-accent/10 p-5"
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          <p className="text-[11px] uppercase tracking-[0.2em] text-accent/90">
            Comment ça se passe ?
          </p>
          <ol className="space-y-3 text-[11px] text-textSecondary">
            <li className="flex gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-[11px] font-semibold text-accent shadow-neon-accent">
                1
              </span>
              <div>
                <p className="font-semibold text-textPrimary">
                  Appel découverte (15–20 min)
                </p>
                <p>
                  On fait le point sur votre activité, vos objectifs et vos
                  contraintes.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-[11px] font-semibold text-accent shadow-neon-accent">
                2
              </span>
              <div>
                <p className="font-semibold text-textPrimary">
                  Devis clair et détaillé
                </p>
                <p>
                  Vous recevez une proposition chiffrée avec les étapes, délais
                  et livrables.
                </p>
              </div>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 text-[11px] font-semibold text-accent shadow-neon-accent">
                3
              </span>
              <div>
                <p className="font-semibold text-textPrimary">
                  Mise en ligne & suivi
                </p>
                <p>
                  Nous vous accompagnons après la mise en ligne pour ajuster et
                  optimiser.
                </p>
              </div>
            </li>
          </ol>
        </motion.div>
      </div>
    </section>
  );
}

