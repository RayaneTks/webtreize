import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/layout/PageShell';
import { PageCtaBand } from '@/components/sections/PageCtaBand';
import { Reveal } from '@/components/motion/Reveal';
import { ContactChannels } from '@/components/ui/ContactChannels';
import { PROCESS_STEPS, PROMISES } from '@/lib/data/site';

export const metadata: Metadata = {
  title: 'À propos | WebTreize - Studio digital à Marseille',
  description:
    'Studio digital basé à Marseille. Sites web, visibilité Google et outils sur mesure, avec un seul interlocuteur du début à la fin.',
};

export default function AboutPage() {
  return (
    <PageShell
      title="Le studio, en clair."
      description="Un studio marseillais qui mise sur l'exécution et la franchise, pas sur le vocabulaire d'agence."
    >
      <section className="section-pad border-t border-line bg-surface">
        <div className="site-container">
          <Reveal>
            <p className="mx-auto max-w-[30ch] text-center font-serif text-[clamp(1.625rem,4vw,3rem)] font-light leading-[1.18] tracking-[-0.02em] text-ink">
              WebTreize, c&apos;est le <em className="text-accent">13</em> en provençal.
            </p>
          </Reveal>

          <div className="mx-auto mt-[clamp(2.5rem,5vw,4rem)] max-w-[46rem] space-y-6">
            <Reveal delay={0.05}>
              <p className="lede">
                Nous sommes un studio digital installé à Marseille. Notre conviction tient en une
                phrase : les entreprises d&apos;ici méritent une présence en ligne à la hauteur de
                leur savoir-faire réel.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="lede">
                Pas de promesses miracles, pas de faux témoignages, pas de logos clients inventés.
                Ce que nous avons : une exigence technique, une façon de travailler honnête, et ce
                site comme première démonstration.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="site-container">
          <Reveal>
            <p className="eyebrow">Comment ça se passe</p>
            <h2 className="mt-4 max-w-[18ch] text-display-sm font-extrabold">
              Quatre temps, sans improvisation.
            </h2>
            <p className="mt-5 max-w-[46ch] text-base leading-[1.7] text-muted">
              Le détail complet est{' '}
              <Link href="/#methode" className="text-accent underline-offset-4 hover:underline">
                sur la page d&apos;accueil
              </Link>
              .
            </p>
          </Reveal>

          <ol className="mt-[clamp(2.5rem,5vw,4.25rem)] flex flex-wrap gap-[clamp(1.75rem,4vw,3.5rem)]">
            {PROCESS_STEPS.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.05} className="flex-[1_1_14rem]">
                <li className="rule-top list-none">
                  <span className="eyebrow-accent">{String(index + 1).padStart(2, '0')}</span>
                  <h3 className="mt-3 text-xl font-bold tracking-[-0.025em]">{step.title}</h3>
                  <p className="mt-3 text-base leading-[1.7] text-muted">{step.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-pad bg-surface">
        <div className="site-container">
          <Reveal>
            <h2 className="mx-auto max-w-[22ch] text-center text-display-md font-extrabold">
              Nos engagements, au contrat.
            </h2>
          </Reveal>

          <div className="mt-[clamp(2.75rem,6vw,5rem)] flex flex-wrap gap-[clamp(1.75rem,4vw,3.5rem)]">
            {PROMISES.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06} className="flex-[1_1_16.25rem]">
                <div className="rule-top">
                  <h3 className="text-xl font-bold tracking-[-0.025em]">{item.title}</h3>
                  <p className="mt-3 text-base leading-[1.7] text-muted">{item.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="site-container">
          <Reveal>
            <p className="eyebrow">Nous joindre</p>
            <h2 className="mt-4 max-w-[18ch] text-display-sm font-extrabold">
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
