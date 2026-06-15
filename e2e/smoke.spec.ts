import { test, expect } from '@playwright/test';

test.describe('WebTreize - Smoke tests', () => {
  test("page d'accueil charge et affiche le H1", async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText(/activité|sérieux|prise/i);
  });

  test('navigation vers #contact scroll correctement', async ({ page }) => {
    await page.goto('/');
    const ctaButton = page.locator('#hero').locator('button', { hasText: 'Demander un audit gratuit' }).first();
    await ctaButton.click();
    await page.waitForTimeout(800);
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeVisible();
  });

  test('formulaire audit visible dans section CTA', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const contactSection = page.locator('#contact');
    await contactSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const nameInput = contactSection.locator('input[placeholder="Jean"]');
    await expect(nameInput).toBeVisible({ timeout: 5000 });
    const emailInput = contactSection.locator('input[placeholder="jean@entreprise.fr"]');
    await expect(emailInput).toBeVisible();
    await expect(contactSection.locator('#cta-category')).toBeVisible();
    await expect(contactSection.locator('#cta-project')).toBeVisible();
  });

  test('sections principales présentes', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#hero')).toBeVisible();
    await expect(page.locator('#services')).toBeVisible();
    await expect(page.locator('#engagements')).toBeVisible();
    await expect(page.locator('#method')).toBeVisible();
    await expect(page.locator('#faq')).toBeVisible();
    await expect(page.locator('#contact')).toBeVisible();
  });

  test('navbar CTA visible et cliquable', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('nav[aria-label="Navigation principale"]');
    await expect(nav).toBeVisible();

    // Desktop CTA est dans un container "hidden lg:flex" (donc invisible sur mobile).
    // Mobile CTA est dans un container "lg:hidden".
    const desktopCta = nav.locator('div.hidden.lg\\:flex button', { hasText: /audit/i }).first();
    const mobileCta = nav.locator('div.lg\\:hidden button', { hasText: /audit/i }).first();

    if (await mobileCta.isVisible()) {
      await expect(mobileCta).toBeVisible();
    } else {
      await expect(desktopCta).toBeVisible();
    }
  });

  test('navbar reste fixé en scroll (mobile)', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Test mobile uniquement');
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const nav = page.locator('nav[aria-label="Navigation principale"]');
    await expect(nav).toBeVisible();

    const before = await nav.boundingBox();
    expect(before).toBeTruthy();

    await page.evaluate(() => window.scrollTo({ top: 700, behavior: 'instant' as ScrollBehavior }));
    await page.waitForTimeout(150);

    const after = await nav.boundingBox();
    expect(after).toBeTruthy();

    // Un header fixed doit rester collé en haut (tolérance légère selon device/scroll snapping).
    expect(Math.abs((after!.y ?? 0) - (before!.y ?? 0))).toBeLessThanOrEqual(2);
  });

  test('métriques de social proof visibles', async ({ page }) => {
    await page.goto('/');
    const social = page.locator('section[aria-label="Résultats et engagements"]');
    await expect(social).toBeVisible();
    await expect(social.getByText('+75%', { exact: true })).toBeVisible();
  });

  test('aucune mention de faux avis Google', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=14 avis')).not.toBeVisible();
    await expect(page.locator('text=★★★★★')).not.toBeVisible();
  });

  test('aperçu visibilité présent dans hero', async ({ page }) => {
    await page.goto('/');
    const hero = page.locator('#hero');
    await expect(hero).toBeVisible();
    await expect(hero.getByText('Votre entreprise', { exact: true }).first()).toBeVisible();
    await expect(hero.getByText('+200% visibilité', { exact: true }).first()).toBeVisible();
  });

  test('FAQ accordion fonctionne', async ({ page }) => {
    await page.goto('/');
    const faqSection = page.locator('#faq');
    await faqSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const firstQuestion = faqSection.locator('button').first();
    await firstQuestion.click();
    await page.waitForTimeout(400);
    const answer = faqSection.locator('p', { hasText: /équipe réduite|grosse structure/i });
    await expect(answer).toBeVisible();
  });
});
