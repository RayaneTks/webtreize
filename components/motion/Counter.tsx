'use client';

import { animate, useInView } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { cn } from '@/lib/utils';

/** Durée du décompte, en secondes. */
const DURATION = 0.9;

/** La courbe d’entrée du site, la seule autorisée ici. */
const EASE: [number, number, number, number] = [0.32, 0.72, 0, 1];

/**
 * Grand chiffre qui se compte à l’entrée dans le viewport.
 *
 * Seul composant du site autorisé à importer `motion/react`, et seulement pour
 * l’animation impérative `animate` : aucun composant `motion.*` n’est utilisé,
 * le jeu de fonctionnalités complet de la librairie n’est donc pas embarqué.
 *
 * **La valeur affichée est la valeur finale par défaut, en toutes circonstances.**
 * Le zéro n’existe qu’à l’instant précis où le décompte démarre, et le décompte
 * ne démarre qu’une fois le chiffre réellement à l’écran. C’est la seule
 * conception acceptable ici : mettre la valeur à zéro dès le montage, en pariant
 * sur un observateur qui la relèvera plus tard, affiche « 0 heures » sur le bloc
 * de conversion principal du site à chaque fois que ce pari échoue — visiteur
 * qui ne défile jamais jusque-là, onglet ouvert en arrière-plan et jamais
 * regardé, impression de la page, capture d’écran, aperçu généré par un outil
 * tiers. Un chiffre faux sur une promesse commerciale coûte infiniment plus
 * qu’une animation manquée.
 *
 * Deux autres garanties :
 * - le HTML rendu par le serveur porte déjà la valeur finale : sans JavaScript,
 *   le chiffre affiché est juste ;
 * - le texte restitué par un lecteur d’écran est toujours la valeur finale,
 *   jamais le décompte.
 */
export function Counter({ to, className }: { to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [value, setValue] = useState(to);

  /**
   * Le décompte n’est armé que si le chiffre est hors de l’écran au montage :
   * le remettre à zéro sous les yeux du visiteur serait un défaut visible.
   */
  const [armed, setArmed] = useState(false);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (prefersReducedMotion) {
      setArmed(false);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const alreadyOnScreen = rect.bottom > 0 && rect.top < window.innerHeight;
    setArmed(!alreadyOnScreen);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!armed || !inView || prefersReducedMotion) return;

    // Le zéro est posé ici, et nulle part ailleurs : à la frame où le décompte
    // commence, chiffre à l’écran. Si cette ligne n’est jamais atteinte, la
    // valeur finale reste affichée.
    setValue(0);

    const controls = animate(0, to, {
      duration: DURATION,
      ease: EASE,
      onUpdate: (latest) => setValue(Math.round(latest)),
      onComplete: () => setValue(to),
    });

    // Filet : une animation interrompue — onglet passé en arrière-plan, moteur
    // qui gèle les rAF — ne doit pas laisser un chiffre intermédiaire à l’écran.
    const safetyNet = window.setTimeout(
      () => {
        controls.stop();
        setValue(to);
      },
      DURATION * 1000 + 1500,
    );

    return () => {
      window.clearTimeout(safetyNet);
      controls.stop();
      setValue(to);
    };
  }, [armed, inView, prefersReducedMotion, to]);

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      <span aria-hidden="true">{value}</span>
      <span className="sr-only">{to}</span>
    </span>
  );
}
