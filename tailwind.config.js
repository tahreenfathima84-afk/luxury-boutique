/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: '#faf6ee',
          50: '#fdfbf7',
          100: '#faf6ee',
          200: '#f4ecdd',
          300: '#ece0c8',
          400: '#e0d0ad',
        },
        emerald: {
          DEFAULT: '#0b5d4b',
          50: '#e8f3f0',
          100: '#cfe6df',
          200: '#9fcdbf',
          300: '#5fa28f',
          400: '#2f7d68',
          500: '#0b5d4b',
          600: '#094d3e',
          700: '#073d31',
          800: '#052e25',
          900: '#031f19',
        },
        champagne: {
          DEFAULT: '#c5a572',
          50: '#fbf7ee',
          100: '#f5ecd6',
          200: '#ead9ad',
          300: '#dcc480',
          400: '#c5a572',
          500: '#b6925a',
          600: '#997948',
          700: '#755c38',
          800: '#523f28',
        },
        ruby: {
          DEFAULT: '#9b1c2e',
          50: '#fbe9ec',
          100: '#f5cdd4',
          200: '#e88fa0',
          300: '#d4566e',
          400: '#b7334b',
          500: '#9b1c2e',
          600: '#7d1625',
          700: '#5e111c',
          800: '#420c14',
        },
        beige: {
          DEFAULT: '#e8dfd0',
          100: '#f2ece1',
          200: '#e8dfd0',
          300: '#d9ccb7',
          400: '#c9b89d',
        },
        ink: {
          DEFAULT: '#1a1714',
          900: '#1a1714',
          800: '#2a2520',
          700: '#3a342d',
        },
        stone: {
          DEFAULT: '#6b645c',
          400: '#8a8278',
          500: '#6b645c',
          600: '#524c45',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Jost', 'Helvetica', 'Arial', 'sans-serif'],
      },
      letterSpacing: {
        'ultra-wide': '0.3em',
        'wide-2': '0.18em',
      },
      fontSize: {
        'display': ['clamp(2.75rem, 7vw, 6.5rem)', { lineHeight: '1.02', letterSpacing: '-0.01em' }],
        'hero': ['clamp(2.25rem, 5.5vw, 4.5rem)', { lineHeight: '1.05', letterSpacing: '0.01em' }],
      },
      boxShadow: {
        'luxury': '0 30px 60px -25px rgba(26,23,20,0.35)',
        'luxury-lg': '0 50px 100px -30px rgba(26,23,20,0.45)',
        'gold': '0 20px 50px -20px rgba(181,146,90,0.45)',
        'glass': '0 8px 32px -8px rgba(26,23,20,0.18)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.75rem',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'silk': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'silk-drape': {
          '0%': { transform: 'translateX(-100%) skewX(-12deg)', opacity: '0' },
          '40%': { opacity: '0.9' },
          '100%': { transform: 'translateX(100%) skewX(-12deg)', opacity: '0' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'float-slow': {
          '0%,100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-22px) rotate(3deg)' },
        },
        'float-soft': {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-rev': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'pulse-gold': {
          '0%,100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.4)' },
        },
        'gradient-pan': {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'ripple': {
          '0%': { transform: 'scale(0)', opacity: '0.5' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.9s cubic-bezier(0.22,1,0.36,1) both',
        'fade-in': 'fade-in 1.2s ease both',
        'silk-drape': 'silk-drape 2.6s cubic-bezier(0.65,0,0.35,1) forwards',
        'shimmer': 'shimmer 3s linear infinite',
        'float-slow': 'float-slow 7s ease-in-out infinite',
        'float-soft': 'float-soft 5s ease-in-out infinite',
        'spin-slow': 'spin-slow 22s linear infinite',
        'marquee': 'marquee 40s linear infinite',
        'marquee-rev': 'marquee-rev 40s linear infinite',
        'pulse-gold': 'pulse-gold 3s ease-in-out infinite',
        'gradient-pan': 'gradient-pan 8s ease infinite',
        'ripple': 'ripple 0.7s ease-out forwards',
      },
      backgroundImage: {
        'gold-shimmer': 'linear-gradient(110deg, transparent 25%, rgba(197,165,114,0.35) 50%, transparent 75%)',
      },
    },
  },
  plugins: [],
};
