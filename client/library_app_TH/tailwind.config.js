/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['Vazirmatn', 'Tahoma', 'sans-serif'], // فونت پیشنهادی برای فارسی
        },
      },
    },
    plugins: [],
  }