/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
    colors: {
      primary: "#3AC265",
      secondary: "#f4f4f5",
      background: "#FFFAFA",
      text: "#0A2915",
      debug: "#FF0000",
    },
  },
  plugins: [],
};
