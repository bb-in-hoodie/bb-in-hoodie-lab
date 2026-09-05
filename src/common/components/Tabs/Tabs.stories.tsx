import type { Meta, StoryObj } from "@storybook/react-vite";

import { MockDescription } from "@/common/components/Description/Description.mock";
import { MockControlPanel } from "@/common/components/form/ControlPanel/ControlPanel.mock";

import Tabs from "./Tabs";

const meta: Meta<typeof Tabs> = {
  component: Tabs,
  parameters: { layout: "padded" },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: {
    tabs: [
      { tabType: "description", label: "DESCRIPTION", panel: <MockDescription /> },
      { tabType: "controls", label: "CONTROLS", panel: <MockControlPanel /> },
    ],
  },
};

export const SingleTab: Story = {
  args: {
    tabs: [
      { tabType: "description", label: "DESCRIPTION", panel: <p>Only one tab.</p> },
    ],
  },
};
