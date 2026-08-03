import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import classNames from "classnames/bind";
import { Leva, useControls } from "leva";
import { Suspense, useState } from "react";

import CommonLayout from "@/common/components/CommonLayout/CommonLayout";

import styles from "./FBOParticles.module.scss";
import {
  OBJECT_KEYS,
  OBJECT_SPECS,
  type ObjectKey,
  type SampledData,
} from "./helpers/objectSpecs";
import { METADATA } from "./index.metadata";
import ObjectSampler from "./ObjectSampler";
import Particles from "./Particles";

const cx = classNames.bind(styles);

// preload 3d models
OBJECT_KEYS.forEach((key) => {
  useGLTF.preload(OBJECT_SPECS[key].modelPath);
});

function FBOParticles() {
  const { object: selectedObject } = useControls<
    ControlsSchema,
    ControlsSchema,
    ControlsSchema
  >({
    object: {
      value: "mobius",
      options: [...OBJECT_KEYS],
    },
  });

  const {
    noiseFrequency,
    noiseNormalIntensity,
    noiseDriftIntensity,
    noiseSpeed,
  } = useControls("noise", {
    noiseFrequency: {
      value: 1.0,
      min: 0.05,
      max: 1.5,
      step: 0.01,
      label: "frequency",
    },
    noiseNormalIntensity: {
      value: 0.2,
      min: 0,
      max: 0.5,
      step: 0.001,
      label: "normal",
    },
    noiseDriftIntensity: {
      value: 0.15,
      min: 0,
      max: 0.5,
      step: 0.001,
      label: "drift",
    },
    noiseSpeed: { value: 0.5, min: 0, max: 5, step: 0.1, label: "speed" },
  });

  // sampled positions and normals from the selected 3d model
  const [sampledData, setSampledData] = useState<SampledData | null>(null);

  return (
    <CommonLayout
      description={METADATA.description}
      githubUrl={METADATA.githubUrl}
      tags={METADATA.tags}
      title={METADATA.title}
    >
      <>
        <Canvas
          aria-label="FBO Particles 3D scene"
          camera={{ position: [0, 0, 30], fov: 50 }}
          role="img"
          className={cx("canvas")}
        >
          <OrbitControls />

          {/* an invisible component that loads the model and samples positions/normals from its mesh surface */}
          <Suspense fallback={null}>
            {OBJECT_KEYS.map((key) => (
              <ObjectSampler
                key={key}
                spec={OBJECT_SPECS[key]}
                isSelected={key === selectedObject}
                onSelected={setSampledData}
              />
            ))}
          </Suspense>

          {/* displays particles with the sampled positions and normals */}
          <Particles
            data={sampledData}
            noiseFrequency={noiseFrequency}
            noiseNormalIntensity={noiseNormalIntensity}
            noiseDriftIntensity={noiseDriftIntensity}
            noiseSpeed={noiseSpeed}
          />
        </Canvas>

        <div className={cx("leva-container")}>
          <Leva fill />
        </div>
      </>
    </CommonLayout>
  );
}

export default FBOParticles;

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type ControlsSchema = {
  object: { value: ObjectKey; options: ObjectKey[] };
};
