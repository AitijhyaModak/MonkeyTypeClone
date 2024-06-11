/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      "2xl": { max: "1535px" },

      xl: { max: "1279px" },

      lg: { max: "1023px" },

      md: { max: "767px" },

      sm: { max: "700px" },
    },
    extend: {
      screens: {
        sma: "701px",
        lga: "1024px",
      },
    },
  },
  plugins: [],
};
