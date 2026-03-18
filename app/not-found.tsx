'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, TerminalSquare, ArrowLeft } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Button, buttonVariants } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const TERMINAL_LINES: Array<{ text: string; delay: number; error?: boolean; warning?: boolean }> = [
  { text: '> Initialisation du protocole de recherche...', delay: 500 },
  { text: '> Ping des serveurs situés à Marseille... OK', delay: 1200 },
  { text: '> Localisation de la page demandée... EN COURS', delay: 2000 },
  { text: '> ERREUR FATALE : Page introuvable. (Code: 404)', delay: 3500, error: true },
  {
    text: "> Diagnostic : La page a sûrement filé prendre l'apéro au Vallon des Auffes.",
    delay: 4500,
    warning: true,
  },
  { text: '> Action recommandée : Demi-tour immédiat.', delay: 6000 },
];

function FakeTerminal() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    TERMINAL_LINES.forEach((line, index) => {
      timers.push(
        setTimeout(() => setVisibleLines((prev) => Math.max(prev, index + 1)), line.delay)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="w-full max-w-2xl bg-white/60 backdrop-blur-md rounded-2xl border border-navy/10 overflow-hidden shadow-xl">
      <div className="bg-white/80 px-4 py-3 flex items-center border-b border-navy/10">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400" aria-hidden="true" />
          <div className="w-3 h-3 rounded-full bg-amber-400" aria-hidden="true" />
          <div className="w-3 h-3 rounded-full bg-emerald-400" aria-hidden="true" />
        </div>
          <div className="mx-auto flex items-center gap-2 text-navy/40 text-xs font-mono font-bold">
          <TerminalSquare className="w-4 h-4" aria-hidden="true" /> root@webtreize:~
        </div>
      </div>
      <div className="p-4 md:p-6 font-mono text-xs sm:text-sm md:text-base leading-relaxed min-h-[250px] flex flex-col justify-end">
        <div className="space-y-2 mt-auto">
          {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
            <div
              key={i}
              className={`animate-line-fade-in break-words whitespace-normal font-medium ${
                line.error
                  ? 'text-red-500 font-bold'
                  : line.warning
                    ? 'text-orange font-bold'
                    : 'text-navy/70'
              }`}
            >
              {line.text}
            </div>
          ))}
          {visibleLines === TERMINAL_LINES.length && (
            <div className="text-orange animate-pulse mt-2 font-bold">_</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream text-navy overflow-x-clip">
      <Navbar />
      <main className="relative z-10 pt-28 pb-20 md:pt-36">
        <section className="container mx-auto px-5 lg:px-12 xl:px-16 max-w-screen-xl">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            <div>
              <div className="inline-flex items-center gap-3 mb-7">
                <span className="px-4 py-2 bg-orange text-white text-xs font-bold uppercase tracking-[0.15em] border-2 border-navy">
                  Erreur
                </span>
                <span className="text-sm font-bold text-neutral-text">Page introuvable</span>
              </div>

              <h1
                className="font-display text-navy uppercase leading-[0.9] mb-5"
                style={{ fontSize: 'clamp(44px, 9vw, 96px)' }}
              >
                404
                <br />
                <span className="stroke-text-navy">hors zone</span>
              </h1>

              <p className="text-lg md:text-xl text-neutral-text font-medium leading-relaxed max-w-xl mb-10">
                L&apos;URL que vous cherchez n&apos;existe pas (ou a pris l&apos;apéro au Vallon des Auffes).
                On vous ramène sur la route.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => window.history.back()}
                  className="gap-2"
                >
                  <ArrowLeft className="w-5 h-5" aria-hidden="true" /> Revenir
                </Button>
                <Link
                  href="/"
                  className={cn(buttonVariants({ variant: 'default', size: 'lg' }), 'gap-2')}
                >
                  <Home className="w-5 h-5" aria-hidden="true" /> Accueil
                </Link>
              </div>
            </div>

            <div className="lg:pt-10">
              <div className="bg-navy p-5 md:p-7 border-2 border-navy shadow-brutal-orange">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-white/70 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                    <TerminalSquare className="w-4 h-4" aria-hidden="true" />
                    diagnostic
                  </div>
                  <span className="bg-orange text-white text-xs font-bold px-2.5 py-1 border-2 border-navy">
                    404
                  </span>
                </div>
                <FakeTerminal />
                <p className="mt-4 text-white/50 text-xs font-bold uppercase tracking-widest">
                  Signal perdu quelque part dans le Vieux-Port.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
