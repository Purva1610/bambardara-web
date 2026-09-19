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
      boxShadow: { soft: '0 8px 28px rgba(25,48,45,0.06)' },
      keyframes: {
        fadeUp: { from: { opacity: '0', transform: 'translateY(10px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        scaleIn: { from: { opacity: '0', transform: 'scale(0.94)' }, to: { opacity: '1', transform: 'scale(1)' } },
        modalIn: { from: { opacity: '0', transform: 'translateY(15px) scale(0.98)' }, to: { opacity: '1', transform: 'translateY(0) scale(1)' } },
        docFadeUp: { from: { opacity: '0', transform: 'translateY(8px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        docPop: { from: { opacity: '0', transform: 'scale(0.96)' }, to: { opacity: '1', transform: 'scale(1)' } },
        slideIn: { from: { opacity: '0', transform: 'translateX(-12px)' }, to: { opacity: '1', transform: 'translateX(0)' } },
        riPulse: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '.55' } },
        riRingIn: { from: { strokeDashoffset: '100', opacity: '0' }, to: { opacity: '1' } }
      },
      animation: {
        'dashboard-fade': 'fadeUp 0.5s ease-out both',
        'dashboard-scale': 'scaleIn 0.7s ease-out both',
        'dashboard-modal': 'modalIn 0.25s ease-out both',
        'doc-fade': 'docFadeUp 0.4s ease-out both',
        'doc-pop': 'docPop 0.35s ease-out both',
        'proc-fade': 'fadeUp 0.45s ease-out both',
        'proc-scale': 'scaleIn 0.55s ease-out both',
        'proc-slide': 'slideIn 0.45s ease-out both',
        'proc-modal': 'modalIn 0.25s ease-out both',
        'ri-fade': 'fadeUp 0.45s ease-out both',
        'ri-scale': 'scaleIn 0.5s ease-out both',
        'ri-modal': 'modalIn 0.25s ease-out both',
        'ri-pulse': 'riPulse 2s ease-in-out infinite',
        'ri-ring': 'riRingIn 0.9s ease-out both'
      }
    }
  },
  plugins: []
}
