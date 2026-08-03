import classNames from "classnames/bind";
import { motion, type Transition, type Variants } from "framer-motion";

import { trackEvent } from "@/common/helpers/analytics";

import styles from "./DevButton.module.scss";

const cx = classNames.bind(styles);

function DevButton({ url, className }: Props) {
  return (
    <motion.a
      href={url}
      initial="idle"
      animate="idle"
      whileHover="hover"
      whileTap="pressed"
      variants={DEV_BUTTON_VARIANTS}
      transition={DEV_BUTTON_TRANSITION}
      onClick={() => trackEvent("dev_button_click")}
      className={cx("root", className)}
    >
      visit bb-in-hoodie.dev
    </motion.a>
  );
}

export default DevButton;

interface Props {
  url: string;
  className?: string;
}

const DEV_BUTTON_VARIANTS: Variants = {
  idle: { scale: 1, opacity: 1 },
  hover: { scale: 1.04, opacity: 1 },
  pressed: { scale: 0.98, opacity: 0.8 },
};

const DEV_BUTTON_TRANSITION: Transition = { duration: 0.15, ease: "easeOut" };
