import React from 'react';
import Link from 'next/link';
import { LogoWebTreize } from '@/components/ui/LogoWebTreize';

const FOOTER_LINKS = [
  { label: 'Mentions légales', href: '/legal/mentions-legales' },
  { label: 'Confidentialité', href: '/legal/politique-confidentialite' },
  { label: 'CGV', href: '/legal/cgv' },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="pt-24 pb-32 md:pb-24 bg-white text-center relative z-10">
      <div className="container mx-auto px-6 flex flex-col items-center gap-12">
        <div className="w-full h-px bg-gray-200 mb-8" />

        <LogoWebTreize className="w-10 h-10 opacity-70" />

        <nav className="flex flex-wrap justify-center gap-6 md:gap-12 text-sm font-bold text-[#001F3F]" aria-label="Pied de page">
          {FOOTER_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="hover:text-[#FF4500] transition-colors uppercase tracking-widest focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF4500] focus-visible:ring-offset-2 focus-visible:ring-offset-white rounded-sm"
            >
              {label}
            </Link>
          ))}
        </nav>

        <p className="text-xs text-[#001F3F]/40 font-bold tracking-[0.2em] uppercase">
          © {year} WEBTREIZE. Conçu à Marseille, déployé partout.
        </p>
      </div>
    </footer>
  );
}

