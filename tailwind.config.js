/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purpleLight: '#A881E6',
        purpleNormal: '#7450AC',
        purpleDark: '#523480',
        gray: {
          '100': '#FBF9FE',
          '200': '#AFABB6',
          '300': '#252529',
          '400': '#17171A',
          '500': '#111112',
          '600': '#0C0C0D',
          '800': '#EDEAF0'
        },
        successLight: '#4E995E',
        success: '#2F723D',
        pink: '#DB5BBF',
        pinkDark: '#251622',
        orange: '#E07B67',
        orangeDark: '#261A17',
        yellow: '#BB9F3A',
        yellowDark: '#211E12',
        green: '#8CAD51',
        greenDark: '#1C2015',
        blue: '#7B94CB',
        blueDark: '#1A1D23'
      },
      screens: {
        '2xl': {'max': '1535px'},
        // => @media (max-width: 1535px) { ... }
  
        'xl': {'max': '1279px'},
        // => @media (max-width: 1279px) { ... }
  
        'lg': {'max': '1023px'},
        // => @media (max-width: 1023px) { ... }
  
        'md': {'max': '767px'},
        // => @media (max-width: 767px) { ... }
  
        'sm': {'max': '500px'},
        // => @media (max-width: 425px) { ... }
      }
    },
  },
  plugins: [],
}

