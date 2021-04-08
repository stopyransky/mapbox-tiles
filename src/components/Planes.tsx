import React, { useRef } from "react";
import * as THREE from "three";
import Plane from "./Plane";
import { TextureData } from '../utils';


interface PlanesProps {
  textures: TextureData[];
  resolution: number;
}

function Planes({ textures, resolution }: PlanesProps) {
  const geometryRef = useRef(
    new THREE.PlaneBufferGeometry(resolution, resolution, 64, 64)
  );
  return (
    <group position={[ 1.0, 0.0, -6.0]} rotation={[0.0, 0.0, Math.PI]}>
      {textures.map(({ data, offset: [x, y] } , i) => (
        <Plane
          key={i}
          position={[x, y, 0.0]}
          satellite={data[0]}
          terrain={data[1]}
          resolution={resolution}
          geometry={geometryRef.current}
        />
      ))}
    </group>
  );
}

export default Planes;
