import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

// Smooth interpolation function
const lerp = (start, end, factor) => start + (end - start) * factor;

const Computers = ({ isMobile, mousePosition }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");
  const meshRef = useRef();
  
  // Store target and current values for smooth interpolation
  const targetRotation = useRef({ x: -0.01, y: -0.2, z: -0.1 });
  const currentRotation = useRef({ x: -0.01, y: -0.2, z: -0.1 });
  const targetPosition = useRef({ x: 0, y: 0, z: 0 });
  const currentPosition = useRef({ x: 0, y: 0, z: 0 });

  useFrame((state) => {
    if (meshRef.current) {
      if (mousePosition) {
        // Use hand position for mobile, mouse position for desktop
        const sensitivity = isMobile ? 0.6 : 0.3;
        const positionSensitivity = isMobile ? 1.0 : 0.5;
        
        targetRotation.current.x = mousePosition.y * sensitivity - 0.01;
        targetRotation.current.y = mousePosition.x * sensitivity - 0.2;
        targetRotation.current.z = mousePosition.x * (sensitivity / 3) - 0.1;

        targetPosition.current.x = mousePosition.x * positionSensitivity;
        targetPosition.current.y = -mousePosition.y * positionSensitivity;
        targetPosition.current.z = 0;
      } else {
        // Idle animation when no input
        const t = state.clock.getElapsedTime();
        const idleIntensity = 0.03;
        
        targetRotation.current.x = Math.sin(t * 0.6) * idleIntensity - 0.01;
        targetRotation.current.y = Math.cos(t * 0.4) * idleIntensity * 2 - 0.2;
        targetRotation.current.z = Math.sin(t * 0.5) * idleIntensity - 0.1;

        targetPosition.current.y = Math.sin(t * 0.8) * 0.05;
        targetPosition.current.x = Math.cos(t * 0.6) * 0.03;
        targetPosition.current.z = 0;
      }

      // Apply smooth interpolation
      const rotationSpeed = 0.08;
      const positionSpeed = 0.06;
      
      currentRotation.current.x = lerp(currentRotation.current.x, targetRotation.current.x, rotationSpeed);
      currentRotation.current.y = lerp(currentRotation.current.y, targetRotation.current.y, rotationSpeed);
      currentRotation.current.z = lerp(currentRotation.current.z, targetRotation.current.z, rotationSpeed);

      currentPosition.current.x = lerp(currentPosition.current.x, targetPosition.current.x, positionSpeed);
      currentPosition.current.y = lerp(currentPosition.current.y, targetPosition.current.y, positionSpeed);
      currentPosition.current.z = lerp(currentPosition.current.z, targetPosition.current.z, positionSpeed);

      // Apply rotation & position
      meshRef.current.rotation.x = currentRotation.current.x;
      meshRef.current.rotation.y = currentRotation.current.y;
      meshRef.current.rotation.z = currentRotation.current.z;

      meshRef.current.position.x = currentPosition.current.x;
      meshRef.current.position.y = currentPosition.current.y;
      meshRef.current.position.z = currentPosition.current.z;
    }
  });

  return (
    <mesh ref={meshRef}>
      <hemisphereLight intensity={0.15} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.5 : 0.75}
        position={isMobile ? [0, -2.5, -1] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </mesh>
  );
};

const ComputersCanvas = ({ mousePosition, isMobile }) => {
  return (
    <Canvas
      frameloop="always"
      shadows
      dpr={[1, 1]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      style={{ 
        cursor: isMobile ? "default" : "none",
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <Computers isMobile={isMobile} mousePosition={mousePosition} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;