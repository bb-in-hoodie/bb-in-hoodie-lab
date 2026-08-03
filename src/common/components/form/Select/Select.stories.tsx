import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import Select, { type SelectOption, type SelectProps } from "./Select";

const PALETTE_OPTIONS: SelectOption[] = [
  { value: "mono", label: "Mono" },
  { value: "ocean", label: "Ocean" },
  { value: "ember", label: "Ember" },
];

const meta: Meta<typeof Select> = {
  component: Select,
  parameters: { layout: "padded" },
};

export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    label: "palette",
    options: PALETTE_OPTIONS,
  },
  render: (args) => <StatefulSelect {...args} />,
};

export const WithoutLabel: Story = {
  render: () => <StatefulSelect options={PALETTE_OPTIONS} />,
};

function StatefulSelect({ label, options = [], className }: Partial<SelectProps>) {
  const [value, setValue] = useState(options[0]?.value ?? "");
  return (
    <Select
      label={label}
      options={options}
      value={value}
      onChange={setValue}
      className={className}
    />
  );
}
