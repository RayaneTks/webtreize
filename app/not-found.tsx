'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Home,
  TerminalSquare,
  Compass,
  ArrowLeft,
  WifiOff,
} from 'lucide-react';

const TERMINAL_LINES: Array<{ text: string; delay: number; error?: boolean; warning?: boolean }> = [
  { text: "> Initialisation du protocole de recherche...", delay: 500 },
  { text: "> Ping des serveurs situés à Marseille... OK", delay: 1200 },
  { text: "> Localisation de la page demandée... EN COURS", delay: 2000 },
  { text: "> ERREUR FATALE : Page introuvable. (Code: 404)", delay: 3500, error: true },
  {
    text: "> Diagnostic système : La page a sûrement filé prendre l'apéro au Vallon des Auffes.",
    delay: 4500,
    warning: true,
  },
  { text: "> Action recommandée : Demi-tour immédiat.", delay: 6000 },
];

function FakeTerminal() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    TERMINAL_LINES.forEach((line, index) => {
      timers.push(
        setTimeout(() => {
          setVisibleLines((prev) => Math.max(prev, index + 1));
        }, line.delay)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="w-full max-w-2xl bg-[#0a0a0a] rounded-2xl border border-white/10 overflow-hidden shadow-2xl relative group">
      <div className="bg-white/5 px-4 py-3 flex items-center border-b border-white/5">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" aria-hidden />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" aria-hidden />
          <div className="w-3 h-3 rounded-full bg-green-500/80" aria-hidden />
        </div>
        <div className="mx-auto flex items-center gap-2 text-gray-500 text-xs font-mono font-medium">
          <TerminalSquare className="w-4 h-4" aria-hidden /> root@webtreize:~
        </div>
      </div>

      <div className="p-4 md:p-6 font-mono text-xs sm:text-sm md:text-base leading-relaxed min-h-[280px] md:min-h-[250px] w-full flex flex-col justify-end overflow-hidden">
        <div className="space-y-2 mt-auto w-full">
          {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
            <div
              key={i}
              className={`animate-line-fade-in break-words whitespace-normal ${
                line.error ? 'text-red-400 font-bold' : line.warning ? 'text-yellow-400' : 'text-blue-300'
              }`}
            >
              {line.text}
            </div>
          ))}
          {visibleLines === TERMINAL_LINES.length && (
            <div className="text-blue-500 animate-pulse mt-2">_</div>
          )}
        </div>
      </div>

      <div
        className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.02] to-white/0 pointer-events-none"
        aria-hidden
      />
    </div>
  );
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#030303] text-white font-sans overflow-hidden relative flex flex-col">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden opacity-20" aria-hidden>
        <div
          className="absolute inset-0 bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,194,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,194,255,0.2) 1px, transparent 1px)',
          }}
        />
      </div>
      <div className="fixed top-1/4 left-1/4 w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[150px] pointer-events-none" aria-hidden />
      <div className="fixed bottom-1/4 right-1/4 w-[30%] h-[30%] rounded-full bg-red-500/10 blur-[150px] pointer-events-none" aria-hidden />

      <nav className="w-full p-6 flex items-center justify-between relative z-10 max-w-7xl mx-auto">
        <div className="text-2xl font-black tracking-tight text-white/50 flex items-center gap-3">
          <Compass className="w-6 h-6 text-blue-500 animate-spin-slow" aria-hidden />
          WebTreize
        </div>
      </nav>

      <main className="flex-1 w-full px-6 flex flex-col items-center justify-center relative z-10 py-10">
        <div className="relative mb-8 text-center">
          <h1 className="text-[8rem] md:text-[14rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-black/20 relative z-10 select-none">
            404
          </h1>
          <div
            className="absolute inset-0 flex items-center justify-center blur-3xl opacity-50 z-0 text-blue-600"
            aria-hidden
          >
            <span className="text-[8rem] md:text-[14rem] font-black leading-none">404</span>
          </div>
        </div>

        <div className="text-center mb-12 max-w-2xl relative z-10 px-4">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Aïe, aïe, aïe... <br className="md:hidden" /> Vous avez navigué hors zone.
          </h2>
          <p className="text-base md:text-lg text-gray-400 font-medium">
            L&apos;URL que vous cherchez n&apos;existe pas, a été supprimée, ou n&apos;a tout simplement
            jamais existé. Vous avez cassé l&apos;internet (ou alors c&apos;est la faute du stagiaire).
          </p>
        </div>

        <div className="w-full flex justify-center mb-12 relative z-10">
          <FakeTerminal />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md relative z-10">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="flex-1 px-6 py-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" aria-hidden /> Revenir en arrière
          </button>

          <Link
            href="/"
            className="flex-1 px-6 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" aria-hidden /> Retour à l&apos;accueil
          </Link>
        </div>
      </main>

      <footer className="w-full p-6 text-center text-gray-600 text-sm font-medium relative z-10">
        <div className="flex items-center justify-center gap-2">
          <WifiOff className="w-4 h-4" aria-hidden /> Signal perdu quelque part dans le
          Vieux-Port.
        </div>
      </footer>
    </div>
  );
}
