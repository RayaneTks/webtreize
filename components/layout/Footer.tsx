'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/ui/Logo';
import { CONTACT_EMAIL, SNAPCHAT_URL } from '@/lib/constants';
import { NAV_ITEMS } from '@/lib/data/site';

const LEGAL = [
  { label: 'Mentions légales', href: '/legal/mentions-legales' },
  { label: 'Confidentialité', href: '/legal/politique-confidentialite' },
  { label: 'CGV', href: '/legal/cgv' },
] as const;

export function Footer() {
  const pathname = usePathname();
  const anchor = (href: string) => (pathname === '/' ? href : `/${href}`);

  return (
    <footer className="bg-surface pb-8 pt-[clamp(3.25rem,6vw,5rem)]">
      <div className="site-container">
        <div className="flex flex-wrap justify-between gap-10">
          <div className="max-w-[20rem] flex-[1_1_16rem]">
            <Logo />
            <p className="mt-3.5 text-[0.9375rem] leading-[1.7] text-muted">
              Studio digital à Marseille. Sites, visibilité locale et outils sur mesure pour les
              entreprises du 13.
            </p>
          </div>

          <div className="grid content-start gap-3">
            <p className="eyebrow">Le studio</p>
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={anchor(item.href)} className="text-[0.9375rem] text-muted transition-colors hover:text-accent">
                {item.label}
              </a>
            ))}
          </div>

          <div className="grid content-start gap-3">
            <p className="eyebrow">Contact</p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-[0.9375rem] text-muted transition-colors hover:text-accent">
              {CONTACT_EMAIL}
            </a>
            <a
              href={SNAPCHAT_URL}
              target="_blank"
              rel="noreferrer"
              className="text-[0.9375rem] text-muted transition-colors hover:text-accent"
            >
              Snapchat @webtreize
            </a>
            <span className="text-[0.9375rem] text-muted">Marseille 13, France</span>
          </div>
        </div>

        <div className="mt-[clamp(2.5rem,5vw,4rem)] flex flex-wrap items-center justify-between gap-4 border-t border-line-soft pt-5.5">
          <span className="text-[0.84375rem] text-subtle">© {new Date().getFullYear()} WebTreize</span>
          <div className="flex flex-wrap gap-6">
            {LEGAL.map((item) => (
              <Link key={item.href} href={item.href} className="text-[0.84375rem] text-subtle transition-colors hover:text-accent">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
