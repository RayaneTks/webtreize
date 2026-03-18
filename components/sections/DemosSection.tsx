'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSmoothScroll } from '@/hooks/useSmoothScroll';
import { Button } from '@/components/ui/Button';
import { FadeUp } from '@/components/ui/FadeUp';
import { cn } from '@/lib/utils';
import { DEMO_SITES, type DemoSite } from '@/lib/data/demoSites';
import { ArrowRight, X, CalendarClock, MapPin, Phone, Sparkles, Search, ShieldCheck, Zap } from 'lucide-react';

function SectorMock({ site }: { site: DemoSite }) {
  // Mock “light” (pas d’images) pour garder la perf.
  const patternStyle = useMemo(() => {
    switch (site.slug) {
      case 'restauration-rapide':
        return {
          backgroundImage:
            'repeating-linear-gradient(45deg, rgba(0,31,63,0.12) 0 8px, transparent 8px 16px)',
        };
      case 'cabinet-avocat':
        return {
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(217,72,15,0.18) 0 1px, transparent 1px 10px)',
        };
      case 'dentaire':
        return {
          backgroundImage:
            'radial-gradient(circle at 25% 25%, rgba(217,72,15,0.25), transparent 40%), radial-gradient(circle at 75% 35%, rgba(0,31,63,0.18), transparent 45%)',
        };
      case 'services-locaux':
      default:
        return {
          backgroundImage:
            'linear-gradient(transparent 0 70%, rgba(0,31,63,0.18) 70% 100%), repeating-linear-gradient(90deg, rgba(0,31,63,0.12) 0 1px, transparent 1px 10px)',
        };
    }
  }, [site.slug]);

  return (
    <div
      className={cn(
        'relative overflow-hidden border-2 border-navy shadow-brutal-sm',
        'bg-cream'
      )}
    >
      <div className="p-4 bg-navy text-white flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">
          maquette
        </span>
        <span className={cn('text-[10px] font-bold uppercase tracking-widest border-2 border-navy px-2 py-0.5', site.theme.badge)}>
          démo
        </span>
      </div>

      <div className={cn('p-4 bg-cream/80', site.theme.mockBg)} style={patternStyle}>
        <div className="bg-white border-2 border-navy p-4 rounded-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="font-display text-navy uppercase leading-none">
              {site.sector}
            </p>
            <span className="text-[10px] font-bold bg-orange text-white border-2 border-navy px-2 py-0.5">
              + conversions
            </span>
          </div>

          <div className="space-y-2">
            <div className="h-2 bg-navy/10 rounded-full w-full" />
            <div className="h-2 bg-navy/10 rounded-full w-11/12" />
            <div className="h-2 bg-navy/10 rounded-full w-8/12" />
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="col-span-1 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-orange" />
              <span className="text-[10px] font-bold text-navy/80">local</span>
            </div>
            <div className="col-span-1 flex items-center gap-2">
              <CalendarClock className="w-3.5 h-3.5 text-orange" />
              <span className="text-[10px] font-bold text-navy/80">délai</span>
            </div>
            <div className="col-span-1 flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-orange" />
              <span className="text-[10px] font-bold text-navy/80">contact</span>
            </div>
          </div>
        </div>

        <div className="mt-3 flex gap-2">
          <div className="flex-1 h-9 border-2 border-navy bg-white rounded-sm" />
          <div className="w-14 h-9 border-2 border-navy bg-orange rounded-sm" />
        </div>
      </div>
    </div>
  );
}

function CompetencyGrid({ site }: { site: DemoSite }) {
  const getIcon = (key: DemoSite['competencies'][number]['key']) => {
    switch (key) {
      case 'design':
        return Sparkles;
      case 'conversion':
        return Zap;
      case 'seo':
        return Search;
      case 'quality':
      default:
        return ShieldCheck;
    }
  };

  return (
    <div className="mt-4 grid grid-cols-2 gap-3">
      {site.competencies.map((c) => {
        const Icon = getIcon(c.key);
        return (
          <div
            key={c.key}
            className="border-2 border-navy bg-white/70 p-3 shadow-[4px_4px_0_rgba(0,31,63,0.12)]"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-orange" strokeWidth={2.5} />
                <p className="text-[10px] font-bold uppercase tracking-widest text-navy">
                  {c.title}
                </p>
              </div>
              <span className={cn('text-[10px] font-bold uppercase tracking-widest border-2 px-2 py-0.5', c.badgeClass)}>
                focus
              </span>
            </div>
            <div className="mt-2 space-y-1">
              {c.bullets.slice(0, 2).map((b, idx) => (
                <p key={idx} className="text-[10px] text-neutral-text/90 font-medium leading-relaxed">
                  - {b}
                </p>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function DemoModal({
  site,
  onClose,
}: {
  site: DemoSite;
  onClose: () => void;
}) {
  const scroll = useSmoothScroll();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-navy/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Démo ${site.sector}`}
      onClick={onClose}
      data-testid="demo-modal"
    >
      <div
        className="w-full sm:max-w-2xl sm:mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span
              className={cn(
                'inline-flex items-center justify-center text-white font-bold border-2 border-navy px-3 py-1 text-xs uppercase tracking-widest',
                site.theme.badge
              )}
            >
              démo
            </span>
            <div>
              <p className="text-white font-display uppercase font-black leading-none">
                {site.sector}
              </p>
              <p className="text-white/70 text-xs font-bold mt-1">
                Aperçu de structure (maquette)
              </p>
            </div>
          </div>

          <button
            type="button"
            className="p-2 rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-orange"
            aria-label="Fermer"
            onClick={onClose}
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <div className="px-4 py-6 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-2 sm:items-start">
            <div className="sm:order-1">
              <div className="bg-cream border-2 border-navy p-4 shadow-brutal-sm">
                <p className="font-display uppercase font-black text-navy mb-2">
                  Ce que ça doit faire
                </p>
                <p className="text-neutral-text font-medium leading-relaxed text-sm">
                  {site.tagline}
                </p>

                <div className="mt-4 space-y-2">
                  {site.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="w-2 h-2 mt-2 bg-orange shrink-0" />
                      <p className="text-navy/80 font-bold text-sm leading-relaxed">
                        {h}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <CompetencyGrid site={site} />
              </div>

              <div className="mt-5 flex gap-3">
                <Button size="lg" className="w-full" onClick={(e) => scroll(e, '#contact')}>
                  Demander une démo pour mon secteur
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="sm:order-2">
              <div className="bg-navy/10 border-2 border-navy p-3">
                <SectorMock site={site} />
              </div>

              <p className="text-white/60 text-xs font-bold uppercase tracking-widest mt-4">
                {site.seoSnippet}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DemosSection() {
  const [selected, setSelected] = useState<DemoSite | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const update = () => {
      const cards = Array.from(el.querySelectorAll('[data-testid^="demo-card-"]')) as HTMLElement[];
      if (cards.length === 0) return;

      const left = el.scrollLeft;
      const widths = cards.map((c) => c.offsetLeft);

      // Proche du bord gauche courant
      let best = 0;
      let bestDist = Infinity;
      for (let i = 0; i < widths.length; i++) {
        const d = Math.abs(widths[i] - left);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      }
      setActiveIndex(best);
    };

    update();
    el.addEventListener('scroll', update, { passive: true });
    return () => el.removeEventListener('scroll', update);
  }, []);

  return (
    <>
      <section id="demos" className="py-24 md:py-32 bg-cream relative overflow-hidden">
        <FadeUp>
          <div className="container mx-auto px-5 lg:px-12 xl:px-16 max-w-screen-xl">
            <div className="flex items-end justify-between gap-6 mb-16">
              <div className="max-w-2xl">
                <span className="inline-block px-4 py-2 border-2 border-navy text-xs font-bold uppercase tracking-[0.15em] text-navy mb-6">
                  Exemples & Démos
                </span>
                <h2 className="font-display text-navy uppercase leading-[0.92]" style={{ fontSize: 'clamp(32px, 5vw, 56px)' }}>
                  On adapte un design
                  <br />
                  à votre secteur.
                </h2>
              </div>
              <div className="hidden lg:block">
                <p className="text-navy/60 font-medium text-sm leading-relaxed max-w-[280px]">
                  Maquettes pré-faites : pour illustrer la structure + la conversion.
                </p>
              </div>
            </div>

            <div
              ref={scrollerRef}
              className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              aria-label="Carrousel de démos par secteur"
            >
              {DEMO_SITES.map((site) => (
                <div
                  key={site.slug}
                  data-testid={`demo-card-${site.slug}`}
                  className="snap-start min-w-[86%] sm:min-w-[70%] md:min-w-[46%]"
                >
                  <div className="border-2 border-navy bg-white p-5 shadow-brutal-sm h-full flex flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-display text-2xl uppercase text-navy leading-none">
                          {site.sector}
                        </p>
                        <p className="text-neutral-text font-medium leading-relaxed mt-3 text-sm">
                          {site.tagline}
                        </p>
                      </div>
                      <span className={cn('text-xs font-bold uppercase tracking-widest border-2 border-navy px-3 py-1 rounded-sm', site.theme.badge)}>
                        démo
                      </span>
                    </div>

                    <div className="mt-5">
                      <SectorMock site={site} />
                    </div>

                    <div className="mt-5 flex gap-3">
                      <Button
                        size="lg"
                        className="w-full"
                        onClick={() => setSelected(site)}
                      >
                        Voir la démo
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 lg:hidden">
              <div className="h-2 bg-navy/15 rounded-full overflow-hidden border-2 border-navy/10">
                <div
                  className="h-full bg-orange transition-[transform] duration-300"
                  style={{ width: `${100 / DEMO_SITES.length}%`, transform: `translateX(${activeIndex * 100}%)` }}
                />
              </div>
              <div className="flex items-center justify-between mt-3">
                <p className="text-navy/60 font-medium text-sm leading-relaxed">
                  {DEMO_SITES[activeIndex]?.sector}
                </p>
                <div className="flex gap-2">
                  {DEMO_SITES.map((s, idx) => (
                    <button
                      key={s.slug}
                      type="button"
                      aria-label={`Aller à la démo ${s.sector}`}
                      className={cn(
                        'w-2.5 h-2.5 rounded-full border-2 transition-colors',
                        idx === activeIndex ? 'bg-orange border-orange' : 'bg-cream border-navy/30'
                      )}
                      onClick={() => {
                        const el = scrollerRef.current;
                        if (!el) return;
                        const cards = Array.from(el.querySelectorAll('[data-testid^="demo-card-"]')) as HTMLElement[];
                        const card = cards[idx];
                        if (!card) return;
                        card.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
                      }}
                    />
                  ))}
                </div>
              </div>

              <p className="mt-4 text-navy/60 font-medium text-sm leading-relaxed">
                Maquettes pré-faites : structure + conversion. Ensuite on adapte à votre activité.
              </p>
            </div>

            <div className="mt-10 hidden lg:block">
              <div className="border-2 border-navy bg-navy text-white p-6 shadow-brutal-orange">
                <p className="font-display uppercase font-black leading-none text-2xl">
                  Mini-promesse
                </p>
                <p className="text-white/80 font-medium mt-3 leading-relaxed">
                  Chaque démo contient les blocs qui font la différence : message, appel à l&apos;action, structure, et référencement local.
                </p>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      {selected && <DemoModal site={selected} onClose={() => setSelected(null)} />}
    </>
  );
}

