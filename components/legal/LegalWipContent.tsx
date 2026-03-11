'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ShieldAlert,
  FileSignature,
  CheckCircle2,
} from 'lucide-react';
import { LogoWebTreize } from '@/components/ui/LogoWebTreize';
import { NoiseOverlay } from '@/components/background/NoiseOverlay';
import { FadeUp } from '@/components/ui/FadeUp';

const LAWYER_THOUGHTS = [
  "Article 1 : Le client est roi, sauf s'il demande du Comic Sans MS.",
  'Recherche de jurisprudence sur les pixels défectueux...',
  'Négociation de l’alinéa 404 : “La page n’a pas été trouvée, votre honneur”.',
  "Remplacement du terme 'Bug' par 'Fonctionnalité inattendue'.",
  'Traduction des Conditions Générales en langage humain... (Échec).',
  "Calcul du préjudice moral d'un serveur qui plante le vendredi à 17h.",
  'Pause café approuvée par le syndicat des algorithmes.',
] as const;

function DraftingTerminal() {
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const currentString = LAWYER_THOUGHTS[textIndex];
    let typingSpeed = isDeleting ? 30 : 70;

    const timeout = setTimeout(() => {
      if (!isDeleting && displayedText !== currentString) {
        setDisplayedText(currentString.substring(0, displayedText.length + 1));
      } else if (isDeleting && displayedText !== '') {
        setDisplayedText(currentString.substring(0, displayedText.length - 1));
      } else if (displayedText === currentString) {
        setIsDeleting(true);
        typingSpeed = 2000;
      } else if (displayedText === '') {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % LAWYER_THOUGHTS.length);
        setProgress((prev) => (prev < 95 ? prev + Math.floor(Math.random() * 5) : 99));
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, textIndex]);

  return (
    <div className="w-full bg-white/60 backdrop-blur-md border border-navy/10 rounded-2xl p-6 md:p-8 font-mono shadow-inner relative overflow-hidden">
      <div className="flex items-center justify-between mb-6 border-b border-navy/10 pb-4">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-emerald-400" />
        </div>
        <div className="text-xs text-navy/40 font-bold uppercase tracking-widest flex items-center gap-2">
          <FileSignature className="w-4 h-4" /> Cabinet W13_Legal_Bot.exe
        </div>
      </div>

      <div className="min-h-[80px] text-sm md:text-base text-navy/80">
        <span className="text-orange font-bold mr-2">&gt;</span>
        {displayedText}
        <span className="animate-pulse font-bold text-orange">_</span>
      </div>

      <div className="mt-8 flex items-center gap-4">
        <div className="text-xs font-bold text-navy/50 w-12 text-right">{progress}%</div>
        <div className="flex-1 h-1.5 bg-navy/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-orange transition-all duration-500 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute top-0 right-0 w-8 h-full bg-white/50 blur-[2px]" />
          </div>
        </div>
      </div>
    </div>
  );
}

function RedactedDocument() {
  const base =
    'bg-navy text-navy rounded px-2 select-none hover:bg-transparent hover:text-navy transition-colors duration-300';

  return (
    <div className="space-y-4 text-navy/70 text-lg leading-relaxed mt-10">
      <p>
        Conformément à la loi n°2004-575 du 21 juin 2004, nous tenons à préciser que{' '}
        <span className={base}>WebTreize est la meilleure agence</span>. Le directeur de la publication est
        actuellement <span className={base}>en train de coder en écoutant de la synthwave</span>.
      </p>
      <p>
        L&apos;hébergement de ce site est assuré de manière{' '}
        <span className={base}>sécurisée et redondante</span>. Toutes les données sont traitées avec le plus grand
        soin, contrairement à <span className={base}>nos concurrents (c&apos;est faux, on les aime bien)</span>.
      </p>
    </div>
  );
}

export function LegalWipContent() {
  return (
    <div className="min-h-screen bg-neutral-bg text-navy font-sans selection:bg-orange/20 selection:text-navy flex flex-col">
      <NoiseOverlay />

      <nav className="w-full py-6 md:py-8 border-b border-navy/5 bg-neutral-bg/80 backdrop-blur-xl fixed top-0 z-40">
        <div className="container mx-auto px-6 max-w-screen-xl flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 text-navy font-bold uppercase tracking-widest text-sm group"
          >
            <div className="w-10 h-10 rounded-full border border-navy/20 flex items-center justify-center group-hover:bg-navy group-hover:text-white transition-colors duration-300">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
            <span className="hidden sm:inline">Retour au site</span>
          </Link>

          <Link
            href="/"
            className="flex items-center gap-3 text-navy/60 hover:text-navy transition-colors group"
            aria-label="WebTreize - Retour accueil"
          >
            <LogoWebTreize decorative className="w-8 h-8 md:w-10 md:h-10 transition-transform group-hover:scale-105" />
            <span className="text-lg md:text-xl font-black tracking-tight">WebTreize</span>
          </Link>
        </div>
      </nav>

      <main className="flex-1 container mx-auto px-6 max-w-4xl pt-40 pb-24 relative z-10 flex flex-col">
        <div className="absolute top-20 left-0 w-full overflow-hidden pointer-events-none select-none z-[-1] opacity-5">
          <h1 className="text-[15vw] font-black tracking-tighter leading-none text-navy whitespace-nowrap">
            DOCUMENT
          </h1>
        </div>

        <FadeUp>
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-orange/20 bg-orange/5 text-orange text-xs font-bold mb-8 uppercase tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange" />
            </span>
            Mise à jour en cours
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-navy leading-[1.1] mb-6">
            Nos développeurs ont été <br /> plus rapides que{' '}
            <span className="text-transparent bg-clip-text stroke-text-navy">nos avocats.</span>
          </h1>

          <p className="text-xl text-navy/60 font-medium leading-relaxed mb-16">
            Les pages des mentions légales, politique de confidentialité et CGV sont actuellement entre les mains de
            notre département juridique. Ils aiment prendre leur temps pour choisir les bons mots.
          </p>
        </FadeUp>

        <FadeUp delay={100}>
          <DraftingTerminal />
        </FadeUp>

        <FadeUp delay={200}>
          <RedactedDocument />
        </FadeUp>

        <FadeUp delay={300} className="mt-20 mb-4">
          <div className="bg-navy rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{ backgroundImage: 'radial-gradient(#ffffff 2px, transparent 2px)', backgroundSize: '32px 32px' }}
            />

            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
              <div className="w-16 h-16 rounded-2xl bg-orange flex items-center justify-center shrink-0">
                <ShieldAlert className="w-8 h-8 text-white" />
              </div>

              <div className="flex-1">
                <h3 className="text-2xl font-black mb-4 flex items-center gap-3">
                  Ce qu&apos;il faut vraiment savoir
                  <CheckCircle2 className="w-6 h-6 text-orange" />
                </h3>
                <div className="space-y-4 text-white/70 font-medium leading-relaxed">
                  <p>
                    Bien que cette page soit une boutade en attendant les documents officiels,{' '}
                    <strong className="text-white">
                      WebTreize prend la sécurité et le droit très au sérieux.
                    </strong>
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      Nous ne revendons <strong className="text-orange">jamais</strong> vos données personnelles.
                    </li>
                    <li>
                      Les cookies utilisés sur ce site sont strictement limités à l&apos;analyse de trafic (anonymisée)
                      et au fonctionnement technique.
                    </li>
                    <li>WebTreize est une entité légale dûment enregistrée en France.</li>
                  </ul>
                  <p className="pt-4 text-sm opacity-80">
                    Pour faire valoir vos droits (RGPD) ou demander des informations légales précises avant la
                    publication finale, contactez notre équipe :{' '}
                    <a
                      href="mailto:contact@webtreize.com"
                      className="text-orange hover:underline font-bold"
                    >
                      contact@webtreize.com
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </main>
    </div>
  );
}

