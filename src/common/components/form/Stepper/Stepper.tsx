import classNames from "classnames/bind";
import { type ChangeEvent, type KeyboardEvent, useState } from "react";

import { clamp } from "@/common/helpers/math";

import styles from "./Stepper.module.scss";

const cx = classNames.bind(styles);

export interface StepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  mode?: "numeric" | "decimal";
  label?: string;
  formatValue?: (value: number) => string;
  className?: string;
}

function Stepper({
  value,
  onChange,
  min = -Infinity,
  max = Infinity,
  step = 1,
  mode = "numeric",
  label,
  formatValue,
  className,
}: StepperProps) {
  const [draftValue, setDraftValue] = useState<string | null>(null);

  const commitValue = (next: number) => {
    // toFixed(6) guards against float drift on fractional steps
    const clamped = clamp(Number(next.toFixed(6)), min, max);

    onChange(clamped);
  };

  const handleFocus = () => {
    setDraftValue(String(value));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDraftValue(e.target.value);
  };

  const handleBlur = () => {
    const parsed = Number(draftValue);

    if (draftValue?.trim() && !Number.isNaN(parsed)) {
      commitValue(parsed);
    }

    setDraftValue(null);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  };

  const displayValue =
    draftValue ?? (formatValue ? formatValue(value) : String(value));

  const control = (
    <div className={cx("stepper")}>
      <button
        type="button"
        aria-label={label ? `decrease ${label}` : "decrease"}
        disabled={value <= min}
        onClick={() => commitValue(value - step)}
        className={cx("step-button")}
      >
        &minus;
      </button>
      <input
        type="text"
        inputMode={mode}
        role="spinbutton"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={formatValue ? formatValue(value) : undefined}
        aria-label={label || "value"}
        value={displayValue}
        size={displayValue.length}
        onFocus={handleFocus}
        onChange={handleInputChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={cx("value")}
      />
      <button
        type="button"
        aria-label={label ? `increase ${label}` : "increase"}
        disabled={value >= max}
        onClick={() => commitValue(value + step)}
        className={cx("step-button")}
      >
        +
      </button>
    </div>
  );

  if (!label) {
    return <div className={className}>{control}</div>;
  }

  return (
    <div className={cx("row", className)}>
      <span aria-hidden="true" className={cx("label")}>
        {label}
      </span>
      {control}
    </div>
  );
}

export default Stepper;
