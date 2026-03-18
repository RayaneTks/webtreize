'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Home, TerminalSquare, ArrowLeft } from 'lucide-react';
import { LogoWebTreize } from '@/components/ui/LogoWebTreize';
import { Button, buttonVariants } from '@/components/ui/Button';
import { NoiseOverlay } from '@/components/background/NoiseOverlay';
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
    <div className="min-h-screen bg-neutral-bg text-navy font-sans flex flex-col selection:bg-orange/20 relative overflow-hidden">
      <NoiseOverlay />
      
      <nav className="w-full p-6 flex items-center justify-between relative z-10 max-w-7xl mx-auto">
        <Link
          href="/"
          className="flex items-center gap-3 text-navy/60 hover:text-navy transition-colors group"
          aria-label="WebTreize - Retour accueil"
        >
          <LogoWebTreize decorative className="w-10 h-10 md:w-12 md:h-12 transition-transform group-hover:scale-105" />
          <span className="text-2xl font-black tracking-tight">WebTreize</span>
        </Link>
      </nav>

      <main className="flex-1 w-full px-6 flex flex-col items-center justify-center relative z-10 py-10">
        <div className="relative mb-8 text-center">
          <h1 className="text-[8rem] md:text-[14rem] font-black leading-none tracking-tighter stroke-text-navy select-none">
            404
          </h1>
        </div>

        <div className="text-center mb-12 max-w-2xl px-4">
          <h2 className="text-2xl md:text-4xl font-black mb-4 text-navy">
            Vous avez navigué hors zone.
          </h2>
          <p className="text-base md:text-lg text-navy/60 font-medium">
            L&apos;URL que vous cherchez n&apos;existe pas ou a été supprimée. Pas de panique, on vous ramène.
          </p>
        </div>

        <div className="w-full flex justify-center mb-12">
          <FakeTerminal />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center">
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
            className="flex-1 gap-2"
          >
            <ArrowLeft className="w-5 h-5" aria-hidden="true" /> Revenir
          </Button>
          <Link
            href="/"
            className={cn(buttonVariants({ variant: 'default', size: 'lg' }), 'flex-1 gap-2')}
          >
            <Home className="w-5 h-5" aria-hidden="true" /> Accueil
          </Link>
        </div>
      </main>

      <footer className="w-full p-6 text-center text-navy/30 text-sm font-bold uppercase tracking-widest relative z-10">
        Signal perdu quelque part dans le Vieux-Port.
      </footer>
    </div>
  );
}
