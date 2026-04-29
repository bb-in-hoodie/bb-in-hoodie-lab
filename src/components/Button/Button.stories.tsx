import type { Meta, StoryObj } from "@storybook/react-vite";

import Button from "./Button";

const meta: Meta<typeof Button> = {
  component: Button,
  args: {
    children: "Click me",
    variant: "primary",
    size: "medium",
    disabled: false,
  },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["primary", "secondary"],
    },
    size: {
      control: "inline-radio",
      options: ["small", "medium", "large"],
    },
    onClick: { action: "clicked" },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { variant: "secondary" },
};

export const Small: Story = {
  args: { size: "small" },
};

export const Large: Story = {
  args: { size: "large" },
};

export const Disabled: Story = {
  args: { disabled: true },
};
