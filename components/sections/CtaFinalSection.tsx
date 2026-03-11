'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FadeUp } from '@/components/ui/FadeUp';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { SnapchatIcon } from '@/components/ui/SnapchatIcon';

const formSchema = z.object({
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  email: z.string().email("Format d'email invalide"),
  need: z.string().min(1, 'Veuillez sélectionner un besoin'),
});

type FormData = z.infer<typeof formSchema>;

export function CtaFinalSection() {
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      email: '',
      need: '',
    }
  });

  const onSubmit = async (data: FormData) => {
    // Simulation API
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log('Lead soumis :', data);
    setIsSuccess(true);
    reset();
  };

  return (
    <section 
      id="contact"
      className="py-16 md:py-32 bg-navy relative overflow-hidden" 
      aria-labelledby="cta-final-title"
    >
      <div className="container mx-auto px-5 lg:px-8 max-w-screen-xl">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center lg:items-start max-w-6xl mx-auto">
          
          {/* Texte - Gauche (50%) */}
          <div className="w-full lg:w-1/2">
            <FadeUp>
              <h2
                id="cta-final-title"
                className="text-white font-black tracking-tight leading-[1.05] text-4xl sm:text-5xl md:text-6xl mb-6 relative"
              >
                Tout commence <br /> par un audit.
                {/* Effet lumineux derrière le titre */}
                <span className="absolute -inset-1 rounded-full bg-orange/20 blur-2xl opacity-50 z-[-1]" />
              </h2>
              <p className="text-white/70 font-medium text-lg md:text-xl leading-relaxed max-w-lg mb-8">
                En 48h, on vous dit exactement pourquoi vos concurrents prennent vos clients, et comment inverser la tendance. Quel que soit votre besoin digital, <strong className="text-white font-bold">c'est offert.</strong>
              </p>
            </FadeUp>
          </div>

          {/* Formulaire - Droite (50%) */}
          <div className="w-full lg:w-1/2 max-w-md w-full mx-auto lg:mx-0 relative">
            {/* Ambient glow behind the form card */}
            <div className="absolute -inset-1 sm:-inset-4 bg-gradient-to-r from-orange/30 to-orange/5 rounded-[2rem] sm:rounded-[3rem] blur-2xl opacity-50 z-0"></div>
            
            <FadeUp delay={100} className="w-full bg-white/5 border border-white/10 rounded-[2rem] p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative z-10 transition-all duration-500 hover:border-white/20 hover:bg-white/[0.07]">
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center text-center py-10 min-h-[300px]">
                  <CheckCircle2 className="w-16 h-16 text-emerald-400 mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-2">Reçu !</h3>
                  <p className="text-white/70 font-medium">On vous contacte dans 48h.</p>
                  <Button 
                    variant="ghost" 
                    className="mt-8 text-white hover:bg-white/10"
                    onClick={() => setIsSuccess(false)}
                  >
                    Nouveau message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full">
                  <div className="flex flex-col gap-1.5">
                    <input
                      {...register('firstName')}
                      disabled={isSubmitting}
                      type="text"
                      placeholder="Prénom"
                      className={cn(
                        "w-full h-14 min-h-[56px] px-5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent transition-all",
                        errors.firstName && "border-red-500 focus:ring-red-500",
                        isSubmitting && "opacity-50 cursor-not-allowed"
                      )}
                    />
                    {errors.firstName && (
                      <p className="text-red-400 text-xs font-medium pl-1">{errors.firstName.message}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <input
                      {...register('email')}
                      disabled={isSubmitting}
                      type="email"
                      placeholder="Email"
                      className={cn(
                        "w-full h-14 min-h-[56px] px-5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent transition-all",
                        errors.email && "border-red-500 focus:ring-red-500",
                        isSubmitting && "opacity-50 cursor-not-allowed"
                      )}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-xs font-medium pl-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="relative">
                      <label htmlFor="need" className="sr-only">Sélectionnez votre besoin</label>
                      <select
                        id="need"
                        {...register('need')}
                        disabled={isSubmitting}
                        aria-label="Sélectionnez votre besoin"
                        className={cn(
                          "w-full h-14 min-h-[56px] px-5 pr-10 rounded-xl bg-white/10 border border-white/20 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent transition-all cursor-pointer",
                          errors.need && "border-red-500 focus:ring-red-500",
                          isSubmitting && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        <option value="" disabled className="text-navy">Quel est votre besoin principal ?</option>
                        <option value="site-web" className="text-navy">Création / Refonte de site web</option>
                        <option value="application" className="text-navy">Développement d'application (Web, Mobile)</option>
                        <option value="seo-visibilite" className="text-navy">Visibilité & SEO (Acquisition, Local)</option>
                        <option value="digitalisation" className="text-navy">Digitalisation & Outils métiers sur-mesure</option>
                        <option value="croissance" className="text-navy">Une autre idée pour votre croissance digitale</option>
                      </select>
                      <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none">
                        <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                    {errors.need && (
                      <p className="text-red-400 text-xs font-medium pl-1">{errors.need.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-14 min-h-[56px] bg-orange hover:bg-orange-hover text-white font-bold rounded-xl transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed mt-2 active:scale-[0.98]"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      "Recevoir mon audit en 48h"
                    )}
                  </button>
                  
                  <p className="text-center text-sm md:text-xs lg:text-sm text-white/50 font-medium mt-1">
                    Vous préférez discuter ? On est très réactifs sur{' '}
                    <a 
                      href="https://snapchat.com/add/webtreize" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[#FFFC00] hover:underline font-bold inline-flex items-center gap-1 ml-0.5 transition-colors"
                    >
                      <SnapchatIcon className="w-4 h-4" /> Snapchat
                    </a>
                    .
                  </p>
                </form>
              )}
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
