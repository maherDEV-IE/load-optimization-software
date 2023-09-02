import React from "react";
import css from "./Truck3DLoading.module.css";
import { Canvas } from "@react-three/fiber";
import Box from "@/components/Box";
import Container from "@/components/Container";
import OrbitControls from "@/components/OrbitControls";

export default function Truck3DLoading(prop) {
  let truck = prop.truck.truck
  let items = prop.truck.items
  console.log(truck.size)
  const colors = [0x2faf49, 0xfab666, 0x509ed8, 0xf1c232]
  return (
    <div className={css.scene}>
      <Canvas
        className={css.canvas}
        camera={{position: [8, 4, -8],}}
      >
        <ambientLight color={0xffffff} intensity={3} />
        <pointLight/>
        <Container
          size={[truck.size[0], truck.size[1], truck.size[2]]}
          position={[0, 0, 0]}
          color={0x000000}>
        </Container>
        {
          items && items.map((item, index) => (
            <Box key={index}
              size={[item.size[0], item.size[1], item.size[2]]} 
              position={[item.position[1], item.position[0], item.position[2]]} 
              color={colors[index % colors.length]}
            ></Box>
          ))}
        <OrbitControls />
      </Canvas>
    </div>
  );
}