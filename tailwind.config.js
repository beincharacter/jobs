/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      transform: {
        "revert-layer" : "revert-layer"
      }
    },
  },
  plugins: [],
}