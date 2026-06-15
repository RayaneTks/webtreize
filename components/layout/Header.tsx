'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { List, X } from '@phosphor-icons/react';
import { Button } from '@/components/ui/Button';
import { LogoWebTreize } from '@/components/ui/LogoWebTreize';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { cn } from '@/lib/utils';

const NAV = [
  { label: 'Services', href: '#services' },
  { label: 'Engagements', href: '#engagements' },
  { label: 'Méthode', href: '#method' },
  { label: 'FAQ', href: '#faq' },
] as const;

export function Header() {
  const scroll = useSmoothScroll();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300',
        scrolled
          ? 'border-b border-line bg-surface/92 backdrop-blur-xl shadow-[0_1px_0_rgba(12,18,32,0.04),0_8px_32px_-12px_rgba(0,31,63,0.08)]'
          : 'bg-transparent',
      )}
    >
      <div className="site-container">
        <nav
          className="grid h-[var(--header-height)] grid-cols-[auto_1fr_auto] items-center gap-4 lg:grid-cols-[1fr_auto_1fr]"
          aria-label="Navigation principale"
        >
          <Link
            href="/"
            className="relative z-50 flex shrink-0 items-center lg:justify-self-start"
            aria-label="WebTreize, accueil"
          >
            <LogoWebTreize className="h-8 w-auto text-ink" />
          </Link>

          <div className="hidden items-center justify-center gap-8 lg:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => scroll(e, item.href)}
                className="nav-link"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center justify-end gap-2 lg:justify-self-end">
            <div className="hidden lg:flex lg:items-center">
              <Button size="sm" onClick={(e) => scroll(e, '#contact')}>
                Demander un audit gratuit
              </Button>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              <Button size="sm" className="px-4 text-xs" onClick={(e) => scroll(e, '#contact')}>
                Audit gratuit
              </Button>
              <button
                type="button"
                className="relative z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-ink transition-[border-color,box-shadow] duration-200 hover:border-line-strong hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
                onClick={() => setOpen((v) => !v)}
              >
                {open ? <X size={20} weight="bold" /> : <List size={20} weight="bold" />}
              </button>
            </div>
          </div>
        </nav>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          'fixed inset-0 z-40 bg-canvas/95 backdrop-blur-xl transition-opacity duration-300 lg:hidden',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
        <div className="site-container flex min-h-[100dvh] flex-col items-center justify-center gap-8 pt-24 pb-12 text-center">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                scroll(e, item.href);
                setOpen(false);
              }}
              className="text-3xl font-display font-semibold text-ink transition-colors duration-200 hover:text-accent"
            >
              {item.label}
            </a>
          ))}
          <Button
            size="lg"
            className="mt-4 w-full max-w-sm"
            onClick={(e) => {
              scroll(e, '#contact');
              setOpen(false);
            }}
          >
            Demander un audit gratuit
          </Button>
        </div>
      </div>
    </header>
  );
}
