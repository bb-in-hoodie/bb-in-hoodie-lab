import type { Meta, StoryObj } from "@storybook/react-vite";

import Home from "./Home";

const meta: Meta<typeof Home> = {
  component: Home,
  parameters: { layout: "padded" },
  args: {
    url: "https://bb-in-hoodie.dev",
  },
};

export default meta;

type Story = StoryObj<typeof Home>;

export const Default: Story = {};
