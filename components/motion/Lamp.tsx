'use client';

import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/**
 * La lumière de l’atelier, sur la seule section sombre du site.
 *
 * ## Pourquoi ce n’est pas un gadget
 *
 * Toute la charte photographique tient dans une phrase : « lumière naturelle,
 * chaude, de côté, fin de matinée, ombres douces et longues ». Les cinq
 * photographies du site sont éclairées ainsi, toutes par la même fenêtre. Ici,
 * cette fenêtre entre dans la page : sur l’encre, une lueur chaude très basse
 * suit le regard du visiteur, exactement comme la lumière rasante qui traverse
 * le comptoir de la plaque du héros.
 *
 * Ce n’est donc pas un effet d’interface posé sur un fond — c’est le motif
 * central de la marque rendu tangible, au seul endroit du site où il peut
 * exister : sur l’encre, une lueur chaude est plus claire que le fond. Sur
 * l’ivoire, elle serait invisible ou sale.
 *
 * ## Retenue
 *
 * Une seule couleur, la terre cuite de la charte, à 7 % au centre et éteinte à
 * 60 % du rayon. C’est en dessous du seuil de conscience : personne ne se dira
 * « il y a une lumière qui suit ma souris », tout le monde trouvera la section
 * plus habitée. Une lueur qu’on remarque est une lueur trop forte.
 *
 * ## Coût et sûreté
 *
 * - Deux propriétés personnalisées écrites au plus une fois par frame, via
 *   `requestAnimationFrame` : jamais de travail dans le gestionnaire d’événement.
 * - Seul `background-position` change, sur un élément déjà composé : aucune mise
 *   en page recalculée, aucune repeinture de texte.
 * - `pointer-events: none` et `aria-hidden` : la lueur n’est ni cliquable ni
 *   annoncée.
 * - Rien ne se monte sous `prefers-reduced-motion: reduce`, ni sur un appareil
 *   sans survol réel — sur un écran tactile, une lueur figée à l’endroit du
 *   dernier appui serait un défaut. Dans les deux cas, la section est
 *   exactement celle d’avant.
 * - Le composant ne rend rien tant que le pointeur n’est pas entré : le HTML
 *   servi ne contient aucun nœud décoratif.
 */
export function Lamp({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const element = ref.current;
    const section = element?.parentElement;
    if (!element || !section) return;

    // Un appareil sans survol réel n’a pas de « regard » à suivre.
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;

    const paint = () => {
      frame = 0;
      element.style.setProperty('--lamp-x', `${x}px`);
      element.style.setProperty('--lamp-y', `${y}px`);
    };

    const onMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
      // Une seule écriture par frame, quel que soit le débit d’événements.
      if (frame === 0) frame = window.requestAnimationFrame(paint);
    };

    const onEnter = () => element.setAttribute('data-lit', '');
    const onLeave = () => element.removeAttribute('data-lit');

    section.addEventListener('pointermove', onMove, { passive: true });
    section.addEventListener('pointerenter', onEnter);
    section.addEventListener('pointerleave', onLeave);

    return () => {
      section.removeEventListener('pointermove', onMove);
      section.removeEventListener('pointerenter', onEnter);
      section.removeEventListener('pointerleave', onLeave);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, [prefersReducedMotion]);

  return <div ref={ref} aria-hidden="true" className={className ? `lamp ${className}` : 'lamp'} />;
}
