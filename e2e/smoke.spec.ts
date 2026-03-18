import { test, expect } from '@playwright/test';

test.describe('WebTreize - Smoke tests', () => {
  test("page d'accueil charge et affiche le H1", async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toContainText(/ramènent|sites qui|clients/i);
  });

  test('navigation vers #contact scroll correctement', async ({ page }) => {
    await page.goto('/');
    const ctaButton = page.locator('button', { hasText: 'Obtenir mon audit gratuit' }).first();
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
    const navCta = page.locator('nav button', { hasText: /audit/i }).first();
    await expect(navCta).toBeVisible();
  });

  test('métriques de social proof visibles', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=+75%')).toBeVisible();
    await expect(page.locator('text=100%')).toBeVisible();
    await expect(page.locator('text=48h')).toBeVisible();
    await expect(page.locator('text=0€')).toBeVisible();
  });

  test('aucune mention de faux avis Google', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('text=14 avis')).not.toBeVisible();
    await expect(page.locator('text=★★★★★')).not.toBeVisible();
  });

  test('Google result mockup présent dans hero', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#hero >> text=Votre entreprise')).toBeVisible();
    await expect(page.locator('#hero >> text=+200%')).toBeVisible();
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
