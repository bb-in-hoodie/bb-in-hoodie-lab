import type { RouteMetadata } from "@/common/routes/manifest";

export const METADATA: RouteMetadata = {
  title: "FBO Particles",
  tags: ["THREE.JS", "FBO", "PARTICLES", "REACT"],
  description: `Frame Buffer Objects (FBO) allow rendering operations to be directed to an off-screen buffer instead of the default screen framebuffer.\n\nIn Three.js, this is achieved through WebGLRenderTarget, which acts as a texture that can be read back and reused in subsequent render passes. This technique is essential for post-processing effects, GPGPU computations, and simulating particle systems with millions of points.`,
  githubUrl: "https://github.com/bb-in-hoodie/bb-in-hoodie-lab",
};
