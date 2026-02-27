'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const LINKS = [
  { id: 'services', label: 'Services' },
  { id: 'rassurance', label: 'Pourquoi nous' },
  { id: 'contact', label: 'Contact' },
] as const;

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setActiveId(e.target.id);
            break;
          }
        }
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );
    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 px-4 pt-4 md:px-6">
      <nav
        className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-white/10 bg-void/80 px-5 py-2.5 backdrop-blur-xl"
        role="navigation"
        aria-label="Navigation principale"
      >
        <Link href="/" className="flex shrink-0 items-center" aria-label="WebTreize - Accueil">
          <Image
            src="/logo-simple.png"
            alt="W13 - WebTreize"
            width={72}
            height={32}
            className="h-7 w-auto object-contain md:h-8"
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

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map(({ id, label }) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => scrollTo(id)}
                className="relative rounded-full px-4 py-2 text-sm font-medium text-slate-400 transition-colors hover:text-white"
              >
                {activeId === id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-white/5 border border-neon/30"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                  />
                )}
                <span className="relative">{label}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <button
            type="button"
            onClick={() => scrollTo('contact')}
            className="rounded-full bg-action px-5 py-2.5 text-sm font-bold text-white shadow-action transition hover:shadow-action-pulse"
          >
            DEVIS GRATUIT
          </button>
        </div>

        <button
          type="button"
          className="min-h-[44px] min-w-[44px] rounded-full border border-white/10 bg-white/5 p-2.5 text-white md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Ouvrir le menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="mx-auto mt-2 max-w-5xl rounded-2xl border border-white/10 bg-void/95 px-4 py-4 backdrop-blur-xl md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {LINKS.map(({ id, label }) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => { scrollTo(id); setOpen(false); }}
                  className="w-full rounded-xl px-3 py-2.5 text-left text-sm text-slate-300 hover:bg-white/5 hover:text-white"
                >
                  {label}
                </button>
              </li>
            ))}
            <li className="mt-2">
              <button
                type="button"
                onClick={() => { scrollTo('contact'); setOpen(false); }}
                className="w-full rounded-full bg-action py-3 text-sm font-bold text-white"
              >
                DEVIS GRATUIT
              </button>
            </li>
          </ul>
        </motion.div>
      )}
    </header>
  );
}
