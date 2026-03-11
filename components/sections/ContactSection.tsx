'use client';

import React, { useState } from 'react';
import { Mail, ArrowRight, ArrowUpRight, Loader2, CheckCircle2 } from 'lucide-react';
import { FadeUp } from '@/components/ui/FadeUp';
import { SnapchatIcon } from '@/components/ui/SnapchatIcon';

const SNAPCHAT_URL = 'https://snapchat.com/add/webtreize';

const BUDGET_OPTIONS = [
  'Moins de 2 000 €',
  '2 000 – 5 000 €',
  '5 000 – 10 000 €',
  '10 000 – 20 000 €',
  'Plus de 20 000 €',
] as const;

type FormState = 'idle' | 'loading' | 'success' | 'error';

export function ContactSection() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormState('loading');
    setErrorMessage('');

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
      budget: (form.elements.namedItem('budget') as HTMLSelectElement).value || undefined,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Erreur');
      setFormState('success');
    } catch (err: unknown) {
      setErrorMessage(err instanceof Error ? err.message : 'Une erreur est survenue.');
      setFormState('error');
    }
  }

  return (
    <section id="contact" className="pt-24 pb-0 bg-white relative overflow-hidden" aria-labelledby="contact-title">
      <div className="container mx-auto px-5 lg:px-8 max-w-screen-2xl">
        <FadeUp>
          <div className="flex flex-col items-center text-center mb-16 md:mb-32">
            <h2
              id="contact-title"
              className="text-[11vw] sm:text-[5rem] lg:text-[7rem] font-black text-[#001F3F] uppercase tracking-tighter leading-[0.85] mb-6"
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
            className="bg-[#F0F4F8] rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 flex flex-col h-full border border-gray-200"
          >
            <div className="flex justify-between items-center mb-8">
              <span className="px-4 py-2 bg-white text-[#001F3F] border border-gray-200 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest">
                Le Studio
              </span>
              <Mail className="w-10 h-10 text-[#001F3F]/20" />
            </div>

            {formState === 'success' ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 py-12">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl md:text-3xl font-black text-[#001F3F] mb-3">Message envoyé.</p>
                  <p className="text-[#001F3F]/60 font-medium">Nous revenons vers vous sous 24 heures ouvrées.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1" aria-label="Formulaire de contact">
                <div>
                  <label htmlFor="contact-name" className="sr-only">Votre nom</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    minLength={2}
                    placeholder="Votre nom"
                    className="w-full bg-white rounded-2xl py-4 px-6 text-[#001F3F] placeholder:text-[#001F3F]/40 focus:outline-none focus:ring-2 focus:ring-[#FF4500] shadow-sm transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="sr-only">Votre email</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    placeholder="hello@votre-entreprise.com"
                    className="w-full bg-white rounded-2xl py-4 px-6 text-[#001F3F] placeholder:text-[#001F3F]/40 focus:outline-none focus:ring-2 focus:ring-[#FF4500] shadow-sm transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="contact-budget" className="sr-only">Budget estimé</label>
                  <select
                    id="contact-budget"
                    name="budget"
                    className="w-full bg-white rounded-2xl py-4 px-6 text-[#001F3F] focus:outline-none focus:ring-2 focus:ring-[#FF4500] shadow-sm transition-all appearance-none cursor-pointer"
                    defaultValue=""
                  >
                    <option value="" disabled>Budget estimé (facultatif)</option>
                    {BUDGET_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label htmlFor="contact-message" className="sr-only">Votre message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    minLength={10}
                    rows={4}
                    placeholder="Décrivez brièvement votre projet..."
                    className="w-full h-full min-h-[120px] bg-white rounded-2xl py-4 px-6 text-[#001F3F] placeholder:text-[#001F3F]/40 focus:outline-none focus:ring-2 focus:ring-[#FF4500] shadow-sm transition-all resize-none"
                  />
                </div>

                {formState === 'error' && (
                  <p className="text-red-500 text-sm font-medium" role="alert">{errorMessage}</p>
                )}

                <button
                  type="submit"
                  disabled={formState === 'loading'}
                  className="w-full flex items-center justify-center gap-3 bg-[#001F3F] text-white font-bold py-5 px-8 rounded-full shadow-[0_10px_20px_rgba(0,31,63,0.15)] hover:shadow-[0_15px_30px_rgba(0,31,63,0.25)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300 disabled:opacity-60 disabled:pointer-events-none"
                >
                  {formState === 'loading' ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Envoi en cours...</>
                  ) : (
                    <><span>Envoyer le brief</span> <ArrowRight className="w-5 h-5" /></>
                  )}
                </button>
              </form>
            )}
          </FadeUp>

          <FadeUp
            delay={200}
            className="bg-[#FFFC00] rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 h-full border border-black/5 shadow-[0_16px_40px_rgba(0,0,0,0.12)]"
          >
            <a href={SNAPCHAT_URL} target="_blank" rel="noreferrer" className="flex flex-col justify-between w-full h-full cursor-pointer">
              <div className="flex items-center justify-between mb-12 md:mb-20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-black rounded-2xl flex items-center justify-center">
                    <SnapchatIcon className="w-6 h-6 md:w-7 md:h-7 text-[#FFFC00]" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="px-3 py-1 bg-black text-[#FFFC00] rounded-full text-[0.65rem] md:text-xs font-bold uppercase tracking-[0.18em]">
                      Snapchat
                    </span>
                    <span className="mt-2 text-xs md:text-sm text-black/70">
                      Réponse rapide, conversation directe
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-auto">
                <p className="text-2xl md:text-4xl font-black text-black leading-[1.1] mb-4">
                  Discuter du projet sur Snapchat.
                </p>
                <p className="text-base md:text-lg text-black/70 mb-8 max-w-md">
                  Idéal si vous préférez une discussion rapide et informelle, directement depuis votre téléphone.
                </p>
                <div className="inline-flex items-center gap-3 bg-black text-[#FFFC00] font-semibold text-sm md:text-base px-6 py-3 md:px-7 md:py-4 rounded-full transition-colors duration-300 hover:bg-[#001F3F]">
                  <span>Ajouter @WebTreize</span>
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
            </a>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
