import React from 'react';
import Link from 'next/link';
import { LogoWebTreize } from '@/components/ui/LogoWebTreize';
import { Mail } from 'lucide-react';

import { SnapchatIcon } from '@/components/ui/SnapchatIcon';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#001233] text-white/70 pt-16 pb-8 md:pt-24 md:pb-12" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="container mx-auto px-5 lg:px-8 max-w-screen-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-20 mb-16 md:mb-24">
          
          {/* Colonne 1 : Marque et Réseaux */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2 mb-6">
              <LogoWebTreize className="w-8 h-8 brightness-0 invert" />
              <span className="text-2xl font-black tracking-tighter text-white">WebTreize</span>
            </div>
            <p className="text-sm font-medium leading-relaxed max-w-xs mb-8">
              L'agence digitale nouvelle génération. Des sites qui génèrent des clients, sans bullshit.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://snapchat.com/add/webtreize" target="_blank" rel="noopener noreferrer" className="hover:text-orange transition-colors" aria-label="Snapchat">
                <SnapchatIcon className="w-6 h-6" />
              </a>
              <a href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@webtreize.com'}`} aria-label="Email" className="hover:text-orange transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Colonne 2 : Liens Rapides */}
          <div className="flex flex-col items-start md:items-center">
            <div className="flex flex-col items-start gap-4">
              <h3 className="text-white font-bold text-lg mb-2">Liens rapides</h3>
              <Link href="#services" className="text-sm font-medium hover:text-orange transition-colors">Nos services</Link>
              <Link href="#engagements" className="text-sm font-medium hover:text-orange transition-colors">Engagements</Link>
              <Link href="#faq" className="text-sm font-medium hover:text-orange transition-colors">F.A.Q</Link>
              <Link href="#contact" className="text-sm font-medium hover:text-orange transition-colors">Nous contacter</Link>
            </div>
          </div>

          {/* Colonne 3 : Contact Direct */}
          <div className="flex flex-col items-start md:items-end text-left md:text-right">
            <div className="flex flex-col items-start md:items-end gap-2">
              <h3 className="text-white font-bold text-lg mb-2">Contact</h3>
              <a href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@webtreize.com'}`} className="text-lg md:text-xl font-bold text-white hover:text-orange transition-colors mb-1">
                {process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@webtreize.com'}
              </a>
              <p className="text-sm font-medium opacity-70">
                Réponse sous 48h garantie
              </p>
            </div>
          </div>
        </div>

        {/* Barre basse */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-medium text-white/80">
            © {currentYear} WebTreize - Conçu et développé par WebTreize
          </p>
          <div className="flex items-center gap-4 text-xs font-medium text-white/80">
            <Link href={"/mentions-legales" as any} className="hover:text-white transition-colors">Mentions légales</Link>
            <span>|</span>
            <Link href={"/cgv" as any} className="hover:text-white transition-colors">CGV</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
