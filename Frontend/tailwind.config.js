/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/*.{js,ts,jsx,tsx}", // Ek extra security line
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
