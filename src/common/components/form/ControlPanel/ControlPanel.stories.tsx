import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import Button from "../Button/Button";
import Checkbox from "../Checkbox/Checkbox";
import Fieldset from "../Fieldset/Fieldset";
import RadioGroup, { type RadioOption } from "../RadioGroup/RadioGroup";
import Select, { type SelectOption } from "../Select/Select";
import Slider from "../Slider/Slider";
import Stepper from "../Stepper/Stepper";
import ControlPanel from "./ControlPanel";

const MODE_OPTIONS: RadioOption[] = [
  { value: "drift", label: "drift" },
  { value: "orbit", label: "orbit" },
  { value: "pulse", label: "pulse" },
];

const PALETTE_OPTIONS: SelectOption[] = [
  { value: "mono", label: "Mono" },
  { value: "ocean", label: "Ocean" },
  { value: "ember", label: "Ember" },
];

const meta: Meta<typeof ControlPanel> = {
  component: ControlPanel,
  parameters: { layout: "padded" },
};

export default meta;

type Story = StoryObj<typeof ControlPanel>;

export const Default: Story = {
  render: () => <StatefulControlPanelDemo />,
};

function StatefulControlPanelDemo() {
  const [count, setCount] = useState(600);
  const [speed, setSpeed] = useState(1);
  const [palette, setPalette] = useState("mono");
  const [trails, setTrails] = useState(false);
  const [mode, setMode] = useState("orbit");
  return (
    <ControlPanel>
      <Fieldset legend="simulation">
        <Slider
          label="particles"
          min={0}
          max={1500}
          step={10}
          value={count}
          onChange={setCount}
        />
      </Fieldset>
      <Fieldset legend="motion">
        <RadioGroup
          label="mode"
          value={mode}
          onChange={setMode}
          options={MODE_OPTIONS}
        />
        <Stepper
          label="speed"
          min={0}
          max={3}
          step={0.25}
          value={speed}
          onChange={setSpeed}
          formatValue={(value) => `${value.toFixed(2)}×`}
        />
      </Fieldset>
      <Fieldset legend="appearance">
        <Select
          label="palette"
          value={palette}
          onChange={setPalette}
          options={PALETTE_OPTIONS}
        />
        <Checkbox label="trails" checked={trails} onChange={setTrails} />
      </Fieldset>
      <Fieldset legend="actions">
        <Button variant="primary" onClick={() => {}}>
          RANDOMIZE
        </Button>
        <Button onClick={() => {}}>RESET</Button>
      </Fieldset>
    </ControlPanel>
  );
}
