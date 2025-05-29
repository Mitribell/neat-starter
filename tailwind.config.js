module.exports = {
  content: ["./src/**/*.html", "./public/**/*.html"],
  safelist: [
    "my-0",
    "my-1",
    "my-2",
    "my-3",
    "my-4",
    "my-5",
    "my-6",
    "my-7",
    "my-8",
  ],
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
