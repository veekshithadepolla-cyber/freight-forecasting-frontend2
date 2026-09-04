/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        navy: {
          975: "#070d18",
          925: "#0b1422",
          900: "#0c1628",
        },
      },

      boxShadow: {
        card: "0 8px 30px rgba(0, 0, 0, 0.25)",
        "card-hover": "0 12px 40px rgba(0, 0, 0, 0.35)",
      },
    },
  },

  plugins: [],
};