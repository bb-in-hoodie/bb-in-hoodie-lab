import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import Stepper, { type StepperProps } from "./Stepper";

function Render({
  label,
  min,
  max,
  step = 1,
  mode,
  formatValue,
  className,
}: Partial<StepperProps>) {
  const [value, setValue] = useState(1);
  return (
    <Stepper
      label={label}
      min={min}
      max={max}
      step={step}
      mode={mode}
      formatValue={formatValue}
      value={value}
      onChange={setValue}
      className={className}
    />
  );
}

const meta: Meta<typeof Stepper> = {
  component: Stepper,
  parameters: { layout: "padded" },
};

export default meta;

type Story = StoryObj<typeof Stepper>;

export const Numeric: Story = {
  args: {
    label: "speed",
    min: 0,
    max: 10,
    step: 1,
    mode: "numeric",
  },
  render: (args) => <Render {...args} />,
};

export const Decimal: Story = {
  args: {
    label: "speed",
    min: 0,
    max: 3,
    step: 0.25,
    mode: "decimal",
  },
  render: (args) => (
    <Render {...args} formatValue={(value) => `${value.toFixed(2)}×`} />
  ),
};

export const Localized: Story = {
  args: {
    label: "price",
    min: 0,
    max: 1000000,
    step: 1200,
    mode: "numeric",
  },
  render: (args) => (
    <Render {...args} formatValue={(value) => value.toLocaleString()} />
  ),
};

export const WithoutLabel: Story = {
  render: () => <Render />,
};
