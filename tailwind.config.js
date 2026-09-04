module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        /* Ultra-Luxury Palette - Refined & Opulent */
        'forest-green': '#0A4D2E',
        'luxury-gold': '#C9A961',
        'rich-gold': '#D4B560',
        'rose-gold': '#E8C4A0',
        'champagne': '#F7E7CE',
        'dark-charcoal': '#1A1916',
        'ivory-white': '#FFFBF5',
        'cream': '#FFF9F0',
        'natural-brown': '#5C3D28',
        'light-charcoal': '#665F54',
        
        /* Deep, Sophisticated Tones */
        'deep-forest': '#062018',
        'midnight-green': '#0D3B2F',
        'muted-gold': '#B39558',
        'bronze': '#A67C52',
        'warm-sand': '#F5EFE6',
        'stone': '#E8E0D5',
        'soft-beige': '#F8F4ED',
        
        /* Accent Colors */
        'emerald': '#116B4C',
        'copper': '#B87333',
        'pearl': '#F0EAE2',
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', '"Playfair Display"', 'serif'],
        subheading: ['"Gilda Display"', 'serif'],
        body: ['"Inter"', 'Poppins', 'sans-serif'],
        accent: ['"Cinzel"', 'serif'],
        mono: ['"Space Mono"', '"IBM Plex Mono"', 'monospace'],
      },
      letterSpacing: {
        label: '0.28em',
        wider: '0.15em',
        widest: '0.35em',
        luxury: '0.12em',
      },
      fontSize: {
        /* Ultra-refined typography scale */
        label: ['0.625rem', { lineHeight: '1.1', letterSpacing: '0.28em', fontWeight: '500' }],
        display: ['clamp(3rem, 7vw, 6.5rem)', { lineHeight: '1.02', letterSpacing: '-0.03em' }],
        section: ['clamp(2.25rem, 4.5vw, 4rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        feature: ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
      maxWidth: {
        editorial: '82rem',
        prose: '42rem',
        luxury: '90rem',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
        26: '6.5rem',
        30: '7.5rem',
      },
      boxShadow: {
        'luxury': '0 20px 60px rgba(0, 0, 0, 0.08), 0 8px 20px rgba(0, 0, 0, 0.04)',
        'luxury-lg': '0 40px 100px rgba(0, 0, 0, 0.12), 0 15px 40px rgba(0, 0, 0, 0.06)',
        'gold': '0 8px 32px rgba(201, 169, 97, 0.25)',
        'gold-lg': '0 20px 60px rgba(201, 169, 97, 0.35)',
        'soft': '0 4px 16px rgba(0, 0, 0, 0.03)',
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionTimingFunction: {
        luxe: 'cubic-bezier(0.19, 1, 0.22, 1)',
        curtain: 'cubic-bezier(0.76, 0, 0.24, 1)',
        elegant: 'cubic-bezier(0.4, 0, 0.2, 1)',
        smooth: 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      transitionDuration: {
        400: '400ms',
        600: '600ms',
        700: '700ms',
        800: '800ms',
        900: '900ms',
        1200: '1200ms',
        1500: '1500ms',
        2000: '2000ms',
      },
      keyframes: {
        'ken-burns': {
          '0%': { transform: 'scale(1) translate3d(0, 0, 0)' },
          '100%': { transform: 'scale(1.12) translate3d(0, -2%, 0)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(60px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'rule-in': {
          '0%': { transform: 'scaleX(0)', opacity: '0' },
          '100%': { transform: 'scaleX(1)', opacity: '1' },
        },
        'scroll-hint': {
          '0%, 100%': { opacity: '0.3', transform: 'translateY(0)' },
          '50%': { opacity: '1', transform: 'translateY(8px)' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'slide-in': {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'glow': {
          '0%, 100%': { opacity: '0.5', filter: 'brightness(1)' },
          '50%': { opacity: '0.8', filter: 'brightness(1.2)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        'ken-burns': 'ken-burns 22s ease-out forwards',
        'fade-up': 'fade-up 1.2s cubic-bezier(0.19, 1, 0.22, 1) forwards',
        'fade-in': 'fade-in 1s ease-out forwards',
        'slide-up': 'slide-up 1.4s cubic-bezier(0.19, 1, 0.22, 1) forwards',
        'rule-in': 'rule-in 1.4s cubic-bezier(0.19, 1, 0.22, 1) forwards',
        'scroll-hint': 'scroll-hint 2.5s ease-in-out infinite',
        'marquee': 'marquee 40s linear infinite',
        'slide-in': 'slide-in 0.4s ease-out forwards',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'scale-in': 'scale-in 0.8s cubic-bezier(0.19, 1, 0.22, 1) forwards',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.hover\\:pause:hover': {
          'animation-play-state': 'paused',
        },
      });
    },
  ],
};
