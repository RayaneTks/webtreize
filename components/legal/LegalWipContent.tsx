'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Scale, ShieldAlert, FileText, ArrowLeft } from 'lucide-react';
import { StripedTape } from './StripedTape';

const tabs = [
  { id: 'mentions', icon: Scale, label: 'Mentions Légales' },
  { id: 'cgv', icon: FileText, label: 'CGV / CGU' },
  { id: 'privacy', icon: ShieldAlert, label: 'Confidentialité' },
] as const;

export function LegalWipContent() {
  const [activeTab, setActiveTab] = useState<'mentions' | 'cgv' | 'privacy'>('mentions');
  const [jiggle, setJiggle] = useState(false);

  const handleTabClick = (tab: 'mentions' | 'cgv' | 'privacy') => {
    setActiveTab(tab);
    setJiggle(true);
    setTimeout(() => setJiggle(false), 300);
  };

  return (
    <div className="min-h-screen bg-[#030303] text-white font-sans overflow-hidden relative flex flex-col items-center">
      <div
        className="fixed top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-600/10 blur-[150px] pointer-events-none"
        aria-hidden
      />
      <div
        className="fixed bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-yellow-500/5 blur-[150px] pointer-events-none"
        aria-hidden
      />

      <nav className="w-full p-6 flex items-center justify-between relative z-10 max-w-5xl">
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
        >
          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" aria-hidden />
          </div>
          <span className="font-semibold hidden sm:block">Retour au site</span>
        </Link>
        <span className="text-2xl font-black tracking-tight text-white/50">WebTreize</span>
      </nav>

      <div className="w-full mt-8 md:mt-12">
        <StripedTape />
      </div>

      <main className="flex-1 w-full max-w-3xl px-6 py-12 md:py-20 flex flex-col items-center relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-tight">
            Oups... <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Nos avocats sont en PLS.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto font-medium">
            On préfère coder des sites époustouflants plutôt que de rédiger du charabia juridique.
            Mais promis, c&apos;est en cours !
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabClick(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-bold transition-all active:scale-95 duration-200 ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              <tab.icon className="w-5 h-5" aria-hidden />
              {tab.label}
            </button>
          ))}
        </div>

        <div
          className={`w-full bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-xl relative overflow-hidden transition-transform ${jiggle ? 'animate-jiggle' : ''}`}
        >
          <div
            className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 opacity-50"
            aria-hidden
          />

          <div className="flex flex-col items-center text-center">
            <ShieldAlert
              className="w-16 h-16 text-yellow-500 mb-6 drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]"
              aria-hidden
            />
            <h2 className="text-2xl font-bold mb-4">
              Ces documents sont en cours de rédaction légale.
            </h2>
            <div className="bg-black/40 border border-white/5 rounded-2xl p-6 mb-2 text-left text-sm md:text-base text-gray-400 space-y-4">
              <p>
                <strong className="text-white">Ce qu&apos;il faut savoir (version courte) :</strong>
                <br />
                WebTreize est une agence honnête, sérieuse et basée à Marseille. Nous ne revendons
                pas vos données à des entités obscures, et nous respectons le RGPD.
              </p>
              <p className="opacity-70 italic text-xs">
                *Ceci n&apos;est pas un conseil juridique. Ne nous poursuivez pas, on a investi tout
                notre argent dans des licences logicielles et des serveurs de ouf.*
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
