import React from "react";
import { Canvas } from "react-three-fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Planes from "./Planes";
import utils from "../utils";


const textures = utils.loadTextures();

export default function App() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Planes textures={textures} resolution={4096} />
      <PerspectiveCamera
        position={[0.0, 0.0, 2.0]}
        fov={95}
        near={0.0001}
        far={100000}
        makeDefault
      />
      <OrbitControls />
    </Canvas>
  );
}
