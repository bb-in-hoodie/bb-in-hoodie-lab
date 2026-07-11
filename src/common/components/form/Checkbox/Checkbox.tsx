import classNames from "classnames/bind";

import styles from "./Checkbox.module.scss";

const cx = classNames.bind(styles);

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  ariaLabel?: string;
  className?: string;
}

function Checkbox({
  checked,
  onChange,
  label,
  ariaLabel,
  className,
}: CheckboxProps) {
  return (
    <label className={cx("checkbox", { "with-label": !!label }, className)}>
      {label && <span className={cx("label")}>{label}</span>}
      {/* invisible checkbox input */}
      <input
        type="checkbox"
        className={cx("input")}
        checked={checked}
        aria-label={label ? undefined : ariaLabel}
        onChange={(e) => onChange(e.target.checked)}
      />

      {/* visible checkbox */}
      <span className={cx("box", { checked })} aria-hidden="true">
        <svg width="10" height="8" viewBox="0 0 10 8">
          <path
            d="M1 4L4 7L9 1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </span>
    </label>
  );
}

export default Checkbox;
