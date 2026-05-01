import type { Meta, StoryObj } from "@storybook/react-vite";

import GitHub from "./GitHub";

const meta: Meta<typeof GitHub> = {
  component: GitHub,
  parameters: { layout: "padded" },
  args: {
    url: "https://github.com/bb-in-hoodie/bb-in-hoodie-lab",
  },
};

export default meta;

type Story = StoryObj<typeof GitHub>;

export const Default: Story = {};
