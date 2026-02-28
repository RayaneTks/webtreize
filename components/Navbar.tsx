'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, Smartphone, MessageCircle } from 'lucide-react';
import { LogoWebTreize } from '@/components/ui/LogoWebTreize';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { cn } from '@/lib/utils';

const SNAPCHAT_URL = 'https://snapchat.com/add/webtreize';

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Vision', href: '#vision' },
  { label: 'Contact', href: '#contact' },
] as const;

interface NavbarProps {
  mobileMenuOpen?: boolean;
  setMobileMenuOpen?: (open: boolean) => void;
}

export function Navbar({ mobileMenuOpen: controlledOpen, setMobileMenuOpen: setControlledOpen }: NavbarProps = {}) {
  const pathname = usePathname();
  const scroll = useSmoothScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [internalOpen, setInternalOpen] = useState(false);
  const mobileMenuOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setMobileMenuOpen = setControlledOpen ?? ((v: boolean) => setInternalOpen(v));

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
  }, [mobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === '/') {
      scroll(e, href);
    }
    setMobileMenuOpen(false);
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <header>
      <nav
        className={cn(
          'fixed w-full z-50 transition-all duration-500',
          isScrolled
            ? 'py-3 bg-black/60 backdrop-blur-2xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'py-5 md:py-8 bg-transparent'
        )}
        aria-label="Navigation principale"
      >
        <div className="container mx-auto px-4 sm:px-8 max-w-7xl flex items-center justify-between">
          <Link
            href="#"
            className="flex items-center gap-3 z-50 group"
            onClick={handleLogoClick}
            aria-label="WebTreize - Retour accueil"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden />
              <LogoWebTreize className="w-11 h-11 md:w-14 md:h-14 relative z-10 transition-transform duration-500 ease-out group-hover:scale-105 group-active:scale-95" />
            </div>
            <span className="text-xl md:text-2xl font-black tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-200 transition-all duration-300">
              WebTreize
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/5 p-1.5 rounded-full backdrop-blur-md">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={pathname === '/' ? href : `/#${href.slice(1)}`}
                onClick={(e) => pathname === '/' && scroll(e, href)}
                className="px-5 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-full transition-all duration-300"
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="hidden md:block">
            <Link
              href={pathname === '/' ? '#contact' : '/#contact'}
              onClick={(e) => pathname === '/' && scroll(e, '#contact')}
              className="group relative px-6 py-2.5 rounded-full bg-white text-black text-sm font-bold overflow-hidden transition-transform active:scale-95 block"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden />
              <span className="relative flex items-center gap-2">
                Démarrer un projet <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden />
              </span>
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden relative z-50 p-2 text-white active:scale-90 transition-transform"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {mobileMenuOpen ? <X className="w-7 h-7" aria-hidden /> : <Menu className="w-7 h-7" aria-hidden />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={cn(
          'fixed inset-0 z-40 bg-[#030303]/90 backdrop-blur-3xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col pt-28 px-6 overflow-y-auto',
          mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Menu mobile"
        hidden={!mobileMenuOpen}
      >
        <div className="flex flex-col gap-2 flex-shrink-0">
          {NAV_LINKS.map(({ label, href }, i) => (
            <Link
              key={label}
              href={pathname === '/' ? href : `/#${href.slice(1)}`}
              onClick={(e) => {
                if (pathname === '/') scroll(e, href);
                setMobileMenuOpen(false);
              }}
              className="text-4xl font-black text-gray-400 hover:text-white transition-colors py-4 border-b border-white/5"
              style={{
                transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
                opacity: mobileMenuOpen ? 1 : 0,
                transition: `transform 0.5s ease-out ${mobileMenuOpen ? i * 100 : 0}ms, opacity 0.5s ease-out ${mobileMenuOpen ? i * 100 : 0}ms`,
              }}
            >
              {label}
            </Link>
          ))}
        </div>
        <div
          className="mt-auto flex-shrink-0 w-full pb-28 space-y-4"
          style={{
            transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
            opacity: mobileMenuOpen ? 1 : 0,
            transition: 'transform 0.5s ease-out 300ms, opacity 0.5s ease-out 300ms',
          }}
        >
          <p className="text-gray-500 mb-4 text-sm font-semibold uppercase tracking-widest">
            Une question rapide ?
          </p>
          <a
            href={SNAPCHAT_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-center justify-center gap-3 w-full py-5 rounded-2xl bg-[#FFFC00] text-black font-bold text-lg active:scale-95 transition-transform min-h-[56px]"
          >
            <Smartphone className="w-6 h-6" aria-hidden /> Contacter sur Snapchat
          </a>
          <Link
            href={pathname === '/' ? '#contact' : '/#contact'}
            onClick={(e) => {
              if (pathname === '/') scroll(e, '#contact');
              setMobileMenuOpen(false);
            }}
            className="flex items-center justify-center gap-3 w-full py-5 rounded-2xl bg-white text-black font-black active:scale-95 transition-transform border border-white/20 min-h-[56px]"
          >
            <MessageCircle className="w-6 h-6" aria-hidden /> Obtenir un Devis
          </Link>
        </div>
      </div>
    </header>
  );
}
