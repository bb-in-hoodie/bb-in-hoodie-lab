import homeIcon from "@/common/assets/images/home.png";

import IconLink from "../IconLink/IconLink";

interface Props {
  url: string;
  className?: string;
}

function Home({ url, className }: Props) {
  return (
    <IconLink
      url={url}
      iconSrc={homeIcon}
      ariaLabel="Homepage"
      className={className}
      eventName="home_link_click"
    />
  );
}

export default Home;
