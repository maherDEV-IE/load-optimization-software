import React from "react";

function Box(props) {
  const l = props.size[0]
  const w = props.size[1]
  const h = props.size[2]
  const x = props.position[0]
  const y = props.position[1]
  const z = props.position[2]

  const position = [
    x + w / 2,
    z + h / 2,
    y + l / 2
  ]
  return (
    <mesh position={position}>
      <boxGeometry args={[w, h, l]} />
      <meshPhysicalMaterial
        color={0x000000}
        wireframe
        wireframeLinewidth={4}
        depthTest
        opacity={0.25}
        transparent
      />
    </mesh>
  );
}
export default Box;