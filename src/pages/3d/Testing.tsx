import { type CSSProperties } from "react";

import CommonLayout from "@/common/components/CommonLayout/CommonLayout";
import { METADATA } from "@/pages/3d/Testing.metadata";

const placeholderStyle: CSSProperties = {
  background: "linear-gradient(135deg, #305354 0%, #16213e 50%, #0f3460 100%)",
  height: "200vh",
  width: "100%",
};

function Testing() {
  return (
    <CommonLayout
      title={METADATA.title}
      tags={METADATA.tags}
      description={METADATA.description}
      githubUrl={METADATA.githubUrl}
    >
      <div style={placeholderStyle} />
    </CommonLayout>
  );
}

export default Testing;
