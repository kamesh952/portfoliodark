import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

// Smooth interpolation function
const lerp = (start, end, factor) => start + (end - start) * factor;

const Computers = ({ isMobile, mousePosition }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");
  const meshRef = useRef();
  
  // Enhanced touch interaction states
  const [isTouching, setIsTouching] = useState(false);
  const [touchStartTime, setTouchStartTime] = useState(0);
  const touchStartPosition = useRef({ x: 0, y: 0 });
  const touchCurrentPosition = useRef({ x: 0, y: 0 });
  const touchVelocity = useRef({ x: 0, y: 0 });
  const lastTouchTime = useRef(0);
  const momentum = useRef({ x: 0, y: 0 });

  // Store target and current values for smooth interpolation
  const targetRotation = useRef({ x: -0.01, y: -0.2, z: -0.1 });
  const currentRotation = useRef({ x: -0.01, y: -0.2, z: -0.1 });
  const targetPosition = useRef({ x: 0, y: 0, z: 0 });
  const currentPosition = useRef({ x: 0, y: 0, z: 0 });

  // Enhanced touch start handler
  const handleTouchStart = (e) => {
    if (!isMobile) return;
    e.preventDefault();
    setIsTouching(true);
    setTouchStartTime(Date.now());
    
    const touch = e.touches[0];
    const rect = e.target.getBoundingClientRect();
    
    // Normalize touch coordinates to [-1, 1] range
    const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
    
    touchStartPosition.current = { x, y };
    touchCurrentPosition.current = { x, y };
    lastTouchTime.current = Date.now();
    
    // Reset momentum
    momentum.current = { x: 0, y: 0 };
    touchVelocity.current = { x: 0, y: 0 };
  };

  // Enhanced touch move handler with velocity tracking
  const handleTouchMove = (e) => {
    if (!isMobile || !isTouching) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    const rect = e.target.getBoundingClientRect();
    const currentTime = Date.now();
    const timeDelta = currentTime - lastTouchTime.current;
    
    // Normalize coordinates
    const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;
    
    // Calculate velocity for momentum
    if (timeDelta > 0) {
      touchVelocity.current.x = (x - touchCurrentPosition.current.x) / timeDelta * 1000;
      touchVelocity.current.y = (y - touchCurrentPosition.current.y) / timeDelta * 1000;
    }
    
    touchCurrentPosition.current = { x, y };
    lastTouchTime.current = currentTime;
    
    // Calculate movement from start position for more intuitive control
    const deltaX = x - touchStartPosition.current.x;
    const deltaY = y - touchStartPosition.current.y;
    
    // Enhanced rotation mapping - more responsive and natural feeling
    targetRotation.current.x = deltaY * 0.8 - 0.01; // Vertical swipe controls X rotation
    targetRotation.current.y = deltaX * 0.8 - 0.2; // Horizontal swipe controls Y rotation
    targetRotation.current.z = deltaX * 0.3 - 0.1; // Slight Z tilt for depth
    
    // Position changes for more dynamic movement
    targetPosition.current.x = deltaX * 1.2;
    targetPosition.current.y = deltaY * 1.2;
    targetPosition.current.z = Math.abs(deltaX) * 0.3; // Slight forward movement on interaction
  };

  // Enhanced touch end with momentum
  const handleTouchEnd = (e) => {
    if (!isMobile) return;
    e.preventDefault();
    setIsTouching(false);
    
    const touchDuration = Date.now() - touchStartTime;
    const velocityThreshold = 0.5;
    
    // Apply momentum if the gesture was quick and had significant velocity
    if (touchDuration < 300 && 
        (Math.abs(touchVelocity.current.x) > velocityThreshold || 
         Math.abs(touchVelocity.current.y) > velocityThreshold)) {
      
      // Scale down velocity for momentum
      momentum.current.x = touchVelocity.current.x * 0.1;
      momentum.current.y = touchVelocity.current.y * 0.1;
    }
    
    // Don't immediately reset - let momentum play out
    if (Math.abs(momentum.current.x) < 0.01 && Math.abs(momentum.current.y) < 0.01) {
      // Smoothly return to default position only if no momentum
      setTimeout(() => {
        if (!isTouching) {
          targetRotation.current = { x: -0.01, y: -0.2, z: -0.1 };
          targetPosition.current = { x: 0, y: 0, z: 0 };
        }
      }, 1000); // Delay return to default
    }
  };

  // Add comprehensive event listeners for touch
  useEffect(() => {
    if (isMobile) {
      const canvas = document.querySelector('canvas');
      if (canvas) {
        // Add touch event listeners with proper options
        const options = { passive: false }; // Allow preventDefault
        
        canvas.addEventListener('touchstart', handleTouchStart, options);
        canvas.addEventListener('touchmove', handleTouchMove, options);
        canvas.addEventListener('touchend', handleTouchEnd, options);
        canvas.addEventListener('touchcancel', handleTouchEnd, options);
        
        // Prevent context menu on long press
        canvas.addEventListener('contextmenu', (e) => e.preventDefault());
        
        return () => {
          canvas.removeEventListener('touchstart', handleTouchStart);
          canvas.removeEventListener('touchmove', handleTouchMove);
          canvas.removeEventListener('touchend', handleTouchEnd);
          canvas.removeEventListener('touchcancel', handleTouchEnd);
          canvas.removeEventListener('contextmenu', (e) => e.preventDefault());
        };
      }
    }
  }, [isMobile]);

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
      } else if (isMobile && !isTouching) {
        // Handle momentum decay
        if (Math.abs(momentum.current.x) > 0.01 || Math.abs(momentum.current.y) > 0.01) {
          // Apply momentum to rotation
          targetRotation.current.y += momentum.current.x * 0.1;
          targetRotation.current.x += momentum.current.y * 0.1;
          
          // Decay momentum
          momentum.current.x *= 0.95;
          momentum.current.y *= 0.95;
        } else {
          // 📱 Mobile → gentle idle animation when not touching and no momentum
          const t = state.clock.getElapsedTime();
          const idleIntensity = 0.03; // Reduced for subtlety
          
          targetRotation.current.x = Math.sin(t * 0.6) * idleIntensity - 0.01;
          targetRotation.current.y = Math.cos(t * 0.4) * idleIntensity * 2 - 0.2;
          targetRotation.current.z = Math.sin(t * 0.5) * idleIntensity - 0.1;

          targetPosition.current.y = Math.sin(t * 0.8) * 0.05; // Subtle up-down
          targetPosition.current.x = Math.cos(t * 0.6) * 0.03; // Subtle left-right
          targetPosition.current.z = 0;
        }
      }
      // When touching on mobile, targets are already set in touch handlers

      // Apply smooth interpolation with different speeds for natural feel
      const rotationSpeed = isTouching ? 0.15 : 0.08; // Faster when actively touching
      const positionSpeed = isTouching ? 0.12 : 0.06;
      
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
        touchAction: isMobile ? "none" : "auto" // Prevent scrolling on touch
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