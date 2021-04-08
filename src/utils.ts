import * as THREE from "three";


  const defaultOpts = {
    x1: 14845,
    y1: 13689,
    x2: 14847,
    y2: 13691,
    format: "jpg"
  };


export interface TextureData {
  data: THREE.Texture[],
  offset: number[]
}
function loadTextures(props: Partial<typeof defaultOpts>) {
  const { x1, y1, x2, y2, format } = { ...defaultOpts, ...props };
  const width = (x2 - x1) + 1;
  const height = (y2 - y1) + 1;
  const startY = Math.floor(height * 0.5);
  console.log(width, height);
  
  let idx = 0;
  let idy = startY;
  
  const textures: TextureData[] = [];
  
  for (let x = x1; x <= x2; x++) {
    for (let y = y1; y <= y2; y++) {
      const satellite = new THREE.TextureLoader().load(
        `/assets/satellite_15_${x}_${y}.${format}`
      );
      const terrain = new THREE.TextureLoader().load(
        `/assets/terrain-rgb_15_${x}_${y}.${format}`
      );

      satellite.anisotropy = 16;
      terrain.anisotropy = 16;
      terrain.minFilter= THREE.NearestFilter;
      terrain.magFilter= THREE.NearestFilter;
      satellite.minFilter= THREE.NearestFilter;
      satellite.magFilter= THREE.NearestFilter;
      textures.push({
        data: [satellite, terrain],
        offset: [idx, idy]
      });
      idy-=1
    }
    idy = startY;
    idx += 1;
  }
  return textures;
}

export default {
  loadTextures
}