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
      eventName="home_link_click"
      className={className}
    />
  );
}

export default Home;
