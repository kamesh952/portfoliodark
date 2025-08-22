import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

// Smooth interpolation function
const lerp = (start, end, factor) => {
  return start + (end - start) * factor;
};

const Computers = ({ isMobile, mousePosition }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");
  const meshRef = useRef();
  
  // Store target and current values for smooth interpolation
  const targetRotation = useRef({ x: -0.01, y: -0.2, z: -0.1 });
  const currentRotation = useRef({ x: -0.01, y: -0.2, z: -0.1 });
  const targetPosition = useRef({ x: 0, y: 0, z: 0 });
  const currentPosition = useRef({ x: 0, y: 0, z: 0 });

  useFrame(() => {
    if (meshRef.current && mousePosition) {
      // Calculate target rotation with reduced sensitivity for smoother movement
      targetRotation.current.x = mousePosition.y * 0.15 - 0.01;
      targetRotation.current.y = mousePosition.x * 0.15 - 0.2;
      targetRotation.current.z = mousePosition.x * 0.025 - 0.1;
      
      // Calculate target position with reduced sensitivity
      targetPosition.current.x = mousePosition.x * 0.25;
      targetPosition.current.y = -mousePosition.y * 0.25;
      targetPosition.current.z = 0;

      // Smooth interpolation for rotation (adjust factor for different smoothness)
      currentRotation.current.x = lerp(currentRotation.current.x, targetRotation.current.x, 0.06);
      currentRotation.current.y = lerp(currentRotation.current.y, targetRotation.current.y, 0.06);
      currentRotation.current.z = lerp(currentRotation.current.z, targetRotation.current.z, 0.06);
      
      // Smooth interpolation for position
      currentPosition.current.x = lerp(currentPosition.current.x, targetPosition.current.x, 0.04);
      currentPosition.current.y = lerp(currentPosition.current.y, targetPosition.current.y, 0.04);

      // Apply smooth transformations
      meshRef.current.rotation.x = currentRotation.current.x;
      meshRef.current.rotation.y = currentRotation.current.y;
      meshRef.current.rotation.z = currentRotation.current.z;
      
      meshRef.current.position.x = currentPosition.current.x;
      meshRef.current.position.y = currentPosition.current.y;
    } else if (meshRef.current && !mousePosition) {
      // Smoothly return to default position when mouse is not tracked
      currentRotation.current.x = lerp(currentRotation.current.x, -0.01, 0.02);
      currentRotation.current.y = lerp(currentRotation.current.y, -0.2, 0.02);
      currentRotation.current.z = lerp(currentRotation.current.z, -0.1, 0.02);
      
      currentPosition.current.x = lerp(currentPosition.current.x, 0, 0.02);
      currentPosition.current.y = lerp(currentPosition.current.y, 0, 0.02);

      meshRef.current.rotation.x = currentRotation.current.x;
      meshRef.current.rotation.y = currentRotation.current.y;
      meshRef.current.rotation.z = currentRotation.current.z;
      
      meshRef.current.position.x = currentPosition.current.x;
      meshRef.current.position.y = currentPosition.current.y;
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

const ComputersCanvas = ({ mousePosition }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Set initial value
    setIsMobile(window.innerWidth <= 500);
    
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="always" // Changed from "demand" to "always" for smooth animations
      shadows
      dpr={[1,1 ]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      style={{ cursor: 'none' }} // Hide default cursor for custom cursor effect
    >
      <Suspense fallback={<CanvasLoader />}>
        <Computers isMobile={isMobile} mousePosition={mousePosition} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;