'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, Users, Mail, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface NavItem {
  id: string;
  name: string;
  url: string;
  icon: LucideIcon;
}

interface NavBarDockProps {
  items: NavItem[];
  activeSection?: string | null;
  cta?: React.ReactNode;
  layoutId?: string;
  variant?: 'default' | 'pill';
  className?: string;
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function NavBarDock({
  items,
  activeSection = null,
  cta,
  layoutId = 'lamp',
  variant = 'default',
  className,
}: NavBarDockProps) {
  const [activeTab, setActiveTab] = useState<string>(items[0]?.id ?? '');

  const effectiveActive = activeSection ?? activeTab;
  const isPill = variant === 'pill';

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div
        className={cn(
          'flex items-center gap-1 sm:gap-3 py-1.5 px-1.5 sm:px-2 rounded-full',
          isPill
            ? 'bg-black shadow-lg'
            : 'bg-void/80 border border-white/10 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.25)]'
        )}
      >
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = effectiveActive === item.id;

          return (
            <a
              key={item.id}
              href={item.url}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(item.id);
                setActiveTab(item.id);
              }}
              className={cn(
                'relative cursor-pointer text-sm font-semibold px-4 sm:px-6 py-2 rounded-full transition-colors',
                isPill
                  ? 'text-slate-300 hover:text-white'
                  : 'text-slate-400 hover:text-neon',
                !isPill && isActive && 'text-neon',
              )}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden flex items-center justify-center">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {!isPill && isActive && (
                <motion.div
                  layoutId={layoutId}
                  className="absolute inset-0 rounded-full -z-10 bg-white/[0.06]"
                  initial={false}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  {/* Petite lumière : petit trait centré au-dessus de l’onglet actif, lueur très contenue */}
                  <div
                    className="absolute left-1/2 top-0 h-px w-5 -translate-x-1/2 -translate-y-full rounded-full bg-neon"
                    style={{ boxShadow: '0 0 4px rgba(0, 194, 255, 0.35)' }}
                    aria-hidden
                  />
                </motion.div>
              )}
            </a>
          );
        })}
        {cta && (
          <div
            className={cn(
              'ml-1 pl-1 flex items-center',
              !isPill && 'border-l border-white/10'
            )}
          >
            {cta}
          </div>
        )}
      </div>
    </div>
  );
}

const NAV_ITEMS: NavItem[] = [
  { id: 'services', name: 'Services', url: '#services', icon: LayoutGrid },
  { id: 'rassurance', name: 'Pourquoi nous', url: '#rassurance', icon: Users },
  { id: 'contact', name: 'Contact', url: '#contact', icon: Mail },
];

export { NAV_ITEMS };
