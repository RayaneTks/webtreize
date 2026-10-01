'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { clsx } from 'clsx';
import { Button } from '@/components/ui/Button';
import { LogoLink } from '@/components/ui/Logo';
import { CONTACT_EMAIL } from '@/lib/constants';
import { HEADER_ITEMS, NAV_ITEMS } from '@/lib/data/site';

/**
 * Barre de navigation du site.
 *
 * Îlot client autorisé par le SPEC 4.3 : il porte le menu mobile et l’état de
 * défilement, deux états qui n’existent pas côté serveur.
 *
 * ## Ce que la navigation dessert
 *
 * Trois routes réelles — `/services`, `/about`, `/contact` — rendues en
 * `next/link`, plus le bouton « Audit gratuit » vers `/contact`. Les ancres de
 * l’accueil sont descendues dans le plan du footer : tant qu’elles occupaient
 * la barre, `/services` et `/about` n’avaient aucun lien entrant dans tout le
 * site (finding critique « seo-pages-orphelines »).
 *
 * ## État de défilement
 *
 * Au-delà de {@link SCROLL_THRESHOLD} pixels, la barre se replie en pilule :
 * 54 rem au plus, matériau blanc chaud translucide, filet `line`. La hauteur du header
 * reste constante (`--header-height`) : rien ne décale la page. Le flou reste
 * contenu dans le matériau chaud et aucune ombre n’est ajoutée.
 *
 * L’écoute est passive et ne lit `scrollY` que dans une frame d’animation :
 * aucune mesure de géométrie (`getBoundingClientRect`) n’est faite au
 * défilement, donc aucune remise en page forcée.
 *
 * ## Menu mobile
 *
 * Fermé, le panneau porte `inert` **et** `invisible` : ses liens sortent de
 * l’ordre de tabulation et de l’arbre d’accessibilité. C’était le finding
 * critique « a11y-menu-mobile-focusable-ferme » — cinq liens focalisables à
 * opacité zéro. `invisible` couvre les navigateurs antérieurs à `inert` ; la
 * contrepartie assumée est que la fermeture est instantanée, seule l’ouverture
 * est animée. Ouvert, le panneau piège le focus, se ferme sur Échap et rend le
 * focus à son déclencheur.
 *
 * ## Zone de respiration du logotype (charte §4)
 *
 * La barre fait 60 px et le logotype 19 px de cadratin, posé en `leading-none`
 * par `components/ui/Logo.tsx` : il reste 20,5 px au-dessus et au-dessous, soit
 * plus que la hauteur du mot. Horizontalement, la gouttière de `.site-container`
 * (20 px) et l’écart vers la navigation (`gap-gap-sm`, 20 px au minimum) tiennent
 * la même règle. Ne rien ajouter ici qui réduise l’un ou l’autre.
 *
 * Composition par `clsx` et non `cn` : `tailwind-merge` ignore l’échelle
 * typographique du projet et supprimerait une classe sur deux dans les
 * compositions « taille + couleur ». Détail dans l’en-tête de
 * `components/ui/Button.tsx`.
 */

/** Défilement au-delà duquel le header pose son filet et son fond. */
const SCROLL_THRESHOLD = 8;

/** Cibles focalisables du panneau mobile : il n’y a que des liens. */
const PANEL_FOCUSABLE = 'a[href], button:not([disabled])';

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  /** Ferme le menu et rend le focus au déclencheur, qui reste visible. */
  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  // Une navigation ferme le menu sans déplacer le focus : c’est la page qui
  // change, pas l’utilisateur qui revient sur le bouton.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    let frame = 0;

    const read = () => {
      frame = 0;
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    const onScroll = () => {
      if (frame !== 0) return;
      frame = window.requestAnimationFrame(read);
    };

    // Une page ouverte sur une ancre est déjà défilée au premier rendu.
    read();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame !== 0) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== 'Tab') return;

      const trigger = triggerRef.current;
      const panel = panelRef.current;
      if (!trigger || !panel) return;

      // Le déclencheur fait partie du piège : c’est la sortie visible du menu.
      const items: HTMLElement[] = [
        trigger,
        ...Array.from(panel.querySelectorAll<HTMLElement>(PANEL_FOCUSABLE)),
      ];
      const index = items.indexOf(document.activeElement as HTMLElement);

      if (index === -1) {
        event.preventDefault();
        items[0]?.focus();
        return;
      }

      if (event.shiftKey && index === 0) {
        event.preventDefault();
        items[items.length - 1]?.focus();
        return;
      }

      if (!event.shiftKey && index === items.length - 1) {
        event.preventDefault();
        items[0]?.focus();
      }
    };

    // Un appui hors du header referme sans déplacer le focus : le pointeur est
    // déjà ailleurs, le lui reprendre serait une saisie de focus. Sans cette
    // sortie, un utilisateur à la souris resterait prisonnier du piège dès la
    // tabulation suivante.
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (headerRef.current?.contains(target)) return;
      setOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [close, open]);

  /** Une sous-page (une étude de cas) active la rubrique qui la contient. */
  const isCurrent = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(`${href}/`));

  return (
    <header
      ref={headerRef}
      className="sticky inset-x-0 top-0 z-50 flex h-[var(--header-height)] items-center px-3 md:px-5"
    >
      {/* La barre se replie en pilule au défilement : matériau blanc chaud
          translucide et filet, sans ombre. Le header lui-même reste transparent :
          la page se voit entre le haut de l’écran et la pilule. En mobile, la
          pilule est toujours repliée. */}
      <nav
        aria-label="Navigation principale"
        data-scrolled={scrolled ? '' : undefined}
        className={clsx(
          'nav-material relative mx-auto flex h-14 w-full items-center justify-between gap-gap-sm rounded-full border pl-5 pr-2',
          'transition-[max-width,background-color,border-color] duration-state ease-out',
          scrolled
            ? 'max-w-[54rem]'
            : 'max-w-[54rem] md:max-w-site md:pl-3',
        )}
      >
        <LogoLink />

        <ul className="hidden items-center gap-gap-md md:flex">
          {HEADER_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isCurrent(item.href) ? 'page' : undefined}
                className="nav-link inline-flex py-1"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Button href="/contact" size="pill" track="clic_audit">
            Audit gratuit
          </Button>
        </div>

        {/* Mobile : l’appel à l’audit reste dans la pilule, visible sans ouvrir
            le menu (exigence du brief de prospection). Cibles de 44 px. */}
        <div className="flex items-center gap-1.5 md:hidden">
          <Link
            href="/contact"
            data-track="clic_audit"
            className="press inline-flex h-11 items-center rounded-full border border-line-strong px-4 text-note font-semibold text-ink transition"
          >
            Audit gratuit
          </Link>
          <button
            ref={triggerRef}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => (open ? close() : setOpen(true))}
            className="press inline-flex h-11 items-center rounded-full bg-ink px-4 text-note font-semibold text-canvas transition"
          >
            {open ? 'Fermer' : 'Menu'}
          </button>
        </div>

        <div
          id="mobile-menu"
          ref={panelRef}
          inert={!open}
          className={clsx(
            'menu-panneau absolute inset-x-0 top-full pt-2 md:hidden',
            open && 'menu-panneau--ouvert',
          )}
        >
          {/* Un filet et un fond opaque détachent le panneau, jamais une ombre. */}
          <div className="rounded-plate border border-line bg-surface p-2">
            <ul className="grid gap-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    aria-current={isCurrent(item.href) ? 'page' : undefined}
                    className="block rounded-xl px-4 py-3 text-title font-bold text-ink transition-colors hover:bg-sand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-2 grid gap-2 px-2 pb-2">
              <Button href="/contact" className="w-full" track="clic_audit">
                Demander mon audit
              </Button>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                data-track="clic_email"
                className="nav-link inline-flex justify-center py-2"
              >
                {CONTACT_EMAIL}
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
