import React from 'react';
import { cn } from '@/lib/utils';

const LOGO_SRC = '/logo.svg';

interface LogoWebTreizeProps {
  className?: string;
  /** Quand true, l'image est décorative (alt vide) — utiliser si du texte "WebTreize" est adjacent */
  decorative?: boolean;
}

export function LogoWebTreize({ className, decorative }: LogoWebTreizeProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={LOGO_SRC}
      alt={decorative ? '' : 'WebTreize'}
      width={400}
      height={300}
      className={cn('shrink-0 object-contain', className)}
      aria-hidden={decorative}
    />
  );
}
