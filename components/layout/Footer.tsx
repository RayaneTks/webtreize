import Link from 'next/link';
import { SNAPCHAT_URL, CONTACT_EMAIL } from '@/lib/constants';
import { LogoWebTreize } from '@/components/ui/LogoWebTreize';

const LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'À propos' },
  { href: '/contact', label: 'Contact' },
  { href: '/legal/mentions-legales', label: 'Mentions légales' },
  { href: '/legal/politique-confidentialite', label: 'Confidentialité' },
  { href: '/legal/cgv', label: 'CGV' },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="accent-line" aria-hidden />
      <div className="site-container py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <LogoWebTreize className="h-8 w-auto text-ink" />
            <p className="mt-5 max-w-sm text-sm text-muted leading-relaxed">
              Agence digitale à Marseille. Sites, visibilité, SEO et outils sur mesure pour les
              activités qui veulent être prises au sérieux.
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-subtle">Navigation</p>
            <ul className="mt-5 space-y-3">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="link-subtle text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/#contact" className="link-subtle text-sm font-medium text-accent">
                  Audit gratuit
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-medium text-subtle">Contact</p>
            <ul className="mt-5 space-y-3 text-sm text-muted">
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`} className="link-subtle">
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>Marseille (13), PACA</li>
              <li>
                <a
                  href={SNAPCHAT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-subtle"
                >
                  Snapchat @webtreize
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="hairline-y mt-12" />
        <div className="mt-8 flex flex-col gap-2 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} WebTreize. Tous droits réservés.</p>
          <p>Marseille (13) · PACA</p>
        </div>
      </div>
    </footer>
  );
}
