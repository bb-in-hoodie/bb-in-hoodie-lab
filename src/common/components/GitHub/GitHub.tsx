import classNames from "classnames/bind";
import { motion, type Transition, type Variants } from "framer-motion";

import githubLogo from "@/common/assets/images/github-logo.png";

import styles from "./GitHub.module.scss";

const cx = classNames.bind(styles);

type Props = { url: string; className?: string };

function GitHub({ url, className }: Props) {
  return (
    <motion.a
      className={cx("github", className)}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GitHub repository"
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileTap="pressed"
      variants={GITHUB_VARIANTS}
      transition={GITHUB_TRANSITION}
    >
      <img className={cx("logo")} src={githubLogo} alt="" draggable={false} />
    </motion.a>
  );
}

export default GitHub;

const GITHUB_VARIANTS: Variants = {
  rest: { scale: 1, opacity: 0.5 },
  hover: { scale: 1.02, opacity: 1 },
  pressed: { scale: 0.88, opacity: 0.48 },
};

const GITHUB_TRANSITION: Transition = { duration: 0.15, ease: "easeOut" };
