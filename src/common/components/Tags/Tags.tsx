import classNames from "classnames/bind";

import styles from "./Tags.module.scss";

const cx = classNames.bind(styles);

type Props = { tags: string[] };

function Tags({ tags }: Props) {
  return (
    <div className={cx("tags")}>
      {tags.map((tag) => (
        <span key={tag} className={cx("tag")}>
          {tag}
        </span>
      ))}
    </div>
  );
}

export default Tags;
