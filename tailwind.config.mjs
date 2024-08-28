/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "#3AC265",
        secondary: "#FFFAFA",
        background: "#FFFAFA",
        text: "#272727",
        debug: "#FF0000",
      },
    },
  },
  plugins: [],
};
