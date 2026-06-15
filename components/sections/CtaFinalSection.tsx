'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FadeUp } from '@/components/ui/FadeUp';
import { Loader2, CheckCircle2, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SnapchatIcon } from '@/components/ui/SnapchatIcon';
import { SNAPCHAT_URL } from '@/lib/constants';
import { AUDIT_CATEGORIES, AUDIT_CATEGORY_LABELS } from '@/lib/data/audit-categories';

const formSchema = z.object({
  firstName: z.string().min(2, 'Veuillez saisir au moins 2 caractères.'),
  email: z.string().email('Veuillez saisir une adresse email valide.'),
  category: z.string().min(1, 'Veuillez sélectionner une catégorie.'),
  projectNote: z.string().max(2000).optional(),
});

type FormData = z.infer<typeof formSchema>;

function buildAuditMessage(data: FormData): string {
  const catLabel = AUDIT_CATEGORY_LABELS[data.category] ?? data.category;
  let message = `Demande d'audit — Catégorie : ${catLabel}`;
  if (data.projectNote?.trim()) {
    message += `\n\nContexte projet (pour l'audit) :\n${data.projectNote.trim()}`;
  }
  return message;
}

export function CtaFinalSection() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { firstName: '', email: '', category: '', projectNote: '' }
  });

  const onSubmit = async (data: FormData) => {
    setErrorMessage('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.firstName,
          email: data.email,
          message: buildAuditMessage(data),
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Erreur');
      setIsSuccess(true);
      reset();
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : 'Une erreur est survenue.');
    }
  };

  return (
    <section
      id="contact"
      className="py-24 md:py-36 bg-navy relative overflow-hidden"
      aria-labelledby="cta-title"
    >
      <div className="container mx-auto px-5 lg:px-12 xl:px-16 max-w-screen-xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Pitch */}
          <FadeUp>
            <h2
              id="cta-title"
              className="font-display text-white uppercase leading-[0.92] mb-6"
              style={{ fontSize: 'clamp(36px, 5.5vw, 56px)' }}
            >
              Un diagnostic
              <br />
              à la hauteur de
              <br />
              <span className="text-orange">votre activité.</span>
            </h2>
            <p className="text-white/80 font-medium text-lg leading-relaxed mb-10 max-w-lg">
              En 48h, on analyse votre situation et on vous dit quoi prioriser — présence en ligne, visibilité, outils ou stratégie. Gratuit, sans engagement.
            </p>

            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 text-white/90 text-xs font-bold">✓ Audit gratuit</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 text-white/90 text-xs font-bold">✓ Sans engagement</span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 text-white/90 text-xs font-bold">✓ Réponse 48h</span>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                <span className="text-white/75 text-sm font-medium">Vous préférez discuter ?</span>
                <a
                  href={SNAPCHAT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#FFFC00] text-black text-sm font-bold hover:brightness-95 transition-[filter]"
                >
                  <SnapchatIcon className="w-4 h-4" />
                  @webtreize
                </a>
              </div>
            </div>
          </FadeUp>

          {/* Right: Form */}
          <FadeUp delay={100}>
            <div className="bg-cream border-2 border-white p-6 sm:p-8 shadow-brutal">
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center text-center py-12 min-h-[320px]">
                  <CheckCircle2 className="w-14 h-14 text-emerald-600 mb-6" />
                  <h3 className="font-display text-2xl text-navy uppercase mb-2">Demande envoyée</h3>
                  <p className="text-neutral-text font-medium mb-8">
                    On revient vers vous sous 48h avec votre audit gratuit.
                  </p>
                  <button
                    type="button"
                    className="text-orange font-bold text-sm hover:underline"
                    onClick={() => setIsSuccess(false)}
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                  <div>
                    <h3 className="font-display text-navy uppercase text-lg mb-1">
                      Audit gratuit en 48h
                    </h3>
                    <p className="text-neutral-text text-sm font-medium leading-snug">
                      Choisissez la catégorie la plus proche de votre besoin — et décrivez votre projet si vous le souhaitez, pour qu&apos;on prépare l&apos;audit.
                    </p>
                  </div>

                  <div>
                    <label htmlFor="cta-name" className="block text-xs font-bold text-navy uppercase tracking-[0.1em] mb-1.5">
                      Prénom
                    </label>
                    <input
                      id="cta-name"
                      {...register('firstName')}
                      disabled={isSubmitting}
                      type="text"
                      placeholder="Jean"
                      className={cn(
                        "w-full h-14 px-5 border-2 border-navy bg-white text-navy placeholder:text-navy/45 focus:outline-none focus:ring-2 focus:ring-orange transition-colors",
                        errors.firstName && "border-red-500 focus:ring-red-500",
                        isSubmitting && "opacity-50 cursor-not-allowed"
                      )}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="cta-email" className="block text-xs font-bold text-navy uppercase tracking-[0.1em] mb-1.5">
                      Email professionnel
                    </label>
                    <input
                      id="cta-email"
                      {...register('email')}
                      disabled={isSubmitting}
                      type="email"
                      placeholder="jean@entreprise.fr"
                      className={cn(
                        "w-full h-14 px-5 border-2 border-navy bg-white text-navy placeholder:text-navy/45 focus:outline-none focus:ring-2 focus:ring-orange transition-colors",
                        errors.email && "border-red-500 focus:ring-red-500",
                        isSubmitting && "opacity-50 cursor-not-allowed"
                      )}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="relative">
                    <label htmlFor="cta-category" className="block text-xs font-bold text-navy uppercase tracking-[0.1em] mb-1.5">
                      Catégorie
                    </label>
                    <select
                      id="cta-category"
                      {...register('category')}
                      disabled={isSubmitting}
                      className={cn(
                        "w-full h-14 px-5 pr-10 border-2 border-navy bg-white text-navy appearance-none focus:outline-none focus:ring-2 focus:ring-orange transition-colors cursor-pointer",
                        errors.category && "border-red-500 focus:ring-red-500",
                        isSubmitting && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <option value="" disabled>Sélectionnez une catégorie</option>
                      {AUDIT_CATEGORIES.map(({ value, label }) => (
                        <option key={value} value={value}>{label}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                      <svg className="w-4 h-4 text-navy/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    {errors.category && (
                      <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.category.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="cta-project" className="block text-xs font-bold text-navy uppercase tracking-[0.1em] mb-1.5">
                      Votre projet <span className="text-neutral-text font-medium normal-case">(facultatif)</span>
                    </label>
                    <textarea
                      id="cta-project"
                      {...register('projectNote')}
                      disabled={isSubmitting}
                      rows={4}
                      placeholder="Contexte, objectifs, contraintes, lien vers votre site… Tout ce qui aide à cadrer l'audit."
                      className={cn(
                        "w-full min-h-[120px] px-5 py-4 border-2 border-navy bg-white text-navy placeholder:text-navy/45 focus:outline-none focus:ring-2 focus:ring-orange transition-colors resize-y",
                        isSubmitting && "opacity-50 cursor-not-allowed"
                      )}
                    />
                    {errors.projectNote && (
                      <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.projectNote.message}</p>
                    )}
                  </div>

                  {errorMessage && (
                    <p className="text-red-500 text-sm font-medium" role="alert">{errorMessage}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 bg-orange border-2 border-navy text-white font-bold shadow-brutal-sm hover:shadow-brutal hover:-translate-x-0.5 hover:-translate-y-0.5 motion-reduce:hover:translate-x-0 motion-reduce:hover:translate-y-0 transition-[transform,box-shadow] motion-reduce:transition-none flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2 active:scale-[0.98] motion-reduce:active:scale-100"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        Recevoir mon audit
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
