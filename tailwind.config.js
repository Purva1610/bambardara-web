/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F4F3EE', panel: '#FFFFFF', ink: '#19302D', muted: '#71807C', line: 'rgba(25,48,45,0.09)',
        navy: '#0B2E2A', 'navy-2': 'rgba(244,243,238,0.06)', 'navy-3': 'rgba(244,243,238,0.10)',
        primary: '#123F3A', secondary: '#2F6258', accent: '#B8A77A',
        good: '#2F7D5A', 'good-bg': '#E8F2EC', warn: '#B7791F', 'warn-bg': '#FBF1DE',
        critical: '#C94B4B', 'critical-bg': '#FBE8E7'
      },
      fontFamily: { sans: ['Inter','ui-sans-serif','system-ui','sans-serif'], serif: ['Fraunces','Georgia','serif'] },
      borderRadius: { xl2: '14px' },
      boxShadow: { soft: '0 8px 28px rgba(25,48,45,0.06)' }
    }
  },
  plugins: []
}
