'use client';

import { motion } from 'framer-motion';
import {
  Globe2,
  MapPin,
  MonitorSmartphone,
  Search,
  AppWindow,
} from 'lucide-react';

const services = [
  {
    icon: MonitorSmartphone,
    title: 'Création de site web vitrine',
    description:
      'Un site professionnel, moderne et responsive qui inspire confiance et transforme vos visiteurs en clients.',
    tag: 'Design & développement',
  },
  {
    icon: MapPin,
    title: 'Optimisation fiche Google',
    description:
      'Boostez votre fiche Google Business Profile pour générer plus d’appels et de visites en boutique.',
    tag: 'Visibilité locale',
  },
  {
    icon: Search,
    title: 'SEO & Référencement',
    description:
      'Apparaissez devant vos concurrents sur Google grâce à une stratégie SEO adaptée à votre marché.',
    tag: 'Acquisition durable',
  },
  {
    icon: AppWindow,
    title: 'Applications sur mesure',
    description:
      'Applications web et outils métiers pensés autour de votre processus et de vos objectifs.',
    tag: 'Sur-mesure',
  },
];

export default function Services() {
  return (
    <section id="services" className="section-padding">
      <div className="section-max-width space-y-8">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
            Services
          </p>
          <h2 className="text-2xl font-bold text-textPrimary sm:text-3xl">
            Tout ce dont vous avez besoin pour être visible en ligne.
          </h2>
          <p className="max-w-2xl text-sm text-textSecondary">
            De la première idée à la mise en ligne, nous concevons des
            expériences digitales qui donnent confiance à vos prospects et
            facilitent le passage à l&apos;action.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.article
                key={service.title}
                className="glass-card glass-card-hover relative overflow-hidden border border-white/10 bg-white/5 p-5"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-accent/10 via-transparent to-cta/10" />
                <div className="relative space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-accent/15 text-accent shadow-neon-accent">
                        <Icon className="h-4 w-4" />
                      </div>
                      <h3 className="text-sm font-semibold text-textPrimary">
                        {service.title}
                      </h3>
                    </div>
                    <span className="rounded-full bg-black/50 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-textSecondary/70">
                      {service.tag}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-textSecondary">
                    {service.description}
                  </p>
                  {service.title === 'Création de site web vitrine' && (
                    <p className="text-[11px] text-accent/90">
                      <span className="font-semibold">Inclus :</span> nom de
                      domaine, hébergement, suivi de performance.
                    </p>
                  )}
                  {service.title === 'SEO & Référencement' && (
                    <p className="flex items-center gap-1 text-[11px] text-textSecondary/80">
                      <Globe2 className="h-3 w-3 text-accent" />
                      Audit complet + plan d&apos;actions priorisé.
                    </p>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

