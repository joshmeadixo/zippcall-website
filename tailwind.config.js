/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'zippcall-blue': '#1A4971',
        'zippcall-light-blue': '#55AADD',
        'zippcall-yellow': '#FFCC33',
        'zippcall-cream': '#FFF8E1',
        'zippcall-neutral': '#2A303C',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light"],
  },
} 