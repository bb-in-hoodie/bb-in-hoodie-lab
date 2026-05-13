import type { Meta, StoryObj } from "@storybook/react-vite";

import homeIcon from "@/common/assets/images/home.png";
import { DEV_HOME_URL } from "@/common/constants/environment";

import IconLink from "./IconLink";

const meta: Meta<typeof IconLink> = {
  component: IconLink,
  parameters: { layout: "padded" },
  args: {
    url: DEV_HOME_URL,
    iconSrc: homeIcon,
    ariaLabel: "Homepage",
  },
};

export default meta;

type Story = StoryObj<typeof IconLink>;

export const Default: Story = {};
