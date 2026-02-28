'use client';

import React from 'react';
import Link from 'next/link';
import { Globe, MapPin, TrendingUp, Code2, Check, Mail, Globe as GlobeIcon, QrCode } from 'lucide-react';
import { LogoWebTreize } from '@/components/ui/LogoWebTreize';

const SERVICES = [
  { icon: Globe, title: 'Création de site web', desc: 'Un site professionnel qui inspire confiance.', iconBg: 'bg-rose-500/25 border-rose-400/40', iconColor: 'text-rose-400' },
  { icon: MapPin, title: 'Optimisation Fiche Google', desc: 'Plus de visibilité locale, plus d\'appels.', iconBg: 'bg-emerald-500/25 border-emerald-400/40', iconColor: 'text-emerald-400' },
  { icon: TrendingUp, title: 'SEO & Référencement', desc: 'Soyez affichés devant vos concurrents sur Google.', iconBg: 'bg-blue-500/25 border-blue-400/40', iconColor: 'text-blue-400' },
  { icon: Code2, title: 'Applications sur mesure', desc: 'Des solutions adaptées à votre projet.', iconBg: 'bg-violet-500/25 border-violet-400/40', iconColor: 'text-violet-400' },
] as const;

const BENEFITS = [
  'Accompagnement personnalisé',
  'Interlocuteur unique',
  'Solutions adaptées à votre budget',
] as const;

export default function StoryPage() {
  return (
    <div className="h-dvh h-screen w-full flex items-center justify-center overflow-hidden bg-[#0f172a]">
      {/* Flyer 9:16 — format Story Snapchat */}
      <div
        className="relative flex flex-col overflow-hidden shadow-2xl"
        style={{
          width: 'min(100vw, 56.25vh)',
          aspectRatio: '9/16',
          maxHeight: '100dvh',
        }}
      >
        {/* Fond sombre avec ambiance */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,194,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(0,194,255,0.06)_1px,transparent_1px)] bg-[size:2rem_2rem]" />
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/25 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 left-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-[80px]" />
        <div className="absolute top-1/3 left-1/2 w-24 h-24 bg-violet-500/15 rounded-full blur-[60px]" />

        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col p-5 min-h-0">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-4">
            <div className="mb-2 drop-shadow-[0_0_12px_rgba(59,130,246,0.4)]">
              <LogoWebTreize className="w-14 h-14" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-white uppercase mb-0.5">WebTreize</h1>
            <p className="text-[10px] font-bold text-cyan-400 uppercase tracking-[0.2em] mb-3">Votre croissance digitale simplifiée</p>
            <h2 className="text-lg font-black tracking-tight text-white leading-tight mb-2">
              Attirez plus de clients
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                grâce au digital.
              </span>
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed">
              Nous accompagnons particuliers et entreprises dans la création et l&apos;optimisation de leur présence en ligne.
            </p>
          </div>

          {/* Services 2x2 — cartes colorées type glass */}
          <div className="grid grid-cols-2 gap-2 mb-4 flex-shrink-0">
            {SERVICES.map((srv, i) => (
              <div
                key={i}
                className="rounded-xl bg-white/5 border border-white/10 backdrop-blur-md p-2.5 flex flex-col shadow-lg"
              >
                <div className={`w-9 h-9 rounded-xl ${srv.iconBg} border flex items-center justify-center mb-1.5 shadow-inner`}>
                  <srv.icon className={`w-4 h-4 ${srv.iconColor}`} />
                </div>
                <h3 className="text-[10px] font-bold text-white leading-tight mb-0.5">{srv.title}</h3>
                <p className="text-[9px] text-gray-400 leading-snug">{srv.desc}</p>
              </div>
            ))}
          </div>

          {/* Benefits — checkmarks colorés */}
          <div className="flex flex-col gap-1.5 mb-4 flex-shrink-0">
            {BENEFITS.map((benefit, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-emerald-400" />
                </div>
                <span className="text-[11px] text-gray-300 font-medium">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA — orange vif comme l&apos;exemple */}
          <Link
            href="/#contact"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-orange-500 via-rose-500 to-orange-600 text-white font-black text-center text-sm uppercase tracking-wider transition-all active:scale-[0.98] mb-4 shadow-[0_4px_24px_rgba(249,115,22,0.5)] border-0 flex-shrink-0"
          >
            Devis gratuit
          </Link>

          {/* Contact — bloc Snapchat mis en avant */}
          <div className="mt-auto pt-3 border-t border-white/10 space-y-2 flex-shrink-0">
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#FFFC00]/20 border-2 border-[#FFFC00]/50 flex items-center justify-center">
                <QrCode className="w-6 h-6 text-[#FFFC00]" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-gray-400">Ajoutez-nous sur Snapchat</p>
                <p className="text-[10px] text-gray-400">ou Scannez pour nous contacter</p>
                <span className="text-sm font-black text-[#FFFC00]">@WebTreize</span>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 text-[10px]">
              <a href="mailto:contact@webtreize.com" className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors">
                <Mail className="w-3 h-3 text-blue-400" />
                contact@webtreize.com
              </a>
              <a href="https://www.webtreize.com" className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors">
                <GlobeIcon className="w-3 h-3 text-cyan-400" />
                www.webtreize.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
