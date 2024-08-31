import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

import node from "@astrojs/node";

import dotenv from "dotenv";

dotenv.config();

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
});
