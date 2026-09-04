import { test, expect } from '@playwright/test';

/**
 * Le mouvement ne doit jamais pouvoir masquer ni fausser du contenu.
 *
 * Ces trois cas ont tous été des défauts réels du site : un titre effacé par un
 * `clip-path` dont l’animation ne démarrait pas, et un compteur bloqué sur « 0 »
 * tant que personne n’avait défilé jusqu’à lui. Un chiffre faux sur le bloc de
 * conversion coûte plus qu’une animation manquée : le repos d’un composant animé
 * est toujours son état final, jamais son état de départ.
 */
test.describe('Mouvement — dégradation', () => {
  test('le titre du héros reste visible quand toute animation est coupée', async ({ page }) => {
    await page.goto('/');
    // Simule une extension anti-animation, une feuille tierce, ou un moteur sans
    // support des @keyframes sur clip-path.
    await page.addStyleTag({
      content: '*,*::before,*::after{animation:none!important;transition:none!important}',
    });

    const h1 = page.locator('h1#hero-title');
    await expect(h1).toBeVisible();

    const box = await h1.boundingBox();
    expect(box, 'le h1 doit occuper une surface réelle').not.toBeNull();
    expect(box!.height).toBeGreaterThan(20);

    // Aucun découpage ne doit subsister : c’est l’élément LCP de la page.
    const clip = await h1.evaluate((el) => getComputedStyle(el).clipPath);
    expect(clip).toBe('none');
  });

  test('le compteur affiche la valeur finale tant qu’il n’est pas atteint', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(1500);

    // Le visiteur n’a pas défilé : la section est hors écran, la valeur doit être juste.
    const digits = page.locator('#audit [aria-hidden="true"]').first();
    await expect(digits).toHaveText('48');
  });

  test('le compteur se déroule puis se fige sur la valeur finale', async ({ page }) => {
    await page.goto('/');
    await page.locator('#audit').scrollIntoViewIfNeeded();

    const digits = page.locator('#audit [aria-hidden="true"]').first();
    await expect(digits).toHaveText('48', { timeout: 4000 });

    // Le texte restitué aux lecteurs d’écran ne dépend jamais de l’animation.
    await expect(page.locator('#audit .sr-only').first()).toHaveText('48');
  });

  test('à l’impression, aucune valeur intermédiaire ni contenu masqué', async ({ page }) => {
    await page.goto('/');
    await page.emulateMedia({ media: 'print' });
    await page.waitForTimeout(600);

    await expect(page.locator('#audit [aria-hidden="true"]').first()).toHaveText('48');
    await expect(page.locator('h1#hero-title')).toBeVisible();
  });
});
