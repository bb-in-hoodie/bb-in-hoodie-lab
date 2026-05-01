import classNames from "classnames/bind";

import Description from "../Description/Description";
import Tags from "../Tags/Tags";
import styles from "./Article.module.scss";

const cx = classNames.bind(styles);

type Props = {
  title: string;
  tags: string[];
  description: string;
  className?: string;
};

function Article({ title, tags, description, className }: Props) {
  return (
    <article className={cx("article", className)}>
      <header className={cx("header")}>
        <h1 className={cx("title")}>{title}</h1>
        <Tags tags={tags} />
      </header>
      <Description>{description}</Description>
    </article>
  );
}

export default Article;
