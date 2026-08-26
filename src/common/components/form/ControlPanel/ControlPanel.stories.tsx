import type { Meta, StoryObj } from "@storybook/react-vite";

import ControlPanel from "./ControlPanel";
import { MockControlPanel } from "./ControlPanel.mock";

const meta: Meta<typeof ControlPanel> = {
  component: ControlPanel,
  parameters: { layout: "padded" },
};

export default meta;

type Story = StoryObj<typeof ControlPanel>;

export const Default: Story = {
  render: () => <MockControlPanel />,
};
