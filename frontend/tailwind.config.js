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
      'white': '#F5F5F5',
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
    },
    spacing: {
      sm: '6px',
      md: '12px',
      lg: '24px',
    }
  },
  plugins: [],
}

