'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowRight, CheckCircle, CircleNotch } from '@phosphor-icons/react';
import { Reveal } from '@/components/motion/Reveal';
import { Section } from '@/components/ui/Section';
import { SnapchatIcon } from '@/components/ui/SnapchatIcon';
import { SNAPCHAT_URL } from '@/lib/constants';
import { AUDIT_CATEGORIES, AUDIT_CATEGORY_LABELS } from '@/lib/data/audit-categories';
import { cn } from '@/lib/utils';

const formSchema = z.object({
  firstName: z.string().min(2, 'Veuillez saisir au moins 2 caractères.'),
  email: z.string().email('Veuillez saisir une adresse email valide.'),
  category: z.string().min(1, 'Veuillez sélectionner une catégorie.'),
  projectNote: z.string().max(2000).optional(),
});

type FormData = z.infer<typeof formSchema>;

function buildAuditMessage(data: FormData): string {
  const catLabel = AUDIT_CATEGORY_LABELS[data.category] ?? data.category;
  let message = `Demande d'audit - Catégorie : ${catLabel}`;
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
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { firstName: '', email: '', category: '', projectNote: '' },
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
    <Section id="contact" aria-labelledby="cta-title" className="bg-surface">
      <div className="site-container">
        <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-lift lg:grid lg:grid-cols-2">
          <Reveal className="on-dark bg-navy p-8 md:p-10 lg:p-12">
            <h2
              id="cta-title"
              className="text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold leading-[1.08] tracking-tight"
            >
              Un diagnostic à la hauteur de votre activité.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/75">
              En 48h, on analyse votre situation et on vous dit quoi prioriser. Gratuit, sans
              engagement.
            </p>

            <dl className="mt-8 space-y-4 border-t border-white/15 pt-8 text-sm">
              <div>
                <dt className="font-medium text-white">Audit</dt>
                <dd className="text-white/70">Gratuit, sans engagement</dd>
              </div>
              <div>
                <dt className="font-medium text-white">Délai</dt>
                <dd className="text-white/70">Réponse sous 48h</dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-white/15 pt-8">
              <span className="text-sm text-white/70">Vous préférez discuter ?</span>
              <a
                href={SNAPCHAT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#FFFC00] px-4 py-2 text-sm font-semibold text-black transition-[filter] hover:brightness-95"
              >
                <SnapchatIcon className="h-4 w-4" />
                @webtreize
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="p-6 sm:p-8 lg:p-10">
            {isSuccess ? (
              <div className="flex min-h-[320px] flex-col items-center justify-center text-center">
                <CheckCircle size={56} weight="duotone" className="text-accent" />
                <h3 className="mt-6 text-2xl font-semibold text-ink">Demande envoyée</h3>
                <p className="mt-3 text-muted">On revient vers vous sous 48h avec votre audit gratuit.</p>
                <button
                  type="button"
                  className="mt-8 text-sm font-semibold text-accent hover:underline"
                  onClick={() => setIsSuccess(false)}
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-ink">Audit gratuit en 48h</h3>
                  <p className="mt-2 text-sm text-muted">
                    Choisissez la catégorie la plus proche de votre besoin.
                  </p>
                </div>

                <Field label="Prénom" htmlFor="cta-name" error={errors.firstName?.message}>
                  <input
                    id="cta-name"
                    {...register('firstName')}
                    disabled={isSubmitting}
                    type="text"
                    placeholder="Jean"
                    className={inputClass(!!errors.firstName)}
                  />
                </Field>

                <Field label="Email professionnel" htmlFor="cta-email" error={errors.email?.message}>
                  <input
                    id="cta-email"
                    {...register('email')}
                    disabled={isSubmitting}
                    type="email"
                    placeholder="jean@entreprise.fr"
                    className={inputClass(!!errors.email)}
                  />
                </Field>

                <Field label="Catégorie" htmlFor="cta-category" error={errors.category?.message}>
                  <select
                    id="cta-category"
                    {...register('category')}
                    disabled={isSubmitting}
                    className={cn(inputClass(!!errors.category), 'appearance-none')}
                  >
                    <option value="" disabled>
                      Sélectionnez une catégorie
                    </option>
                    {AUDIT_CATEGORIES.map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field
                  label="Votre projet (facultatif)"
                  htmlFor="cta-project"
                  error={errors.projectNote?.message}
                >
                  <textarea
                    id="cta-project"
                    {...register('projectNote')}
                    disabled={isSubmitting}
                    rows={4}
                    placeholder="Contexte, objectifs, contraintes, lien vers votre site…"
                    className={cn(inputClass(false), 'min-h-[120px] resize-y py-3')}
                  />
                </Field>

                {errorMessage ? (
                  <p className="text-sm text-red-600" role="alert">
                    {errorMessage}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-accent text-base font-semibold text-white transition-[transform,background-color] hover:bg-accent-hover active:scale-[0.97] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <CircleNotch size={20} className="animate-spin" />
                  ) : (
                    <>
                      Recevoir mon audit
                      <ArrowRight size={18} weight="bold" />
                    </>
                  )}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

function inputClass(hasError: boolean) {
  return cn('input-field', hasError && 'input-field--error');
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      {children}
      {error ? <p className="mt-1.5 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}
