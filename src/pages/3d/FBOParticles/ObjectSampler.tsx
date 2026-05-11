import { useEffect, useRef, useState } from "react";
import { Matrix3, Mesh, Vector3 } from "three";
import { MeshSurfaceSampler } from "three/examples/jsm/Addons.js";

import GLTFGeometry from "@/common/components/GLTFGeometry/GLTFGeometry";
import { getParticlesCount } from "@/pages/3d/FBOParticles/helpers/spec";

import { type ObjectSpec, type SampledData } from "./helpers/objectSpecs";

type Props = {
  spec: ObjectSpec;
  isSelected?: boolean;
  onSelected: (data: SampledData) => void;
};

function ObjectSampler({ spec, isSelected = false, onSelected }: Props) {
  const meshRef = useRef<Mesh>(null);
  const [sampled, setSampled] = useState<SampledData | null>(null);

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
    const normalMatrix = new Matrix3().getNormalMatrix(mesh.matrixWorld);

    for (let i = 0; i < count; i++) {
      const position = new Vector3();
      const normal = new Vector3();
      sampler.sample(position, normal);

      mesh.localToWorld(position);

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

    setSampled({
      positions: sampledPositions,
      normals: sampledNormals,
    });
  }, [spec]);

  useEffect(() => {
    if (isSelected && sampled) {
      onSelected(sampled);
    }
  }, [isSelected, sampled, onSelected]);

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
