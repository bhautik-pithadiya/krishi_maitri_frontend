/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4CAF50',
        secondary: '#FFFFFF',
        accent: '#F4F4F4',
        brown: '#8D6E63',
        earth: {
          50: '#f9f7f4',
          100: '#f4f1e8',
          200: '#e8e0d0',
          300: '#d7cab1',
          400: '#c5b192',
          500: '#b39973',
          600: '#a08660',
          700: '#8d6e63',
          800: '#6d5346',
          900: '#4a3729',
        }
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
      },
      fontSize: {
        'heading': ['24px', { lineHeight: '32px', fontWeight: '700' }],
        'subheading': ['18px', { lineHeight: '24px', fontWeight: '600' }],
        'body': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'small': ['14px', { lineHeight: '20px', fontWeight: '400' }],
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
