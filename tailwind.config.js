/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainBG: '#111216',
        layoutBG: '#14161d',
        buttonColor: '#212430',
        buttonColorHover: '#2a2e3c'
      }
    },
  },
  plugins: [],
}

