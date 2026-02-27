'use client';

import { useRef, useState, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { MonitorSmartphone, MapPin, Search, AppWindow, type LucideIcon } from 'lucide-react';

const SERVICES: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: MonitorSmartphone,
    title: 'Création de Site Web',
    description: 'Un site professionnel qui inspire confiance et convertit vos visiteurs en clients.',
  },
  {
    icon: MapPin,
    title: 'Optimisation Fiche Google',
    description: 'Plus de visibilité locale, plus d\'appels et de passages en boutique.',
  },
  {
    icon: Search,
    title: 'SEO & Référencement',
    description: 'Soyez affichés devant vos concurrents sur Google.',
  },
  {
    icon: AppWindow,
    title: 'Applications sur mesure',
    description: 'Des solutions adaptées à votre projet et à vos processus.',
  },
];

function SpotlightCard({
  icon: Icon,
  title,
  description,
  className = '',
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [xy, setXy] = useState({ x: 50, y: 50 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setXy({ x, y });
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setXy({ x: 50, y: 50 })}
      className={`group relative overflow-hidden rounded-2xl border border-white/15 bg-white/[0.06] p-6 shadow-xl transition duration-300 hover:border-neon/25 sm:p-8 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${xy.x}% ${xy.y}%, rgba(0, 194, 255, 0.08), transparent 40%)`,
        }}
      />
      <div className="relative">
        <span
          className="inline-flex rounded-xl p-3"
          style={{ boxShadow: '0 0 24px rgba(0, 194, 255, 0.2)' }}
        >
          <Icon className="h-6 w-6 text-neon" strokeWidth={1.8} />
        </span>
        <h3 className="mt-5 text-xl font-black tracking-tight text-white">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-slate-300">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section
      id="services"
      ref={ref}
      className="bg-void-depth/50 px-4 py-16 sm:py-20 md:px-6 md:py-28"
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-8 backdrop-blur-sm sm:px-6 sm:py-10 md:px-10 md:py-12">
        <motion.header
          className="mb-16 text-center md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 id="services-heading" className="text-3xl font-black tracking-tighter text-white md:text-4xl lg:text-5xl">
            Nos services
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400 leading-relaxed">
            Tout ce dont vous avez besoin pour être visible en ligne.
          </p>
        </motion.header>

        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <SpotlightCard {...SERVICES[0]} />
          <SpotlightCard {...SERVICES[1]} />
          <SpotlightCard {...SERVICES[2]} className="sm:col-span-2" />
          <SpotlightCard {...SERVICES[3]} className="sm:col-span-2" />
        </motion.div>
      </div>
    </section>
  );
}
