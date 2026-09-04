import type { Metadata } from 'next';
import { ContactForm } from '@/components/forms/ContactForm';
import { PageShell } from '@/components/layout/PageShell';
import { Reveal } from '@/components/motion/Reveal';
import { ContactChannels } from '@/components/ui/ContactChannels';
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from '@/lib/seo';

/**
 * Page de contact — **composant serveur**.
 *
 * Elle portait `'use client'` sur sa première ligne pour un seul `useState` de
 * formulaire : une page cliente ne peut pas exporter `metadata`, la page héritait
 * donc du titre et de la description de l’accueil, sans canonical propre — deux
 * URL indexables strictement identiques aux yeux de Google (findings critiques
 * « seo-contact-client-component-sans-metadata » et « seo-a11y-titre-contact-
 * duplique »). L’état est descendu dans `components/forms/ContactForm.tsx`,
 * seul îlot client de la page.
 */
export const metadata: Metadata = pageMetadata('contact');

const JSON_LD = [
  webPageJsonLd('contact', 'ContactPage'),
  breadcrumbJsonLd([
    { name: 'Accueil', path: '/' },
    { name: 'Contact', path: '/contact' },
  ]),
];

export default function ContactPage() {
  return (
    <>
      <PageShell
        eyebrow="Contact"
        title="Parlons de votre projet à Marseille."
        description="Décrivez votre activité en quelques lignes. Nous répondons par écrit, sans engagement."
      >
        <section
          id="formulaire"
          aria-labelledby="formulaire-title"
          className="section-pad border-t border-line bg-surface"
        >
          <div className="site-container grid gap-x-gap-lg gap-y-gap-md md:grid-cols-2">
            <Reveal>
              <p className="eyebrow">Écrivez-nous</p>
              {/* « Trois champs suffisent. » annonçait trois champs au-dessus
                  d’un formulaire qui en affiche quatre (finding « trois-champs-
                  mais-quatre »). Le compte est désormais exact. */}
              <h2
                id="formulaire-title"
                className="mt-gap-xs max-w-[14ch] text-display-sm font-extrabold"
              >
                Trois champs obligatoires.
              </h2>
              <p className="mt-gap-sm max-w-[40ch] text-body text-ink-muted">
                Votre nom, votre adresse e-mail, et quelques lignes sur votre projet. Le téléphone
                est facultatif&#8239;: il sert seulement si vous préférez que nous vous rappelions.
              </p>
            </Reveal>

            <Reveal delay={60}>
              <ContactForm />
            </Reveal>
          </div>
        </section>

        <section aria-labelledby="joindre-title" className="section-pad">
          <div className="site-container">
            <Reveal>
              <p className="eyebrow">Ou directement</p>
              <h2
                id="joindre-title"
                className="mt-gap-xs max-w-[16ch] text-display-sm font-extrabold"
              >
                Du lundi au vendredi, de 9&#160;h à 18&#160;h.
              </h2>
            </Reveal>
            <Reveal delay={60}>
              <ContactChannels className="mt-gap-lg" />
            </Reveal>
          </div>
        </section>
        {/* Pas de `PageCtaBand` ici : renvoyer vers l’audit de l’accueil un
            visiteur déjà arrivé au point de conversion, c’est lui demander de
            reconvertir par un autre canal, sur une autre page (finding
            « ecran-succes-cul-de-sac »). */}
      </PageShell>

      {JSON_LD.map((node, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}
    </>
  );
}
