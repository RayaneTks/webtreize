'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Smartphone } from 'lucide-react';
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

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    if (pathname === '/') {
      scroll(e, href);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header>
      <nav
        className={cn(
          'fixed w-full z-40 transition-all duration-500',
          isScrolled
            ? 'py-4 bg-white/80 backdrop-blur-xl border-b border-[#001F3F]/5 shadow-[0_10px_30px_rgba(15,23,42,0.08)]'
            : 'py-6 bg-transparent'
        )}
        aria-label="Navigation principale"
      >
        <div className="container mx-auto px-5 lg:px-8 max-w-screen-2xl flex items-center justify-between">
          <Link
            href="#"
            onClick={handleLogoClick}
            className="flex items-center gap-2 z-50"
            aria-label="WebTreize - Retour en haut de page"
          >
            <div className="flex items-center gap-2">
              <LogoWebTreize decorative className="w-9 h-9 md:w-11 md:h-11" />
              <span className="text-xl md:text-2xl font-black tracking-tighter text-[#001F3F]">
                WebTreize
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={pathname === '/' ? href : `/#${href.slice(1)}`}
                onClick={(e) => handleNavClick(e, href)}
                className="text-sm font-bold text-[#001F3F] hover:text-[#FF4500] transition-colors uppercase tracking-widest relative group overflow-hidden py-2"
              >
                {label}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF4500] -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              </Link>
            ))}
          </div>

          <div className="hidden lg:block">
            <Link
              href={pathname === '/' ? '#contact' : '/#contact'}
              onClick={(e) => {
                if (pathname === '/') {
                  scroll(e, '#contact');
                }
              }}
              className="group flex items-center gap-3 px-8 py-3.5 rounded-full bg-[#001F3F] text-white text-sm font-bold shadow-[0_10px_20px_rgba(0,31,63,0.15)] hover:shadow-[0_15px_30px_rgba(0,31,63,0.25)] hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
            >
              Parlons Projet
              <div className="w-2 h-2 rounded-full bg-[#FF4500] group-hover:scale-[2] transition-transform duration-300" />
            </Link>
          </div>

          <button
            type="button"
            className="lg:hidden relative z-50 p-2 text-[#001F3F] active:scale-90 transition-transform"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-8 h-8 text-white" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </nav>

      {/* Menu mobile plein écran typographique */}
      <div
        className={cn(
          'fixed inset-0 z-30 bg-[#001F3F] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col pt-32 px-6',
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="flex flex-col gap-4 mt-8">
          {NAV_LINKS.map(({ label, href }, i) => (
            <div key={label} className="overflow-hidden">
              <Link
                href={pathname === '/' ? href : `/#${href.slice(1)}`}
                onClick={(e) => handleNavClick(e, href)}
                className="text-[12vw] font-black text-white hover:text-[#FF4500] transition-colors block leading-none"
                style={{
                  transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(100%)',
                  transition: `transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 0.1}s`,
                }}
              >
                {label}.
              </Link>
            </div>
          ))}
        </div>

        <div
          className="mt-auto pb-12 w-full flex flex-col gap-4"
          style={{
            opacity: mobileMenuOpen ? 1 : 0,
            transition: 'opacity 0.5s ease-out 0.4s',
          }}
        >
          <a
            href={SNAPCHAT_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-3 w-full py-5 rounded-2xl bg-[#FFFC00] text-black font-black text-lg active:scale-95 transition-transform"
          >
            <Smartphone className="w-6 h-6" /> Snapchat W13
          </a>
        </div>
      </div>
    </header>
  );
}

