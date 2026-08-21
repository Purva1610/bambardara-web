module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        /* Existing token names, retuned to a deeper, warmer luxury palette. */
        'forest-green': '#0B3D2C',
        'luxury-gold': '#B08D3F',
        'dark-charcoal': '#21201E',
        'ivory-white': '#FAF8F3',
        'natural-brown': '#6B4A2B',
        'light-charcoal': '#6E6A63',

        /* Additions for the editorial layer. */
        'deep-forest': '#072A1E',
        'muted-gold': '#C9A86A',
        'warm-sand': '#F1EBDF',
        'stone': '#E3DCCD',
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'Playfair Display', 'serif'],
        body: ['Jost', 'Poppins', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      letterSpacing: {
        label: '0.22em',
        wider: '0.12em',
      },
      fontSize: {
        /* Small wide-tracked micro-labels used above every section heading. */
        label: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.22em' }],
        display: ['clamp(2.5rem, 6vw, 5.25rem)', { lineHeight: '1.04' }],
        section: ['clamp(1.875rem, 3.6vw, 3.25rem)', { lineHeight: '1.12' }],
      },
      maxWidth: {
        editorial: '78rem',
        prose: '38rem',
      },
      transitionTimingFunction: {
        luxe: 'cubic-bezier(0.22, 0.68, 0, 1)',
        curtain: 'cubic-bezier(0.76, 0, 0.24, 1)',
      },
      transitionDuration: {
        700: '700ms',
        1200: '1200ms',
      },
      keyframes: {
        'ken-burns': {
          '0%': { transform: 'scale(1) translate3d(0, 0, 0)' },
          '100%': { transform: 'scale(1.09) translate3d(0, -1.5%, 0)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'rule-in': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        'scroll-hint': {
          '0%, 100%': { opacity: '0.25', transform: 'scaleY(0.4)' },
          '50%': { opacity: '0.9', transform: 'scaleY(1)' },
        },
      },
      animation: {
        'ken-burns': 'ken-burns 18s ease-out forwards',
        'fade-up': 'fade-up 1s cubic-bezier(0.22, 0.68, 0, 1) forwards',
        'rule-in': 'rule-in 1.1s cubic-bezier(0.22, 0.68, 0, 1) forwards',
        'scroll-hint': 'scroll-hint 2.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
