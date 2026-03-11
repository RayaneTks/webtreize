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

          {/* 6. Élément visuel premium (Dashboard Abstrait) */}
          <motion.div
            variants={itemVariants}
            className="w-full mt-16 md:mt-24 relative max-w-5xl mx-auto h-[300px] md:h-[400px] flex items-center justify-center pointer-events-none"
          >
            {/* Main glass card */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="absolute z-20 w-[90%] md:w-[65%] h-[200px] md:h-[280px] bg-white/40 backdrop-blur-2xl border border-white/60 shadow-[0_32px_64px_-12px_rgba(0,31,63,0.1)] rounded-3xl p-4 md:p-6 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-400"></div>
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-amber-400"></div>
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-emerald-400"></div>
                </div>
                <div className="h-5 md:h-6 w-20 md:w-24 bg-white/50 rounded-full"></div>
              </div>
              <div className="flex-1 flex gap-3 md:gap-4">
                <div className="w-1/3 h-full bg-white/40 rounded-xl md:rounded-2xl flex items-end justify-center overflow-hidden relative pb-1">
                  <div className="w-full px-2 flex items-end justify-between gap-1 md:gap-2 h-full">
                    <motion.div initial={{ height: 0 }} animate={{ height: '40%' }} transition={{ delay: 1, duration: 1 }} className="w-full bg-orange/20 rounded-t-sm md:rounded-t-md"></motion.div>
                    <motion.div initial={{ height: 0 }} animate={{ height: '70%' }} transition={{ delay: 1.1, duration: 1 }} className="w-full bg-orange/40 rounded-t-sm md:rounded-t-md"></motion.div>
                    <motion.div initial={{ height: 0 }} animate={{ height: '100%' }} transition={{ delay: 1.2, duration: 1 }} className="w-full bg-orange rounded-t-sm md:rounded-t-md shadow-[0_0_15px_rgba(204,55,0,0.5)]"></motion.div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col gap-2.5 md:gap-3">
                  <div className="h-3 md:h-4 w-3/4 bg-navy/10 rounded-full"></div>
                  <div className="h-3 md:h-4 w-1/2 bg-navy/10 rounded-full"></div>
                  <div className="h-3 md:h-4 w-5/6 bg-navy/10 rounded-full"></div>
                  <div className="mt-auto h-10 md:h-12 w-full bg-white/50 rounded-xl flex items-center px-3 md:px-4">
                     <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-navy/10"></div>
                     <div className="ml-2 md:ml-3 h-2 md:h-3 w-16 md:w-20 bg-navy/20 rounded-full"></div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating side card 1 (Success Indicator) */}
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1, y: [-10, 10, -10] }}
              transition={{ delay: 0.8, opacity: { duration: 0.8 }, y: { repeat: Infinity, duration: 6, ease: "easeInOut" } }}
              className="absolute left-[2%] md:left-[8%] top-[10%] md:top-[15%] z-30 w-[130px] md:w-[180px] bg-navy text-white rounded-2xl p-3 md:p-5 shadow-2xl flex flex-col justify-center gap-2 md:gap-3 border border-white/10"
            >
              <div className="flex items-center gap-2 md:gap-3">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-orange flex items-center justify-center shrink-0">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                </div>
                <div className="flex flex-col gap-1.5 overflow-hidden">
                  <div className="h-2.5 md:h-3 w-16 bg-white/20 rounded-full"></div>
                  <div className="h-2 md:h-2 w-10 bg-white/10 rounded-full"></div>
                </div>
              </div>
            </motion.div>

            {/* Floating side card 2 (Analytics Ring) */}
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1, y: [10, -10, 10] }}
              transition={{ delay: 0.9, opacity: { duration: 0.8 }, y: { repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 } }}
              className="absolute right-[2%] md:right-[8%] bottom-[15%] md:bottom-[20%] z-30 w-[110px] md:w-[150px] aspect-square bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white flex flex-col items-center justify-center gap-3 md:gap-4"
            >
              <div className="relative flex items-center justify-center">
                <svg className="w-12 h-12 md:w-16 md:h-16 transform -rotate-90">
                  <circle cx="50%" cy="50%" r="45%" stroke="currentColor" strokeWidth="10%" fill="none" className="text-navy/5" />
                  <motion.circle 
                    cx="50%" cy="50%" r="45%" 
                    stroke="currentColor" strokeWidth="10%" fill="none" 
                    className="text-orange"
                    strokeDasharray="100"
                    initial={{ strokeDashoffset: 100 }}
                    animate={{ strokeDashoffset: 25 }}
                    transition={{ delay: 1.5, duration: 1.5, ease: "easeOut" }}
                  />
                </svg>
                <span className="absolute text-xs md:text-sm font-bold text-navy">+75%</span>
              </div>
              <div className="h-2 md:h-2.5 w-16 bg-navy/10 rounded-full"></div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
