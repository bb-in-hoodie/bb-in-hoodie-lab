import classNames from "classnames/bind";
import { motion, type Transition, type Variants } from "framer-motion";

import { trackEvent } from "@/common/helpers/analytics";

import styles from "./IconLink.module.scss";

const cx = classNames.bind(styles);

export type IconLinkProps = {
  url: string;
  iconSrc: string;
  ariaLabel: string;
  className?: string;
  iconClassName?: string;
  eventName?: string;
};

function IconLink({
  url,
  iconSrc,
  ariaLabel,
  className,
  iconClassName,
  eventName,
}: IconLinkProps) {
  return (
    <motion.a
      className={cx("root", className)}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileTap="pressed"
      variants={ICON_LINK_VARIANTS}
      transition={ICON_LINK_TRANSITION}
      onClick={eventName ? () => trackEvent(eventName) : undefined}
    >
      <img
        className={cx("icon", iconClassName)}
        src={iconSrc}
        alt=""
        draggable={false}
      />
    </motion.a>
  );
}

export default IconLink;

const ICON_LINK_VARIANTS: Variants = {
  rest: { scale: 1, opacity: 0.5 },
  hover: { scale: 1.02, opacity: 1 },
  pressed: { scale: 0.88, opacity: 0.48 },
};

const ICON_LINK_TRANSITION: Transition = { duration: 0.15, ease: "easeOut" };
