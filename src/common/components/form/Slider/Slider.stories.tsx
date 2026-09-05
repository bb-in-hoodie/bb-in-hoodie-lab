import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import Slider, { type SliderProps } from "./Slider";

const meta: Meta<typeof Slider> = {
  component: Slider,
  parameters: { layout: "padded" },
};

export default meta;

type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {
    label: "particles",
    min: 0,
    max: 1500,
    step: 10,
  },
  render: (args) => <StatefulSlider {...args} />,
};

export const WithFormatValue: Story = {
  args: {
    label: "size",
    min: 0,
    max: 20,
    step: 0.1,
  },
  render: (args) => (
    <StatefulSlider
      {...args}
      formatValue={(value) => `${value.toFixed(1)} px`}
    />
  ),
};

function StatefulSlider({
  label = "slider",
  min = 0,
  max = 100,
  step,
  formatValue,
  className,
}: Partial<SliderProps>) {
  const [value, setValue] = useState(600);
  return (
    <Slider
      label={label}
      min={min}
      max={max}
      step={step}
      formatValue={formatValue}
      value={value}
      onChange={setValue}
      className={className}
    />
  );
}
