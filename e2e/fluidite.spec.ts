import { expect, test } from '@playwright/test';

test.describe('Interactions fluides', () => {
  test('une couverture suit le pointeur puis revient au repos', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium', 'interaction réservée aux pointeurs précis');

    await page.goto('/');
    const cover = page.locator('.projet-carte__couverture').first();
    await cover.scrollIntoViewIfNeeded();

    const box = await cover.boundingBox();
    expect(box).not.toBeNull();
    await page.mouse.move(box!.x + box!.width * 0.8, box!.y + box!.height * 0.25);

    await expect
      .poll(() => cover.evaluate((element) => getComputedStyle(element).transform))
      .not.toBe('none');

    await page.mouse.move(4, 4);
    await expect
      .poll(() => cover.evaluate((element) => getComputedStyle(element).transform), {
        timeout: 2_000,
      })
      .toMatch(/matrix3d\(1(?:\.0+)?,/);
  });

  test('le mouvement réduit garde les couvertures à plat', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');

    const cover = page.locator('.projet-carte__couverture').first();
    await cover.scrollIntoViewIfNeeded();
    await expect(cover).toHaveCSS('transform', 'none');
  });

  test('la galerie mobile se glisse sans élargir la page', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    const mesures = await page.locator('.projet-rail').evaluate((rail) => ({
      page: document.documentElement.scrollWidth,
      viewport: window.innerWidth,
      contenu: rail.scrollWidth,
      visible: rail.clientWidth,
      snap: getComputedStyle(rail).scrollSnapType,
    }));

    expect(mesures.page).toBe(mesures.viewport);
    expect(mesures.contenu).toBeGreaterThan(mesures.visible);
    expect(mesures.snap).toContain('mandatory');
  });
});
