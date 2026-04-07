/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./**/*.html",
    "./**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#FF5700",
        "secondary": "#0a0a0a",
        "background-light": "#ffffff",
        "background-dark": "#1a0e08",
        "dark": "#0a0c10",
        "darker": "#030201",
        "light": "#ffffff",
        "light-gray": "#f8fafc",
      },
      fontFamily: {
        "display": ["Orbitron", "sans-serif"],
        "body": ["Exo 2", "sans-serif"],
        "accent": ["Montserrat", "sans-serif"],
      },
      borderRadius: {
        "DEFAULT": "0rem",
        "lg": "0.5rem",
        "xl": "1rem",
        "full": "9999px"
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ],
}
