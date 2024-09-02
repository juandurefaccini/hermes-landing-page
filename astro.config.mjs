import { defineConfig, envField } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    react({
      // Options
      experimentalReactChildren: true,
    }),
  ],
  output: "server",
  adapter: node({
    mode: "standalone",
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
