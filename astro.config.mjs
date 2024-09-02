import { defineConfig, envField } from "astro/config";
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  output: "server",
  adapter: vercel(),
  experimental: {
    env: {
      schema: {
        EMAIL_USER: envField.string({
          context: "server",
          access: "public",
          required: true,
        }),
        EMAIL_PASSWORD: envField.string({
          context: "server",
          access: "secret",
          required: true,
        }),
        RECAPTCHA_SECRET_KEY: envField.string({
          context: "server",
          access: "secret",
          required: true,
        }),
      },
    },
  },
});