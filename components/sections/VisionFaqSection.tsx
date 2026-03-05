'use client';

import React, { useState } from 'react';
import { FadeUp } from '@/components/ui/FadeUp';
import { FaqItem } from '@/components/ui/FaqItem';

const FAQ_ITEMS = [
  {
    q: "Comment se déroule la création d'un site ?",
    a: "Audit de vos besoins, conception UX/UI sur-mesure, développement technique optimisé, configuration SEO, puis mise en ligne et formation pour votre autonomie.",
  },
  {
    q: 'Intervenez-vous uniquement à Marseille ?',
    a: "Notre base est à Marseille, mais notre expertise est sans frontière. Nous collaborons avec des entreprises dans toute la francophonie via des process ultra-optimisés.",
  },
  {
    q: 'Quels sont vos tarifs ?',
    a: "Chaque projet est unique. Nous réalisons une proposition sur-mesure adaptée à vos enjeux de rentabilité et à vos objectifs sous 24h ouvrées.",
  },
  {
    q: "Faut-il avoir une idée précise du projet ?",
    a: "Absolument pas. C'est notre métier de traduire vos objectifs commerciaux en stratégie digitale performante. Venez avec un problème, nous construirons la solution.",
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
              className="text-[12vw] sm:text-[5rem] font-black text-white tracking-tighter leading-[0.9] mb-10"
            >
              Bien plus <br />
              qu&apos;une <span className="text-transparent bg-clip-text stroke-text-white">agence.</span>
            </h2>
          </FadeUp>
          <FadeUp delay={100}>
            <p className="text-lg md:text-2xl text-white/70 mb-8 font-light leading-relaxed">
              Le digital est complexe. L&apos;ingénierie n&apos;est que l&apos;outil de base. Nous agissons comme votre{' '}
              <strong className="text-white font-bold">département digital externalisé</strong>, impliqués dans votre
              stratégie globale.
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

        <FadeUp delay={300} className="relative aspect-square w-full max-w-md mx-auto order-1 lg:order-2">
          <div className="w-full h-full rounded-full border-[1px] border-white/20 flex items-center justify-center relative animate-spin-slow">
            <div className="w-[75%] h-[75%] rounded-full border-[2px] border-[#FF4500]/50 border-dashed animate-spin-reverse-slow" />
            <div className="absolute w-[50%] h-[50%] rounded-full bg-gradient-to-tr from-[#001F3F] to-[#FF4500]/20 blur-xl" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-[6rem] font-black text-white tracking-tighter leading-none">360</span>
            <span className="text-white/50 font-bold tracking-[0.2em] uppercase">Approche</span>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

