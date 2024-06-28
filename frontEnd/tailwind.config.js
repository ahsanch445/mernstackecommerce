/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      // Enable responsive variants for all utilities
      responsive: true,
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
