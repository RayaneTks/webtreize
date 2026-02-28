'use client';

import React from 'react';
import { Mail, Smartphone, ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';

const SNAPCHAT_URL = 'https://snapchat.com/add/webtreize';

export function ContactSection() {
  return (
    <section id="contact" className="py-24 md:py-40 px-4 sm:px-6 relative border-t border-white/5" aria-labelledby="contact-title">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030303] to-blue-950/20 z-0 pointer-events-none" aria-hidden />

      <div className="container mx-auto max-w-5xl relative z-10">
        <Reveal className="text-center mb-16 md:mb-24">
          <h2 id="contact-title" className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
            Prêt à accélérer ?
          </h2>
          <p className="text-lg md:text-2xl text-gray-400 max-w-2xl mx-auto font-light">
            Zéro friction. Choisissez le canal qui correspond à votre rythme.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <Reveal delay={100} direction="up" className="h-full">
            <a
              href={SNAPCHAT_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="group block relative h-full p-1 rounded-[2rem] bg-gradient-to-br from-[#FFFC00] to-yellow-500 overflow-hidden transition-transform duration-500 ease-out active:scale-[0.98] shadow-[0_0_40px_rgba(255,252,0,0.15)] hover:shadow-[0_0_60px_rgba(255,252,0,0.3)]"
            >
              <div className="bg-[#0a0a0a] rounded-[1.8rem] h-full p-8 md:p-10 flex flex-col relative overflow-hidden transition-colors duration-500 group-hover:bg-[#111]">
                <div className="w-16 h-16 rounded-2xl bg-[#FFFC00] flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(255,252,0,0.4)]">
                  <Smartphone className="w-8 h-8 text-black" aria-hidden />
                </div>
                <h3 className="text-3xl font-black mb-3 text-white tracking-tight">Snapchat</h3>
                <p className="text-gray-400 font-medium mb-8 text-lg leading-relaxed">
                  Le canal le plus direct. Questions rapides, notes vocales, ou simple prise de contact.
                </p>
                <div className="mt-auto flex items-center font-bold text-[#FFFC00] text-lg">
                  Ajouter @WebTreize <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" aria-hidden />
                </div>
              </div>
            </a>
          </Reveal>

          <Reveal delay={200} direction="up" className="h-full">
            <div className="group relative h-full p-1 rounded-[2rem] bg-gradient-to-br from-blue-500 to-cyan-400 overflow-hidden transition-transform duration-500 ease-out">
              <div className="bg-[#0a0a0a] rounded-[1.8rem] h-full p-8 md:p-10 flex flex-col relative overflow-hidden">
                <div className="w-16 h-16 rounded-2xl bg-blue-500 flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(59,130,246,0.4)]">
                  <Mail className="w-8 h-8 text-white" aria-hidden />
                </div>
                <h3 className="text-3xl font-black mb-3 text-white tracking-tight">Email Pro</h3>
                <p className="text-gray-400 font-medium mb-8 text-lg leading-relaxed">
                  Privilégié pour l&apos;envoi de cahier des charges, les devis et les échanges structurés.
                </p>
                <form
                  className="mt-auto space-y-4"
                  onSubmit={(e) => e.preventDefault()}
                  aria-label="Formulaire de contact par email"
                >
                  <label htmlFor="contact-email" className="sr-only">
                    Votre email pour être recontacté
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder="Votre email..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white/10 transition-all text-base"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl py-4 active:scale-[0.98] transition-all text-base flex justify-center items-center gap-2"
                  >
                    Envoyer <ArrowRight className="w-4 h-4" aria-hidden />
                  </button>
                </form>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
