import type { Meta, StoryObj } from "@storybook/react-vite";

import Description from "./Description";
import { MockDescription } from "./Description.mock";

const meta: Meta<typeof Description> = {
  component: Description,
  parameters: { layout: "padded" },
};

export default meta;

type Story = StoryObj<typeof Description>;

export const Default: Story = {
  render: () => <MockDescription />,
};
