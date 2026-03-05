'use client';

import React from 'react';
import { Mail, Smartphone, ArrowRight, ArrowUpRight } from 'lucide-react';
import { FadeUp } from '@/components/ui/FadeUp';

const SNAPCHAT_URL = 'https://snapchat.com/add/webtreize';

export function ContactSection() {
  return (
    <section id="contact" className="pt-24 pb-0 bg-white relative overflow-hidden" aria-labelledby="contact-title">
      <div className="container mx-auto px-5 lg:px-8 max-w-screen-2xl">
        <FadeUp>
          <div className="flex flex-col items-center text-center mb-16 md:mb-32">
            <h2
              id="contact-title"
              className="text-[15vw] lg:text-[10rem] font-black text-[#001F3F] uppercase tracking-tighter leading-[0.85] mb-6"
            >
              Parlons <br /> <span className="text-[#FF4500]">Projet.</span>
            </h2>
            <p className="text-xl md:text-3xl text-[#001F3F]/60 font-medium max-w-2xl">
              Vous avez l&apos;ambition. Nous avons l&apos;ingénierie.
            </p>
          </div>
        </FadeUp>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
          <FadeUp
            delay={100}
            className="bg-[#FFFC00] rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 relative group h-full shadow-[0_20px_50px_rgba(255,252,0,0.15)] overflow-hidden"
          >
            <a href={SNAPCHAT_URL} target="_blank" rel="noreferrer" className="flex flex-col w-full h-full cursor-pointer relative z-10">
              <div className="flex justify-between items-center mb-16 md:mb-32">
                <span className="px-4 py-2 bg-black text-[#FFFC00] rounded-full text-xs md:text-sm font-bold uppercase tracking-widest">
                  Fast Track
                </span>
                <div className="w-12 h-12 md:w-16 md:h-16 bg-black rounded-full flex items-center justify-center">
                  <Smartphone className="w-6 h-6 md:w-8 text-[#FFFC00]" />
                </div>
              </div>
              <div className="mt-auto">
                <p className="text-3xl md:text-6xl font-black text-black leading-[1.1] mb-8">
                  Le circuit court. <br /> Zéro friction.
                </p>
                <div className="inline-flex items-center gap-4 bg-black text-white font-bold text-lg md:text-xl px-6 py-4 md:px-8 md:py-5 rounded-full group-hover:bg-[#001F3F] transition-colors duration-300">
                  Ajouter @WebTreize <ArrowUpRight className="w-6 h-6" />
                </div>
              </div>
            </a>
          </FadeUp>

          <FadeUp
            delay={200}
            className="bg-[#F0F4F8] rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 flex flex-col justify-between h-full border border-gray-200"
          >
            <div className="flex justify-between items-center mb-16 md:mb-32">
              <span className="px-4 py-2 bg-white text-[#001F3F] border border-gray-200 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest">
                Le Studio
              </span>
              <Mail className="w-12 h-12 text-[#001F3F]/30" />
            </div>
            <div className="mt-auto">
              <p className="text-3xl md:text-5xl font-black text-[#001F3F] leading-[1.1] mb-12">
                Envoyez un brief, recevez un devis sous 24h.
              </p>
              <form className="relative w-full" onSubmit={(e) => e.preventDefault()} aria-label="Formulaire de contact par email">
                <div className="relative flex items-center">
                  <input
                    type="email"
                    placeholder="hello@votre-entreprise.com"
                    className="w-full bg-white rounded-full py-5 px-6 md:px-8 text-lg text-[#001F3F] placeholder:text-[#001F3F]/40 focus:outline-none focus:ring-2 focus:ring-[#FF4500] shadow-sm transition-all pr-16"
                    required
                  />
                  <button
                    type="submit"
                    aria-label="Envoyer votre email pour être recontacté"
                    className="absolute right-2 w-12 h-12 bg-[#001F3F] text-white rounded-full flex items-center justify-center hover:bg-[#FF4500] transition-colors"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

