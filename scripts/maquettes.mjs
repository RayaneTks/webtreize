/* global process, document, console */
/**
 * Rendu des écrans de présentation des réalisations.
 *
 * Les maquettes HTML de `design/maquettes/` reproduisent des écrans réellement
 * livrés (back-office, écran cuisine, application de production) avec des
 * données d’exemple : les chiffres des clients ne sortent jamais de chez eux.
 * Ce script les photographie en haute densité et écrit des JPEG optimisés dans
 * `public/images/realisations/`, où `next/image` les décline en AVIF et WebP.
 *
 * Usage : node scripts/maquettes.mjs [filtre]
 */
import { chromium } from '@playwright/test';
import sharp from 'sharp';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'design', 'maquettes');
const OUT = path.join(ROOT, 'public', 'images', 'realisations');

/** Écran d’ordinateur : 1440 × 900 rendu en 2x, livré en 2400 px de large. */
const DESKTOP = { width: 1440, height: 900, scale: 2, out: 2400 };
/** Téléphone : 390 × 844 rendu en 3x, livré en 900 px de large. */
const MOBILE = { width: 390, height: 844, scale: 3, out: 900 };

const SCREENS = [
  ['nurea-admin', DESKTOP],
  ['nurea-caisse', MOBILE],
  ['magda-carte', MOBILE],
  ['magda-suivi', MOBILE],
  ['magda-cuisine', DESKTOP],
  ['magda-gestion', DESKTOP],
  ['e1d-fiche', MOBILE],
  ['e1d-ingredients', MOBILE],
  ['e1d-commandes', MOBILE],
  ['e1d-compta', MOBILE],
  ['conciergerie-demande', MOBILE],
];

const filtre = process.argv[2];
const browser = await chromium.launch();

for (const [name, format] of SCREENS) {
  if (filtre && !name.includes(filtre)) continue;
  const page = await browser.newPage({
    viewport: { width: format.width, height: format.height },
    deviceScaleFactor: format.scale,
  });
  await page.goto(pathToFileURL(path.join(SRC, `${name}.html`)).href, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const png = await page.screenshot({ type: 'png' });
  await sharp(png)
    .resize({ width: format.out })
    .jpeg({ quality: 82, mozjpeg: true, progressive: true })
    .toFile(path.join(OUT, `${name}.jpg`));
  console.log(`✓ ${name}.jpg`);
  await page.close();
}

await browser.close();
