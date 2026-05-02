import classNames from "classnames/bind";
import { motion, type Transition, type Variants } from "framer-motion";
import { type CSSProperties, type ReactNode, useState } from "react";

import styles from "./Description.module.scss";

const cx = classNames.bind(styles);

function Description({ children }: { children: ReactNode }) {
  const [expanded, setExpanded] = useState(false);

  const boxStyle = {
    "--mask-opacity": expanded ? 0 : 1,
  } as CSSProperties;

  return (
    <div className={cx("description")}>
      <motion.div
        className={cx("box")}
        style={boxStyle}
        initial={false}
        animate={{ height: expanded ? "auto" : COLLAPSED_HEIGHT }}
        transition={BOX_TRANSITION}
      >
        <p className={cx("text")}>{children}</p>
      </motion.div>
      <motion.button
        type="button"
        className={cx("toggle")}
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
        aria-label={expanded ? "Collapse description" : "Expand description"}
        initial="rest"
        animate="rest"
        whileHover="hover"
        whileTap="pressed"
        variants={TOGGLE_VARIANTS}
        transition={TOGGLE_TRANSITION}
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
      </motion.button>
    </div>
  );
}

export default Description;

const COLLAPSED_HEIGHT = 100;

const TOGGLE_VARIANTS: Variants = {
  rest: { scale: 1, opacity: 0.8 },
  hover: { scale: 1.1, opacity: 1 },
  pressed: { scale: 0.88, opacity: 0.78 },
};

const TOGGLE_TRANSITION: Transition = { duration: 0.15, ease: "easeOut" };
const BOX_TRANSITION: Transition = { duration: 0.3, ease: "easeOut" };
