/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
    colors: {
      primary: "#3AC265",
      background: "#F2FBF5",
      text: "#0A2915",
      debug: "#FF0000",
    },
  },
  plugins: [],
};
