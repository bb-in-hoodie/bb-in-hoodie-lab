import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import Checkbox, { type CheckboxProps } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  parameters: { layout: "padded" },
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    label: "trails",
  },
  render: (args) => <StatefulCheckbox {...args} />,
};

export const WithoutLabel: Story = {
  args: {
    ariaLabel: "enable trails",
  },
  render: (args) => <StatefulCheckbox {...args} />,
};

function StatefulCheckbox({ label, ariaLabel, className }: Partial<CheckboxProps>) {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      label={label}
      ariaLabel={ariaLabel}
      className={className}
      checked={checked}
      onChange={setChecked}
    />
  );
}
