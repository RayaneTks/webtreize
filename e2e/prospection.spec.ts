import { test, expect } from '@playwright/test';

/**
 * Garde-fous de la passe « prospection B2B ».
 *
 * Chaque test verrouille une exigence du cahier des charges : un canonical sur
 * l’hôte réellement servi, des études de cas complètes, aucun contenu retiré qui
 * réapparaît, aucune section de crédibilité affichée à vide.
 */

const ETUDES = ['/realisations/magda-mania', '/realisations/nurea-parfums'] as const;

test.describe('Prospection — référencement', () => {
  test('le canonical est sur l’hôte servi par l’hébergeur (www)', async ({ request }) => {
    for (const route of ['/', '/services', '/realisations', '/about', '/contact', ...ETUDES]) {
      const html = await (await request.get(route)).text();
      const href = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/)?.[1];
      expect(href, `${route} doit déclarer un canonical`).toBeDefined();
      // `webtreize.com` redirige en 308 vers `www` : un canonical sur l’apex
      // pointerait vers une redirection.
      expect(new URL(href!).host, `${route} : hôte canonique`).toBe('www.webtreize.com');
    }
  });

  test('robots.txt déclare le sitemap sur l’hôte canonique', async ({ request }) => {
    const robots = await (await request.get('/robots.txt')).text();
    expect(robots).toContain('Sitemap: https://www.webtreize.com/sitemap.xml');
  });

  test('chaque page a un titre et une description uniques', async ({ page }) => {
    const titres = new Set<string>();
    const descriptions = new Set<string>();
    const routes = ['/', '/services', '/realisations', '/about', '/contact', ...ETUDES];

    for (const route of routes) {
      await page.goto(route);
      const titre = await page.title();
      const description = await page.locator('meta[name="description"]').getAttribute('content');

      expect(titre.length, `${route} : titre trop long pour la page de résultats`).toBeLessThanOrEqual(65);
      expect(description?.length ?? 0, `${route} : description`).toBeGreaterThan(100);
      expect(description?.length ?? 0, `${route} : description tronquée`).toBeLessThanOrEqual(160);

      titres.add(titre);
      descriptions.add(description ?? '');

      // Cartes de partage : titre, URL et image propres à la page.
      await expect(page.locator('meta[property="og:title"]')).toHaveCount(1);
      await expect(page.locator('meta[property="og:image"]').first()).toHaveAttribute('content', /^https:\/\/www\.webtreize\.com\//);
      await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
    }

    expect(titres.size, 'titres dupliqués').toBe(routes.length);
    expect(descriptions.size, 'descriptions dupliquées').toBe(routes.length);
  });
});

test.describe('Prospection — études de cas', () => {
  for (const route of ETUDES) {
    test(`${route} contient toutes les sections attendues`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);

      await expect(page.locator('h1')).toHaveCount(1);

      for (const section of [
        /^Le contexte$/,
        /^Le problème$/,
        /^La solution$/,
        /^Les interfaces$/,
        /^Les fonctionnalités$/,
        /^Ce qui change au quotidien\.?$/,
      ]) {
        const cible = page.getByText(section).first();
        await cible.scrollIntoViewIfNeeded();
        await expect(cible, String(section)).toBeVisible();
      }

      // Appel à l’action vers le formulaire.
      await expect(page.locator('a[href="/contact"]', { hasText: /audit/i }).last()).toBeVisible();

      // Fil d’Ariane visible et balisé.
      await expect(page.locator('nav[aria-label="Fil d’Ariane"]')).toBeVisible();
      const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
      expect(ld.some((bloc) => bloc.includes('BreadcrumbList'))).toBe(true);
    });
  }

  test('une étude de cas inconnue renvoie un 404', async ({ page }) => {
    const response = await page.goto('/realisations/projet-inexistant');
    expect(response?.status()).toBe(404);
  });

  test('aucun chiffre de résultat ni témoignage inventé', async ({ page }) => {
    for (const route of ETUDES) {
      await page.goto(route);
      const texte = await page.locator('main').innerText();
      // Pourcentages de gain, notes sur cinq, multiplicateurs : absents.
      expect(texte, route).not.toMatch(/[+−-]\s?\d+\s?%|\d[,.]?\d?\s?\/\s?5|×\s?\d/);
    }
  });
});

test.describe('Prospection — contenu', () => {
  test('les formulations retirées ne réapparaissent pas', async ({ page }) => {
    for (const route of ['/', '/about', '/services', '/contact']) {
      await page.goto(route);
      const texte = await page.locator('body').innerText();
      expect(texte, route).not.toContain('provençal');
      expect(texte, route).not.toContain('deux rues');
      expect(texte, route).not.toContain('une à deux semaines');
      expect(texte, route).not.toContain('à distance ailleurs');
    }
  });

  test('le positionnement géographique est harmonisé', async ({ page }) => {
    await page.goto('/contact');
    await expect(
      page.getByText('Basés à Marseille. Sur place dans le 13, à distance partout en France.').first(),
    ).toBeVisible();
  });

  test('aucune section témoignages ou équipe n’est rendue à vide', async ({ page }) => {
    await page.goto('/about');
    // Ces sections n’existent que si des données réelles ont été fournies.
    const temoignages = page.locator('#temoignages-title');
    const equipe = page.locator('#equipe-title');
    if ((await temoignages.count()) > 0) {
      await expect(page.locator('section[aria-labelledby="temoignages-title"] li')).not.toHaveCount(0);
    }
    if ((await equipe.count()) > 0) {
      await expect(page.locator('section[aria-labelledby="equipe-title"] li')).not.toHaveCount(0);
    }
  });

  test('la navigation principale est identique partout', async ({ page }) => {
    for (const route of ['/', '/services', '/realisations/magda-mania', '/legal/cgv']) {
      await page.goto(route);
      const nav = page.locator('nav[aria-label="Navigation principale"]');
      // Présence dans le DOM, qu’elle soit visible (ordinateur) ou dans le menu
      // mobile replié — lequel est `inert`, donc hors de l’arbre d’accessibilité.
      for (const href of ['/services', '/realisations', '/about', '/contact']) {
        expect(await nav.locator(`a[href="${href}"]`).count(), `${route} → ${href}`).toBeGreaterThan(0);
      }
      await expect(nav.locator('a:visible', { hasText: 'Audit gratuit' }).first()).toBeVisible();
    }
  });
});
