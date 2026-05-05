import { useGLTF } from "@react-three/drei";

import GLTFGeometry from "@/common/components/GLTFGeometry/GLTFGeometry";

const MODEL_PATH = "/models/mobius.glb";

function MobiusObject() {
  return (
    <mesh rotation={[Math.PI * 0.2, Math.PI * -0.1, Math.PI * -0.1]} scale={3.5}>
      <GLTFGeometry modelPath={MODEL_PATH} />
      <meshNormalMaterial />
    </mesh>
  );
}

export default MobiusObject;

useGLTF.preload(MODEL_PATH);
