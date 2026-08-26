import classNames from "classnames/bind";
import { type ReactNode } from "react";

import Description from "../Description/Description";
import GitHub from "../GitHub/GitHub";
import Home from "../Home/Home";
import Tabs, { type TabItem } from "../Tabs/Tabs";
import Tags from "../Tags/Tags";
import styles from "./Article.module.scss";

const cx = classNames.bind(styles);

interface Props {
  title: string;
  tags: string[];
  description: string;
  githubUrl?: string;
  homeUrl?: string;
  controls?: ReactNode;
  className?: string;
}

function Article({
  title,
  tags,
  description,
  githubUrl,
  homeUrl,
  controls,
  className,
}: Props) {
  const tabs: TabItem[] = [
    {
      tabType: "description",
      label: "DESCRIPTION",
      panel: <Description>{description}</Description>,
    },
  ];

  if (controls) {
    tabs.push({ tabType: "controls", label: "CONTROLS", panel: controls });
  }

  return (
    <article className={cx("article", className)}>
      <header className={cx("header")}>
        <div className={cx("title-row")}>
          <h1 className={cx("title")}>{title}</h1>
          {(githubUrl || homeUrl) && (
            <div className={cx("actions")}>
              {githubUrl && <GitHub url={githubUrl} />}
              {homeUrl && <Home url={homeUrl} />}
            </div>
          )}
        </div>
        <Tags tags={tags} />
      </header>
      <Tabs tabs={tabs} />
    </article>
  );
}

export default Article;
