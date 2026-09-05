import type { Meta, StoryObj } from "@storybook/react-vite";

import { MockControlPanel } from "@/common/components/form/ControlPanel/ControlPanel.mock";

import Article from "./Article";

const DESCRIPTION =
  "Frame Buffer Objects (FBO) allow rendering operations to be directed to an off-screen buffer instead of the default screen framebuffer. In Three.js, this is achieved through WebGLRenderTarget, which acts as a texture that can be read back and reused in subsequent render passes. This technique is essential for post-processing effects, GPGPU computations, and simulating particle systems with millions of points.";

const meta: Meta<typeof Article> = {
  component: Article,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div
        style={{
          background:
            "linear-gradient(135deg, #1a2422 0%, #14181a 50%, #0a0a0a 100%)",
          minHeight: "100vh",
          padding: "30px 40px",
        }}
      >
        <Story />
      </div>
    ),
  ],
  args: {
    title: "FBO Particles",
    tags: ["THREE.JS", "FBO", "PARTICLES", "REACT"],
    description: DESCRIPTION,
  },
};

export default meta;

type Story = StoryObj<typeof Article>;

export const Default: Story = {};

export const WithGitHub: Story = {
  args: {
    githubUrl: "https://github.com/bb-in-hoodie/bb-in-hoodie-lab",
  },
};

export const WithControls: Story = {
  args: {
    controls: <MockControlPanel />,
  },
};
