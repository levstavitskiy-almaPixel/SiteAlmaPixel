/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: { 
    extend: {
      fontFamily: {
        'chiron-heading': ['ChironGoRoundTC', 'sans-serif'],
        'chiron-body': ['ChironGoRoundTC', 'sans-serif'],
        'kosugi': ['KosugiMaru', 'sans-serif'],
      },
      fontWeight: {
        'heading': '800',
        'body': '400',
      }
    }
  },
  plugins: [],
}