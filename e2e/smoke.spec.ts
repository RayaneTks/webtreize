import { test, expect } from '@playwright/test';

test.describe('WebTreize - Smoke tests', () => {
  test("page d'accueil charge et affiche le H1", async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText(/ramènent|sites qui|clients/i);
  });

  test('navigation vers #contact scroll correctement', async ({ page }) => {
    await page.goto('/');
    const ctaButton = page.locator('#hero').locator('button', { hasText: 'Obtenir mon audit gratuit' }).first();
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
    const nameInput = contactSection.locator('input[placeholder="Prénom"]');
    await expect(nameInput).toBeVisible({ timeout: 5000 });
    const emailInput = contactSection.locator('input[placeholder="Email professionnel"]');
    await expect(emailInput).toBeVisible();
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
    const social = page.locator('section[aria-label="Nos résultats en chiffres"]');
    await expect(social).toBeVisible();
    await expect(social.getByText('+75%', { exact: true })).toBeVisible();
    await expect(social.getByText('100%', { exact: true })).toBeVisible();
    await expect(social.getByText('48h', { exact: true })).toBeVisible();
    await expect(social.getByText('0€', { exact: true })).toBeVisible();
  });

  test('section démos présente', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#demos')).toBeVisible();
    await expect(page.getByText(/Exemples & Démos/i)).toBeVisible();
  });

  test('ouvrir et fermer une démo (modal) en mobile', async ({ page, isMobile }) => {
    test.skip(!isMobile, 'Test mobile uniquement');
    await page.goto('/');

    const firstCard = page.locator('[data-testid^="demo-card-"]').first();
    const openBtn = firstCard.getByRole('button', { name: /Voir la démo/i }).first();
    await openBtn.click();

    const modal = page.locator('[data-testid="demo-modal"]');
    await expect(modal).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(modal).toBeHidden();
  });

  test('aucune mention de faux avis Google', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=14 avis')).not.toBeVisible();
    await expect(page.locator('text=★★★★★')).not.toBeVisible();
  });

  test('Google result mockup présent dans hero', async ({ page }) => {
    await page.goto('/');
    const hero = page.locator('#hero');
    await expect(hero).toBeVisible();

    // Desktop mockup: container "hidden lg:block" (visible à partir de lg).
    // Mobile mockup: container "lg:hidden" (visible en dessous de lg).
    const desktopMockup = hero.locator('div.hidden.lg\\:block');
    const mobileMockup = hero.locator('div.lg\\:hidden');

    if (await mobileMockup.isVisible()) {
      await expect(mobileMockup.getByText('Votre entreprise', { exact: true }).first()).toBeVisible();
      await expect(mobileMockup.getByText('+200%', { exact: true }).first()).toBeVisible();
    } else {
      await expect(desktopMockup.getByText('Votre entreprise', { exact: true }).first()).toBeVisible();
      await expect(desktopMockup.getByText('+200%', { exact: true }).first()).toBeVisible();
    }
  });

  test('FAQ accordion fonctionne', async ({ page }) => {
    await page.goto('/');
    const faqSection = page.locator('#faq');
    await faqSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const firstQuestion = faqSection.locator('button').first();
    await firstQuestion.click();
    await page.waitForTimeout(400);
    const answer = faqSection.locator('p', { hasText: /tout à prouver/i });
    await expect(answer).toBeVisible();
  });
});
