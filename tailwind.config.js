<<<<<<< HEAD
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        card: 'var(--color-card)',
        text: 'var(--color-text)',
        muted: 'var(--color-muted)',
        primary: 'var(--color-primary)',
        'primary-dark': 'var(--color-primary-dark)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        line: 'var(--color-border)',
        sidebar: 'var(--sidebar-bg)',
        'sidebar-hover': 'var(--sidebar-hover)',
        'sidebar-active': 'var(--sidebar-active)',
        'sidebar-text': 'var(--sidebar-text)',
        'sidebar-text-muted': 'var(--sidebar-text-muted)',
      },
      fontFamily: {
        serif: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(11, 46, 42, 0.03), 0 6px 20px -14px rgba(11, 46, 42, 0.14)',
        lift: '0 12px 32px -16px rgba(11, 46, 42, 0.24)',
      },
      borderRadius: {
        xl2: '0.75rem',
=======
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        'forest-green': '#0B5D3A',
        'luxury-gold': '#D4AF37',
        'dark-charcoal': '#333333',
        'ivory-white': '#F8F4E9',
        'natural-brown': '#8B4513',
        'light-charcoal': '#666666',
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Poppins', 'sans-serif'],
>>>>>>> 10970a82d09de78b1c67f420c129bcca18ea10b2
      },
    },
  },
  plugins: [],
<<<<<<< HEAD
}
=======
};
>>>>>>> 10970a82d09de78b1c67f420c129bcca18ea10b2
