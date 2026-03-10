'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: [0.16, 1, 0.3, 1] as any
    } 
  },
};

export function HeroSection() {
  const scroll = useSmoothScroll();

  return (
    <section
      id="hero"
      className="relative pt-32 pb-16 md:pt-48 md:pb-24 px-5 lg:px-8 min-h-[90vh] flex flex-col justify-center bg-neutral-bg overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute top-0 left-[-20%] w-[140%] h-[140%] opacity-[0.03] animate-grid-drift motion-reduce:animate-none"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-navy) 2px, transparent 2px), linear-gradient(90deg, var(--color-navy) 2px, transparent 2px)',
            backgroundSize: '80px 80px',
            transform: 'rotateX(60deg) rotateZ(45deg)',
          }}
          aria-hidden
        />
        <div className="absolute top-[-20%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-orange blur-[120px] opacity-[0.05]" aria-hidden />
        <div className="absolute bottom-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-navy blur-[150px] opacity-[0.04]" aria-hidden />
      </div>

      <div className="container mx-auto max-w-screen-xl relative z-10 flex flex-col items-center text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center w-full max-w-4xl"
        >
          {/* 1. Badge */}
          <motion.div variants={itemVariants} className="mb-6 md:mb-8">
            <Badge variant="outline" className="bg-white/50 backdrop-blur-sm border-navy/10 py-1.5 px-4 text-xs md:text-sm">
              <span className="mr-2">⚡️</span> Agence indépendante | Audit gratuit en 48h
            </Badge>
          </motion.div>

          {/* 2. H1 */}
          <motion.h1
            variants={itemVariants}
            id="hero-title"
            className="text-navy font-black tracking-tighter leading-[1.05] mb-6 md:mb-8 max-w-3xl uppercase"
            style={{ fontSize: 'clamp(36px, 8vw, 64px)' }}
          >
            Des sites qui <br className="sm:hidden" /> ramènent des clients.
          </motion.h1>

          {/* 3. Sous-titre */}
          <motion.p
            variants={itemVariants}
            className="text-navy/70 font-medium leading-relaxed max-w-2xl mb-10 md:mb-12 text-base md:text-xl"
          >
            Vos futurs clients vous cherchent en ce moment même sur Google. Nous faisons en sorte qu&apos;ils vous trouvent vous, pas vos concurrents. <strong className="font-bold text-navy">Sans bullshit et sans contrat surprise.</strong>
          </motion.p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            {/* 4. CTA Primaire */}
            <motion.div variants={itemVariants} className="w-full sm:w-auto">
              <Button
                variant="default"
                size="lg"
                className="w-full sm:w-auto text-[15px] sm:text-lg"
                onClick={(e) => scroll(e, '#contact')}
              >
                Obtenir mon audit gratuit
              </Button>
            </motion.div>
            
            {/* 5. CTA Secondaire */}
            <motion.div variants={itemVariants} className="w-full sm:w-auto">
              <Button
                variant="ghost"
                size="lg"
                className="w-full sm:w-auto text-[15px] sm:text-lg border-2 border-transparent hover:border-navy/10 hover:bg-white/60"
                onClick={(e) => scroll(e, '#engagements')}
              >
                Voir nos engagements
              </Button>
            </motion.div>
          </div>

          {/* 6. Élément visuel abstrait */}
          <motion.div
            variants={itemVariants}
            className="w-full mt-16 md:mt-24 relative"
          >
            <div className="w-full aspect-[21/9] md:aspect-[21/7] max-h-[300px] rounded-[2rem] bg-white border border-navy/5 shadow-2xl overflow-hidden relative flex items-end justify-center pt-8 px-4 sm:px-12">
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent z-10" />
              <div className="w-full h-full flex items-end justify-between gap-2 sm:gap-4 relative z-0">
                {[40, 30, 60, 50, 85, 75, 100].map((height, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: `${height}%`, opacity: 1 }}
                    transition={{ delay: 0.8 + i * 0.1, duration: 1, ease: 'easeOut' }}
                    className="w-full rounded-t-lg sm:rounded-t-2xl bg-gradient-to-t from-navy to-navy/40"
                    style={{
                      backgroundColor: i === 6 ? 'var(--color-orange)' : undefined,
                      backgroundImage: i === 6 ? 'linear-gradient(to top, var(--color-orange), #ff6b33)' : undefined,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
