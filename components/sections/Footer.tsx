import Link from "next/link";
import { Mail, Phone } from "lucide-react";

const currentYear = new Date().getFullYear();

const navLinks = [
  { href: "/#services" as const, label: "Services" },
  { href: "/#vision" as const, label: "À propos" },
  { href: "/#contact" as const, label: "Contact" },
];

const legalLinks = [
  { href: "/privacy" as const, label: "Politique de confidentialité" },
  { href: "/terms" as const, label: "Conditions générales" },
];

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container-app py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="text-2xl font-bold tracking-tight hover:opacity-80 transition-opacity inline-block mb-4"
            >
              WebTreize
            </Link>
            <p className="text-neutral-300 text-base max-w-md mb-6">
              Agence digitale basée à Marseille. Nous créons des sites web
              professionnels, optimisons votre présence Google et développons
              des applications sur mesure.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+33400000000"
                className="flex items-center gap-3 text-neutral-300 hover:text-white transition-colors min-h-[44px]"
              >
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>+33 4 00 00 00 00</span>
              </a>
              <a
                href="mailto:contact@webtreize.com"
                className="flex items-center gap-3 text-neutral-300 hover:text-white transition-colors min-h-[44px]"
              >
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>contact@webtreize.com</span>
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Navigation</h3>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-neutral-300 hover:text-white transition-colors min-h-[36px] flex items-center"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Légal</h3>
            <nav className="flex flex-col gap-3">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-neutral-300 hover:text-white transition-colors min-h-[36px] flex items-center"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-neutral-400 text-sm text-center">
            © {currentYear} WebTreize. Tous droits réservés. Agence digitale à
            Marseille.
          </p>
        </div>
      </div>
    </footer>
  );
}