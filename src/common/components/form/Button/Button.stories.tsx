import type { Meta, StoryObj } from "@storybook/react-vite";

import Button from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
  parameters: { layout: "padded" },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Secondary: Story = {
  args: {
    children: "BUTTON",
    variant: "secondary",
  },
};

export const Primary: Story = {
  args: {
    children: "BUTTON",
    variant: "primary",
  },
};

export const Disabled: Story = {
  args: {
    children: "BUTTON",
    disabled: true,
  },
};
