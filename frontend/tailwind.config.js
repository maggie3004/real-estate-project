module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
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
        gold: {
          50: '#fffbe6',
          100: '#fff3bf',
          200: '#ffe066',
          300: '#ffd700', // main gold
          400: '#ffc300',
          500: '#ffb300',
          600: '#ff9900',
        },
        // Pure black theme colors
        dark: {
          50: '#f8f9fa',
          100: '#e9ecef',
          200: '#dee2e6',
          300: '#ced4da',
          400: '#adb5bd',
          500: '#6c757d',
          600: '#495057',
          700: '#343a40',
          800: '#212529',
          900: '#000000', // pure black
        },
      },
      boxShadow: {
        cute: '0 4px 24px 0 rgba(255,184,210,0.12)',
        card: '0 2px 12px 0 rgba(33,150,243,0.10)',
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'ui-sans-serif', 'system-ui'],
        playfair: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}