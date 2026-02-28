'use client';

import React, { useState } from 'react';
import { Reveal } from '@/components/ui/Reveal';
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
    <section id="vision" className="py-24 md:py-40 px-4 sm:px-6 relative bg-white/[0.01] border-t border-white/5" aria-labelledby="vision-title">
      <div className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div className="sticky top-32">
          <Reveal direction="right">
            <h2 id="vision-title" className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-[1.1]">
              Un partenaire,<br /> pas juste un prestataire.
            </h2>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              Le digital est complexe. Notre rôle est de filtrer ce bruit technique pour vous livrer une mélodie de performance. Nous investissons dans votre réussite à long terme.
            </p>
            <div className="flex gap-4" aria-hidden>
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold border border-blue-500/20">
                W
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold border border-blue-500/20">
                1
              </div>
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold border border-blue-500/20">
                3
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal direction="left" delay={200}>
          <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-6 md:p-10 backdrop-blur-xl shadow-2xl">
            <h3 className="text-2xl font-bold mb-8 text-white">Questions Fréquentes</h3>
            <div className="flex flex-col" role="list">
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
        </Reveal>
      </div>
    </section>
  );
}
