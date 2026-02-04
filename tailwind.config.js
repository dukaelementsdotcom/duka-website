/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // ✅ FIXED: Custom color utilities to replace opacity-75 with proper contrast
      colors: {
        'low-contrast': '#9ca3af', // text-gray-500 - proper contrast instead of opacity
      },
    },
  },
  plugins: [],
}