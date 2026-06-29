import type { StorybookConfig } from "@storybook/react-vite";

// App-only Vite plugins that have no place in a Storybook build: they target
// the app's index.html / dist output (prerender-routes reads ./dist/index.html
// in closeBundle, which doesn't exist during a Storybook build and makes it
// exit non-zero). Stripped via viteFinal below.
const APP_ONLY_PLUGINS = new Set(["inject-metadata", "prerender-routes"]);

const config: StorybookConfig = {
  stories: [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: ["@storybook/addon-a11y", "@storybook/addon-docs"],
  framework: "@storybook/react-vite",
  viteFinal(config) {
    config.plugins = (config.plugins ?? []).filter(
      (p) => !(p && typeof p === "object" && "name" in p && APP_ONLY_PLUGINS.has(p.name as string)),
    );
    return config;
  },
};

export default config;
