import { OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import classNames from "classnames/bind";
import { Suspense, useState } from "react";

import CommonLayout from "@/common/components/CommonLayout/CommonLayout";

import styles from "./FBOParticles.module.scss";
import {
  OBJECT_KEYS,
  OBJECT_SPECS,
  type ObjectKey,
  type SampledData,
} from "./helpers/objectSpecs";
import FBOParticlesControls, {
  type NoiseParams,
  type SpringParams,
} from "./index.controls";
import { METADATA } from "./index.metadata";
import ObjectSampler from "./ObjectSampler";
import Particles from "./Particles";

const cx = classNames.bind(styles);

// preload 3d models
OBJECT_KEYS.forEach((key) => {
  useGLTF.preload(OBJECT_SPECS[key].modelPath);
});

function FBOParticles() {
  const [selectedObject, setSelectedObject] = useState<ObjectKey>("mobius");
  const [noise, setNoise] = useState<NoiseParams>({
    frequency: 1.0,
    normalIntensity: 0.2,
    driftIntensity: 0.15,
    speed: 0.5,
  });
  const [spring, setSpring] = useState<SpringParams>({
    strength: 50,
    damping: 9,
    jitter: 0.7,
  });

  // sampled positions and normals from the selected 3d model
  const [sampledData, setSampledData] = useState<SampledData | null>(null);

  const handleNoiseChange = (patch: Partial<NoiseParams>) => {
    setNoise((prev) => ({ ...prev, ...patch }));
  };

  const handleSpringChange = (patch: Partial<SpringParams>) => {
    setSpring((prev) => ({ ...prev, ...patch }));
  };

  return (
    <CommonLayout
      description={METADATA.description}
      githubUrl={METADATA.githubUrl}
      tags={METADATA.tags}
      title={METADATA.title}
      controls={
        <FBOParticlesControls
          selectedObject={selectedObject}
          onSelectObject={setSelectedObject}
          noise={noise}
          onNoiseChange={handleNoiseChange}
          spring={spring}
          onSpringChange={handleSpringChange}
        />
      }
    >
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
          noiseFrequency={noise.frequency}
          noiseNormalIntensity={noise.normalIntensity}
          noiseDriftIntensity={noise.driftIntensity}
          noiseSpeed={noise.speed}
          springStrength={spring.strength}
          springDamping={spring.damping}
          springJitter={spring.jitter}
        />
      </Canvas>
    </CommonLayout>
  );
}

export default FBOParticles;
