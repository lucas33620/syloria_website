export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        violetSyl: "#2D0A4E",
        bleuSyl:   "#1E90FF",
        corailSyl: "#FF4D94",
        noirSyl:   "#0A0A0A",
        grisSyl:   "#F5F5F5",
      },
      fontFamily: {
        inter:   ['Inter', 'ui-sans-serif', 'system-ui'],
        poppins: ['Poppins', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}
