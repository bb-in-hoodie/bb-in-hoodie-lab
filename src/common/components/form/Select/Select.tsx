import classNames from "classnames/bind";
import { type KeyboardEvent, useEffect, useRef, useState } from "react";

import styles from "./Select.module.scss";

const cx = classNames.bind(styles);

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}

function Select({ options, value, onChange, label, className }: SelectProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);
  const openedByKeyboardRef = useRef(false);

  // close dropdown when clicking outside of it
  useEffect(() => {
    if (open) {
      const handleOutsideClick = (e: PointerEvent) => {
        if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
          setOpen(false);
        }
      };

      document.addEventListener("pointerdown", handleOutsideClick);

      return () => {
        document.removeEventListener("pointerdown", handleOutsideClick);
      };
    }
  }, [open]);

  /* keyboard navigation */
  useEffect(() => {
    if (open && openedByKeyboardRef.current) {
      openedByKeyboardRef.current = false;

      const index = Math.max(
        options.findIndex((option) => option.value === value),
        0, // fallback
      );
      optionRefs.current[index]?.focus();
    }
  }, [open, options, value]);

  const handleButtonKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) {
        openedByKeyboardRef.current = true;
        setOpen(true);
      }
      return;
    }

    if ((e.key === "Enter" || e.key === " ") && !open) {
      e.preventDefault();
      openedByKeyboardRef.current = true;
      setOpen(true);
      return;
    }

    if (e.key === "Escape" && open) {
      setOpen(false);
      return;
    }
  };

  const handleOptionKeyDown = (
    e: KeyboardEvent<HTMLLIElement>,
    index: number,
  ) => {
    switch (e.key) {
      case "ArrowDown": {
        e.preventDefault();
        optionRefs.current[(index + 1) % options.length]?.focus();
        break;
      }
      case "ArrowUp": {
        e.preventDefault();
        optionRefs.current[
          (index - 1 + options.length) % options.length
        ]?.focus();
        break;
      }
      case "Enter":
      case " ": {
        e.preventDefault();
        onChange(options[index].value);
        setOpen(false);
        buttonRef.current?.focus();
        break;
      }
      case "Escape": {
        setOpen(false);
        buttonRef.current?.focus();
        break;
      }
    }
  };

  const selected = options.find((option) => option.value === value);
  const selectedLabel = selected?.label ?? value;

  const control = (
    <div ref={wrapRef} className={cx("select")}>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label ? `${label}: ${selectedLabel}` : selectedLabel}
        onClick={() => setOpen((prevOpen) => !prevOpen)}
        onKeyDown={handleButtonKeyDown}
        className={cx("button")}
      >
        {selectedLabel}
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          aria-hidden="true"
          className={cx("chevron", { open })}
        >
          <path
            d="M1 1L5 5L9 1"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </button>

      {open && (
        <ul role="listbox" aria-label={label} className={cx("options")}>
          {options.map((option, index) => (
            <li
              key={option.value}
              ref={(el) => {
                optionRefs.current[index] = el;
              }}
              role="option"
              aria-selected={option.value === value}
              tabIndex={option.value === value ? 0 : -1}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
                buttonRef.current?.focus(); // move focus back to the button
              }}
              onKeyDown={(e) => handleOptionKeyDown(e, index)}
              className={cx("option", { selected: option.value === value })}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  if (!label) {
    return <div className={className}>{control}</div>;
  }

  return (
    <div className={cx("row", className)}>
      <span aria-hidden className={cx("label")}>
        {label}
      </span>
      {control}
    </div>
  );
}

export default Select;
