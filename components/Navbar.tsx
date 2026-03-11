'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { LogoWebTreize } from '@/components/ui/LogoWebTreize';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'La Méthode', href: '#method' },
  { label: 'FAQ', href: '#faq' },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const scroll = useSmoothScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('mobileMenuToggle', { detail: mobileMenuOpen }));
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Fermer le menu si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (mobileMenuOpen && menuRef.current && !menuRef.current.contains(e.target as Node)) {
        // Attention au bouton burger qui déclencherait aussi la fermeture (géré via modificateur d'événement sur le bouton)
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
          'fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out',
          isScrolled
            ? 'py-3 lg:py-4 bg-navy backdrop-blur-sm border-b border-white/10 shadow-lg'
            : 'py-4 lg:py-6 bg-transparent'
        )}
        aria-label="Navigation principale"
      >
        <div className="container mx-auto px-5 lg:px-8 max-w-screen-2xl flex items-center justify-between">
          <Link
            href="#"
            onClick={handleLogoClick}
            className="flex items-center gap-2 z-50 relative"
            aria-label="WebTreize - Accueil"
          >
            <LogoWebTreize 
              decorative 
              className={cn("w-8 h-8 md:w-10 md:h-10 transition-all duration-300", isScrolled || mobileMenuOpen ? "brightness-0 invert" : "")} 
            />
            <span className={cn("hidden sm:inline-block text-xl md:text-2xl font-black tracking-tighter transition-colors duration-300", isScrolled || mobileMenuOpen ? "text-white" : "text-navy")}>
              WebTreize
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={pathname === '/' ? href : `/#${href.slice(1)}`}
                onClick={(e) => handleNavClick(e, href)}
                className={cn("text-sm font-bold transition-colors relative group py-2 px-1 focus-visible:ring-2 focus-visible:ring-orange focus-visible:outline-none rounded-sm", isScrolled ? "text-white hover:text-orange" : "text-navy hover:text-orange")}
              >
                {label}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3 md:gap-4 z-50">
            {/* CTA Desktop & Mobile (en permanence) */}
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "hidden sm:flex whitespace-nowrap transition-colors",
                isScrolled ? "h-10 bg-white/10 text-white border-white/20 hover:bg-white hover:text-navy" : "h-12 lg:h-12 border-navy/20 text-navy hover:bg-navy hover:text-white"
              )}
              onClick={(e) => handleNavClick(e, '#contact')}
            >
              Obtenir mon audit gratuit
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "flex sm:hidden whitespace-nowrap px-4 py-2 text-xs transition-colors",
                "h-10 border-navy/20",
                isScrolled || mobileMenuOpen ? "bg-white/10 text-white border-white/20" : "text-navy"
              )}
              onClick={(e) => handleNavClick(e, '#contact')}
            >
              Audit gratuit
            </Button>

            {/* Hamburger Button */}
            <button
              type="button"
              className={cn("lg:hidden relative p-3 min-w-[48px] min-h-[48px] flex items-center justify-center active:scale-90 transition-transform focus:outline-none focus:ring-2 focus:ring-orange rounded-md", isScrolled || mobileMenuOpen ? "text-white" : "text-navy")}
              onClick={(e) => {
                e.stopPropagation();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-navy transition-opacity duration-300 lg:hidden',
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Menu Panel */}
      <div
        ref={menuRef}
        className={cn(
          'fixed top-0 right-0 w-full h-screen max-w-md z-40 bg-navy shadow-2xl transition-transform duration-300 ease-out flex flex-col pt-24 px-6 lg:hidden',
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col gap-2 mt-8">
          {NAV_LINKS.map(({ label, href }, i) => (
            <Link
              key={label}
              href={pathname === '/' ? href : `/#${href.slice(1)}`}
              onClick={(e) => handleNavClick(e, href)}
              className="text-4xl font-black text-white hover:text-orange transition-colors flex items-center min-h-[60px] cursor-pointer"
              style={{
                opacity: mobileMenuOpen ? 1 : 0,
                transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(20px)',
                transition: `all 0.3s ease-out ${0.1 + i * 0.05}s`,
              }}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="mt-auto pb-12 w-full flex flex-col gap-6">
          <div className="h-px w-full bg-white/10" />
          <Button
            size="lg"
            className="w-full text-base"
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            Obtenir mon audit gratuit
          </Button>
          <div className="text-center">
            <p className="text-white/60 text-sm font-medium">Agence indépendante basé à Marseille</p>
          </div>
        </div>
      </div>
    </header>
  );
}
