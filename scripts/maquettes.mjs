/* global process, document, console */
/**
 * Rendu des écrans de présentation des réalisations.
 *
 * Chaque projet a son dossier : `design/maquettes/<projet>/`. Chaque fichier
 * HTML y est un écran, rendu en haute densité puis écrit en JPEG optimisé dans
 * `public/images/realisations/<projet>/<écran>.jpg`, où `next/image` le décline
 * en AVIF et WebP.
 *
 * Le format de l’écran est déclaré dans le fichier lui-même :
 *   <meta name="format" content="ordinateur">   1440 × 900, rendu 2x
 *   <meta name="format" content="telephone">    390 × 844, rendu 3x
 *
 * Les écrans de gestion y sont montrés avec des données d’exemple : les
 * chiffres des clients ne sortent jamais de chez eux.
 *
 * Usage : node scripts/maquettes.mjs [projet] [écran]
 *   node scripts/maquettes.mjs                     tout
 *   node scripts/maquettes.mjs nurea-parfums       un projet
 *   node scripts/maquettes.mjs nurea-parfums admin les écrans dont le nom contient « admin »
 */
import { chromium } from '@playwright/test';
import sharp from 'sharp';
import { readdir, readFile, mkdir } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'design', 'maquettes');
const OUT = path.join(ROOT, 'public', 'images', 'realisations');

const FORMATS = {
  ordinateur: { width: 1440, height: 900, scale: 2, out: 2400 },
  telephone: { width: 390, height: 844, scale: 3, out: 900 },
};

const [filtreProjet, filtreEcran] = process.argv.slice(2);

const projets = (await readdir(SRC, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory() && entry.name !== 'assets' && !entry.name.startsWith('_'))
  .map((entry) => entry.name)
  .filter((nom) => !filtreProjet || nom === filtreProjet);

const browser = await chromium.launch();

for (const projet of projets) {
  const dossier = path.join(SRC, projet);
  const ecrans = (await readdir(dossier))
    .filter((f) => f.endsWith('.html'))
    .filter((f) => !filtreEcran || f.includes(filtreEcran));

  await mkdir(path.join(OUT, projet), { recursive: true });

  for (const fichier of ecrans) {
    const html = await readFile(path.join(dossier, fichier), 'utf8');
    const declare = html.match(/<meta name="format" content="(ordinateur|telephone)"/)?.[1];
    if (!declare) {
      console.warn(`⚠ ${projet}/${fichier} : <meta name="format"> manquant, ignoré`);
      continue;
    }
    const format = FORMATS[declare];
    const page = await browser.newPage({
      viewport: { width: format.width, height: format.height },
      deviceScaleFactor: format.scale,
    });
    await page.goto(pathToFileURL(path.join(dossier, fichier)).href, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(150);
    const png = await page.screenshot({ type: 'png' });
    const nom = fichier.replace(/\.html$/, '');
    await sharp(png)
      .resize({ width: format.out })
      .jpeg({ quality: 84, mozjpeg: true, progressive: true })
      .toFile(path.join(OUT, projet, `${nom}.jpg`));
    // Aperçu non compressé pour la relecture de l’écran à taille réelle.
    await sharp(png)
      .resize({ width: format.width })
      .png()
      .toFile(path.join(dossier, '.apercu', `${nom}.png`))
      .catch(async () => {
        await mkdir(path.join(dossier, '.apercu'), { recursive: true });
        await sharp(png).resize({ width: format.width }).png().toFile(path.join(dossier, '.apercu', `${nom}.png`));
      });
    console.log(`✓ ${projet}/${nom}.jpg (${declare})`);
    await page.close();
  }
}

await browser.close();
