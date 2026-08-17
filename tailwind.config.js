/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.tsx',
    './src/pages/**/*.tsx',
    './src/app/**/*.tsx',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        kn: {
          cream: {
            DEFAULT: 'var(--kn-cream)',
            warm: 'var(--kn-cream-warm)',
          },
          parchment: 'var(--kn-parchment)',
          forest: 'var(--kn-forest)',
          moss: 'var(--kn-moss)',
          sage: 'var(--kn-sage)',
          mint: 'var(--kn-mint)',
          bark: 'var(--kn-bark)',
          amber: 'var(--kn-amber)',
          terracotta: 'var(--kn-terracotta)',
          sand: 'var(--kn-sand)',
          charcoal: 'var(--kn-charcoal)',
          stone: 'var(--kn-stone)',
          fog: 'var(--kn-fog)',
          white: 'var(--kn-white)',
        },
        obsidian: {
          DEFAULT: 'var(--color-obsidian)',
          alt: 'var(--color-obsidian-alt)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          gold: 'var(--color-accent-gold)',
        },
        surface: {
          DEFAULT: 'var(--color-surface)',
          card: 'var(--color-surface-card)',
        },
        text: {
          DEFAULT: 'var(--color-text)',
          muted: 'var(--color-text-muted)',
          dim: 'var(--color-text-dim)',
          light: '#AEAEB2',
        },
        border: 'var(--color-border)',
        success: 'var(--color-success)',
        error: 'var(--color-error)',
      },
      fontFamily: {
        outfit: ['var(--font-outfit)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
        syne: ['var(--font-syne)', 'sans-serif'],
        serif: ['var(--font-serif)', 'serif'],
      },
      letterSpacing: {
        widest: '0.3em',
        tighter: '-0.05em',
      },
    },
  },
  plugins: [],
};
