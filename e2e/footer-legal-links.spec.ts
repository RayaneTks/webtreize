import { test, expect, type Page } from '@playwright/test';

async function scrollToFooter(page: Page) {
  const footer = page.locator('footer').first();
  await footer.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(300);
}

const LEGAL_LINKS = [
  { href: '/legal/mentions-legales', heading: /Mentions légales/i },
  { href: '/legal/politique-confidentialite', heading: /Politique de confidentialité/i },
  { href: '/legal/cgv', heading: /Conditions générales de vente/i },
] as const;

test.describe('Footer - liens légaux', () => {
  for (const { href, heading } of LEGAL_LINKS) {
    test(`${href} est visible et cliquable depuis le footer`, async ({ page }) => {
      await page.goto('/');
      await scrollToFooter(page);

      const legalLink = page.locator(`footer a[href="${href}"]`).first();
      await expect(legalLink).toBeVisible();

      await Promise.all([page.waitForURL(`**${href}`), legalLink.click()]);
      await expect(page.getByRole('heading', { name: heading })).toBeVisible();
    });
  }
});
