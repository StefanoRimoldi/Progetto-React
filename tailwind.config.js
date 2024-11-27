/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        ancient: ['"Ancient Cursive"', 'cursive'],
        Montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  theme: {
    extend: {
      fontSize: {
        '11px': '11px',
      },
      colors: {
        'custom-light-blue': '#3A7BA0',
      },
    },
  },
  plugins: [],
};
