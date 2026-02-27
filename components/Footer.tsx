import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="section-padding pb-6 pt-10">
      <div className="section-max-width border-t border-white/10 pt-6 text-xs text-textSecondary/80">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="font-semibold text-textPrimary">
              WebTreize · Agence digitale
            </p>
            <p>contact@webtreize.com</p>
            <p className="text-[11px] text-textSecondary/70">
              Domaines : webtreize.com · webtreize.fr
            </p>
          </div>

          <div className="flex flex-wrap gap-4 text-[11px] sm:justify-end">
            <Link
              href="/legal/mentions-legales"
              className="transition hover:text-textPrimary"
            >
              Mentions légales
            </Link>
            <Link
              href="/legal/politique-de-confidentialite"
              className="transition hover:text-textPrimary"
            >
              Politique de confidentialité
            </Link>
            <Link
              href="/legal/cgv"
              className="transition hover:text-textPrimary"
            >
              CGV
            </Link>
          </div>
        </div>

        <p className="mt-4 text-[10px] text-textSecondary/60">
          © {new Date().getFullYear()} WebTreize. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}

