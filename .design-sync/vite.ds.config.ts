import path from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

/**
 * Library build for design-sync. Compiles the storied components (scss modules
 * resolved, css extracted) into a single ESM the converter wraps as
 * window.<Global>. The whole React family is externalized so the converter's
 * esbuild can shim it to window.React — bundling React here would create a
 * second instance and break hooks. Everything else (framer-motion, classnames)
 * is bundled.
 */
export default defineConfig({
  root: path.resolve(__dirname, ".."),
  publicDir: false,
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "../src") } },
  build: {
    outDir: path.resolve(__dirname, "ds-dist"),
    emptyOutDir: true,
    cssCodeSplit: false,
    // Inline ALL assets as data URLs — the design bundle ships only ds.js, so
    // any externalized asset file path (vite's default for >4KB images, e.g.
    // github-logo.png) would 404 in claude.ai/design and render as a broken
    // image. Self-contained data URLs are the only thing that works there.
    assetsInlineLimit: 10_000_000,
    lib: {
      entry: path.resolve(__dirname, "ds-entry.tsx"),
      formats: ["es"],
      fileName: () => "ds.js",
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react-dom/client",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "react-is",
        "scheduler",
      ],
    },
  },
});
