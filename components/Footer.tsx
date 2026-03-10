import React from 'react';
import Link from 'next/link';
import { LogoWebTreize } from '@/components/ui/LogoWebTreize';
import { Mail } from 'lucide-react';

const SnapchatIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M12.13 2.01c-3.12.02-4.99 1.98-5.26 4.7-.12 1.24-.04 2.5.21 3.73.11.53.3 1.04.57 1.51.34.6.68 1.18 1.03 1.77.25.43.37.91.31 1.41-.04.34-.14.67-.32.96-.2.32-.47.58-.8.74-.29.14-.59.21-.91.2-.42 0-.83.05-1.23.16-.58.16-1.12.44-1.57.82l-.08.08c-.78.85-1.89 1.28-3.04 1.18-.36-.04-.69.09-.96.34-.23.21-.35.53-.32.84.05.6.36 1.14.86 1.48 1.09.73 2.37.89 3.65.46a7.7 7.7 0 002.32-1.22c.16-.11.33-.2.5-.28a2.53 2.53 0 012.39.26c.21.13.43.25.64.38.74.45 1.54.78 2.38.96.65.14 1.31.18 1.97.13.59-.04 1.17-.16 1.73-.35.79-.27 1.47-.79 1.95-1.46.21-.29.81-1.01 1.07-1.3l.03-.02a6.47 6.47 0 001.07-2.61c.06-.2.12-.4.18-.6.1-.28.26-.52.48-.71.18-.16.4-.26.63-.3.33-.06.66-.08.99-.06.62.03 1.22-.16 1.7-.58.19-.16.32-.39.36-.64.04-.32-.07-.64-.28-.88a2.57 2.57 0 00-1.87-.72c-.75-.02-1.49-.17-2.18-.46-.35-.14-.66-.36-.91-.65-.3-.34-.49-.75-.54-1.2-.04-.42.02-.85.19-1.24.4-.9 1.06-1.58 1.83-2.11 1.36-.93 2.14-2.43 2.16-4.08.01-1.44-.6-2.84-1.7-3.75-1.07-.88-2.5-1.34-4.02-1.31-1.08.02-2.15.22-3.15.61-.3.12-.61.18-.94.18z"/>
  </svg>
);

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
              <LogoWebTreize className="w-8 h-8 text-white" />
              <span className="text-2xl font-black tracking-tighter text-white">WebTreize</span>
            </div>
            <p className="text-sm font-medium leading-relaxed max-w-xs mb-8">
              L'agence digitale nouvelle génération. Des sites qui génèrent des clients, sans bullshit.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://snapchat.com/add/webtreize" target="_blank" rel="noopener noreferrer" className="hover:text-orange transition-colors" aria-label="Snapchat">
                <SnapchatIcon className="w-5 h-5" />
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
          <p className="text-xs font-medium opacity-60">
            © {currentYear} WebTreize - Conçu et développé par WebTreize
          </p>
          <div className="flex items-center gap-4 text-xs font-medium opacity-60">
            <Link href={"/mentions-legales" as any} className="hover:text-white transition-colors">Mentions légales</Link>
            <span>|</span>
            <Link href={"/cgv" as any} className="hover:text-white transition-colors">CGV</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
