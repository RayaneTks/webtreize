import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#f6f3ee',
        surface: {
          DEFAULT: '#fffdfa',
          sand: '#eae3d8',
          muted: '#f1ece3',
        },
        ink: {
          DEFAULT: '#1c1814',
          deep: '#17130f',
        },
        muted: '#6b6259',
        subtle: '#8a8078',
        line: 'rgba(28, 24, 20, 0.16)',
        'line-soft': 'rgba(28, 24, 20, 0.12)',
        accent: {
          DEFAULT: '#c4552b',
          hover: '#a8461f',
          light: '#e08356',
          soft: 'rgba(196, 85, 43, 0.1)',
        },
      },
      fontFamily: {
        sans: ['var(--font-display)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      fontSize: {
        // Échelle éditoriale : titres très resserrés
        'display-xl': ['clamp(2.625rem, 7.4vw, 6rem)', { lineHeight: '0.98', letterSpacing: '-0.05em' }],
        'display-lg': ['clamp(2.125rem, 5.8vw, 4.75rem)', { lineHeight: '1', letterSpacing: '-0.05em' }],
        'display-md': ['clamp(1.875rem, 4.4vw, 3.625rem)', { lineHeight: '1.03', letterSpacing: '-0.045em' }],
        'display-sm': ['clamp(1.875rem, 4.2vw, 3.375rem)', { lineHeight: '1.03', letterSpacing: '-0.04em' }],
      },
      spacing: {
        section: 'clamp(4.75rem, 11vw, 10.5rem)',
        'section-lg': 'clamp(5.25rem, 12vw, 11rem)',
      },
      borderRadius: {
        plate: 'clamp(1rem, 2vw, 1.625rem)',
        'plate-lg': 'clamp(1.125rem, 2.4vw, 2.125rem)',
      },
      boxShadow: {
        menu: '0 24px 60px -18px rgba(28, 24, 20, 0.28)',
      },
      maxWidth: {
        site: '1120px',
        plate: '1280px',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'rule-grow': {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.32, 0.72, 0, 1) both',
        'rule-grow': 'rule-grow 0.8s cubic-bezier(0.32, 0.72, 0, 1) both',
      },
    },
  },
  plugins: [],
};

export default config;
