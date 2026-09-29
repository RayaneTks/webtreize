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
 * ## Empreinte dans le nom de fichier
 *
 * Les images du site sont servies avec un an de cache (next.config.ts) : un
 * écran refait sous la même URL resterait l’ancien, chez le visiteur comme dans
 * le cache d’optimisation d’images. Chaque JPEG porte donc l’empreinte de son
 * contenu (`accueil.3fa2c1d0.jpg`), et `lib/data/ecrans-realisations.json`
 * associe chaque écran à son fichier courant. Les anciennes versions sont
 * supprimées.
 *
 * Usage : node scripts/maquettes.mjs [projet] [écran]
 *         node scripts/maquettes.mjs --index   (réindexe sans rien rendre)
 *   node scripts/maquettes.mjs                     tout
 *   node scripts/maquettes.mjs nurea-parfums       un projet
 *   node scripts/maquettes.mjs nurea-parfums admin les écrans dont le nom contient « admin »
 */
import { chromium } from '@playwright/test';
import sharp from 'sharp';
import { createHash } from 'node:crypto';
import { readdir, readFile, mkdir, rename, unlink, writeFile } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'design', 'maquettes');
const OUT = path.join(ROOT, 'public', 'images', 'realisations');

const FORMATS = {
  ordinateur: { width: 1440, height: 900, scale: 2, out: 2400 },
  telephone: { width: 390, height: 844, scale: 3, out: 900 },
};

const MANIFESTE = path.join(ROOT, 'lib', 'data', 'ecrans-realisations.json');
const EMPREINTE = /\.[0-9a-f]{8}\.jpg$/;

const indexSeul = process.argv[2] === '--index';
const [filtreProjet, filtreEcran] = indexSeul ? [] : process.argv.slice(2);

const projets = (await readdir(SRC, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory() && entry.name !== 'assets' && !entry.name.startsWith('_'))
  .map((entry) => entry.name)
  .filter((nom) => !filtreProjet || nom === filtreProjet);

const browser = indexSeul ? null : await chromium.launch();

for (const projet of indexSeul ? [] : projets) {
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

await browser?.close();

/**
 * Renomme chaque `<écran>.jpg` fraîchement rendu en `<écran>.<empreinte>.jpg`,
 * supprime les versions précédentes, puis réécrit le manifeste.
 */
const manifeste = {};
for (const projet of await readdir(OUT)) {
  const dossier = path.join(OUT, projet);
  const fichiers = await readdir(dossier);

  for (const fichier of fichiers.filter((f) => f.endsWith('.jpg') && !EMPREINTE.test(f))) {
    const nom = fichier.replace(/\.jpg$/, '');
    const contenu = await readFile(path.join(dossier, fichier));
    const empreinte = createHash('sha1').update(contenu).digest('hex').slice(0, 8);
    for (const ancien of fichiers.filter((f) => f.startsWith(`${nom}.`) && EMPREINTE.test(f))) {
      if (ancien !== `${nom}.${empreinte}.jpg`) await unlink(path.join(dossier, ancien));
    }
    await rename(path.join(dossier, fichier), path.join(dossier, `${nom}.${empreinte}.jpg`));
  }

  for (const fichier of (await readdir(dossier)).filter((f) => EMPREINTE.test(f)).sort()) {
    manifeste[`${projet}/${fichier.replace(EMPREINTE, '')}`] = `/images/realisations/${projet}/${fichier}`;
  }
}

await writeFile(MANIFESTE, `${JSON.stringify(manifeste, null, 2)}
`);
console.log(`✓ ${Object.keys(manifeste).length} écrans indexés dans lib/data/ecrans-realisations.json`);
