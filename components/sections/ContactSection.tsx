'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MessageCircle, ArrowRight } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" className="section-padding pb-28 md:pb-32">
      <div className="section-max-width grid gap-8 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-start">
        <motion.div
          className="space-y-5"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
        >
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              Contact
            </p>
            <h2 className="text-2xl font-bold text-textPrimary sm:text-3xl">
              Parlez-nous de votre projet.
            </h2>
            <p className="max-w-xl text-sm text-textSecondary">
              Quelques lignes suffisent pour que nous puissions vous proposer un
              plan d&apos;action clair et un devis adapté à votre budget.
            </p>
          </div>

          <form
            className="glass-card space-y-4 border-white/20 bg-black/40 p-5"
            onSubmit={(event) => {
              event.preventDefault();
              if (typeof window !== 'undefined') {
                window.alert(
                  "Merci ! Votre demande de devis a bien été prise en compte. Nous reviendrons vers vous sous 24h (intégration e-mail à finaliser côté production).",
                );
              }
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1 block text-xs font-medium text-textPrimary"
                >
                  Nom / Entreprise
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Ex : Café du Vieux Port"
                  className="input-base"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-xs font-medium text-textPrimary"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="vous@exemple.com"
                  className="input-base"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="phone"
                  className="mb-1 block text-xs font-medium text-textPrimary"
                >
                  Téléphone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+33 6 12 34 56 78"
                  className="input-base"
                />
              </div>
              <div>
                <label
                  htmlFor="budget"
                  className="mb-1 block text-xs font-medium text-textPrimary"
                >
                  Budget estimé
                </label>
                <select
                  id="budget"
                  name="budget"
                  className="input-base bg-black/40"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Sélectionnez une fourchette
                  </option>
                  <option value="-1500">Moins de 1 500 €</option>
                  <option value="1500-5000">1 500 € – 5 000 €</option>
                  <option value="5000+">Plus de 5 000 €</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="project"
                className="mb-1 block text-xs font-medium text-textPrimary"
              >
                Parlez-nous de votre projet
              </label>
              <textarea
                id="project"
                name="project"
                required
                rows={4}
                placeholder="Votre activité, vos objectifs, vos besoins (site vitrine, SEO, fiche Google, application sur mesure, etc.)."
                className="input-base resize-none"
              />
            </div>

            <p className="text-[11px] text-textSecondary/70">
              En envoyant ce formulaire, vous acceptez d&apos;être contacté·e
              par WebTreize à propos de votre projet. Aucune inscription à une
              newsletter cachée.
            </p>

            <button
              type="submit"
              className="cta-button-primary flex items-center gap-2 text-sm"
            >
              <ArrowRight className="h-4 w-4" />
              <span>Demander un devis gratuit</span>
            </button>
          </form>
        </motion.div>

        <motion.aside
          className="space-y-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          <div className="glass-card border-accent/30 bg-black/50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
              Snapchat
            </p>
            <h3 className="mt-1 text-sm font-semibold text-textPrimary">
              Ajoutez-nous sur Snapchat : @Webtreize
            </h3>
            <p className="mt-2 text-[11px] leading-relaxed text-textSecondary">
              Suivez les coulisses des projets, posez vos questions en direct
              et envoyez-nous des notes vocales pour expliquer votre besoin.
            </p>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex-1 rounded-2xl border border-accent/40 bg-black/60 p-3 text-center text-[11px] text-textSecondary/80">
                <p className="font-semibold text-textPrimary">
                  Scan du Snapcode
                </p>
                <p>Intégrez ici votre QR Code Snapchat officiel.</p>
              </div>
              <div className="h-20 w-20 rounded-2xl border border-dashed border-accent/60 bg-black/70 text-[10px] text-textSecondary/70">
                <div className="flex h-full items-center justify-center text-center">
                  QR Snap
                  <br />
                  à ajouter
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card bg-black/60 p-5 text-[11px] text-textSecondary">
            <p className="mb-2 font-semibold text-textPrimary">
              Ou contactez-nous directement :
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-accent" />
                <a
                  href="mailto:contact@webtreize.com"
                  className="hover:text-textPrimary"
                >
                  contact@webtreize.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-accent" />
                <span>Sur demande après prise de contact</span>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="h-3.5 w-3.5 text-accent" />
                <span>Réponse sous 24h ouvrées en moyenne</span>
              </li>
            </ul>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}

