/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#E6E6E6',
      'black': '#1E1E1E',
    },
    textColor: {
      "primary" : "var(--color-primary)",
      "secondary" : "var(--color-secondary)",
    },
    backgroundColor: {
      "primary" : "var(--color-primary)",
      "background" : "var(--color-background)",
      "secondary" : "var(--color-secondary)",
    },
    borderColor: {
      "secondary" : "var(--color-secondary)",
    },
    extend: {
      fontFamily: {
        serif: ['var(--piazzolla-font)', 'serif'],
        sans: ['var(--ibmPlexSans-font)', 'sans-serif'],
      },
      cursor: {
        'rightArrow': 'url(../public/right-arrow.svg), pointer',
        'leftArrow': 'url(../public/left-arrow.svg), pointer',
        'upArrow': 'url(../public/up-arrow.svg), pointer',
        'rightArrowDark': 'url(../public/right-arrow[dark].svg), pointer',
        'leftArrowDark': 'url(../public/left-arrow[dark].svg), pointer',
        'upArrowDark': 'url(../public/up-arrow[dark].svg), pointer',
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        marquee2: 'marquee2 25s linear infinite',
        fadeIn: 'fadeIn 1s linear once',
        fadeOut: 'fadeOut 1s linear once',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        fadeIn: {
          '0%': { transform: 'opacity(0%)' },
          '100%': { transform: 'opacity(100%)' },
        },
        fadeOut: {
          '0%': { transform: 'opacity(100%)' },
          '100%': { transform: 'opacity(0%)' },
        },
      },
    },
    spacing: {
      sm: '6px',
      md: '12px',
      lg: '24px',
    }
  },
  plugins: [],
}

