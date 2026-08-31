'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { LogoLink } from '@/components/ui/Logo';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { NAV_ITEMS } from '@/lib/data/site';
import { cn } from '@/lib/utils';

export function Header() {
  const scroll = useSmoothScroll();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Hors accueil, les ancres doivent renvoyer vers la home (`/#approche`).
  const isHome = pathname === '/';
  const anchor = (href: string) => (isHome ? href : `/${href}`);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="sticky inset-x-0 top-0 z-50 bg-canvas/[0.86] backdrop-blur-xl backdrop-saturate-150">
      <div className="site-container">
        <nav
          className="flex h-[var(--header-height)] items-center justify-between gap-7"
          aria-label="Navigation principale"
        >
          <LogoLink />

          <div className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={anchor(item.href)}
                onClick={(e) => scroll(e, anchor(item.href))}
                className="nav-link"
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            href={anchor('#audit')}
            onClick={(e) => scroll(e, anchor('#audit'))}
            className="hidden h-[2.125rem] items-center rounded-full bg-ink px-[1.0625rem] text-[0.8125rem] font-semibold text-canvas transition-colors duration-300 hover:bg-accent hover:text-white md:flex"
          >
            Parlons-en
          </a>

          <button
            type="button"
            className="flex h-[2.125rem] items-center rounded-full bg-ink px-[0.9375rem] text-[0.8125rem] font-semibold text-canvas md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? 'Fermer' : 'Menu'}
          </button>
        </nav>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          'absolute inset-x-0 top-full px-5 transition-opacity duration-200 md:hidden',
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
      >
        <div className="ml-auto grid w-[min(80vw,17.5rem)] gap-px rounded-[1.375rem] bg-surface p-2.5 shadow-menu">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={anchor(item.href)}
              onClick={(e) => {
                scroll(e, anchor(item.href));
                setOpen(false);
              }}
              className="rounded-[0.9375rem] px-4 py-3 text-[0.96875rem] font-medium text-ink transition-colors hover:bg-surface-muted"
            >
              {item.label}
            </a>
          ))}
          <a
            href={anchor('#audit')}
            onClick={(e) => {
              scroll(e, anchor('#audit'));
              setOpen(false);
            }}
            className="mt-1.5 rounded-[0.9375rem] bg-ink px-4 py-3.5 text-center text-[0.96875rem] font-semibold text-canvas"
          >
            Parlons-en
          </a>
        </div>
      </div>
    </header>
  );
}
