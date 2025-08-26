import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

// Smooth interpolation function
const lerp = (start, end, factor) => start + (end - start) * factor;

const Computers = ({ isMobile, mousePosition }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");
  const meshRef = useRef();
  
  // For touch interactions
  const [isTouching, setIsTouching] = useState(false);
  const touchStartPosition = useRef({ x: 0, y: 0 });
  const touchMoveFactor = useRef({ x: 0, y: 0 });

  // Store target and current values for smooth interpolation
  const targetRotation = useRef({ x: -0.01, y: -0.2, z: -0.1 });
  const currentRotation = useRef({ x: -0.01, y: -0.2, z: -0.1 });
  const targetPosition = useRef({ x: 0, y: 0, z: 0 });
  const currentPosition = useRef({ x: 0, y: 0, z: 0 });

  // Handle touch events
  const handleTouchStart = (e) => {
    if (!isMobile) return;
    setIsTouching(true);
    const touch = e.touches[0];
    touchStartPosition.current = {
      x: touch.clientX,
      y: touch.clientY
    };
  };

  const handleTouchMove = (e) => {
    if (!isMobile || !isTouching) return;
    const touch = e.touches[0];
    
    const deltaX = touch.clientX - touchStartPosition.current.x;
    const deltaY = touch.clientY - touchStartPosition.current.y;
    
    // Calculate movement factors (normalized values)
    touchMoveFactor.current.x = deltaX / window.innerWidth;
    touchMoveFactor.current.y = deltaY / window.innerHeight;
    
    // Update target rotation based on touch movement
    targetRotation.current.x = touchMoveFactor.current.y * 0.5 - 0.01;
    targetRotation.current.y = touchMoveFactor.current.x * 0.5 - 0.2;
    targetRotation.current.z = touchMoveFactor.current.x * 0.1 - 0.1;
    
    // Update target position based on touch movement
    targetPosition.current.x = touchMoveFactor.current.x * 0.8;
    targetPosition.current.y = -touchMoveFactor.current.y * 0.8;
  };

  const handleTouchEnd = () => {
    if (!isMobile) return;
    setIsTouching(false);
    
    // Reset movement factors when touch ends
    touchMoveFactor.current = { x: 0, y: 0 };
    
    // Smoothly return to default position
    targetRotation.current = { x: -0.01, y: -0.2, z: -0.1 };
    targetPosition.current = { x: 0, y: 0, z: 0 };
  };

  // Add event listeners for touch
  useEffect(() => {
    if (isMobile && meshRef.current) {
      const canvas = document.querySelector('canvas');
      if (canvas) {
        canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
        canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
        canvas.addEventListener('touchend', handleTouchEnd, { passive: true });
        
        return () => {
          canvas.removeEventListener('touchstart', handleTouchStart);
          canvas.removeEventListener('touchmove', handleTouchMove);
          canvas.removeEventListener('touchend', handleTouchEnd);
        };
      }
    }
  }, [isMobile, isTouching]);

  useFrame((state) => {
    if (meshRef.current) {
      if (!isMobile && mousePosition) {
        // 🔥 Desktop → cursor-based motion
        targetRotation.current.x = mousePosition.y * 0.3 - 0.01;
        targetRotation.current.y = mousePosition.x * 0.3 - 0.2;
        targetRotation.current.z = mousePosition.x * 0.05 - 0.1;

        targetPosition.current.x = mousePosition.x * 0.5;
        targetPosition.current.y = -mousePosition.y * 0.5;
        targetPosition.current.z = 0;
      } else if (isMobile && isTouching) {
        // 📱 Mobile → touch-based motion (already set in touch handlers)
        // No additional action needed here as targets are set in touch handlers
      } else if (isMobile && !isTouching) {
        // 📱 Mobile → idle floating/rotating animation when not touching
        const t = state.clock.getElapsedTime();
        targetRotation.current.x = Math.sin(t * 0.6) * 0.05 - 0.01;
        targetRotation.current.y = Math.cos(t * 0.4) * 0.1 - 0.2;
        targetRotation.current.z = Math.sin(t * 0.5) * 0.03 - 0.1;

        targetPosition.current.y = Math.sin(t * 0.8) * 0.15; // gentle up-down
        targetPosition.current.x = Math.cos(t * 0.6) * 0.1; // slight left-right
      } else {
        // Smoothly return to default
        targetRotation.current.x = -0.01;
        targetRotation.current.y = -0.2;
        targetRotation.current.z = -0.1;
        targetPosition.current.x = 0;
        targetPosition.current.y = 0;
      }

      // Apply smooth interpolation to all cases
      currentRotation.current.x = lerp(currentRotation.current.x, targetRotation.current.x, 0.12);
      currentRotation.current.y = lerp(currentRotation.current.y, targetRotation.current.y, 0.12);
      currentRotation.current.z = lerp(currentRotation.current.z, targetRotation.current.z, 0.12);

      currentPosition.current.x = lerp(currentPosition.current.x, targetPosition.current.x, 0.1);
      currentPosition.current.y = lerp(currentPosition.current.y, targetPosition.current.y, 0.1);

      // Apply rotation & position
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

const ComputersCanvas = ({ mousePosition, isMobile }) => {
  return (
    <Canvas
      frameloop="always"
      shadows
      dpr={[1, 1]}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      style={{ cursor: isMobile ? "default" : "none" }} // Hide cursor only on desktop
    >
      <Suspense fallback={<CanvasLoader />}>
        <Computers isMobile={isMobile} mousePosition={mousePosition} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;