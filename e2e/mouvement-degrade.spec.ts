import { test, expect } from '@playwright/test';

/**
 * Le mouvement ne doit jamais pouvoir masquer ni fausser du contenu.
 *
 * Deux défauts réels du site sont à l’origine de ce fichier : un titre effacé
 * par un `clip-path` dont l’animation ne démarrait pas, et un compteur bloqué
 * sur « 0 » tant que personne n’avait défilé jusqu’à lui. La règle qui en est
 * sortie : le repos d’un composant animé est toujours son état final, jamais son
 * état de départ.
 *
 * S’y ajoute une faille propre aux animations pilotées par le défilement,
 * mesurée dans le moteur : le bloc `prefers-reduced-motion: reduce` de
 * `globals.css` force `animation-duration: 0.01ms !important`, ce qui **ne les
 * neutralise pas** — leur progression vient du scroll, pas du temps. Elles sont
 * donc enveloppées dans `@media (prefers-reduced-motion: no-preference)`, et
 * c’est cette enveloppe que les tests ci-dessous vérifient.
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

  test('la fiche d’audit porte son contenu, quel que soit le défilement', async ({ page }) => {
    await page.goto('/');

    // Le visiteur n’a pas encore défilé : le document doit déjà être complet.
    const sheet = page.locator('.brief__sheet');
    await expect(sheet).toContainText('48');
    await expect(sheet).toContainText('heures');
    await expect(sheet).toContainText('Ce que Google montre de vous');
    await expect(sheet).toContainText('Ce que votre site ne dit pas');
    await expect(sheet).toContainText('Ce qu’il faut corriger, et dans quel ordre');
  });

  test('la fiche ne se transforme pas sous prefers-reduced-motion', async ({ page }) => {
    // Le garde-fou historique — `animation-duration: 0.01ms !important` — est sans
    // effet sur une animation pilotée par le défilement. C’est l’enveloppe
    // `@media (prefers-reduced-motion: no-preference)` qui protège, et c’est elle
    // que ce test verrouille : sans elle, la feuille resterait décalée et
    // rétrécie chez un visiteur qui a demandé moins d’animations.
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.locator('#audit').scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);

    const transform = await page
      .locator('.brief__stack')
      .evaluate((el) => getComputedStyle(el).transform);
    expect(transform).toBe('none');

    await expect(page.locator('.brief__sheet')).toBeVisible();
  });

  test('à l’impression, la fiche est posée à plat et le titre visible', async ({ page }) => {
    await page.goto('/');
    await page.emulateMedia({ media: 'print' });
    await page.waitForTimeout(400);

    await expect(page.locator('h1#hero-title')).toBeVisible();
    await expect(page.locator('.brief__sheet')).toContainText('48');
  });

  test('le pli des filets ne masque jamais de contenu', async ({ page }) => {
    await page.goto('/');

    // Les parois du pli sont des pseudo-éléments décoratifs de 1 px : elles ne
    // portent rien, n’interceptent pas le pointeur, et ne changent pas la mise
    // en page. On vérifie que le contenu porté par les blocs à filet est bien là.
    const rules = page.locator('.rule-top');
    expect(await rules.count()).toBeGreaterThan(0);

    const first = rules.first();
    await first.scrollIntoViewIfNeeded();
    await expect(first).toBeVisible();

    const events = await first.evaluate(
      (el) => getComputedStyle(el, '::before').pointerEvents,
    );
    expect(events).toBe('none');
  });
});
