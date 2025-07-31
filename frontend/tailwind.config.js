module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff1f7', // pastel pink
          100: '#ffe4ec',
          200: '#ffb8d2',
          300: '#ff8ab8',
          400: '#ff5c9e',
          500: '#ff2e84', // main pink
          600: '#e02674',
          700: '#b01e5a',
          800: '#801540',
          900: '#500c26',
        },
        accent: {
          50: '#e0f7fa', // pastel mint
          100: '#b2ebf2',
          200: '#80deea',
          300: '#4dd0e1',
          400: '#26c6da',
          500: '#00bcd4', // main mint
          600: '#00acc1',
          700: '#0097a7',
          800: '#00838f',
          900: '#006064',
        },
        sky: {
          50: '#e3f2fd',
          100: '#bbdefb',
          200: '#90caf9',
          300: '#64b5f6',
          400: '#42a5f5',
          500: '#2196f3', // main sky blue
        },
        lavender: {
          50: '#f3e8ff',
          100: '#e9d5ff',
          200: '#d8b4fe',
          300: '#c084fc',
          400: '#a78bfa',
          500: '#8b5cf6', // main lavender
        },
        yellow: {
          50: '#fffde7',
          100: '#fff9c4',
          200: '#fff59d',
          300: '#fff176',
          400: '#ffee58',
          500: '#ffeb3b', // main yellow
        },
        gold: {
          50: '#fffbe6',
          100: '#fff3bf',
          200: '#ffe066',
          300: '#ffd700', // main gold
          400: '#ffc300',
          500: '#ffb300',
          600: '#ff9900',
          700: '#cc7a00',
          800: '#b38600',
          900: '#806600',
        },
        rose: {
          50: '#fff0f6',
          100: '#ffdeeb',
          200: '#fcc2d7',
          300: '#faa2c1',
          400: '#f783ac',
          500: '#f06595',
          600: '#e64980',
          700: '#d6336c',
          800: '#c2255c',
          900: '#a61e4d',
        },
        'cute-primary': '#ffb8d2', // pastel pink
        'cute-accent': '#b2ebf2', // pastel mint
        'cute-bg': '#fffafc', // off-white
        'cute-card': '#fff',
        'cute-yellow': '#fff59d',
        'cute-lavender': '#e9d5ff',
        'cute-sky': '#bbdefb',
      },
      fontFamily: {
        sans: ['Quicksand', 'Nunito', 'Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        rounded: ['Quicksand', 'Nunito', 'Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
      },
      borderRadius: {
        DEFAULT: '1.5rem',
        xl: '2rem',
        '2xl': '2.5rem',
        '3xl': '3rem',
        full: '9999px',
      },
      boxShadow: {
        cute: '0 4px 24px 0 rgba(255,184,210,0.12)',
        card: '0 2px 12px 0 rgba(33,150,243,0.10)',
        gold: '0 4px 24px 0 rgba(255,215,0,0.10)',
        rose: '0 4px 24px 0 rgba(240,101,149,0.10)',
      },
    },
  },
  plugins: [],
}