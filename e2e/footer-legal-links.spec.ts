import { test, expect, type Page } from '@playwright/test';

type Box = { x: number; y: number; width: number; height: number } | null;

async function scrollToFooter(page: Page) {
  const footer = page.locator('footer').first();
  await footer.scrollIntoViewIfNeeded();
  // Laisser le temps au layout mobile (CTA fixed) de se stabiliser.
  await page.waitForTimeout(300);
  // Simuler le comportement "arrivé au footer" : pousser le scroll au bas.
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(300);
}

function overlapAreaFraction(cover: Box, target: Box) {
  if (!cover || !target) return 0;
  if (!target.width || !target.height) return 0;

  const coverX1 = cover.x;
  const coverY1 = cover.y;
  const coverX2 = cover.x + cover.width;
  const coverY2 = cover.y + cover.height;

  const targetX1 = target.x;
  const targetY1 = target.y;
  const targetX2 = target.x + target.width;
  const targetY2 = target.y + target.height;

  const overlapW = Math.max(0, Math.min(coverX2, targetX2) - Math.max(coverX1, targetX1));
  const overlapH = Math.max(0, Math.min(coverY2, targetY2) - Math.max(coverY1, targetY1));
  const intersectionArea = overlapW * overlapH;
  const targetArea = target.width * target.height;
  return intersectionArea / targetArea;
}

test.describe('Footer - liens légaux sous CTA flottant (mobile/desktop)', () => {
  test('Mentions légales cliquable (CTA "Audit gratuit" ne doit pas recouvrir)', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const viewportWidth = page.viewportSize()?.width ?? 0;
    const isMobile = viewportWidth < 1024;

    await scrollToFooter(page);

    const legalLink = page.locator('footer a[href="/legal/mentions-legales"]').first();
    await expect(legalLink).toBeVisible();

    const fab = page.locator('a[href="#contact"]').filter({ hasText: /Audit gratuit/i });
    const fabVisible = await fab.isVisible().catch(() => false);

    let overlapFraction = 0;
    let clickPosition: { x: number; y: number } | null = null;
    if (isMobile && fabVisible) {
      const fabBox = await fab.boundingBox();
      const legalBox = await legalLink.boundingBox();
      await page.screenshot({ path: testInfo.outputPath('footer-mentions-before.png'), fullPage: false });
      overlapFraction = overlapAreaFraction(fabBox, legalBox);
      if (legalBox?.width && legalBox?.height) {
        // Cliquer vers le bas du lien pour reproduire un clic "près du bouton flottant".
        clickPosition = { x: legalBox.width / 2, y: Math.max(0, legalBox.height - 2) };
      }
    }

    await Promise.all([
      page.waitForURL('**/legal/mentions-legales'),
      legalLink.click(clickPosition ? { position: clickPosition } : undefined),
    ]);

    await expect(page.getByRole('heading', { name: /Mentions légales/i })).toBeVisible();

    if (isMobile && fabVisible) {
      expect(overlapFraction).toBeLessThan(0.1);
    }
  });

  test('Confidentialité cliquable (CTA "Audit gratuit" ne doit pas recouvrir)', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const viewportWidth = page.viewportSize()?.width ?? 0;
    const isMobile = viewportWidth < 1024;

    await scrollToFooter(page);

    const legalLink = page.locator('footer a[href="/legal/politique-confidentialite"]').first();
    await expect(legalLink).toBeVisible();

    const fab = page.locator('a[href="#contact"]').filter({ hasText: /Audit gratuit/i });
    const fabVisible = await fab.isVisible().catch(() => false);

    let overlapFraction = 0;
    let clickPosition: { x: number; y: number } | null = null;
    if (isMobile && fabVisible) {
      const fabBox = await fab.boundingBox();
      const legalBox = await legalLink.boundingBox();
      await page.screenshot({ path: testInfo.outputPath('footer-confidentialite-before.png'), fullPage: false });
      overlapFraction = overlapAreaFraction(fabBox, legalBox);
      if (legalBox?.width && legalBox?.height) {
        clickPosition = { x: legalBox.width / 2, y: Math.max(0, legalBox.height - 2) };
      }
    }

    await Promise.all([
      page.waitForURL('**/legal/politique-confidentialite'),
      legalLink.click(clickPosition ? { position: clickPosition } : undefined),
    ]);

    await expect(page.getByRole('heading', { name: /Politique de confidentialité/i })).toBeVisible();

    if (isMobile && fabVisible) {
      expect(overlapFraction).toBeLessThan(0.1);
    }
  });

  test('CGV cliquable (CTA "Audit gratuit" ne doit pas recouvrir)', async ({ page }, testInfo) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const viewportWidth = page.viewportSize()?.width ?? 0;
    const isMobile = viewportWidth < 1024;

    await scrollToFooter(page);

    const legalLink = page.locator('footer a[href="/legal/cgv"]').first();
    await expect(legalLink).toBeVisible();

    const fab = page.locator('a[href="#contact"]').filter({ hasText: /Audit gratuit/i });
    const fabVisible = await fab.isVisible().catch(() => false);

    let overlapFraction = 0;
    let clickPosition: { x: number; y: number } | null = null;
    if (isMobile && fabVisible) {
      const fabBox = await fab.boundingBox();
      const legalBox = await legalLink.boundingBox();
      await page.screenshot({ path: testInfo.outputPath('footer-cgv-before.png'), fullPage: false });
      overlapFraction = overlapAreaFraction(fabBox, legalBox);
      if (legalBox?.width && legalBox?.height) {
        clickPosition = { x: legalBox.width / 2, y: Math.max(0, legalBox.height - 2) };
      }
    }

    await Promise.all([
      page.waitForURL('**/legal/cgv'),
      legalLink.click(clickPosition ? { position: clickPosition } : undefined),
    ]);

    await expect(page.getByRole('heading', { name: /Conditions générales de vente/i })).toBeVisible();

    if (isMobile && fabVisible) {
      expect(overlapFraction).toBeLessThan(0.1);
    }
  });
});

