/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080e1b", // dark navy blue background
        navy: {
          950: "#050913",
          900: "#080e1b",
          850: "#0b1428",
          800: "#0f1b35",
          700: "#15264a",
          600: "#1e3768",
        },
        gold: {
          DEFAULT: "#c5a059",
          400: "#dfb86c",
          500: "#c5a059",
          600: "#b38d43",
          300: "#edd197",
          200: "#fae6be",
          100: "#fdf4e2",
        },
        primary: {
          DEFAULT: "#c5a059", // luxury gold from logo
          hover: "#dfb86c",
          dark: "#a67f33",
        },
      },
      fontFamily: {
        sans: ['"Montserrat"', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['"Montserrat"', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
