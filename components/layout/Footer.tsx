import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_HREF,
  CONTENT_PUBLISHED_AT,
  GEO_LINE,
  SOCIAL_PROFILES,
} from '@/lib/constants';
import { LEGAL_LINKS } from '@/lib/data/legal';
import { NAV_ITEMS } from '@/lib/data/site';

/**
 * Pied de page — carte complète du site.
 *
 * Composant **serveur**. Il ne portait `'use client'` que pour un `usePathname`
 * dont l’unique rôle était de préfixer les ancres hors accueil ; les ancres de
 * `HOME_SECTIONS` sont désormais absolues (`/#approche`), donc justes depuis
 * n’importe quelle page, et le hook a disparu avec la frontière client qu’il
 * imposait sur 100 % des pages.
 *
 * ## Ce que le footer porte
 *
 * Une carte (design/maquettes/NIVEAU-SUPERIEUR.md, P0-6) : les coordonnées, la
 * signature, et « Un projet ? » avec l’action. Dessous, toutes les pages et les
 * pages légales : une page sans lien entrant n’existe pas pour un moteur.
 *
 * ## Sémantique
 *
 * Trois `<nav>` nommés par leur intitulé visible (`aria-labelledby`) plutôt
 * qu’un empilement de `<div>` : la navigation par repères atteint chaque groupe.
 * Les coordonnées sont dans un `<address>` et reprennent **mot pour mot** le
 * nœud `PostalAddress` de `lib/seo.ts` — la cohérence NAP entre le site, le
 * JSON-LD et la fiche Google Business est un critère de classement local.
 *
 * L’intitulé de colonne reste un `<p class="eyebrow">` et non un `<h2>` : un
 * pied de page présent sur les sept pages n’a pas à peupler le plan de titres
 * de chacune d’elles.
 *
 * ## Année du copyright
 *
 * Lue sur `CONTENT_PUBLISHED_AT` et non sur `new Date()` : un composant serveur
 * figerait de toute façon l’année à la date de compilation, et une valeur
 * calculée au rendu produirait un écart entre le HTML servi et l’hydratation au
 * passage du 31 décembre. Une seule date fait foi dans tout le dépôt.
 */
const COPYRIGHT_YEAR = CONTENT_PUBLISHED_AT.slice(0, 4);

export function Footer() {
  return (
    <footer className="bg-canvas pb-gap-md pt-gap-lg">
      <div className="site-container">
        {/* La carte : l’action d’abord sur téléphone, au centre la signature. */}
        <div className="grid gap-gap-lg rounded-plate-lg bg-surface p-gap-lg md:grid-cols-3 md:items-center">
          <div className="order-1 md:order-3 md:text-right">
            <p className="text-title font-extrabold text-ink">Un projet&#8239;?</p>
            <div className="mt-gap-sm md:flex md:justify-end">
              <Button href="/contact" size="pill" track="clic_audit">
                Demander mon audit
              </Button>
            </div>
            <p className="mt-gap-xs text-note text-ink-muted">
              ou écrire à{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} data-track="clic_email" className="link-draw text-ink">
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>

          <div className="order-2 md:text-center">
            <div className="md:flex md:justify-center">
              <Logo />
            </div>
            <p className="mt-gap-xs text-note text-ink-muted">Studio digital, Marseille</p>
            <p className="mt-gap-xs flex flex-wrap gap-x-gap-sm md:justify-center">
              {SOCIAL_PROFILES.map((profile) => (
                <a
                  key={profile.href}
                  href={profile.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="nav-link inline-flex w-fit py-2"
                >
                  {profile.label}
                  <span className="sr-only"> (nouvelle fenêtre)</span>
                </a>
              ))}
            </p>
          </div>

          <address className="order-3 grid gap-1 not-italic md:order-1">
            <p className="text-note text-ink-muted">{GEO_LINE}</p>
            <p className="text-note text-ink-muted">Du lundi au vendredi, 9&#160;h – 18&#160;h.</p>
            {CONTACT_PHONE_HREF ? (
              <a
                href={CONTACT_PHONE_HREF}
                data-track="clic_telephone"
                className="nav-link inline-flex w-fit py-2"
              >
                {CONTACT_PHONE_DISPLAY}
              </a>
            ) : null}
          </address>
        </div>

        <div className="mt-gap-md flex flex-col-reverse gap-gap-sm md:flex-row md:items-center md:justify-between">
          <p className="text-note text-ink-muted">{`© ${COPYRIGHT_YEAR} WebTreize`}</p>

          <div className="flex flex-col gap-gap-xs md:flex-row md:gap-gap-md">
            <nav aria-labelledby="footer-nav-plan">
              <p id="footer-nav-plan" className="sr-only">
                Plan du site
              </p>
              <ul className="flex flex-wrap gap-x-gap-sm">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="nav-link inline-flex py-2">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-labelledby="footer-nav-legal">
              <p id="footer-nav-legal" className="sr-only">
                Informations légales
              </p>
              <ul className="flex flex-wrap gap-x-gap-sm">
                {LEGAL_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="nav-link inline-flex py-2">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
