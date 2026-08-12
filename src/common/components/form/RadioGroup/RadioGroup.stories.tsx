import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import RadioGroup, { type RadioGroupProps, type RadioOption } from "./RadioGroup";

const MODE_OPTIONS: RadioOption[] = [
  { value: "drift", label: "drift" },
  { value: "orbit", label: "orbit" },
  { value: "pulse", label: "pulse" },
];

const meta: Meta<typeof RadioGroup> = {
  component: RadioGroup,
  parameters: { layout: "padded" },
};

export default meta;

type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  args: {
    label: "mode",
    options: MODE_OPTIONS,
  },
  render: (args) => <StatefulRadioGroup {...args} />,
};

export const WithoutLabel: Story = {
  render: () => <StatefulRadioGroup options={MODE_OPTIONS} />,
};

function StatefulRadioGroup({ label, options = [], className }: Partial<RadioGroupProps>) {
  const [value, setValue] = useState(options[0]?.value ?? "");
  return (
    <RadioGroup
      label={label}
      options={options}
      value={value}
      onChange={setValue}
      className={className}
    />
  );
}
