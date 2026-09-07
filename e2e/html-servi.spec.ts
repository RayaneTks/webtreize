import { test, expect, type APIRequestContext } from '@playwright/test';

/**
 * Ce que le serveur envoie, avant la moindre ligne de JavaScript.
 *
 * Les requêtes passent par `request` et non par `page` : aucun script n’est
 * exécuté, aucune hydratation n’a lieu. C’est exactement ce que voit un crawler
 * sans rendu, un aperçu social, un navigateur dont le bundle n’est jamais
 * arrivé — et c’est la seule façon de vérifier les critères de recette 4 et 6
 * du cahier des charges autrement qu’à l’œil.
 */

/** Les routes indexables, dans l’ordre du sitemap. */
const ROUTES = ['/', '/services', '/realisations', '/about', '/contact'] as const;

/** Le fragment de `<head>` porteur du canonical. */
const CANONICAL = /<link[^>]+rel="canonical"[^>]+href="([^"]+)"/;

async function fetchHtml(request: APIRequestContext, route: string): Promise<string> {
  const response = await request.get(route);
  expect(response.status(), `${route} doit répondre 200`).toBe(200);
  return response.text();
}

/** Retire les `<script>` : le flux RSC y recopie tout le document en chaîne. */
function withoutScripts(html: string): string {
  const body = html.split('<body')[1]?.split('</body>')[0] ?? '';
  return body.replace(/<script[\s\S]*?<\/script>/g, '');
}

test.describe('HTML servi — sans JavaScript', () => {
  test('chaque page porte son propre canonical', async ({ request }) => {
    const found = new Map<string, string>();

    for (const route of ROUTES) {
      const html = await fetchHtml(request, route);
      const match = html.match(CANONICAL);

      expect(match, `${route} doit déclarer un canonical`).not.toBeNull();

      const href = match![1];
      // Absolu, jamais relatif : une valeur relative se résout différemment
      // selon la page qui la sert.
      expect(href, `${route} : canonical absolu attendu`).toMatch(/^https?:\/\//);

      const pathname = new URL(href).pathname.replace(/\/$/, '') || '/';
      expect(pathname, `${route} : le canonical doit pointer sur la page elle-même`).toBe(route);

      found.set(route, href);
    }

    // La régression à empêcher : un `alternates` posé au layout racine, qui
    // déclarait les quatre pages duplicatas de l’accueil.
    expect(new Set(found.values()).size, 'quatre canonicals distincts attendus').toBe(ROUTES.length);
  });

  test('aucun contenu masqué dans le HTML servi', async ({ request }) => {
    for (const route of ROUTES) {
      const body = withoutScripts(await fetchHtml(request, route));

      expect(body, `${route} : aucun opacity:0 en style en ligne`).not.toMatch(
        /style="[^"]*opacity\s*:\s*0[^.\d]/,
      );
      expect(body, `${route} : aucun visibility:hidden en style en ligne`).not.toMatch(
        /style="[^"]*visibility\s*:\s*hidden/,
      );

      // `opacity-0` et `invisible` masquent un contenu par ailleurs mis en
      // page : c’est exactement le défaut que la réécriture de `Reveal` et de
      // `Plate` a supprimé. La seule occurrence tolérée est le panneau de
      // navigation mobile fermé — il porte `inert`, il est réservé au petit
      // écran (`md:hidden`), et ses liens sont rendus une seconde fois,
      // visibles, dans la barre du header et dans le pied de page.
      //
      // `hidden` seul n’est pas un masquage mais une bascule d’affichage
      // responsive : il n’est accepté que rétabli à un point d’arrêt.
      const attributes = [...body.matchAll(/class="([^"]*)"/g)].map((match) => match[1]);

      for (const value of attributes) {
        if (/(^|\s)(opacity-0|invisible)(\s|$)/.test(value)) {
          expect(value, `${route} : contenu masqué hors du menu mobile — « ${value} »`).toContain(
            'md:hidden',
          );
        }

        if (/(^|\s)hidden(\s|$)/.test(value)) {
          expect(
            value,
            `${route} : « hidden » sans contrepartie responsive — « ${value} »`,
          ).toMatch(/\b(sm|md|lg|xl):(block|flex|inline-flex|grid|inline|inline-block)\b/);
        }
      }
    }
  });

  test('le texte de l’accueil est intégralement servi', async ({ request }) => {
    const body = withoutScripts(await fetchHtml(request, '/'));

    // Le h1 est l’élément LCP : il doit être dans le HTML, sans masque
    // d’opacité, faute de quoi Chrome ne le mesure jamais.
    expect(body).toMatch(/<h1[^>]*>[\s\S]*savoir-faire[\s\S]*<\/h1>/);

    const paragraphs = [...body.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)]
      .map((match) => match[1].replace(/<[^>]+>/g, '').trim())
      .filter(Boolean);

    // L’accueil en compte trente-cinq ; le seuil laisse la place à l’édition
    // sans laisser passer une page vidée par une régression du reveal.
    expect(paragraphs.length, 'paragraphes servis sur l’accueil').toBeGreaterThanOrEqual(25);

    for (const href of ['/services', '/about', '/contact']) {
      expect(body, `lien vers ${href} attendu dans le HTML servi`).toContain(`href="${href}"`);
    }
  });

  test('robots.txt n’interdit plus /_next/ et déclare le sitemap', async ({ request }) => {
    const response = await request.get('/robots.txt');
    expect(response.status()).toBe(200);

    const robots = await response.text();
    expect(robots, '/_next/ doit rester explorable : Googlebot y lit le CSS et le JS').not.toContain(
      '/_next/',
    );
    expect(robots).toContain('Disallow: /api/');
    expect(robots).toMatch(/Sitemap:\s*https?:\/\/\S+\/sitemap\.xml/);
  });

  test('le sitemap déclare toutes les routes indexables, et rien d’autre', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    expect(response.status()).toBe(200);

    const xml = await response.text();
    const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
      (match) => new URL(match[1]).pathname.replace(/\/$/, '') || '/',
    );

    expect(paths.sort()).toEqual([...ROUTES].sort());
    // Les pages légales sont en `noindex` : les déclarer serait contradictoire.
    expect(xml).not.toContain('/legal/');
  });

  test('FAQPage n’est balisé que sur la page qui affiche les questions', async ({ request }) => {
    for (const route of ROUTES) {
      const html = await fetchHtml(request, route);
      const blocks = [
        ...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g),
      ].map((match) => match[1]);
      const hasFaq = blocks.some((block) => block.includes('"FAQPage"'));

      expect(hasFaq, `${route} : FAQPage attendu uniquement sur l’accueil`).toBe(route === '/');
    }
  });
});
