import Link from 'next/link';
import { cn } from '@/lib/utils';

/**
 * Logotype WebTreize.
 * Le point terre cuite est l'élément de marque : il ferme le mot
 * comme on termine une phrase. Toujours en minuscules.
 */
export function Logo({
  className,
  tone = 'ink',
}: {
  className?: string;
  tone?: 'ink' | 'canvas';
}) {
  return (
    <span
      className={cn(
        'flex items-baseline gap-px text-[1.1875rem] font-extrabold tracking-[-0.045em]',
        tone === 'ink' ? 'text-ink' : 'text-canvas',
        className,
      )}
    >
      webtreize
      <span className={tone === 'ink' ? 'text-accent' : 'text-accent-light'}>.</span>
    </span>
  );
}

export function LogoLink({ className, tone = 'ink' }: { className?: string; tone?: 'ink' | 'canvas' }) {
  return (
    <Link href="/" aria-label="WebTreize, accueil" className={cn('shrink-0', className)}>
      <Logo tone={tone} />
    </Link>
  );
}

/** Monogramme carré : avatar, favicon, tampon. */
export function Monogram({
  className,
  variant = 'ink',
}: {
  className?: string;
  variant?: 'ink' | 'accent';
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center justify-center rounded-[0.29em] text-[0.37em] font-extrabold tracking-[-0.04em]',
        variant === 'ink' ? 'bg-ink-deep text-canvas' : 'bg-accent text-white',
        className,
      )}
      aria-hidden="true"
    >
      13
    </span>
  );
}
