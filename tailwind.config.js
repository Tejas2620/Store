/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' }
        },
        drip: {
          '0%, 100%': { height: '0px', opacity: 0 },
          '50%': { height: 'var(--drip-height)', opacity: 1 }
        }
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
        'drip': 'drip 2s ease-in-out infinite',
      },
      fontFamily: {
        marker: ['Permanent Marker', 'cursive'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar'), // Make sure this plugin is installed
  ],
}