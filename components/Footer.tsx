import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/15 bg-void-depth/30 px-4 py-10 md:px-6 md:py-14" role="contentinfo">
      <div className="mx-auto max-w-6xl flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-white">WebTreize · Agence digitale</p>
          <p className="text-sm text-slate-400">contact@webtreize.com</p>
          <p className="text-xs text-slate-500">webtreize.com · webtreize.fr</p>
        </div>
        <nav className="flex flex-wrap gap-6 text-sm text-slate-400" aria-label="Pied de page">
          <Link href="/legal/mentions-legales" className="hover:text-white transition-colors">
            Mentions légales
          </Link>
          <Link href="/legal/politique-de-confidentialite" className="hover:text-white transition-colors">
            Politique de confidentialité
          </Link>
          <Link href="/legal/cgv" className="hover:text-white transition-colors">
            CGV
          </Link>
        </nav>
      </div>
      <p className="mx-auto mt-8 max-w-6xl text-xs text-slate-500">
        © {new Date().getFullYear()} WebTreize. Tous droits réservés.
      </p>
    </footer>
  );
}
