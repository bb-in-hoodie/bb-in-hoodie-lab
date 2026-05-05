import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import classNames from "classnames/bind";

import CommonLayout from "@/common/components/CommonLayout/CommonLayout";

import styles from "./FBOParticles.module.scss";
import { METADATA } from "./index.metadata";

const cx = classNames.bind(styles);

function FBOParticles() {
  return (
    <CommonLayout
      title={METADATA.title}
      tags={METADATA.tags}
      description={METADATA.description}
      githubUrl={METADATA.githubUrl}
    >
      <Canvas
        aria-label="FBO Particles 3D scene"
        camera={{ position: [0, 0, 3], fov: 50 }}
        className={cx("canvas")}
        role="img"
      >
        <OrbitControls />
        <mesh>
          <sphereGeometry />
          <meshNormalMaterial />
        </mesh>
      </Canvas>
    </CommonLayout>
  );
}

export default FBOParticles;
