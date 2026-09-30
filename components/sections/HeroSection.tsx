import type { Route } from 'next';
import Link from 'next/link';
import { LineMask } from '@/components/motion/LineMask';
import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/Button';
import { Plate } from '@/components/ui/Plate';
import { REALISATIONS, REALISATIONS_HREF, realisationHref } from '@/lib/data/realisations';
import { AVIS_GOOGLE } from '@/lib/data/site';

/** Largeurs servies pour la plaque 16/9 du héros — voir docs/imagerie.md. */
const HERO_PLATE_SIZES = '(min-width: 1280px) 1224px, 100vw';

/**
 * Héros de l’accueil — composant **serveur**.
 *
 * Il portait `'use client'` pour un seul hook, `useSmoothScroll`, qui
 * interceptait le clic des deux ancres. Le défilement doux est désormais
 * déclaré une fois pour toutes en CSS (`scroll-behavior: smooth` et
 * `scroll-padding-top` sur `html`, app/globals.css) : le hook ne faisait plus
 * que réimplémenter en JavaScript ce que le navigateur fait déjà, au prix
 * d’une frontière client sur la première section de la page.
 *
 * Le `h1` passe par `LineMask` et jamais par `Reveal` : c’est l’élément LCP,
 * son opacité reste à 1 (finding critique « lcp-h1-opacity-zero »).
 */
export function HeroSection() {
  return (
    <section id="hero" aria-labelledby="hero-title" className="pt-gap-xl text-center">
      <div className="site-container">
        <Reveal>
          <p className="eyebrow">Studio digital · Marseille</p>
        </Reveal>

        <LineMask
          as="h1"
          id="hero-title"
          className="mx-auto mt-gap-sm max-w-[19ch] text-display-xl font-extrabold"
        >
          Votre <span className="whitespace-nowrap">savoir-faire</span> mérite d’être trouvé.
        </LineMask>

        <Reveal delay={60}>
          <p className="lede mx-auto mt-gap-sm max-w-[44ch]">
            Sites, fiches Google et outils sur mesure pour les commerces et les artisans de
            Marseille.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-gap-md flex flex-wrap items-center justify-center gap-x-gap-sm gap-y-gap-xs">
            <Button href="/contact" track="clic_audit">
              Demander mon audit
            </Button>
            <Button href={REALISATIONS_HREF} variant="quiet" arrow>
              Voir les réalisations
            </Button>
          </div>
          {/* Le délai de 48 heures est annoncé une seule fois par page : il est
              porté par la section « audit », dont c’est le chiffre principal. */}
          <p className="mt-gap-sm text-note text-ink-faint">
            Gratuit · Réponse écrite · Sans engagement
          </p>
        </Reveal>

        {/* La preuve, tout de suite : les noms réels des projets livrés, tirés
            des données des réalisations — jamais une liste écrite à la main, ni
            des logos qui feraient mur. Chaque nom mène à son étude de cas. */}
        <Reveal delay={180}>
          <div className="mt-gap-lg">
            <p className="eyebrow">Ils nous ont confié leur outil</p>
            <ul className="mt-gap-xs flex flex-wrap items-center justify-center gap-x-gap-md gap-y-2">
              {REALISATIONS.map((projet) => (
                <li key={projet.id}>
                  <Link
                    href={realisationHref(projet.id) as Route}
                    className="link-draw text-title-sm font-extrabold tracking-[-0.03em] text-ink-muted transition-colors hover:text-ink"
                  >
                    {projet.nom}
                  </Link>
                </li>
              ))}
              {AVIS_GOOGLE ? (
                <li>
                  <a href={AVIS_GOOGLE.href} className="link-draw text-note text-ink-muted">
                    {`${AVIS_GOOGLE.note.toLocaleString('fr-FR')} sur Google · ${AVIS_GOOGLE.nombre} avis`}
                  </a>
                </li>
              ) : null}
            </ul>
          </div>
        </Reveal>
      </div>

      {/* Plaque principale — image LCP de la page d’accueil. */}
      <Reveal delay={240}>
        <div className="plate-container tirage mt-gap-lg">
          <Plate
            src="/images/hero-atelier.jpg"
            alt="Le comptoir en bois clair d’une boutique marseillaise avant l’ouverture, dans la lumière du matin qui entre par la vitrine."
            ratio="16/9"
            priority
            sizes={HERO_PLATE_SIZES}
          />
        </div>
      </Reveal>
    </section>
  );
}
