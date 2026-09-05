import ControlPanel from "@/common/components/form/ControlPanel/ControlPanel";
import Fieldset from "@/common/components/form/Fieldset/Fieldset";
import RadioGroup from "@/common/components/form/RadioGroup/RadioGroup";
import Slider from "@/common/components/form/Slider/Slider";

import { OBJECT_KEYS, type ObjectKey } from "./helpers/objectSpecs";

export interface NoiseParams {
  /** multiplier applied to sampled noise offset */
  frequency: number;
  /** how far particles move along the surface normal */
  normalIntensity: number;
  /** how far particles drift freely in 3d space */
  driftIntensity: number;
  /** speed of the noise animation over time */
  speed: number;
}

export interface SpringParams {
  /** spring constant pulling particles toward the target surface */
  strength: number;
  /** velocity-proportional resistance that settles the spring */
  damping: number;
  /** per-particle variation in the spring response */
  jitter: number;
}

interface Props {
  selectedObject: ObjectKey;
  onSelectObject: (key: ObjectKey) => void;
  noise: NoiseParams;
  onNoiseChange: (patch: Partial<NoiseParams>) => void;
  spring: SpringParams;
  onSpringChange: (patch: Partial<SpringParams>) => void;
}

const OBJECT_OPTIONS = OBJECT_KEYS.map((key) => ({ value: key, label: key }));

function FBOParticlesControls({
  selectedObject,
  onSelectObject,
  noise,
  onNoiseChange,
  spring,
  onSpringChange,
}: Props) {
  return (
    <ControlPanel>
      <Fieldset legend="object">
        <RadioGroup
          label="object"
          value={selectedObject}
          onChange={(value) => onSelectObject(value as ObjectKey)}
          options={OBJECT_OPTIONS}
        />
      </Fieldset>
      <Fieldset legend="noise">
        <Slider
          label="frequency"
          min={0.05}
          max={1.5}
          step={0.01}
          value={noise.frequency}
          onChange={(value) => onNoiseChange({ frequency: value })}
          formatValue={(value) => value.toFixed(2)}
        />
        <Slider
          label="normal"
          min={0}
          max={0.5}
          step={0.001}
          value={noise.normalIntensity}
          onChange={(value) => onNoiseChange({ normalIntensity: value })}
          formatValue={(value) => value.toFixed(3)}
        />
        <Slider
          label="drift"
          min={0}
          max={0.5}
          step={0.001}
          value={noise.driftIntensity}
          onChange={(value) => onNoiseChange({ driftIntensity: value })}
          formatValue={(value) => value.toFixed(3)}
        />
        <Slider
          label="speed"
          min={0}
          max={5}
          step={0.1}
          value={noise.speed}
          onChange={(value) => onNoiseChange({ speed: value })}
          formatValue={(value) => value.toFixed(1)}
        />
      </Fieldset>
      <Fieldset legend="spring">
        <Slider
          label="strength"
          min={1}
          max={150}
          step={1}
          value={spring.strength}
          onChange={(value) => onSpringChange({ strength: value })}
          formatValue={(value) => value.toFixed(0)}
        />
        <Slider
          label="damping"
          min={0}
          max={30}
          step={0.05}
          value={spring.damping}
          onChange={(value) => onSpringChange({ damping: value })}
          formatValue={(value) => value.toFixed(2)}
        />
        <Slider
          label="jitter"
          min={0}
          max={1}
          step={0.01}
          value={spring.jitter}
          onChange={(value) => onSpringChange({ jitter: value })}
          formatValue={(value) => value.toFixed(2)}
        />
      </Fieldset>
    </ControlPanel>
  );
}

export default FBOParticlesControls;
