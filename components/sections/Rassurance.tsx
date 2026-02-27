'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const ITEMS = [
  'Accompagnement personnalisé',
  'Interlocuteur unique',
  'Solutions adaptées à votre budget',
];

const FAQ_ITEMS = [
  {
    id: 'faq-1',
    question: 'Comment se déroule la création d’un site vitrine ?',
    answer:
      "On définit ensemble vos pages et le contenu dont vous avez besoin, puis nous avançons étape par étape : maquette, mise en forme, mise en ligne. Pour un site vitrine, pas de process lourd — on reste pragmatiques et vous validez au fur et à mesure.",
  },
  {
    id: 'faq-2',
    question: 'Vous intervenez uniquement à Marseille ?',
    answer:
      "Nous sommes basés à Marseille mais accompagnons des clients partout en France. La majorité des échanges se fait à distance (visio, messagerie). Pour les entreprises locales, nous pouvons organiser des rendez-vous en présentiel.",
  },
  {
    id: 'faq-3',
    question: 'Quels sont vos tarifs ?',
    answer:
      "Chaque projet est différent : un site vitrine, une fiche Google optimisée ou une application sur mesure n'ont pas le même périmètre. Nous établissons un devis sur mesure après un échange sur vos objectifs et votre budget. Demandez un devis gratuit sans engagement.",
  },
  {
    id: 'faq-4',
    question: 'Que comprend l’accompagnement après la livraison ?',
    answer:
      "Nous assurons la formation à la prise en main, la mise en ligne et un suivi technique. Selon la formule, nous pouvons inclure des mises à jour, du SEO ou du support. L’objectif : que vous soyez autonome sans être seul.",
  },
  {
    id: 'faq-5',
    question: 'Faut-il déjà avoir une idée précise de mon site ?',
    answer:
      "Non. Beaucoup de nos clients arrivent avec un objectif (plus de visibilité, plus de prises de rendez-vous) sans savoir comment y arriver. Nous les aidons à définir le bon périmètre et à prioriser (site, SEO, fiche Google, etc.).",
  },
];

function MarqueeContent() {
  return (
    <>
      {ITEMS.map((text) => (
        <span
          key={text}
          className="mx-6 flex shrink-0 items-center gap-2 text-slate-300 md:mx-10"
        >
          <span
            className="h-2 w-2 rounded-full bg-neon"
            style={{ boxShadow: '0 0 12px rgba(0, 194, 255, 0.6)' }}
          />
          <span className="text-sm font-medium md:text-base">{text}</span>
        </span>
      ))}
    </>
  );
}

export default function Rassurance() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      id="rassurance"
      ref={ref}
      className="bg-void-light/40 px-4 py-24 sm:py-28 md:py-32"
      aria-labelledby="rassurance-heading"
    >
      <div className="mx-auto max-w-6xl">
        <motion.h2
          id="rassurance-heading"
          className="text-center text-2xl font-black tracking-tighter text-white sm:text-3xl md:text-4xl lg:text-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Un partenaire, pas juste un prestataire.
        </motion.h2>

        <motion.div
          className="relative mt-12 overflow-hidden md:mt-16"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="flex w-max animate-marquee items-center motion-reduce:animate-none">
            <MarqueeContent />
            <MarqueeContent />
            <MarqueeContent />
          </div>
        </motion.div>

        {/* La réponse à vos questions */}
        <motion.div
          className="mx-auto mt-16 max-w-2xl md:mt-20"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-center text-xl font-black tracking-tight text-white sm:text-2xl">
            La réponse à vos questions
          </h3>
          <p className="mt-2 text-center text-sm text-slate-400">
            Quelques points que nos clients nous posent souvent.
          </p>

          <Accordion
            type="single"
            collapsible
            className="mt-8 w-full rounded-2xl border border-white/10 bg-void/60 px-4 py-2 backdrop-blur-sm sm:px-6"
          >
            {FAQ_ITEMS.map((item) => (
              <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger className="py-4 text-left text-base sm:py-5">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="leading-relaxed text-slate-300">{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <p className="mt-6 text-center text-sm text-slate-400">
            Une autre question ?{' '}
            <Link
              href="#contact"
              className="font-medium text-neon transition hover:underline"
            >
              Parlons-en
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
