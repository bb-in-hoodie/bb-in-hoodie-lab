import { useGLTF } from "@react-three/drei";

import GLTFGeometry from "@/common/components/GLTFGeometry/GLTFGeometry";

const MODEL_PATH = "/models/flask.glb";

function FlaskObject() {
  return (
    <mesh rotation={[Math.PI * 0.1, 0, Math.PI * 0.07]} scale={0.9}>
      <GLTFGeometry modelPath={MODEL_PATH} />
      <meshNormalMaterial />
    </mesh>
  );
}

export default FlaskObject;

useGLTF.preload(MODEL_PATH);
