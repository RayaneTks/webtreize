import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { CONTACT_EMAIL, CONTENT_PUBLISHED_AT, SNAPCHAT_URL } from '@/lib/constants';
import { LEGAL_LINKS } from '@/lib/data/legal';
import { HOME_SECTIONS, NAV_ITEMS } from '@/lib/data/site';

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
 * Les trois pages du site, les quatre ancres de l’accueil et les trois pages
 * légales. C’est le seul endroit où le maillage interne est complet : le header
 * ne montre que les routes, et une page sans lien entrant n’existe pas pour un
 * moteur de recherche.
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
    <footer className="bg-surface pb-gap-md pt-gap-xl">
      <div className="site-container">
        <div className="grid gap-gap-lg lg:grid-cols-2">
          <div>
            <Logo />

            <p className="mt-gap-sm max-w-[38ch] text-body text-ink-muted">
              Studio digital à Marseille. Sites, visibilité locale et outils sur mesure pour les
              entreprises du 13.
            </p>

            <address className="mt-gap-sm grid gap-1 not-italic">
              <p className="text-note text-ink-faint">Marseille, Provence-Alpes-Côte d’Azur</p>

              <a href={`mailto:${CONTACT_EMAIL}`} className="nav-link inline-flex w-fit py-1">
                {CONTACT_EMAIL}
              </a>

              <a
                href={SNAPCHAT_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="nav-link inline-flex w-fit py-1"
              >
                Snapchat @webtreize
                <span className="sr-only"> (nouvelle fenêtre)</span>
              </a>
            </address>
          </div>

          <div className="grid gap-gap-md sm:grid-cols-3">
            <nav aria-labelledby="footer-nav-studio">
              <p id="footer-nav-studio" className="eyebrow">
                Le studio
              </p>
              <ul className="mt-gap-sm grid gap-1">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="nav-link inline-flex w-fit py-1">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-labelledby="footer-nav-accueil">
              <p id="footer-nav-accueil" className="eyebrow">
                L’accueil
              </p>
              <ul className="mt-gap-sm grid gap-1">
                {HOME_SECTIONS.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="nav-link inline-flex w-fit py-1">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-labelledby="footer-nav-legal">
              <p id="footer-nav-legal" className="eyebrow">
                Informations légales
              </p>
              <ul className="mt-gap-sm grid gap-1">
                {LEGAL_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="nav-link inline-flex w-fit py-1">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* `.rule-top` porte le filet et sa respiration. La classe `pt-5.5`
            écrite ici ne produisait aucun CSS : le copyright touchait le filet
            sur les sept pages du site. */}
        <div className="rule-top mt-gap-lg">
          <p className="text-note text-ink-faint">{`© ${COPYRIGHT_YEAR} WebTreize`}</p>
        </div>
      </div>
    </footer>
  );
}
