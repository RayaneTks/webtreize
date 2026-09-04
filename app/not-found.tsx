import type { Metadata, Route } from 'next';
import Link from 'next/link';
import { ClientShell } from '@/components/ClientShell';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';

/**
 * Page 404.
 *
 * Elle décrivait l’erreur et n’offrait qu’un retour à l’accueil, sur un site
 * dont les pages internes n’avaient alors aucun lien entrant (finding
 * « page-404-cul-de-sac »). Elle expose désormais les trois routes réelles.
 *
 * ## Pourquoi pas `customMetadata`
 *
 * `customMetadata` pose un `canonical` absolu, ce qui suppose une URL stable.
 * Une 404 n’en a pas : elle répond sous n’importe quelle adresse. Un canonical
 * y déclarerait toutes ces adresses équivalentes à une page unique — exactement
 * le défaut que la suppression de l’`alternates` du layout racine vient de
 * corriger. La page se contente donc d’un titre et d’une description.
 *
 * `robots` n’est pas déclaré non plus : Next pose lui-même
 * `<meta name="robots" content="noindex">` sur cette route. Le déclarer ici
 * ajoutait une **seconde** balise `robots` dans le même document — vérifié dans
 * `.next/server/app/_not-found.html`. L’absence de « nofollow » vaut « follow »,
 * qui est bien ce que l’on veut : les liens de cette page doivent circuler.
 */
export const metadata: Metadata = {
  title: 'Page introuvable',
  description: 'Cette adresse n’existe pas, ou plus. Voici les pages du site.',
};

/** Les trois routes réelles du site, dans l’ordre où elles servent ici. */
const EXITS: readonly { readonly label: string; readonly href: Route }[] = [
  { label: 'Ce que nous faisons', href: '/services' },
  { label: 'Qui vous répondra', href: '/about' },
  { label: 'Retour à l’accueil', href: '/' },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-canvas text-ink">
      <ClientShell footer={<Footer />}>
        <section className="site-container py-section-lg">
          <p className="eyebrow">Erreur 404</p>
          <h1 className="mt-gap-sm max-w-[14ch] text-display-lg font-extrabold">
            Cette page n’existe pas.
          </h1>
          <p className="lede mt-gap-sm max-w-[46ch]">
            L’adresse est fausse, ou la page a été déplacée. Voici ce que vous cherchiez
            probablement.
          </p>

          {/* Trois liens en `.link-draw` et non trois `Button variant="text"` :
              la variante « text » est en terre cuite, et trois d’entre elles sur
              un écran aussi court en feraient quatre avec le point du logotype —
              une de plus que ce que la charte autorise (§ 2). Le soulignement
              dessiné suffit à les désigner comme des liens. */}
          <ul className="mt-gap-md grid max-w-[32ch] gap-gap-xs text-body-lg font-semibold">
            {EXITS.map((exit) => (
              <li key={exit.href}>
                <Link href={exit.href} className="link-draw inline-flex items-center gap-2">
                  {exit.label}
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-gap-lg">
            <Button href="/contact">Nous écrire</Button>
          </div>
        </section>
      </ClientShell>
    </div>
  );
}
