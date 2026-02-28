'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { X, ArrowRight, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  icon: LucideIcon;
  title: string;
  desc: string;
  bullets?: readonly string[];
}

export function ServiceModal({
  isOpen,
  onClose,
  icon: Icon,
  title,
  desc,
  bullets = [],
}: ServiceModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* Modal — panneau digital style terminal */}
      <div
        ref={modalRef}
        className={cn(
          'relative w-full max-w-lg rounded-2xl overflow-hidden',
          'border border-white/10',
          'bg-gradient-to-b from-[#0a0f1a] to-[#05080d]',
          'shadow-[0_0_0_1px_rgba(0,194,255,0.15),0_25px_80px_-12px_rgba(0,0,0,0.8),0_0_60px_-20px_rgba(0,194,255,0.2)]',
          'animate-modal-in'
        )}
      >
        {/* Ligne cyan animée en haut — effet scan */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent animate-pulse" aria-hidden />

        {/* Header type fenêtre */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
          <div className="flex gap-2" aria-hidden>
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 -m-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenu */}
        <div className="p-6 md:p-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600/40 to-cyan-500/30 border border-blue-500/30 flex items-center justify-center mb-6 shadow-[inset_0_0_30px_rgba(59,130,246,0.15)]">
            <Icon className="w-8 h-8 text-cyan-400" />
          </div>
          <h2 id="modal-title" className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight">
            {title}
          </h2>
          <p className="text-gray-400 leading-relaxed mb-6">{desc}</p>
          {bullets.length > 0 && (
            <ul className="space-y-3 mb-8">
              {bullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" aria-hidden />
                  <span className="text-gray-300 text-sm md:text-base">{bullet}</span>
                </li>
              ))}
            </ul>
          )}
          <Link
            href="/#contact"
            onClick={onClose}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm transition-all active:scale-95 shadow-[0_0_25px_rgba(37,99,235,0.3)]"
          >
            Obtenir un devis <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
