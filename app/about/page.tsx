import type { Metadata } from 'next';
import Link from 'next/link';
import { PageShell } from '@/components/layout/PageShell';
import { PageCtaBand } from '@/components/sections/PageCtaBand';
import { Reveal } from '@/components/motion/Reveal';
import { ContactChannels } from '@/components/ui/ContactChannels';
import { COMMITMENTS, METHOD_STEPS } from '@/lib/data/site';

export const metadata: Metadata = {
  title: 'À propos | WebTreize - Agence Digitale Marseille',
  description:
    'Agence digitale basée à Marseille. Sites web, visibilité Google et applications sur mesure avec une exigence technique visible.',
};

export default function AboutPage() {
  return (
    <PageShell
      title="À propos de WebTreize"
      description="Une agence marseillaise qui mise sur l'authenticité et la qualité d'exécution, pas sur le marketing creux."
    >
      <section className="section-pad border-b border-line">
        <div className="site-container max-w-3xl space-y-6 leading-relaxed text-muted">
          <Reveal>
            <p>
              WebTreize est une agence digitale nouvellement créée à Marseille. Nous avons fondé
              cette entreprise avec une conviction simple : les entreprises locales méritent une
              présence en ligne à la hauteur de leur savoir-faire réel.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <p>
              Pas de promesses miracles, pas de faux témoignages, pas de logos clients inventés.
              Ce que nous avons : une expertise technique solide, une approche honnête, et la
              volonté de le prouver à travers notre propre site.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p>
              <strong className="text-ink">Pourquoi WebTreize ?</strong> Le 13 en provençal. Nous
              aidons les entreprises de Marseille et de la région à gagner en visibilité, en
              crédibilité et en performance.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad bg-surface-raised">
        <div className="site-container">
          <Reveal>
            <h2 className="text-2xl font-semibold text-ink md:text-3xl">Notre méthode</h2>
            <p className="mt-3 max-w-2xl text-muted">
              Quatre étapes structurées, sans improvisation.{' '}
              <Link href="/#method" className="font-medium text-accent hover:underline">
                Voir le détail sur l&apos;accueil
              </Link>
            </p>
          </Reveal>
          <ol className="mt-10 grid gap-4 md:grid-cols-2">
            {METHOD_STEPS.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.06}>
                <li className="panel p-6 transition-[border-color,box-shadow] duration-300 hover:border-accent/15 hover:shadow-soft">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-accent">
                    {index + 1}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-pad border-b border-line">
        <div className="site-container">
          <Reveal>
            <h2 className="text-2xl font-semibold text-ink md:text-3xl">Nos engagements</h2>
          </Reveal>
          <ul className="mt-10 grid gap-4 md:grid-cols-3">
            {COMMITMENTS.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.06}>
                <li className="panel h-full p-6 transition-[border-color,box-shadow] duration-300 hover:border-accent/15 hover:shadow-soft">
                  <h3 className="font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-pad">
        <div className="site-container grid gap-12 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-2xl font-semibold text-ink">Nous contacter</h2>
            <p className="mt-3 max-w-md text-muted">
              Du lundi au vendredi, de 9h à 18h. Réponse sous 48h sur les demandes d&apos;audit.
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <ContactChannels />
          </Reveal>
        </div>
      </section>

      <PageCtaBand />
    </PageShell>
  );
}
