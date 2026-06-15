"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { href: "/#services" as const, label: "Services" },
  { href: "/#vision" as const, label: "À propos" },
  { href: "/#contact" as const, label: "Contact" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="container-app">
        <nav className="flex items-center justify-between h-20 md:h-24">
          <Link
            href="/"
            className="text-2xl font-bold text-primary tracking-tight hover:opacity-80 transition-opacity"
          >
            WebTreize
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-primary dark:text-neutral-100 font-medium hover:text-accent transition-colors min-h-[44px] flex items-center"
              >
                {link.label}
              </Link>
            ))}
            <Link href="/#contact" className="btn-primary text-sm">
              Démarrer un projet
            </Link>
          </div>

          <button
            className="lg:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-primary dark:text-white"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </div>

      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-white dark:bg-neutral-900 shadow-medium transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="container-app py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-primary dark:text-neutral-100 font-medium py-3 min-h-[44px] flex items-center hover:text-accent transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4">
            <Link
              href="/#contact"
              onClick={() => setIsOpen(false)}
              className="btn-primary w-full block text-center"
            >
              Démarrer un projet
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}