import type { ReactNode } from 'react';
import { ClientShell } from '@/components/ClientShell';
import { Footer } from '@/components/layout/Footer';
import { Reveal } from '@/components/motion/Reveal';

/**
 * En-tête des pages internes : la même respiration que le héros de l’accueil,
 * sans cadre ni fond distinct.
 *
 * Composant **serveur**. Il n’appelle aucun hook, ne pose aucun gestionnaire
 * d’évènement et ne lit aucune API du navigateur : la directive `'use client'`
 * qu’il portait n’ajoutait qu’une frontière d’hydratation et interdisait d’y
 * écrire un jour du code serveur.
 *
 * Le `<Footer />` part en prop `footer` de `ClientShell` : c’est la seule
 * position où il se trouve hors de `<main>` et vaut donc `contentinfo`.
 *
 * Le rembourrage haut ne compense pas la hauteur du header : celui-ci est
 * `sticky`, donc toujours dans le flux, et l’ajouter décalerait le titre deux
 * fois.
 */
export function PageShell({
  eyebrow = 'WebTreize',
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <ClientShell footer={<Footer />}>
        <section className="pb-gap-lg pt-gap-xl">
          <div className="site-container">
            <Reveal>
              <p className="eyebrow">{eyebrow}</p>
              <h1 className="mt-gap-sm max-w-[16ch] text-display-lg font-extrabold">{title}</h1>
              {description ? <p className="lede mt-gap-sm max-w-[52ch]">{description}</p> : null}
            </Reveal>
          </div>
        </section>
        {children}
      </ClientShell>
    </div>
  );
}
