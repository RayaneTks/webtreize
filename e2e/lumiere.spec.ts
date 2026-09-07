import { test, expect } from '@playwright/test';

/**
 * Les trois gestes de « la lumière de l’atelier » : le tirage qui se pose, le
 * titre qui se découvre, la lueur qui suit le regard.
 *
 * Tous trois sont pilotés par le défilement ou le pointeur, en CSS natif. La
 * règle qu’ils partagent, et que ces tests verrouillent : **aucun ne peut
 * masquer ni amputer du contenu**. L’état de repos d’un élément animé est
 * toujours sa figure finale — jamais son état de départ.
 */
test.describe('La lumière de l’atelier', () => {
  test('un titre reste entier quand l’animation ne démarre pas', async ({ page }) => {
    await page.goto('/');
    await page.addStyleTag({
      content: '*,*::before,*::after{animation:none!important;transition:none!important}',
    });

    const titres = page.locator('.sweep');
    const total = await titres.count();
    expect(total, 'la page d’accueil porte des titres à découverte').toBeGreaterThan(0);

    for (let i = 0; i < total; i += 1) {
      const titre = titres.nth(i);
      // Aucun découpage : l’état amputé ne vit que dans les keyframes.
      await expect(titre).toHaveCSS('clip-path', 'none');
      await expect(titre).toBeVisible();
    }
  });

  test('les titres finissent découverts une fois entrés dans la fenêtre', async ({ page }) => {
    await page.goto('/');

    const titre = page.locator('#questions .sweep').first();
    await titre.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);

    // Le bas du découpage doit être nul ou négatif : plus rien n’est coupé.
    const clip = await titre.evaluate((el) => getComputedStyle(el).clipPath);
    expect(clip === 'none' || !/\s\d*\.?\d+%\)/.test(clip)).toBe(true);
    await expect(titre).toBeVisible();
  });

  test('la plaque du héros est posée à plat sous prefers-reduced-motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.waitForTimeout(300);

    const plaque = page.locator('.tirage > *').first();
    await expect(plaque).toHaveCSS('transform', 'none');
  });

  test('la lueur ne se monte pas sous prefers-reduced-motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.locator('#audit').scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);

    // Le nœud existe mais reste éteint : aucun écouteur n’a été posé.
    const lampe = page.locator('#audit .lamp');
    await expect(lampe).toHaveCount(1);
    await expect(lampe).not.toHaveAttribute('data-lit', '');
    await expect(lampe).toHaveCSS('opacity', '0');
  });

  test('la lueur n’intercepte jamais le pointeur', async ({ page }) => {
    await page.goto('/');
    const lampe = page.locator('#audit .lamp');
    await expect(lampe).toHaveCSS('pointer-events', 'none');
    // Décorative : elle ne doit rien annoncer à un lecteur d’écran.
    await expect(lampe).toHaveAttribute('aria-hidden', 'true');
  });

  test('le bouton d’audit reste cliquable par-dessus la lueur', async ({ page }) => {
    await page.goto('/');
    const cta = page.locator('#audit a', { hasText: 'Demander mon audit' }).first();
    await cta.scrollIntoViewIfNeeded();
    await expect(cta).toBeVisible();

    await Promise.all([page.waitForURL('**/contact'), cta.click()]);
    await expect(page.locator('form')).toBeVisible();
  });
});
