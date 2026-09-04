'use client';

import { useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { RevealObserver } from '@/components/motion/RevealObserver';

/**
 * Coquille de page : header, contenu principal, pied de page.
 *
 * Seul îlot client de la mise en page (SPEC 4.3). Il monte `RevealObserver`,
 * l’unique observateur des blocs `Reveal` du site, et rattrape le défilement
 * vers une ancre au chargement.
 *
 * ## Pourquoi `footer` est une prop et non un enfant
 *
 * Le pied de page était rendu **dans** `<main>` sur les sept pages : d’après
 * HTML-AAM, un `<footer>` descendant de `main` perd le rôle `contentinfo`, et
 * le site n’exposait donc ce repère nulle part. Coordonnées, mentions légales
 * et politique de confidentialité étaient hors d’atteinte de la navigation par
 * repères. La prop garantit structurellement l’ordre : le `<main>` est fermé
 * avant que le pied de page ne soit rendu.
 *
 * Passer `<Footer />` en prop plutôt que de l’importer ici a une seconde
 * conséquence, voulue : un élément transmis depuis un composant serveur reste
 * rendu sur le serveur. `Footer` n’entre pas dans le graphe client, alors qu’un
 * import direct depuis ce fichier l’y ferait basculer avec toute sa descendance.
 *
 * ## Lien d’évitement
 *
 * `<main>` porte `tabIndex={-1}` : sans lui, l’activation du lien « Aller au
 * contenu principal » ne déplace le focus ni sous Safari ni sous plusieurs
 * lecteurs d’écran, qui le renvoient au début du document. L’élément n’étant
 * pas atteignable par tabulation, `focus:outline-none` retire le contour que
 * certains navigateurs peignent sur ce saut ; l’anneau de focus du socle ne
 * vise de toute façon que `[tabindex]:not([tabindex='-1'])`.
 */
export function ClientShell({
  children,
  footer,
}: {
  children: React.ReactNode;
  /** Rendu **après** `</main>`, seule position où `<footer>` vaut `contentinfo`. */
  footer?: React.ReactNode;
}) {
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;

    let frame = 0;

    // Le navigateur a déjà sauté à l’ancre. Ce rattrapage ne corrige que le
    // décalage laissé derrière lui par les polices et les images qui finissent
    // d’arriver — d’où `auto` : c’est une correction, pas un mouvement.
    // Le décalage du header vient de `scroll-margin-top`, posé sur tout `[id]`
    // par `app/globals.css` : aucune constante n’est recopiée ici.
    const settle = () => {
      frame = window.requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'auto', block: 'start' });
      });
    };

    if (document.readyState === 'complete') {
      settle();
    } else {
      window.addEventListener('load', settle, { once: true });
    }

    return () => {
      window.removeEventListener('load', settle);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <RevealObserver />
      <Header />
      <main id="main-content" tabIndex={-1} className="relative focus:outline-none">
        {children}
      </main>
      {footer}
    </>
  );
}
