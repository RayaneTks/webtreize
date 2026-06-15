'use client';

import { useState } from 'react';
import { CheckCircle, CircleNotch } from '@phosphor-icons/react';
import { PageShell } from '@/components/layout/PageShell';
import { PageCtaBand } from '@/components/sections/PageCtaBand';
import { Reveal } from '@/components/motion/Reveal';
import { ContactChannels } from '@/components/ui/ContactChannels';
import { cn } from '@/lib/utils';

type FormData = { name: string; email: string; phone: string; message: string };
type FormErrors = Partial<Record<keyof FormData, string>>;

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', phone: '', message: '' });
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
      <PageShell title="Message envoyé" description="Nous revenons vers vous sous 24 à 48h.">
        <section className="section-pad">
          <div className="site-container flex min-h-[30vh] flex-col items-center justify-center text-center">
            <CheckCircle size={56} weight="duotone" className="text-accent" />
            <p className="mt-6 max-w-md text-muted">
              Merci pour votre message. Notre équipe vous contactera rapidement.
            </p>
            <button
              type="button"
              onClick={() => {
                setIsSuccess(false);
                setFormData({ name: '', email: '', phone: '', message: '' });
              }}
              className="mt-8 text-sm font-semibold text-accent hover:underline"
            >
              Envoyer un autre message
            </button>
          </div>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell
      title="Contact"
      description="Parlons de votre projet. Audit gratuit de votre présence en ligne sous 48h."
    >
      <section className="section-pad">
        <div className="site-container">
          <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-lift lg:grid lg:grid-cols-2">
            <Reveal className="border-b border-line bg-surface-raised p-8 lg:border-b-0 lg:border-r lg:p-10">
              <h2 className="text-xl font-semibold text-ink">Nos coordonnées</h2>
              <p className="mt-2 text-sm text-muted">Du lundi au vendredi, 9h-18h</p>
              <ContactChannels className="mt-8" />
            </Reveal>

            <Reveal delay={0.05} className="p-8 lg:p-10">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h2 className="text-xl font-semibold text-ink">Écrivez-nous</h2>
                  <p className="mt-2 text-sm text-muted">Tous les champs marqués * sont obligatoires.</p>
                </div>

                {(['name', 'email'] as const).map((field) => (
                  <div key={field}>
                    <label htmlFor={field} className="mb-1.5 block text-sm font-medium text-ink">
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
                    {errors[field] ? <p className="mt-1 text-xs text-red-600">{errors[field]}</p> : null}
                  </div>
                ))}

                <div>
                  <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ink">
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
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
                    Décrivez votre projet *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Décrivez votre activité, vos objectifs et votre situation actuelle…"
                    value={formData.message}
                    onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                    className={cn(inputClass(!!errors.message), 'min-h-[120px] resize-y py-3')}
                  />
                  {errors.message ? <p className="mt-1 text-xs text-red-600">{errors.message}</p> : null}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-accent font-semibold text-white transition-[transform,background-color] hover:bg-accent-hover active:scale-[0.97] disabled:opacity-50 motion-reduce:active:scale-100"
                >
                  {isSubmitting ? <CircleNotch size={20} className="animate-spin" /> : 'Envoyer ma demande'}
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
      <PageCtaBand
        title="Vous préférez l'audit structuré ?"
        description="Le formulaire d'audit sur la page d'accueil permet de cibler votre besoin en quelques clics."
        href="/#contact"
        label="Accéder à l'audit gratuit"
      />
    </PageShell>
  );
}

function inputClass(hasError: boolean) {
  return cn('input-field', hasError && 'input-field--error');
}
