import { promises as fs } from "node:fs";
import path from "node:path";

import react from "@vitejs/plugin-react";
import { parse } from "node-html-parser";
import { defineConfig, type Plugin } from "vite";

import {
  BASE_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
} from "./src/common/constants/environment";
import { formatPageTitle } from "./src/common/helpers/metadata";
import { type RouteMetadata, ROUTES } from "./src/common/routes/manifest";

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

const prerenderRoutes: Plugin = {
  name: "prerender-routes",
  apply: "build",
  async closeBundle() {
    const distDir = path.resolve(__dirname, "dist");
    const baseHtml = await fs.readFile(
      path.join(distDir, "index.html"),
      "utf-8",
    );

    for (const { path: routePath, metadata } of ROUTES) {
      const html = applyRouteMetadata(baseHtml, routePath, metadata);
      const outDir = path.join(distDir, routePath);
      await fs.mkdir(outDir, { recursive: true });
      await fs.writeFile(path.join(outDir, "index.html"), html);
    }
  },
};

function applyRouteMetadata(
  html: string,
  routePath: string,
  { title, description }: RouteMetadata,
): string {
  const fullTitle = formatPageTitle(title);
  const canonical = `${BASE_URL}${routePath}/`;

  const root = parse(html);

  const titleEl = root.querySelector("title");
  if (titleEl) titleEl.set_content(fullTitle);

  const setMeta = (selector: string, content: string) => {
    const el = root.querySelector(selector);
    if (el) el.setAttribute("content", content);
  };

  setMeta('meta[property="og:title"]', fullTitle);
  setMeta('meta[name="twitter:title"]', fullTitle);
  setMeta('meta[name="description"]', description);
  setMeta('meta[property="og:description"]', description);
  setMeta('meta[name="twitter:description"]', description);
  setMeta('meta[property="og:url"]', canonical);

  return root.toString();
}

export default defineConfig({
  plugins: [react(), injectMetadata, prerenderRoutes],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
});
