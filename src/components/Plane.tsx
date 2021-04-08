import React, { useRef, useState } from "react";
import * as THREE from "three";

const shaders = {
  vertexShader: `
    uniform sampler2D terrain;

    uniform float bumpScale;

    varying vec2 vUV;

    void main() {

      vUV = uv;

      vec4 bumpData = texture2D(terrain, uv);

      float vAmount = (bumpData.r * 256.0 * 256.0 + bumpData.g * 256.0 + bumpData.b) * 0.1;
      
      vec3 newPosition = position + normal * bumpScale * vAmount;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    }
`,
  fragmentShader: `
    uniform sampler2D satellite;
    // uniform sampler2D terrain;

    varying vec2 vUV;

    void main() {

      gl_FragColor = texture2D(satellite, vUV);
    }
`
};

interface PlaneProps {
  satellite: THREE.Texture;
  terrain: THREE.Texture;
  resolution: number;
  geometry: THREE.PlaneBufferGeometry;
  position: [number, number, number];
}
function Plane({
  satellite,
  terrain,
  resolution,
  geometry,
  position
}: PlaneProps) {
  const mesh = useRef(null);
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  return (
    <mesh
      ref={mesh}
      position={position}
      scale={[1 / (resolution * 0.9975), 1 / (resolution * 0.9975), 1 / 512]}
      onClick={() => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
      geometry={geometry}
    >
      <shaderMaterial
        attach="material"
        side={THREE.DoubleSide}
        uniforms={{
          bumpScale: { value: 80.0, type: "f" },
          satellite: { value: satellite, type: "t" },
          terrain: { value: terrain, type: "t" }
        }}
        vertexShader={shaders.vertexShader}
        fragmentShader={shaders.fragmentShader}
        // wireframe={true}

        wireframeLinewidth={2}
      />
    </mesh>
  );
}

export default Plane;
