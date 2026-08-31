import { test, expect } from '@playwright/test';

test.describe('WebTreize - Smoke tests', () => {
  test("page d'accueil charge et affiche le H1", async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText(/savoir-faire|trouvé/i);
  });

  test('sections principales présentes', async ({ page }) => {
    await page.goto('/');
    for (const id of ['#hero', '#approche', '#metier', '#promesses', '#methode', '#audit', '#questions']) {
      await expect(page.locator(id)).toHaveCount(1);
    }
  });

  test('CTA hero scrolle vers la section audit', async ({ page }) => {
    await page.goto('/');
    await page.locator('#hero a', { hasText: 'Commencer par un audit' }).click();
    await page.waitForTimeout(900);

    const audit = page.locator('#audit');
    await expect(audit).toBeInViewport();
  });

  test('header sticky : la nav reste en haut au scroll', async ({ page }) => {
    await page.goto('/');

    const nav = page.locator('nav[aria-label="Navigation principale"]');
    await expect(nav).toBeVisible();

    const before = await nav.boundingBox();
    await page.evaluate(() => window.scrollTo({ top: 900, behavior: 'instant' as ScrollBehavior }));
    await page.waitForTimeout(200);
    const after = await nav.boundingBox();

    expect(Math.abs((after?.y ?? 0) - (before?.y ?? 0))).toBeLessThanOrEqual(2);
  });

  test('CTA du header visible selon le viewport', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('nav[aria-label="Navigation principale"]');

    const desktopCta = nav.locator('a', { hasText: 'Parlons-en' }).first();
    const mobileTrigger = nav.locator('button', { hasText: /Menu|Fermer/ }).first();

    if (await mobileTrigger.isVisible()) {
      await mobileTrigger.click();
      await expect(page.locator('#mobile-menu a', { hasText: 'Parlons-en' })).toBeVisible();
    } else {
      await expect(desktopCta).toBeVisible();
    }
  });

  test('hors accueil, les ancres du header pointent vers la home', async ({ page }) => {
    await page.goto('/services');
    const link = page
      .locator('nav[aria-label="Navigation principale"] a', { hasText: 'Approche' })
      .first();
    await expect(link).toHaveAttribute('href', '/#approche');
  });

  test('FAQ : les questions sont dépliables', async ({ page }) => {
    await page.goto('/');
    const faq = page.locator('#questions');
    await faq.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);

    const first = faq.locator('details').first();
    await expect(first).not.toHaveAttribute('open', '');
    await first.locator('summary').click();
    await expect(first).toHaveAttribute('open', '');
  });

  test('aucune mention de faux avis Google', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=14 avis')).toHaveCount(0);
    await expect(page.locator('text=★★★★★')).toHaveCount(0);
  });

  test('le formulaire de contact est accessible sur /contact', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('button', { hasText: 'Envoyer ma demande' })).toBeVisible();
  });
});
