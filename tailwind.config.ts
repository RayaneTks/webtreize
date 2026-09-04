import type { Config } from 'tailwindcss';

/**
 * Socle visuel WebTreize.
 *
 * Cinq valeurs de charte, trois dérivées d’accessibilité, deux filets.
 * Une seule échelle typographique, sept jetons d’espacement, deux rayons de plaque.
 * Deux courbes et quatre durées, toutes lues depuis `app/globals.css`.
 *
 * Toute valeur littérale écrite ailleurs dans le code est un défaut : elle doit
 * remonter ici ou disparaître.
 */
const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // — Les cinq valeurs de la charte, et rien d’autre —
        canvas: '#f6f3ee', // Ivoire      — fond dominant
        surface: '#fffdfa', // Blanc chaud — sections alternées, encarts
        sand: '#eae3d8', // Sable       — plaques image, aplats
        ink: '#17130f', // Encre       — texte, section sombre
        accent: '#c4552b', // Terre cuite — aplats, point du logotype

        // — Dérivées d’accessibilité : justifiées, documentées, non extensibles —
        // Ratios recalculés (WCAG 2.x, luminance relative) — voir DESIGN.md.
        'ink-muted': '#6b6259', // 5,40:1 sur ivoire — paragraphes secondaires
        'ink-faint': '#756c65', // 4,64:1 sur ivoire, 5,06:1 sur blanc chaud — étiquettes
        'accent-deep': '#a8461f', // 5,33:1 sur ivoire — terre cuite en TEXTE et au survol

        // — Filets —
        line: 'rgba(23, 19, 15, 0.14)', // séparateur décoratif, exempté du seuil 3:1
        'line-strong': 'rgba(23, 19, 15, 0.5)', // bordure de composant — 3,41:1 sur ivoire
      },
      fontFamily: {
        sans: ['var(--font-display)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      fontSize: {
        // Une seule échelle. Aucune taille littérale ailleurs dans le code.
        label: ['0.8125rem', { lineHeight: '1.4', letterSpacing: '0.1em' }],
        note: ['0.875rem', { lineHeight: '1.6' }],
        body: ['1rem', { lineHeight: '1.7' }],
        'body-lg': ['1.0625rem', { lineHeight: '1.72' }],
        'title-sm': ['1.1875rem', { lineHeight: '1.35', letterSpacing: '-0.025em' }],
        title: ['1.375rem', { lineHeight: '1.3', letterSpacing: '-0.03em' }],
        'display-sm': ['clamp(1.875rem, 4.2vw, 3.375rem)', { lineHeight: '1.03', letterSpacing: '-0.04em' }],
        'display-md': ['clamp(2rem, 4.6vw, 3.75rem)', { lineHeight: '1.02', letterSpacing: '-0.045em' }],
        'display-lg': ['clamp(2.25rem, 5.8vw, 4.75rem)', { lineHeight: '1', letterSpacing: '-0.05em' }],
        'display-xl': ['clamp(2.625rem, 7.4vw, 6rem)', { lineHeight: '0.98', letterSpacing: '-0.05em' }],
      },
      spacing: {
        // Sept jetons de rythme. Aucun clamp() littéral ailleurs dans le code.
        'gap-xs': 'clamp(0.75rem, 1.2vw, 1rem)',
        'gap-sm': 'clamp(1.25rem, 2.2vw, 1.75rem)',
        'gap-md': 'clamp(1.75rem, 3.4vw, 2.75rem)',
        'gap-lg': 'clamp(2.5rem, 5vw, 4rem)',
        'gap-xl': 'clamp(3.5rem, 7vw, 6rem)',
        section: 'clamp(4.75rem, 11vw, 10.5rem)',
        'section-lg': 'clamp(5.25rem, 12vw, 11rem)',
      },
      borderRadius: {
        // Deux rayons de plaque. `rounded-full` pour les boutons, `rounded-xl` pour les champs.
        plate: 'clamp(1rem, 2vw, 1.625rem)',
        'plate-lg': 'clamp(1.125rem, 2.4vw, 2.125rem)',
      },
      maxWidth: {
        site: '1120px',
        plate: '1280px',
      },
      transitionDuration: {
        // DEFAULT s’applique à tout `transition-*` écrit sans `duration-*`.
        DEFAULT: 'var(--dur-micro)',
        micro: 'var(--dur-micro)', // 150 ms — couleur, opacité d’un survol
        state: 'var(--dur-state)', // 250 ms — bascule d’état, ouverture d’un menu
        reveal: 'var(--dur-reveal)', // 450 ms — apparition courte
        long: 'var(--dur-long)', // 700 ms — apparition longue, image
      },
      transitionTimingFunction: {
        // DEFAULT s’applique à tout `transition-*` écrit sans `ease-*`.
        DEFAULT: 'var(--ease-out)',
        out: 'var(--ease-out)', // entrées, déplacements
        swap: 'var(--ease-swap)', // échanges d’état, rare
      },
    },
  },
  plugins: [],
};

export default config;
