'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '@/components/NavBarDock';

const SCROLL_THRESHOLD = 32;

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function scrollToContact() {
  scrollTo('contact');
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Section active au scroll : la dernière section dont le haut a dépassé le haut de l’écran */
  useEffect(() => {
    const HEADER_OFFSET = 100;

    const updateActiveSection = () => {
      let current: string | null = null;
      for (const { id } of NAV_ITEMS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= HEADER_OFFSET) current = id;
      }
      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    window.addEventListener('resize', updateActiveSection);
    return () => {
      window.removeEventListener('scroll', updateActiveSection);
      window.removeEventListener('resize', updateActiveSection);
    };
  }, []);

  const closeMobile = () => setMobileOpen(false);

  const ctaOrange = (
    <button
      type="button"
      onClick={() => {
        scrollToContact();
        closeMobile();
      }}
      className="rounded-full bg-action px-5 py-2.5 text-sm font-bold text-white shadow-action transition hover:shadow-action-pulse whitespace-nowrap"
    >
      DEVIS GRATUIT
    </button>
  );

  const logo = (
    <Link href="/" className="flex shrink-0 items-center" aria-label="WebTreize - Accueil">
      <Image
        src="/logo-simple.png"
        alt="W13 - WebTreize"
        width={72}
        height={32}
        className="h-8 w-auto object-contain"
        priority
      />
      <div className="ml-2 hidden flex-col leading-tight sm:flex">
        <span className="font-display text-[13px] font-black tracking-tight text-white">
          WebTreize
        </span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
          Agence digitale
        </span>
      </div>
    </Link>
  );

  const logoMobile = (
    <Link href="/" className="flex items-center" aria-label="WebTreize - Accueil">
      <Image
        src="/logo-simple.png"
        alt="WebTreize"
        width={56}
        height={24}
        className="h-6 w-auto object-contain sm:h-7"
        priority
      />
      <span className="ml-2 font-display text-lg font-bold tracking-tight text-white sm:text-xl">
        WebTreize
      </span>
    </Link>
  );

  const spring = { type: 'spring' as const, stiffness: 280, damping: 32, mass: 0.8 };

  return (
    <>
      {/* ========== MOBILE : pill centrée (logo + hamburger), bordure au scroll ========== */}
      <header
        className="fixed left-0 right-0 top-0 z-50 flex items-center justify-center px-4 py-4 md:hidden"
        role="banner"
      >
        <motion.div
          layout
          transition={spring}
          className={`flex min-h-[44px] max-w-lg w-full items-center justify-between rounded-full border bg-void/90 px-4 py-3 backdrop-blur-xl transition-[border-color,box-shadow] duration-300 ${
            scrolled ? 'border-white/10 shadow-lg' : 'border-transparent shadow-none'
          }`}
        >
          {logoMobile}
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-neon"
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </motion.div>
      </header>

      {/* Overlay : sous la navbar uniquement, ne la superpose pas */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-void/60 backdrop-blur-sm md:hidden"
            aria-hidden="true"
            onClick={closeMobile}
          />
        )}
      </AnimatePresence>
      {/* Menu mobile : s’ouvre sous la navbar, ne la recouvre pas */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="fixed left-4 right-4 top-[5.5rem] z-50 rounded-2xl border border-white/10 bg-void/95 p-4 shadow-xl backdrop-blur-xl md:hidden"
            aria-label="Menu principal"
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="flex flex-col">
              {NAV_ITEMS.map(({ id, name }) => (
                <li key={id}>
                  <button
                    type="button"
                    onClick={() => {
                      scrollTo(id);
                      closeMobile();
                    }}
                    className="w-full rounded-xl px-4 py-3 text-left text-base font-medium text-slate-300 hover:bg-white/5 hover:text-white"
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-3 border-t border-white/10 pt-4">
              {ctaOrange}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ========== DESKTOP : même logique, bordure uniquement au scroll ========== */}
      <header
        className="fixed left-0 right-0 top-0 z-50 hidden px-4 pt-4 md:block"
        role="banner"
      >
        <motion.div
          layout
          transition={spring}
          className={`mx-auto flex items-center transition-[background-color,border-color,box-shadow] duration-300 ${
            scrolled
              ? 'max-w-4xl justify-between gap-4 rounded-full border border-white/10 bg-void/80 px-6 py-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.25)] backdrop-blur-xl'
              : 'max-w-7xl rounded-none border-0 bg-transparent px-6 py-5 shadow-none sm:px-8'
          }`}
        >
          <motion.div layout transition={spring} className="shrink-0">
            {logo}
          </motion.div>

          <motion.div
            layout
            transition={spring}
            className={scrolled ? 'w-0 flex-none overflow-hidden' : 'min-w-0 flex-1'}
            aria-hidden
          />

          <motion.nav
            layout
            transition={spring}
            className={`flex shrink-0 items-center gap-6 sm:gap-8 ${scrolled ? 'flex-1 justify-center' : ''}`}
            aria-label="Navigation principale"
          >
            {NAV_ITEMS.map(({ id, name }) => {
              const isActive = activeSection === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => scrollTo(id)}
                  className="relative rounded-full px-4 py-2 text-sm font-semibold text-slate-300 transition-colors hover:text-white focus:outline-none"
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-desktop"
                      className="absolute inset-0 rounded-full bg-white/[0.06] border border-neon/20 -z-10"
                      transition={spring}
                      aria-hidden
                    />
                  )}
                  <span className={isActive ? 'text-neon' : ''}>{name}</span>
                </button>
              );
            })}
          </motion.nav>

          <motion.div
            layout
            transition={spring}
            className={scrolled ? 'w-0 flex-none overflow-hidden' : 'min-w-0 flex-1'}
            aria-hidden
          />

          <motion.div layout transition={spring} className="shrink-0">
            {ctaOrange}
          </motion.div>
        </motion.div>
      </header>
    </>
  );
}
