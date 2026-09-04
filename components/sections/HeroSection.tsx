import { LineMask } from '@/components/motion/LineMask';
import { Reveal } from '@/components/motion/Reveal';
import { Button } from '@/components/ui/Button';
import { Plate } from '@/components/ui/Plate';

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
          Votre savoir-faire mérite d’être trouvé.
        </LineMask>

        <Reveal delay={60}>
          <p className="lede mx-auto mt-gap-sm max-w-[52ch]">
            Nous concevons des sites, des fiches Google et des outils sur mesure pour les entreprises
            du 13 — avec le même soin que vous mettez à recevoir un client.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div className="mt-gap-md flex flex-wrap items-center justify-center gap-x-gap-sm gap-y-gap-xs">
            <Button href="/#audit">Commencer par un audit</Button>
            <Button href="/#approche" variant="text" arrow>
              Découvrir notre approche
            </Button>
          </div>
          {/* Le délai de 48 heures est annoncé une seule fois par page : il est
              porté par la section « audit », dont c’est le chiffre principal. */}
          <p className="mt-gap-sm text-note text-ink-faint">
            Gratuit · Réponse écrite · Sans engagement
          </p>
        </Reveal>
      </div>

      {/* Plaque principale — image LCP de la page d’accueil. */}
      <Reveal delay={180}>
        <div className="plate-container mt-gap-lg">
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
