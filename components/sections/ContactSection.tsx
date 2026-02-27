'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Mail } from 'lucide-react';

function SnapIcon({ className }: { className?: string }) {
  return (
    <Image
      src="/snap.svg"
      alt="Logo Snapchat"
      width={28}
      height={28}
      className={className}
    />
  );
}

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      id="contact"
      ref={ref}
      className="bg-void-depth/50 px-4 py-24 sm:py-28 md:py-32"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-8 backdrop-blur-xl sm:px-6 sm:py-10 md:px-10 md:py-12">
        <motion.h2
          id="contact-heading"
          className="text-3xl font-black tracking-tighter text-white md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Contact
        </motion.h2>
        <motion.p
          className="mt-2 text-slate-400"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          Parlez-nous de votre projet.
        </motion.p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <motion.form
            className="flex flex-col gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={(e) => {
              e.preventDefault();
              if (typeof window !== 'undefined') {
                window.alert('Merci. Votre demande a bien été enregistrée. Nous vous recontactons sous 24h.');
              }
            }}
          >
            {[
              { name: 'name', type: 'text', placeholder: 'Nom / Entreprise', required: true },
              { name: 'email', type: 'email', placeholder: 'Email', required: true },
              { name: 'phone', type: 'tel', placeholder: 'Téléphone', required: false },
            ].map(({ name, type, placeholder, required }) => (
              <div key={name} className="group relative">
                <input
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  required={!!required}
                  className="peer w-full border-0 border-b-2 border-white/15 bg-transparent py-3 text-white placeholder:text-slate-500 focus:border-neon focus:outline-none focus:ring-0"
                />
                <span
                  className="absolute bottom-0 left-0 h-0.5 w-0 bg-neon transition-all duration-300 peer-focus:w-full"
                  aria-hidden
                />
              </div>
            ))}
            <div className="group relative">
              <textarea
                name="project"
                placeholder="Décrivez votre projet"
                required
                rows={4}
                className="peer w-full resize-none border-0 border-b-2 border-white/15 bg-transparent py-3 text-white placeholder:text-slate-500 focus:border-neon focus:outline-none focus:ring-0"
              />
              <span
                className="absolute bottom-0 left-0 h-0.5 w-0 bg-neon transition-all duration-300 peer-focus:w-full"
                aria-hidden
              />
            </div>
            <button
              type="submit"
              className="mt-4 rounded-full bg-action px-8 py-4 text-lg font-black text-white shadow-action transition hover:shadow-action-pulse"
            >
              Demander un devis gratuit
            </button>
          </motion.form>

          <motion.aside
            className="flex flex-col gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <div className="rounded-2xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-xl">
              <div className="mb-3 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-neon">
                  <Mail className="h-4 w-4" />
                </span>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                  Ou contactez-nous
                </p>
              </div>
              <a
                href="mailto:contact@webtreize.com"
                className="block text-sm font-semibold text-white hover:text-neon transition-colors"
              >
                contact@webtreize.com
              </a>
              <p className="mt-2 text-xs text-slate-400">Réponse sous 24h ouvrées.</p>
            </div>

            <a
              href="https://snapchat.com/t/GEQU4Svv"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl bg-snap p-6 text-black transition opacity-95 hover:opacity-100"
              aria-label="Ajouter WebTreize sur Snapchat"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-black/10">
                  <SnapIcon className="h-7 w-7 text-black" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider opacity-80">
                    Snapchat
                  </p>
                  <p className="text-lg font-black">Ajoutez-nous : @WebTreize</p>
                </div>
              </div>
              <p className="mt-3 text-sm font-medium opacity-90">
                Suivez les coulisses, posez vos questions en direct ou envoyez une note vocale.
              </p>
            </a>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
