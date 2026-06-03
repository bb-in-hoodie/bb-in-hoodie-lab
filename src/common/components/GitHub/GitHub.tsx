import classNames from "classnames/bind";

import githubLogo from "@/common/assets/images/github-logo.png";

import IconLink from "../IconLink/IconLink";
import styles from "./GitHub.module.scss";

const cx = classNames.bind(styles);

type Props = { url: string; className?: string };

function GitHub({ url, className }: Props) {
  return (
    <IconLink
      url={url}
      iconSrc={githubLogo}
      ariaLabel="GitHub repository"
      className={className}
      iconClassName={cx("logo")}
      eventName="github_link_click"
    />
  );
}

export default GitHub;
