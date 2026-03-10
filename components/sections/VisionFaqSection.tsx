'use client';

import React, { useState } from 'react';
import { FadeUp } from '@/components/ui/FadeUp';
import { FaqItem } from '@/components/ui/FaqItem';

const FAQ_ITEMS = [
  {
    q: "Comment se déroule la création d'un site ?",
    a: "On définit ensemble vos pages et le contenu dont vous avez besoin, puis nous avançons étape par étape : maquette, développement technique optimisé, configuration SEO, puis mise en ligne et formation pour votre autonomie. Vous validez au fur et à mesure.",
  },
  {
    q: 'Intervenez-vous uniquement à Marseille ?',
    a: "Nous sommes basés à Marseille mais accompagnons des clients partout en France. La majorité des échanges se fait à distance (visio, messagerie). Pour les entreprises locales, nous organisons des rendez-vous en présentiel.",
  },
  {
    q: 'Quels sont vos tarifs ?',
    a: "Chaque projet est différent : un site vitrine, une fiche Google optimisée ou une application sur mesure n'ont pas le même périmètre. Nous établissons un devis sur mesure après un échange sur vos objectifs et votre budget. Demandez un devis gratuit sans engagement.",
  },
  {
    q: "Pourquoi passer par WebTreize plutôt qu'un freelance ou une autre agence ?",
    a: "Nous combinons stratégie marketing, expertise technique et connaissance du terrain local. Un seul interlocuteur, une vision globale de votre croissance digitale, du site web à la fiche Google en passant par votre image de marque.",
  },
  {
    q: "Faut-il avoir une idée précise du projet ?",
    a: "Non. Beaucoup de nos clients arrivent avec un objectif (plus de visibilité, plus de prises de rendez-vous) sans savoir comment y arriver. Nous les aidons à définir le bon périmètre et à prioriser.",
  },
] as const;

export function VisionFaqSection() {
  const [openFaq, setOpenFaq] = useState<number>(0);

  return (
    <section
      id="vision"
      className="py-32 md:py-48 bg-[#001F3F] relative overflow-hidden px-4 sm:px-6"
      aria-labelledby="vision-title"
    >
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 2px, transparent 2px)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden
      />

      <div className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center relative z-10">
        <div className="flex flex-col order-2 lg:order-1">
          <FadeUp>
            <h2
              id="vision-title"
              className="text-[9vw] sm:text-[3.5rem] md:text-[4.5rem] font-black text-white tracking-tighter leading-[0.9] mb-10"
            >
              Bien plus <br />
              qu&apos;une <span className="text-transparent bg-clip-text stroke-text-white">agence.</span>
            </h2>
          </FadeUp>
          <FadeUp delay={100}>
            <p className="text-lg md:text-2xl text-white/70 mb-8 font-light leading-relaxed">
              Le digital ne se résume pas à un site web. Visibilité locale, référencement, image de marque, acquisition
              : nous pilotons l&apos;ensemble de votre présence en ligne comme votre{' '}
              <strong className="text-white font-bold">département digital externalisé</strong>.
            </p>
          </FadeUp>

          <FadeUp delay={200}>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-xl shadow-2xl">
              <h3 className="text-2xl font-bold mb-6 text-white">Questions fréquentes</h3>
              <div className="flex flex-col" role="list" aria-label="Questions fréquentes">
                {FAQ_ITEMS.map((faq, i) => (
                  <FaqItem
                    key={i}
                    id={`faq-${i}`}
                    question={faq.q}
                    answer={faq.a}
                    isOpen={openFaq === i}
                    onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  />
                ))}
              </div>
            </div>
          </FadeUp>
        </div>

        <FadeUp delay={300} className="relative w-full max-w-md mx-auto order-1 lg:order-2">
          <div className="relative aspect-square flex items-center justify-center">
            {/* Dot grid background */}
            <div
              className="absolute inset-0 opacity-[0.08]"
              style={{
                backgroundImage: 'radial-gradient(#FF4500 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
              aria-hidden
            />
            {/* Outer glow ring */}
            <div className="absolute inset-[10%] rounded-full border border-white/10" aria-hidden />
            <div className="absolute inset-[20%] rounded-full border border-white/[0.06]" aria-hidden />
            {/* Central glassmorphism card */}
            <div className="relative z-10 w-48 h-48 md:w-56 md:h-56 rounded-3xl bg-white/[0.07] backdrop-blur-xl border border-white/15 flex flex-col items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]">
              <span className="text-[4.5rem] md:text-[5.5rem] font-black text-white tracking-tighter leading-none">360</span>
              <span className="text-white/40 font-bold tracking-[0.25em] uppercase text-xs mt-1">Approche</span>
              <div className="absolute -top-px left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-[#FF4500]/60 to-transparent" aria-hidden />
            </div>
            {/* Floating metric cards */}
            <div className="absolute top-[8%] left-[5%] px-4 py-2.5 rounded-xl bg-white/[0.07] backdrop-blur-md border border-white/10 text-white/80 text-xs font-bold shadow-lg">
              Audit
            </div>
            <div className="absolute top-[12%] right-[2%] px-4 py-2.5 rounded-xl bg-white/[0.07] backdrop-blur-md border border-white/10 text-white/80 text-xs font-bold shadow-lg">
              UX / UI
            </div>
            <div className="absolute bottom-[12%] left-[2%] px-4 py-2.5 rounded-xl bg-white/[0.07] backdrop-blur-md border border-white/10 text-white/80 text-xs font-bold shadow-lg">
              Dev
            </div>
            <div className="absolute bottom-[8%] right-[5%] px-4 py-2.5 rounded-xl bg-[#FF4500]/20 backdrop-blur-md border border-[#FF4500]/30 text-[#FF4500] text-xs font-bold shadow-lg">
              SEO
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
