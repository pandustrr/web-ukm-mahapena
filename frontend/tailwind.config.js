// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        // Tambahkan warna custom Anda
        custom: {
          black: "#000000",
          navy: "#113F67",
          blue: "#3674B5",
          lightblue: "#5682B1",
          sky: "#A1E3F9",
          white: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};
