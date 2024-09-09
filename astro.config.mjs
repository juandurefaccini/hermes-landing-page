import { defineConfig, envField } from "astro/config";
import tailwind from "@astrojs/tailwind";

import vercel from "@astrojs/vercel/serverless";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), icon()],
  output: "server",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    imageService: true,
    isr: true,
    edgeMiddleware: true,
  }),
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
