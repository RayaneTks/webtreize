import type { ReactNode } from 'react';
import { ClientShell } from '@/components/ClientShell';
import { Footer } from '@/components/layout/Footer';
import { Reveal } from '@/components/motion/Reveal';

/**
 * Coquille des pages légales.
 *
 * Même grammaire que `PageShell`, avec une colonne de texte étroite : une
 * mention légale se lit, elle ne se parcourt pas. La largeur est exprimée en
 * `ch` — elle suit la police, pas une valeur en pixels — et reprend la mesure
 * de `components/ui/Accordion.tsx`, seul autre bloc de prose longue du site.
 *
 * La colonne n’est pas centrée : elle démarre sur la même verticale que tous
 * les titres du site, à l’intérieur de `.site-container`. Un `max-w` posé sur
 * le conteneur lui-même l’aurait recentré et désaligné des autres pages.
 *
 * Le `<Footer />` part en prop `footer` de `ClientShell` : hors de `<main>`,
 * donc reconnu comme repère `contentinfo`.
 */
export function LegalPageShell({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <ClientShell footer={<Footer />}>
        <section className="pb-gap-md pt-gap-xl">
          <div className="site-container">
            <Reveal className="max-w-[62ch]">
              <p className="eyebrow">Informations légales</p>
              <h1 className="mt-gap-sm text-display-sm font-extrabold">{title}</h1>
              {description ? <p className="lede mt-gap-sm">{description}</p> : null}
            </Reveal>
          </div>
        </section>

        <div className="site-container pb-gap-xl">
          <div className="max-w-[62ch] border-t border-line pt-gap-md">{children}</div>
        </div>
      </ClientShell>
    </div>
  );
}
