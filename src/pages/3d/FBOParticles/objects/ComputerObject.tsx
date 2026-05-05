import { useGLTF } from "@react-three/drei";

import GLTFGeometry from "@/common/components/GLTFGeometry/GLTFGeometry";

const MODEL_PATH = "/models/computer.glb";

function ComputerObject() {
  return (
    <mesh rotation={[Math.PI * 0.06, Math.PI * 0.72, Math.PI * 0.02]} scale={2.3}>
      <GLTFGeometry modelPath={MODEL_PATH} />
      <meshNormalMaterial />
    </mesh>
  );
}

export default ComputerObject;

useGLTF.preload(MODEL_PATH);
