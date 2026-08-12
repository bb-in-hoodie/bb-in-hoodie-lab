import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import Checkbox from "../Checkbox/Checkbox";
import RadioGroup, { type RadioOption } from "../RadioGroup/RadioGroup";
import Slider from "../Slider/Slider";
import Fieldset from "./Fieldset";

const MODE_OPTIONS: RadioOption[] = [
  { value: "drift", label: "drift" },
  { value: "orbit", label: "orbit" },
  { value: "pulse", label: "pulse" },
];

const meta: Meta<typeof Fieldset> = {
  component: Fieldset,
  parameters: { layout: "padded" },
};

export default meta;

type Story = StoryObj<typeof Fieldset>;

export const Default: Story = {
  render: () => <StatefulFieldsetDemo />,
};

function StatefulFieldsetDemo() {
  const [count, setCount] = useState(500);
  const [mode, setMode] = useState("orbit");
  const [trails, setTrails] = useState(false);
  return (
    <Fieldset legend="simulation">
      <Slider
        label="particles"
        min={0}
        max={1500}
        step={10}
        value={count}
        onChange={setCount}
      />
      <RadioGroup
        label="mode"
        value={mode}
        onChange={setMode}
        options={MODE_OPTIONS}
      />
      <Checkbox label="trails" checked={trails} onChange={setTrails} />
    </Fieldset>
  );
}
