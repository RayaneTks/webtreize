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
  const previousPointerTimeRef = useRef(0);

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

  const settle = useCallback(() => {
    stopAnimation();

    const step = (now: number) => {
      const previous = lastFrameRef.current || now;
      const dt = Math.min((now - previous) / 1000, 1 / 30);
      lastFrameRef.current = now;

      let moving = false;
      for (const channel of Object.values(motionRef.current)) {
        const acceleration = -190 * channel.value - 25 * channel.velocity;
        channel.velocity += acceleration * dt;
        channel.value += channel.velocity * dt;

        if (Math.abs(channel.value) > 0.002 || Math.abs(channel.velocity) > 0.002) {
          moving = true;
        } else {
          channel.value = 0;
          channel.velocity = 0;
        }
      }

      paint();
      if (moving) frameRef.current = requestAnimationFrame(step);
      else stopAnimation();
    };

    frameRef.current = requestAnimationFrame(step);
  }, [paint, stopAnimation]);

  useEffect(() => stopAnimation, [stopAnimation]);

  const onPointerMove = useCallback(
    (event: React.PointerEvent<HTMLAnchorElement>) => {
      if (event.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
      }

      stopAnimation();
      const cover = coverRef.current;
      if (!cover) return;

      const rect = cover.getBoundingClientRect();
      const x = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width - 0.5) * 2));
      const y = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height - 0.5) * 2));
      const now = event.timeStamp;
      const elapsed = Math.max((now - previousPointerTimeRef.current) / 1000, 1 / 120);
      const targets = {
        rotateX: -y * 1.8,
        rotateY: x * 2.2,
        shiftX: x * 2.5,
        shiftY: y * 2,
      };

      for (const [key, target] of Object.entries(targets) as [keyof CardMotion, number][]) {
        const channel = motionRef.current[key];
        channel.velocity = Math.max(-60, Math.min(60, (target - channel.value) / elapsed));
        channel.value = target;
      }

      previousPointerTimeRef.current = now;
      cover.dataset.moving = '';
      paint();
    },
    [paint, stopAnimation],
  );

  const onPointerLeave = useCallback(() => {
    coverRef.current?.removeAttribute('data-moving');
    previousPointerTimeRef.current = 0;
    settle();
  }, [settle]);

  return (
    <article className={cn('projet-carte', className)}>
      <Link
        href={realisationHref(projet.id) as Route}
        className="group press block"
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
