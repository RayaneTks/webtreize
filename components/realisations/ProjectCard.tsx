'use client';

import type { Route } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef } from 'react';
import { realisationHref, type Realisation } from '@/lib/data/realisations';
import { cn } from '@/lib/utils';

type MotionValue = {
  value: number;
  velocity: number;
};

type CardMotion = {
  rotateX: MotionValue;
  rotateY: MotionValue;
  shiftX: MotionValue;
  shiftY: MotionValue;
};

/**
 * Ressort critique (amortissement 1,0) de réponse 0,35 s, pour une masse 1 :
 * raideur (2π / réponse)², amortissement 4π · ratio / réponse.
 */
const SPRING_RESPONSE = 0.35;
const SPRING_STIFFNESS = ((2 * Math.PI) / SPRING_RESPONSE) ** 2;
const SPRING_DAMPING = (4 * Math.PI * 1) / SPRING_RESPONSE;

const AT_REST: CardMotion = {
  rotateX: { value: 0, velocity: 0 },
  rotateY: { value: 0, velocity: 0 },
  shiftX: { value: 0, velocity: 0 },
  shiftY: { value: 0, velocity: 0 },
};

function freshMotion(): CardMotion {
  return {
    rotateX: { ...AT_REST.rotateX },
    rotateY: { ...AT_REST.rotateY },
    shiftX: { ...AT_REST.shiftX },
    shiftY: { ...AT_REST.shiftY },
  };
}

/**
 * Une carte de projet : la couverture, le nom, ce qui a été fait.
 *
 * Toute la carte est un seul lien vers l’étude de cas. Au survol, seule la
 * couverture se rapproche très légèrement ; le nom se souligne. Aucun texte
 * long : la carte donne envie, l’étude de cas détaille.
 */
export function ProjectCard({
  projet,
  sizes,
  priority = false,
  headingLevel = 'h3',
  className,
}: {
  projet: Realisation;
  /** Largeur réelle de la carte, pour servir la bonne taille de couverture. */
  sizes: string;
  priority?: boolean;
  headingLevel?: 'h2' | 'h3';
  className?: string;
}) {
  const Heading = headingLevel;
  const coverRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const frameRef = useRef<number>(0);
  const lastFrameRef = useRef<number>(0);
  const motionRef = useRef<CardMotion>(freshMotion());

  const paint = useCallback(() => {
    const cover = coverRef.current;
    const image = imageRef.current;
    if (!cover || !image) return;

    const { rotateX, rotateY, shiftX, shiftY } = motionRef.current;
    cover.style.transform = `perspective(1100px) rotateX(${rotateX.value.toFixed(3)}deg) rotateY(${rotateY.value.toFixed(3)}deg) translate3d(${shiftX.value.toFixed(2)}px, ${shiftY.value.toFixed(2)}px, 0)`;
    image.style.transform = `translate3d(${(-shiftX.value * 1.35).toFixed(2)}px, ${(-shiftY.value * 1.35).toFixed(2)}px, 0) scale(1.045)`;
  }, []);

  const stopAnimation = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = 0;
    lastFrameRef.current = 0;
  }, []);

  /** Où le ressort doit aller : sous le pointeur, ou au repos. */
  const targetRef = useRef<Record<keyof CardMotion, number>>({
    rotateX: 0,
    rotateY: 0,
    shiftX: 0,
    shiftY: 0,
  });
  /** Le rectangle de la couverture, mesuré une fois à l’entrée du pointeur. */
  const rectRef = useRef<DOMRect | null>(null);

  /**
   * Un seul ressort porte tout le mouvement, entrée comme sortie
   * (apple-design §3-4) : amortissement 1,0 (aucun rebond), réponse 0,35 s.
   * Chaque frame part de la valeur affichée et de la vitesse courante : un
   * pointeur qui revient en plein retour au repos est suivi sans saut.
   */
  const run = useCallback(() => {
    if (frameRef.current) return;

    const step = (now: number) => {
      const previous = lastFrameRef.current || now;
      const dt = Math.min((now - previous) / 1000, 1 / 30);
      lastFrameRef.current = now;

      let moving = false;
      for (const key of Object.keys(motionRef.current) as (keyof CardMotion)[]) {
        const channel = motionRef.current[key];
        const target = targetRef.current[key];
        const acceleration = -SPRING_STIFFNESS * (channel.value - target) - SPRING_DAMPING * channel.velocity;
        channel.velocity += acceleration * dt;
        channel.value += channel.velocity * dt;

        if (Math.abs(channel.value - target) > 0.002 || Math.abs(channel.velocity) > 0.002) {
          moving = true;
        } else {
          channel.value = target;
          channel.velocity = 0;
        }
      }

      paint();
      if (moving) {
        frameRef.current = requestAnimationFrame(step);
      } else {
        frameRef.current = 0;
        lastFrameRef.current = 0;
        if (Object.values(targetRef.current).every((v) => v === 0)) {
          coverRef.current?.removeAttribute('data-moving');
        }
      }
    };

    frameRef.current = requestAnimationFrame(step);
  }, [paint]);

  useEffect(() => stopAnimation, [stopAnimation]);

  const onPointerEnter = useCallback((event: React.PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType === 'touch') return;
    rectRef.current = coverRef.current?.getBoundingClientRect() ?? null;
  }, []);

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLAnchorElement>) => {
      if (event.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      const cover = coverRef.current;
      if (!cover) return;
      const rect = rectRef.current ?? (rectRef.current = cover.getBoundingClientRect());

      const x = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2));
      const y = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2));
      targetRef.current = { rotateX: -y * 1.8, rotateY: x * 2.2, shiftX: x * 2.5, shiftY: y * 2 };

      cover.dataset.moving = '';
      run();
    },
    [run],
  );

  const onPointerLeave = useCallback(() => {
    rectRef.current = null;
    targetRef.current = { rotateX: 0, rotateY: 0, shiftX: 0, shiftY: 0 };
    run();
  }, [run]);

  return (
    <article className={cn('projet-carte', className)}>
      <Link
        href={realisationHref(projet.id) as Route}
        className="group press block"
        onPointerEnter={onPointerEnter}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onBlur={onPointerLeave}
      >
        <div ref={coverRef} className="projet-carte__couverture">
          <Image
            ref={imageRef}
            src={projet.couverture.src}
            alt={projet.couverture.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
          />
          <span className="projet-carte__ouvrir" aria-hidden="true">
            ↗
          </span>
        </div>
        <Heading className="mt-gap-xs text-title font-extrabold text-ink">
          <span className="link-draw">{projet.nom}</span>
        </Heading>
        <p className="mt-1 text-body text-ink-muted">{projet.categories.join(', ')}</p>
      </Link>
    </article>
  );
}
