import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, type Plugin } from "vite";

import {
  BASE_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
} from "./src/common/constants/environment";

const injectMetadata: Plugin = {
  name: "inject-metadata",
  transformIndexHtml: {
    order: "pre",
    handler(html) {
      return html
        .replace(/%SITE_NAME%/g, SITE_NAME)
        .replace(/%SITE_DESCRIPTION%/g, SITE_DESCRIPTION)
        .replace(/%BASE_URL%/g, BASE_URL);
    },
  },
};

export default defineConfig({
  plugins: [react(), injectMetadata],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
});
