import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { SITE_URL } from '@/lib/constants';

/**
 * Composition unique des images OpenGraph, partagée par les quatre routes
 * `opengraph-image.tsx`.
 *
 * Conforme à la charte : fond ivoire, logotype « webtreize. » en Plus Jakarta
 * Sans 800, titre en display très resserré, ligne d’appui en encre atténuée,
 * un filet terre cuite. Deux terres cuites au total — le point du logotype et
 * le filet — soit une de moins que le maximum autorisé. Aucune ombre, aucun
 * dégradé, aucune image générée.
 */

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = 'image/png';

/** Jetons de la charte, en littéral : Satori ne lit pas les variables CSS. */
const CANVAS = '#F6F3EE';
const INK = '#17130F';
const INK_MUTED = '#6B6259';
const INK_FAINT = '#756C65';
const ACCENT = '#C4552B';

const FONT_DIR = path.join(process.cwd(), 'assets', 'fonts');

/** Le domaine canonique, sans protocole, en pied de visuel. */
const DISPLAY_DOMAIN = SITE_URL.replace(/^https?:\/\//, '');

async function loadJakarta() {
  const [extraBold, regular] = await Promise.all([
    readFile(path.join(FONT_DIR, 'PlusJakartaSans-ExtraBold.ttf')),
    readFile(path.join(FONT_DIR, 'PlusJakartaSans-Regular.ttf')),
  ]);

  return [
    { name: 'Jakarta', data: extraBold, weight: 800 as const, style: 'normal' as const },
    { name: 'Jakarta', data: regular, weight: 400 as const, style: 'normal' as const },
  ];
}

/**
 * Rend l’image sociale d’une page. `title` tient sur deux lignes au maximum
 * à cette taille de corps, `subtitle` sur deux également.
 */
export async function ogImage({ title, subtitle }: { title: string; subtitle: string }) {
  const fonts = await loadJakarta();

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: CANVAS,
          padding: '76px 84px',
          fontFamily: 'Jakarta',
        }}
      >
        {/* Logotype — le point terre cuite ferme le mot comme une phrase. */}
        <div
          style={{
            display: 'flex',
            fontSize: 38,
            fontWeight: 800,
            letterSpacing: '-1.7px',
            color: INK,
          }}
        >
          <span>webtreize</span>
          <span style={{ color: ACCENT }}>.</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 960 }}>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              letterSpacing: '-3.6px',
              lineHeight: 1.03,
              color: INK,
            }}
          >
            {title}
          </div>
          <div
            style={{
              marginTop: 30,
              maxWidth: 800,
              fontSize: 27,
              fontWeight: 400,
              lineHeight: 1.45,
              color: INK_MUTED,
            }}
          >
            {subtitle}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Filet terre cuite — seul autre accent du visuel. */}
          <div style={{ width: 132, height: 3, backgroundColor: ACCENT }} />
          <div style={{ fontSize: 20, fontWeight: 400, color: INK_FAINT }}>{DISPLAY_DOMAIN}</div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}
