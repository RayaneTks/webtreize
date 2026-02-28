import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#0d1525',
        'void-depth': '#152238',
        'void-light': '#1a2842',
        neon: '#00C2FF',
        action: '#FF5722',
        snap: '#FFFC00',
        surface: '#030303',
      },
      fontFamily: {
        display: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-open-sans)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        stripes: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50px)' },
        },
        jiggle: {
          '0%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1.5deg)' },
          '75%': { transform: 'rotate(-0.5deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        'blink-caret': {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: '#3b82f6' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'spin-slow-centered': {
          from: { transform: 'translate(-50%, -50%) rotate(0deg)' },
          to: { transform: 'translate(-50%, -50%) rotate(360deg)' },
        },
        'line-fade-in': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'grid-scroll': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 4rem' },
        },
        'spin-reverse-slow': {
          from: { transform: 'translate(-50%, -50%) rotate(360deg)' },
          to: { transform: 'translate(-50%, -50%) rotate(0deg)' },
        },
        'data-drop': {
          '0%': { transform: 'translateY(-50%)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'modal-in': {
          from: { opacity: '0', transform: 'scale(0.96) translateY(10px)' },
          to: { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        'speed-lines': {
          '0%': { backgroundPosition: '-100% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'speed-lines-reverse': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-100% 0' },
        },
        'speed-stripes': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '100px 0' },
        },
        'speed-dot': {
          '0%': { transform: 'translateX(0) scale(1)', opacity: '0' },
          '10%': { opacity: '0.8' },
          '90%': { opacity: '0.8' },
          '100%': { transform: 'translateX(100vw) scale(0.3)', opacity: '0' },
        },
        'streak-pass': {
          '0%': { transform: 'rotate(-15deg) translateX(-100%) translateY(-50%)', opacity: '0' },
          '5%': { opacity: '0.6' },
          '95%': { opacity: '0.6' },
          '100%': { transform: 'rotate(-15deg) translateX(200vw) translateY(100%)', opacity: '0' },
        },
        'comet-fly': {
          '0%': { transform: 'translate(-100px, -100px)', opacity: '0' },
          '10%': { opacity: '0.9' },
          '90%': { opacity: '0.9' },
          '100%': { transform: 'translate(calc(100vw + 200px), calc(100vh + 200px))', opacity: '0' },
        },
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        gradient: 'gradient 5s ease infinite',
        stripes: 'stripes 1s linear infinite',
        jiggle: 'jiggle 0.3s cubic-bezier(.36,.07,.19,.97) both',
        'blink-caret': 'blink-caret 0.75s step-end infinite',
        'spin-slow': 'spin-slow 8s linear infinite',
        'spin-slow-centered': 'spin-slow-centered 40s linear infinite',
        'spin-reverse-slow': 'spin-reverse-slow 60s linear infinite',
        'line-fade-in': 'line-fade-in 0.3s ease-out forwards',
        'grid-scroll': 'grid-scroll 15s linear infinite',
        'data-drop': 'data-drop 3s ease-in-out infinite',
        'data-drop-delay-1': 'data-drop 4s ease-in-out infinite 1s',
        'data-drop-delay-2': 'data-drop 5s ease-in-out infinite 2.5s',
        float: 'float 6s ease-in-out infinite',
        'float-delay-1': 'float 6s ease-in-out infinite 1s',
        'float-delay-2': 'float 6s ease-in-out infinite 2s',
        'modal-in': 'modal-in 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'speed-lines': 'speed-lines 4s linear infinite',
        'speed-lines-fast': 'speed-lines 2s linear infinite',
        'speed-lines-reverse': 'speed-lines-reverse 5s linear infinite',
        'speed-stripes': 'speed-stripes 8s linear infinite',
        'speed-dot': 'speed-dot 6s linear infinite',
        'speed-dot-fast': 'speed-dot 3s linear infinite',
        'streak-pass': 'streak-pass 4s linear infinite',
        'streak-pass-fast': 'streak-pass 2s linear infinite',
        'grid-scroll-fast': 'grid-scroll 8s linear infinite',
        'comet-fly': 'comet-fly 8s linear infinite',
      },
      backgroundSize: {
        'gradient': '200% auto',
      },
      perspective: {
        '1000': '1000px',
      },
    },
  },
  plugins: [],
};

export default config;
