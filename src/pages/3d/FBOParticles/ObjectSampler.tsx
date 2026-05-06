import { useEffect, useRef } from "react";
import { Matrix3, Mesh, Vector3 } from "three";
import { MeshSurfaceSampler } from "three/examples/jsm/Addons.js";

import GLTFGeometry from "@/common/components/GLTFGeometry/GLTFGeometry";
import { getParticlesCount } from "@/pages/3d/FBOParticles/helpers/spec";

export type ObjectKey = "mobius" | "flask" | "computer";

export type SampledData = {
  positions: Float32Array;
  normals: Float32Array;
};

type Props = {
  selected: ObjectKey;
  onSampled: (data: SampledData) => void;
};

const SPECS: Record<
  ObjectKey,
  {
    modelPath: string;
    position?: [number, number, number];
    rotation: [number, number, number];
    scale: number;
  }
> = {
  mobius: {
    modelPath: "/models/mobius.glb",
    rotation: [Math.PI * 0.2, Math.PI * 0.1, Math.PI * 0.1],
    scale: 3.5,
  },
  flask: {
    modelPath: "/models/flask.glb",
    position: [-1, 1.8, 0],
    rotation: [Math.PI * 0.1, 0, Math.PI * 0.07],
    scale: 1.6,
  },
  computer: {
    modelPath: "/models/computer.glb",
    position: [-1, 0.3, 0],
    rotation: [Math.PI * 0.06, Math.PI * 0.72, Math.PI * 0.02],
    scale: 4,
  },
};

function ObjectSampler({ selected, onSampled }: Props) {
  const meshRef = useRef<Mesh>(null);
  const spec = SPECS[selected];

  useEffect(() => {
    const mesh = meshRef.current;

    if (!mesh) {
      return;
    }

    if (!mesh.geometry || !mesh.geometry.attributes.position) {
      return;
    }

    mesh.updateMatrixWorld(true);

    const count = getParticlesCount();
    const sampler = new MeshSurfaceSampler(mesh).build();
    const sampledPositions = new Float32Array(count * 4);
    const sampledNormals = new Float32Array(count * 4);

    for (let i = 0; i < count; i++) {
      const position = new Vector3();
      const normal = new Vector3();
      sampler.sample(position, normal);

      mesh.localToWorld(position);

      const normalMatrix = new Matrix3().getNormalMatrix(mesh.matrixWorld);
      normal.applyMatrix3(normalMatrix).normalize();

      sampledPositions[i * 4] = position.x;
      sampledPositions[i * 4 + 1] = position.y;
      sampledPositions[i * 4 + 2] = position.z;
      sampledPositions[i * 4 + 3] = 1;

      sampledNormals[i * 4] = normal.x;
      sampledNormals[i * 4 + 1] = normal.y;
      sampledNormals[i * 4 + 2] = normal.z;
      sampledNormals[i * 4 + 3] = 1;
    }

    onSampled({
      positions: sampledPositions,
      normals: sampledNormals,
    });
  }, [selected, onSampled]);

  return (
    <mesh
      position={spec.position}
      ref={meshRef}
      rotation={spec.rotation}
      scale={spec.scale}
      visible={false}
    >
      <GLTFGeometry modelPath={spec.modelPath} />
    </mesh>
  );
}

export default ObjectSampler;
