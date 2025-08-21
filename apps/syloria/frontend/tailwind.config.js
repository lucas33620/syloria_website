// tailwind.config.js — Syloria Landing Page

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        syloria: {
          primary: "#6B4CFF",   // violet
          night: "#16203A",     // bleu nuit
          accent: "#02C6FF",    // bleu clair
          coral: "#FF6F61",     // corail
          cloud: "#F4F7FB",     // gris très clair
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
};