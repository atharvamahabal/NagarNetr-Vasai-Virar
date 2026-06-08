/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FACC15", // Vibrant Yellow (Tailwind yellow-400)
        secondary: "#1E40AF", // Deep Blue (Tailwind blue-800)
      },
    },
  },
  plugins: [],
}
