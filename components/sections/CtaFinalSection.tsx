'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FadeUp } from '@/components/ui/FadeUp';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

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
                className="text-white font-black tracking-tight leading-[1.05] text-4xl sm:text-5xl md:text-6xl mb-6"
              >
                Tout commence <br /> par un audit.
              </h2>
              <p className="text-white/70 font-medium text-lg md:text-xl leading-relaxed max-w-lg mb-8">
                En 48h, on vous dit exactement pourquoi vos concurrents prennent vos clients, et comment inverser la tendance. <strong className="text-white font-bold">Offert.</strong>
              </p>
            </FadeUp>
          </div>

          {/* Formulaire - Droite (50%) */}
          <div className="w-full lg:w-1/2 max-w-md w-full mx-auto lg:mx-0">
            <FadeUp delay={100} className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
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
                      <select
                        {...register('need')}
                        disabled={isSubmitting}
                        className={cn(
                          "w-full h-14 min-h-[56px] px-5 pr-10 rounded-xl bg-white/10 border border-white/20 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent transition-all cursor-pointer",
                          errors.need && "border-red-500 focus:ring-red-500",
                          isSubmitting && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        <option value="" disabled className="text-navy">De quoi avez-vous besoin ?</option>
                        <option value="local" className="text-navy">Plus de clients en local</option>
                        <option value="refonte" className="text-navy">Refonte d'un vieux site</option>
                        <option value="sur-mesure" className="text-navy">Création d'un outil sur-mesure</option>
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
                </form>
              )}
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
