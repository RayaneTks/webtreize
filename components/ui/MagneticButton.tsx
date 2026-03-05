'use client';

import React, { useRef } from 'react';
import { cn } from '@/lib/utils';

type CommonProps = {
  children: React.ReactNode;
  className?: string;
};

type MagneticButtonProps = CommonProps & {
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: React.MouseEvent<any>) => void;
};

/**
 * MagneticButton
 * Bouton avec léger effet magnétique au survol (nouvelle DA WebTreize).
 * Supporte à la fois <button> et <a>.
 */
export function MagneticButton(props: MagneticButtonProps) {
  const { children, className } = props;
  const nodeRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const el = nodeRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };

  const handleMouseLeave = () => {
    const el = nodeRef.current;
    if (!el) return;
    el.style.transform = 'translate(0px, 0px)';
  };

  if ('href' in props && props.href) {
    const { href, onClick } = props;
    return (
      <a
        href={href}
        ref={nodeRef as React.Ref<HTMLAnchorElement>}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        className={cn('inline-block transition-transform duration-300 ease-out will-change-transform', className)}
      >
        {children}
      </a>
    );
  }

  const { type = 'button', onClick } = props;
  return (
    <button
      ref={nodeRef as React.Ref<HTMLButtonElement>}
      type={type}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={cn('inline-block transition-transform duration-300 ease-out will-change-transform', className)}
    >
      {children}
    </button>
  );
}


