const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./components/**/*.{ts,tsx,js,jsx}', './pages/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: colors.lime,

        background: {
          DEFAULT: '#111111',
          200: '#666666',
          300: '#595959',
          400: '#4d4d4d',
          500: '#404040',
          600: '#333333',
          700: '#262626',
          800: '#1a1a1a',
          900: '#1C1C1C',
        },
        typography: {
          DEFAULT: '#FFFFFF',
        },
      },
    },
  },

  plugins: [],
}
