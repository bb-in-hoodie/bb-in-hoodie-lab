import classNames from "classnames/bind";
import { type ReactNode } from "react";

import styles from "./ControlPanel.module.scss";

const cx = classNames.bind(styles);

export interface ControlPanelProps {
  children: ReactNode;
  direction?: "vertical" | "horizontal";
  className?: string;
}

/** panel that lays out Fieldset cards, stacked vertically by default */
function ControlPanel({
  children,
  direction = "vertical",
  className,
}: ControlPanelProps) {
  return (
    <div className={cx("control-panel", direction, className)}>{children}</div>
  );
}

export default ControlPanel;
