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
  { label: 'Méthode', href: '#method' },
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
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    if (pathname === '/') scroll(e, href);
    setMobileMenuOpen(false);
  };

  return (
    <header>
      <nav
        className={cn(
          'fixed top-0 left-0 w-full z-50 transition-all duration-300',
          'pt-[env(safe-area-inset-top)]',
          'max-lg:py-3 max-lg:bg-cream/95 max-lg:backdrop-blur-md max-lg:border-b max-lg:border-navy/10',
          isScrolled
            ? 'py-3 bg-navy/95 backdrop-blur-md border-b border-white/10'
            : 'lg:py-5 lg:bg-transparent lg:border-b lg:border-transparent'
        )}
        aria-label="Navigation principale"
      >
        <div className="container mx-auto px-5 lg:px-12 xl:px-16 max-w-screen-xl flex items-center justify-between">
          <Link
            href="#"
            onClick={handleLogoClick}
            className="flex items-center gap-2 z-50 relative"
            aria-label="WebTreize - Accueil"
          >
            <LogoWebTreize
              decorative
              className={cn(
                "w-7 h-7 md:w-8 md:h-8 transition-all duration-300",
                (isScrolled || mobileMenuOpen) && "brightness-0 invert"
              )}
            />
            <span className={cn(
              "text-lg md:text-xl font-black tracking-tighter transition-colors duration-300",
              (isScrolled || mobileMenuOpen) ? "text-white" : "text-navy"
            )}>
              WebTreize
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={pathname === '/' ? href : `/${href}`}
                onClick={(e) => handleNavClick(e, href)}
                className={cn(
                  "text-sm font-bold transition-colors relative group py-2",
                  isScrolled ? "text-white/80 hover:text-white" : "text-navy/70 hover:text-navy"
                )}
              >
                {label}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </Link>
            ))}
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "whitespace-nowrap transition-all",
                isScrolled
                  ? "bg-orange text-white border-orange hover:bg-orange-hover border-2"
                  : "border-2 border-navy text-navy hover:bg-navy hover:text-white"
              )}
              onClick={(e) => handleNavClick(e, '#contact')}
            >
              Audit gratuit
            </Button>
          </div>

          {/* Mobile: CTA + Burger */}
          <div className="flex items-center gap-2 z-50 lg:hidden">
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "whitespace-nowrap px-3 py-1.5 text-xs h-9 transition-colors",
                (isScrolled || mobileMenuOpen)
                  ? "bg-orange text-white border-orange"
                  : "text-navy border-navy/30"
              )}
              onClick={(e) => handleNavClick(e, '#contact')}
            >
              Audit gratuit
            </Button>
            <button
              type="button"
              className={cn(
                "p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center active:scale-90 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-orange rounded-sm",
                (isScrolled || mobileMenuOpen) ? "text-white" : "text-navy"
              )}
              onClick={(e) => {
                e.stopPropagation();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-navy/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden',
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Panel */}
      <div
        ref={menuRef}
        className={cn(
          'fixed top-0 right-0 w-full h-screen max-w-sm z-40 bg-navy shadow-2xl transition-transform duration-300 ease-out flex flex-col pt-24 px-6 lg:hidden',
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="flex flex-col gap-1 mt-4">
          {NAV_LINKS.map(({ label, href }, i) => (
            <Link
              key={label}
              href={pathname === '/' ? href : `/${href}`}
              onClick={(e) => handleNavClick(e, href)}
              className="text-3xl font-black text-white hover:text-orange transition-colors py-3"
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

        <div className="mt-auto pb-12 flex flex-col gap-4">
          <div className="h-px w-full bg-white/10" />
          <Button
            size="lg"
            className="w-full"
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            Obtenir mon audit gratuit
          </Button>
          <p className="text-center text-white/40 text-xs font-medium">
            Agence digitale · Marseille
          </p>
        </div>
      </div>
    </header>
  );
}
