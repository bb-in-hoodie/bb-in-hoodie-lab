import type { Meta, StoryObj } from "@storybook/react-vite";
import { type CSSProperties } from "react";

import { MockControlPanel } from "@/common/components/form/ControlPanel/ControlPanel.mock";

import CommonLayout from "./CommonLayout";

const DESCRIPTION =
  "Frame Buffer Objects (FBO) allow rendering operations to be directed to an off-screen buffer instead of the default screen framebuffer. In Three.js, this is achieved through WebGLRenderTarget, which acts as a texture that can be read back and reused in subsequent render passes. This technique is essential for post-processing effects, GPGPU computations, and simulating particle systems with millions of points.";

const placeholderStyle: CSSProperties = {
  background: "linear-gradient(135deg, #1a2422 0%, #14181a 50%, #0a0a0a 100%)",
  width: "100%",
  height: "200vh",
};

const meta: Meta<typeof CommonLayout> = {
  component: CommonLayout,
  parameters: { layout: "fullscreen" },
  args: {
    title: "FBO Particles",
    tags: ["THREE.JS", "FBO", "PARTICLES", "REACT"],
    description: DESCRIPTION,
    githubUrl: "https://github.com/bb-in-hoodie/bb-in-hoodie-lab",
    children: <div style={placeholderStyle} />,
  },
};

export default meta;

type Story = StoryObj<typeof CommonLayout>;

export const Default: Story = {};

export const WithControls: Story = {
  args: {
    controls: <MockControlPanel />,
  },
};
