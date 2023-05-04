/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bezel-green' : '#1a3a32',
        'bezel-light-green' : '#1c7d67'
      }
    },
  },
  plugins: [],
}

