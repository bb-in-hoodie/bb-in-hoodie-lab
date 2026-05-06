import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import classNames from "classnames/bind";
import { Leva, useControls } from "leva";
import { Suspense, useCallback, useState } from "react";

import CommonLayout from "@/common/components/CommonLayout/CommonLayout";

import styles from "./FBOParticles.module.scss";
import { METADATA } from "./index.metadata";
import ObjectSampler, {
  type ObjectKey,
  type SampledData,
} from "./ObjectSampler";
import Particles from "./Particles";

const cx = classNames.bind(styles);

function FBOParticles() {
  const { object } = useControls({
    object: {
      value: "mobius",
      options: ["mobius", "flask", "computer"],
    },
  });

  const { noiseIntensity, noiseSpeed } = useControls("noise", {
    noiseIntensity: {
      value: 0.06,
      min: 0,
      max: 0.5,
      step: 0.001,
      label: "intensity",
    },
    noiseSpeed: { value: 1.0, min: 0, max: 5, step: 0.1, label: "speed" },
  });

  const [sampled, setSampled] = useState<SampledData | null>(null);
  const handleSampled = useCallback(
    (data: SampledData) => setSampled(data),
    [],
  );

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
          className={cx("canvas")}
          role="img"
        >
          <OrbitControls />
          <Suspense fallback={null}>
            <ObjectSampler
              onSampled={handleSampled}
              selected={object as ObjectKey}
            />
          </Suspense>
          <Particles
            data={sampled}
            noiseIntensity={noiseIntensity}
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
