import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import classNames from "classnames/bind";
import { useControls } from "leva";
import { Suspense } from "react";

import CommonLayout from "@/common/components/CommonLayout/CommonLayout";

import styles from "./FBOParticles.module.scss";
import { METADATA } from "./index.metadata";
import ComputerObject from "./objects/ComputerObject";
import FlaskObject from "./objects/FlaskObject";
import MobiusObject from "./objects/MobiusObject";

const cx = classNames.bind(styles);

const OBJECTS = {
  mobius: MobiusObject,
  flask: FlaskObject,
  computer: ComputerObject,
} as const;

function FBOParticles() {
  const { object } = useControls({
    object: {
      value: "mobius",
      options: ["mobius", "flask", "computer"],
    },
  });

  const Selected = OBJECTS[object as keyof typeof OBJECTS];

  return (
    <CommonLayout
      description={METADATA.description}
      githubUrl={METADATA.githubUrl}
      tags={METADATA.tags}
      title={METADATA.title}
    >
      <Canvas
        aria-label="FBO Particles 3D scene"
        camera={{ position: [0, 0, 3], fov: 50 }}
        className={cx("canvas")}
        role="img"
      >
        <OrbitControls />
        <Suspense fallback={null}>
          <Selected />
        </Suspense>
      </Canvas>
    </CommonLayout>
  );
}

export default FBOParticles;
