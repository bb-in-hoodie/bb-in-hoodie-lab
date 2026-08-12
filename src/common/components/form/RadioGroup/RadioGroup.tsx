import classNames from "classnames/bind";
import { type KeyboardEvent, useRef } from "react";

import styles from "./RadioGroup.module.scss";

const cx = classNames.bind(styles);

export interface RadioOption {
  value: string;
  label: string;
}

export interface RadioGroupProps {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}

function RadioGroup({
  options,
  value,
  onChange,
  label,
  className,
}: RadioGroupProps) {
  // filled per option via the ref callback in the button map below
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = Math.max(
      options.findIndex((option) => option.value === value),
      0, // fallback
    );

    const updateIndex = (nextIndex: number) => {
      e.preventDefault();
      onChange(options[nextIndex].value);
      optionRefs.current[nextIndex]?.focus();
    };

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      updateIndex((currentIndex + 1) % options.length);
      return;
    }

    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      updateIndex((currentIndex - 1 + options.length) % options.length);
      return;
    }
  };

  const handleClick = (option: RadioOption) => {
    onChange(option.value);
  };

  const control = (
    <div
      role="radiogroup"
      aria-label={label}
      onKeyDown={handleKeyDown}
      className={cx("radio-group")}
    >
      {options.map((option, index) => {
        const isChecked = option.value === value;

        return (
          <button
            key={option.value}
            ref={(el) => {
              optionRefs.current[index] = el;
            }}
            type="button"
            role="radio"
            aria-checked={isChecked}
            tabIndex={isChecked ? 0 : -1}
            onClick={() => handleClick(option)}
            className={cx("option", { checked: isChecked })}
          >
            {option.label}
          </button>
        );
      })}
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

export default RadioGroup;
