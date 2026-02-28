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
    <footer className="py-12 border-t border-white/10 bg-[#030303] text-center text-gray-500 relative z-10 pb-28 md:pb-12">
      <div className="container mx-auto px-6 flex flex-col items-center justify-center gap-6">
        <LogoWebTreize className="w-11 h-11 opacity-50" />
        <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium" aria-label="Pied de page">
          {FOOTER_LINKS.map(({ label, href }) => (
            <Link key={label} href={href} className="text-gray-400 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#030303] rounded-sm">
              {label}
            </Link>
          ))}
        </nav>
        <p className="text-xs text-gray-400 font-semibold tracking-wider">
          © {year} WEBTREIZE. TOUS DROITS RÉSERVÉS.
        </p>
      </div>
    </footer>
  );
}
