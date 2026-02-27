'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

const navItems: { label: string; href: string }[] = [
  { label: 'Services', href: '#services' },
  { label: 'Pourquoi WebTreize', href: '#rassurance' },
  { label: 'Contact', href: '#contact' },
];

function scrollToId(id: string) {
  if (typeof window === 'undefined') return;
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export default function Header() {
  const [open, setOpen] = useState(false);

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      const id = href.replace('#', '');
      scrollToId(id);
    }
    setOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="section-padding py-3">
        <nav className="section-max-width glass-card glass-card-hover flex items-center justify-between border-white/20 bg-black/30 px-4 py-2">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Logo WebTreize - Votre croissance digitale simplifiée"
              width={190}
              height={70}
              className="h-10 w-auto object-contain drop-shadow-lg"
              priority
            />
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <div className="flex items-center gap-6 text-xs font-medium text-textSecondary">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => handleNavClick(item.href)}
                  className="transition hover:text-textPrimary"
                >
                  {item.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => handleNavClick('#contact')}
              className="cta-button-primary flex items-center gap-2 text-xs"
            >
              <Sparkles className="h-4 w-4" />
              <span>Devis gratuit</span>
            </button>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-black/30 p-2 text-textPrimary shadow-md md:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Ouvrir le menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </div>

      {open && (
        <div className="section-padding pt-0 md:hidden">
          <div className="section-max-width glass-card border-t border-white/5 bg-black/40 px-4 py-3">
            <div className="flex flex-col gap-3 text-sm font-medium text-textSecondary">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => handleNavClick(item.href)}
                  className="rounded-lg px-2 py-2 text-left transition hover:bg-white/5 hover:text-textPrimary"
                >
                  {item.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => handleNavClick('#contact')}
              className="mt-4 w-full cta-button-primary flex items-center justify-center gap-2 text-sm"
            >
              <Sparkles className="h-4 w-4" />
              <span>Devis gratuit</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

