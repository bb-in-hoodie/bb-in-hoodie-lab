import type { Meta, StoryObj } from "@storybook/react-vite";

import { DEV_HOME_URL } from "@/common/constants/environment";

import Home from "./Home";

const meta: Meta<typeof Home> = {
  component: Home,
  parameters: { layout: "padded" },
  args: {
    url: DEV_HOME_URL,
  },
};

export default meta;

type Story = StoryObj<typeof Home>;

export const Default: Story = {};
