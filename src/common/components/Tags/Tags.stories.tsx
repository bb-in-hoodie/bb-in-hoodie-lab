import type { Meta, StoryObj } from "@storybook/react-vite";

import Tags from "./Tags";

const meta: Meta<typeof Tags> = {
  component: Tags,
  parameters: { layout: "padded" },
  args: {
    tags: ["THREE.JS", "FBO", "PARTICLES", "REACT"],
  },
};

export default meta;

type Story = StoryObj<typeof Tags>;

export const Default: Story = {};
