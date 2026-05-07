import type { Meta, StoryObj } from "@storybook/react-vite";

import homeIcon from "@/common/assets/images/home.png";

import IconLink from "./IconLink";

const meta: Meta<typeof IconLink> = {
  component: IconLink,
  parameters: { layout: "padded" },
  args: {
    url: "https://bb-in-hoodie.dev",
    iconSrc: homeIcon,
    ariaLabel: "Homepage",
  },
};

export default meta;

type Story = StoryObj<typeof IconLink>;

export const Default: Story = {};
