const { relative } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  // https://tailwindcss.com/docs/dark-mode
  darkMode: 'selector',
  // https://tailwindcss.com/docs/content-configuration#using-relative-paths
  content: {
    relative: true,
    files: [
      "./src/lib/components/**/*.{html,js,jsx,ts,tsx}",
      "./src/lib/constants/**/*.{html,js,jsx,ts,tsx}",
      "./src/lib/helpers/**/*.{html,js,jsx,ts,tsx}",
      "./src/lib/services/**/*.{html,js,jsx,ts,tsx}",
      "./src/**/*.{html,js,jsx,ts,tsx}",
      './public/index.html',
      './index.html',
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [
    // require("@tailwindcss/oxide"),
    // require("@tailwindcss/line-clamp")
  ],
}
