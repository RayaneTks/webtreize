'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type FadeUpProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /** Threshold between 0 and 1 to trigger the reveal */
  threshold?: number;
};

/**
 * FadeUp
 * Animation d'apparition douce basée sur IntersectionObserver,
 * inspirée de la nouvelle DA WebTreize.
 */
export function FadeUp({
  children,
  delay = 0,
  className,
  threshold = 0.1,
}: FadeUpProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,transform]',
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-[0.98]',
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

