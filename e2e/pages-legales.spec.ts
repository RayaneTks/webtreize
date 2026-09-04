import { test, expect } from '@playwright/test';

const LEGAL_SLUGS = ['mentions-legales', 'politique-confidentialite', 'cgv'] as const;

/**
 * Les pages légales sont les seules du site où un prospect vérifie que
 * l’entreprise existe. Un texte à trous y coûte plus cher que partout ailleurs.
 *
 * La règle tenue ici : un document incomplet n’est pas servi. Il est remplacé
 * par une page sobre qui annonce une rédaction en cours. Aucun marqueur de
 * travail ne peut atteindre un visiteur.
 */
test.describe('Pages légales', () => {
  for (const slug of LEGAL_SLUGS) {
    test(`/legal/${slug} ne sert aucun marqueur de travail`, async ({ page }) => {
      await page.goto(`/legal/${slug}`);

      const texte = await page.locator('body').innerText();
      expect(texte).not.toContain('COMPLÉTER');
      expect(texte).not.toContain('[[');
    });
  }

  test('la politique de confidentialité est publiée et indexable', async ({ page }) => {
    // Le formulaire collecte quatre données personnelles : l’information doit
    // être en ligne au moment de la collecte (RGPD art. 13). Cette page ne peut
    // donc jamais basculer en brouillon ni passer en noindex.
    const response = await page.goto('/legal/politique-confidentialite');
    expect(response?.status()).toBe(200);

    const robots = await page.locator('meta[name="robots"]').getAttribute('content');
    expect(robots).not.toContain('noindex');

    const texte = await page.locator('body').innerText();
    expect(texte).not.toContain('en cours de rédaction');

    // Les points que l’article 13 impose et qui ne dépendent d’aucun fait manquant.
    for (const attendu of [
      'responsable du traitement',
      'Resend',
      'CNIL',
      'Vos droits',
      'Combien de temps',
    ]) {
      expect(texte).toContain(attendu);
    }
  });

  test('un document incomplet annonce sa rédaction et reste hors index', async ({ page }) => {
    await page.goto('/legal/mentions-legales');

    await expect(page.getByRole('heading', { name: /Mentions légales/i })).toBeVisible();
    await expect(page.getByText(/en cours de rédaction/i).first()).toBeVisible();

    const robots = await page.locator('meta[name="robots"]').getAttribute('content');
    expect(robots).toContain('noindex');

    // Un brouillon garde une issue utile : le formulaire de contact. On vise le
    // bouton de la page, pas le lien de navigation — sur mobile, celui-ci vit
    // dans le menu replié, donc légitimement masqué.
    await expect(page.getByRole('link', { name: 'Nous écrire' })).toBeVisible();
  });

  test('un slug inconnu renvoie un 404 franc', async ({ page }) => {
    const response = await page.goto('/legal/nimporte-quoi');
    expect(response?.status()).toBe(404);
  });
});
