/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1c1916",
        "ink-soft": "#5a534c",
        paper: "#f4f0ea",
        "paper-deep": "#e8e2d8",
        surface: "#fffdf9",
        accent: {
          DEFAULT: "#2f6a52",
          deep: "#214c3a",
        },
        glow: "#c4a574",
      },
      fontFamily: {
        display: ["Outfit", "Avenir Next", "sans-serif"],
        body: ["Source Serif 4", "Georgia", "serif"],
        ui: ["Outfit", "Avenir Next", "sans-serif"],
      },
      maxWidth: {
        shell: "72rem",
      },
      boxShadow: {
        soft: "0 18px 50px rgba(28, 25, 22, 0.08)",
        lift: "0 24px 60px rgba(28, 25, 22, 0.12)",
      },
    },
  },
  plugins: [],
};
