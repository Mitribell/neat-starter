module.exports = {
  content: ["./src/**/*.html", "./public/**/*.html"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        coral: "#d95e47",
        olive: "#5a5d4f",
        neon: "#b9f73a",
        milk: "#f2f1ec",
        dark: "#2a2a2a",
      },
    },
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
