import { test, expect, type Page } from '@playwright/test';

/**
 * Attend l’arrêt complet du défilement.
 *
 * `app/globals.css` pose `scroll-behavior: smooth` sur `html` : tout
 * `scrollIntoView` est donc animé. Un clic déclenché pendant cette animation
 * vise une position que l’élément a déjà quittée — c’est la cause des échecs
 * intermittents observés sous WebKit quand les trois projets tournent en
 * parallèle. On attend trois frames sans mouvement avant d’agir.
 */
async function waitForScrollToSettle(page: Page): Promise<void> {
  await page.waitForFunction(
    () =>
      new Promise<boolean>((resolve) => {
        let last = window.scrollY;
        let stable = 0;

        const tick = () => {
          if (window.scrollY === last) {
            if (++stable >= 3) {
              resolve(true);
              return;
            }
          } else {
            stable = 0;
            last = window.scrollY;
          }
          requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
      }),
  );
}

test.describe('WebTreize - Smoke tests', () => {
  test('page d’accueil charge et affiche le H1', async ({ page }) => {
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

  /**
   * La navigation du header a changé de nature : elle desservait quatre ancres
   * de l’accueil, `/services` et `/about` n’avaient alors aucun lien entrant
   * dans tout le site. Elle dessert désormais les trois routes réelles, et les
   * ancres de l’accueil sont descendues au plan du footer. Le test suit ce
   * déplacement, il ne l’allège pas : les deux emplacements sont vérifiés.
   */
  test('le header dessert les trois routes réelles', async ({ page }) => {
    await page.goto('/');
    const nav = page.locator('nav[aria-label="Navigation principale"]');

    for (const [href, label] of [
      ['/services', 'Services'],
      ['/about', 'Le studio'],
      ['/contact', 'Contact'],
    ] as const) {
      // Le lien existe deux fois — barre desktop et panneau mobile — et le
      // libellé doit rester exact : c’est lui que le moteur de recherche lit.
      const links = nav.locator(`a[href="${href}"]`, { hasText: label });
      expect(await links.count()).toBeGreaterThan(0);
    }

    // Au moins un des liens de chaque route est réellement atteignable au
    // viewport courant, barre desktop ou panneau mobile ouvert.
    const trigger = nav.locator('button', { hasText: /Menu|Fermer/ }).first();
    if (await trigger.isVisible()) await trigger.click();

    for (const href of ['/services', '/about', '/contact'] as const) {
      await expect(nav.locator(`a[href="${href}"]`).filter({ visible: true }).first()).toBeVisible();
    }
  });

  test('hors accueil, les ancres de l’accueil sont au footer et pointent vers la home', async ({
    page,
  }) => {
    await page.goto('/services');
    const link = page.locator('footer a', { hasText: 'Approche' }).first();
    await expect(link).toHaveAttribute('href', '/#approche');
  });

  test('FAQ : les questions sont dépliables', async ({ page }) => {
    await page.goto('/');
    const faq = page.locator('#questions');
    await faq.scrollIntoViewIfNeeded();

    const first = faq.locator('details').first();

    // Deux mouvements doivent être terminés avant le clic : le défilement doux
    // vers la section, et l’apparition du bloc (180 ms de décalage + 450 ms de
    // transition, soit plus que les 400 ms du temporisateur fixe qui tenait ce
    // rôle et rendait ce test intermittent sous WebKit).
    await waitForScrollToSettle(page);
    await expect(first.locator('xpath=ancestor-or-self::*[@data-reveal][1]')).toHaveAttribute(
      'data-revealed',
      '',
    );
    await waitForScrollToSettle(page);

    await expect(first).not.toHaveJSProperty('open', true);
    await first.locator('summary').click();
    await expect(first).toHaveJSProperty('open', true);
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
