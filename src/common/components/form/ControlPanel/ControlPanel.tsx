import classNames from "classnames/bind";
import { type ReactNode } from "react";

import styles from "./ControlPanel.module.scss";

const cx = classNames.bind(styles);

export interface ControlPanelProps {
  children: ReactNode;
  className?: string;
}

/** horizontal panel that lays out Fieldset cards */
function ControlPanel({ children, className }: ControlPanelProps) {
  return <div className={cx("control-panel", className)}>{children}</div>;
}

export default ControlPanel;
