import Description from "./Description";

export function MockDescription() {
  return (
    <Description>
      Frame Buffer Objects (FBO) allow rendering operations to be directed to an
      off-screen buffer instead of the default screen framebuffer. In Three.js,
      this is achieved through WebGLRenderTarget, which acts as a texture that
      can be read back and reused in subsequent render passes. This technique is
      essential for post-processing effects, GPGPU computations, and simulating
      particle systems with millions of points.
    </Description>
  );
}
