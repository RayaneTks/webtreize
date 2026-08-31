'use client';

import { useState } from 'react';
import { PageShell } from '@/components/layout/PageShell';
import { PageCtaBand } from '@/components/sections/PageCtaBand';
import { Reveal } from '@/components/motion/Reveal';
import { ContactChannels } from '@/components/ui/ContactChannels';
import { cn } from '@/lib/utils';

type FormData = { name: string; email: string; phone: string; message: string };
type FormErrors = Partial<Record<keyof FormData, string>>;

const EMPTY_FORM: FormData = { name: '', email: '', phone: '', message: '' };

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const next: FormErrors = {};
    if (!formData.name.trim()) next.name = 'Le nom est requis';
    if (!formData.email.trim()) next.email = "L'email est requis";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) next.email = "L'email n'est pas valide";
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      next.message = 'Merci de fournir plus de détails';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) setIsSuccess(true);
      else {
        const data = await response.json();
        setErrors({ message: data.error || 'Une erreur est survenue' });
      }
    } catch {
      setErrors({ message: 'Erreur de connexion' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <PageShell
        eyebrow="Message envoyé"
        title="C'est noté. À très vite."
        description="Nous revenons vers vous par écrit sous 48 heures."
      >
        <section className="section-pad border-t border-line">
          <div className="site-container">
            <button
              type="button"
              onClick={() => {
                setIsSuccess(false);
                setFormData(EMPTY_FORM);
              }}
              className="btn-text"
            >
              Envoyer un autre message&nbsp;→
            </button>
          </div>
        </section>
        <PageCtaBand />
      </PageShell>
    );
  }

  return (
    <PageShell
      title="Parlons de votre projet."
      description="Décrivez votre activité en quelques lignes. Nous répondons par écrit, sous 48 heures, sans engagement."
    >
      <section className="section-pad border-t border-line bg-surface">
        <div className="site-container flex flex-wrap gap-x-[clamp(2.5rem,6vw,5.5rem)] gap-y-[clamp(2.5rem,5vw,4rem)]">
          <Reveal className="min-w-[min(100%,16rem)] flex-[1_1_18rem]">
            <p className="eyebrow">Écrivez-nous</p>
            <h2 className="mt-4 max-w-[14ch] text-display-sm font-extrabold">
              Trois champs suffisent.
            </h2>
            <p className="mt-5 max-w-[38ch] text-base leading-[1.7] text-muted">
              Les champs marqués d&apos;une étoile sont obligatoires. Le téléphone reste optionnel.
            </p>
          </Reveal>

          <Reveal delay={0.06} className="min-w-[min(100%,18rem)] flex-[1_1_26rem]">
            <form onSubmit={handleSubmit} className="grid gap-5">
              {(['name', 'email'] as const).map((field) => (
                <div key={field}>
                  <label htmlFor={field} className="mb-2 block text-sm font-semibold text-ink">
                    {field === 'name' ? 'Nom complet' : 'Email'} *
                  </label>
                  <input
                    id={field}
                    name={field}
                    type={field === 'email' ? 'email' : 'text'}
                    placeholder={field === 'name' ? 'Jean Dupont' : 'jean@entreprise.fr'}
                    value={formData[field]}
                    onChange={(e) => setFormData((p) => ({ ...p, [field]: e.target.value }))}
                    className={inputClass(!!errors[field])}
                  />
                  {errors[field] ? <p className="mt-1.5 text-xs text-red-600">{errors[field]}</p> : null}
                </div>
              ))}

              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-ink">
                  Téléphone (optionnel)
                </label>
                <input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                  className={inputClass(false)}
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-semibold text-ink">
                  Décrivez votre projet *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Votre activité, vos objectifs, votre situation actuelle…"
                  value={formData.message}
                  onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                  className={cn(inputClass(!!errors.message), 'min-h-[8.5rem] resize-y py-3')}
                />
                {errors.message ? <p className="mt-1.5 text-xs text-red-600">{errors.message}</p> : null}
              </div>

              <button type="submit" disabled={isSubmitting} className="btn-primary mt-1 disabled:opacity-50">
                {isSubmitting ? 'Envoi en cours…' : 'Envoyer ma demande'}
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="site-container">
          <Reveal>
            <p className="eyebrow">Ou directement</p>
            <h2 className="mt-4 max-w-[16ch] text-display-sm font-extrabold">
              Lundi au vendredi, 9h–18h.
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <ContactChannels className="mt-[clamp(2.25rem,4.5vw,3.5rem)]" />
          </Reveal>
        </div>
      </section>

      <PageCtaBand />
    </PageShell>
  );
}

function inputClass(hasError: boolean) {
  return cn('input-field', hasError && 'input-field--error');
}
