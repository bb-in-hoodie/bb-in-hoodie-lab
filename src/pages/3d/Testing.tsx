import { type CSSProperties } from "react";

import CommonLayout from "@/common/components/CommonLayout/CommonLayout";

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

const METADATA = {
  title: "FBO Particles",
  tags: ["THREE.JS", "FBO", "PARTICLES", "REACT"],
  description: `Frame Buffer Objects (FBO) allow rendering operations to be directed to an off-screen buffer instead of the default screen framebuffer.

In Three.js, this is achieved through WebGLRenderTarget, which acts as a texture that can be read back and reused in subsequent render passes. This technique is essential for post-processing effects, GPGPU computations, and simulating particle systems with millions of points.`,
  githubUrl: "https://github.com/bb-in-hoodie/bb-in-hoodie-lab",
};
