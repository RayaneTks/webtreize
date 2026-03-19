import React from 'react';
import Link from 'next/link';
import { LogoWebTreize } from '@/components/ui/LogoWebTreize';
import { Mail } from 'lucide-react';
import { SnapchatIcon } from '@/components/ui/SnapchatIcon';
import { CONTACT_EMAIL, SNAPCHAT_URL } from '@/lib/constants';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-navy text-white/70 pt-16 pb-28 md:pt-20 md:pb-10 border-t border-white/10 lg:pb-10"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="container mx-auto px-5 lg:px-12 xl:px-16 max-w-screen-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 mb-12 md:mb-16">

          {/* Brand */}
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2 mb-4">
              <LogoWebTreize className="w-7 h-7 brightness-0 invert" />
              <span className="text-xl font-black tracking-tighter text-white">
                WebTreize<span className="sr-only">Web Treize</span>
              </span>
            </div>
            <p className="text-sm font-medium leading-relaxed max-w-xs mb-6">
              Agence web à Marseille (13). Sites, SEO, fiche Google.
            </p>
            <div className="flex items-center gap-1">
              <a
                href={SNAPCHAT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange transition-colors p-2 -ml-2"
                aria-label="Snapchat"
              >
                <SnapchatIcon className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                aria-label="Email"
                className="hover:text-orange transition-colors p-2"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col items-start md:items-center">
            <div className="flex flex-col items-start gap-1">
              <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-3">Navigation</h3>
              <Link href="#services" className="text-sm font-medium hover:text-white transition-colors py-1.5">Services</Link>
              <Link href="#engagements" className="text-sm font-medium hover:text-white transition-colors py-1.5">Engagements</Link>
              <Link href="#method" className="text-sm font-medium hover:text-white transition-colors py-1.5">Méthode</Link>
              <Link href="#faq" className="text-sm font-medium hover:text-white transition-colors py-1.5">FAQ</Link>
              <Link href="#contact" className="text-sm font-medium hover:text-white transition-colors py-1.5">Contact</Link>
            </div>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-start md:items-end text-left md:text-right">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-3">Contact</h3>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-base font-bold text-white hover:text-orange transition-colors mb-2"
            >
              {CONTACT_EMAIL}
            </a>
            <p className="text-xs font-medium">Réponse sous 48h</p>
            <p className="text-xs font-medium mt-1">Marseille, France</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs font-medium">
            © {currentYear} WebTreize
          </p>
          <div className="flex items-center gap-4 text-xs font-medium">
            <Link href="/legal/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link>
            <Link href="/legal/politique-confidentialite" className="hover:text-white transition-colors">Confidentialité</Link>
            <Link href="/legal/cgv" className="hover:text-white transition-colors">CGV</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
