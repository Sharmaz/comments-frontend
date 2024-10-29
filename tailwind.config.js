/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#282C34',
        background: '#07071C',
        heliotrope: '#E963FD',
        'dark-orchid': '#8233C5',
        'metallic-blue': '#274B74',
        'orange-peel': '#FDA000',
        'vivid-cerise': '#D3208B',
        'light-cobalt': '#879AF2',
      },
      dropShadow: {
        '3xl': '0.15rem 0rem 0 #8233C5',
        '2xl': '3px 2px 0 #8233C5',
      },
      animation: {
        'purple-animation': 'animationGradient 2s ease alternate infinite',
        'spin-slow': 'spin 5s linear infinite',
        'text-gradient': 'animationText ease-in-out 9s infinite',
      },
      keyframes: {
        animationGradient: {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '50% 100%' },
          '100%': { 'background-position': '100% 0%' },
        },
        animationText: {
          '0%, 16.667%, 100%': { opacity: 1 },
          '33.333%, 83.333%': { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
}
