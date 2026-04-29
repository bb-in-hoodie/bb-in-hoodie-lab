import classNames from "classnames/bind";
import { type ReactNode, useState } from "react";

import styles from "./Description.module.scss";

const cx = classNames.bind(styles);

type Props = {
  children: ReactNode;
};

function Description({ children }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={cx("description")}>
      <div className={cx("box", { collapsed: !expanded })}>
        <p className={cx("text")}>{children}</p>
        {!expanded && <div className={cx("mask")} aria-hidden="true" />}
      </div>
      <button
        type="button"
        className={cx("toggle")}
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        aria-label={expanded ? "Collapse description" : "Expand description"}
      >
        <svg
          className={cx("chevron")}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6 15L12 9L18 15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}

export default Description;
