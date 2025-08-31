/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          background: '#ECECEC',
          dark: '#1F1E1E',
          light: '#F0F0F0',
          'dark-secondary': '#302F30',
          identity: '#EB1B26',
        },
      },
    },
  },
  plugins: [],
}
