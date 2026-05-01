import "@/common/styles/globals.scss";
import "./preview.scss";

import type { Preview } from "@storybook/react-vite";

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      default: "lab",
      values: [{ name: "lab", value: "#131313" }],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
