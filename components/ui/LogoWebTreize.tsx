import React from 'react';
import { cn } from '@/lib/utils';

const LOGO_SRC = '/logo.svg';

interface LogoWebTreizeProps {
  className?: string;
}

export function LogoWebTreize({ className }: LogoWebTreizeProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={LOGO_SRC}
      alt="WebTreize"
      className={cn('shrink-0 object-contain', className)}
      aria-hidden
    />
  );
}
