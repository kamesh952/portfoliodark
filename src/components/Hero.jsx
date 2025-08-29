import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

// Smooth interpolation function
const lerp = (start, end, factor) => start + (end - start) * factor;

const Computers = ({ isMobile, inputPosition, isInteracting }) => {
  const computer = useGLTF("./desktop_pc/scene.gltf");
  const meshRef = useRef();
  
  // Store target and current values for smooth interpolation
  const targetRotation = useRef({ x: -0.01, y: -0.2, z: -0.1 });
  const currentRotation = useRef({ x: -0.01, y: -0.2, z: -0.1 });
  const targetPosition = useRef({ x: 0, y: 0, z: 0 });
  const currentPosition = useRef({ x: 0, y: 0, z: 0 });

  useFrame((state) => {
    if (meshRef.current) {
      if (isInteracting && inputPosition) {
        // Different sensitivity for desktop vs mobile
        const rotationSensitivity = isMobile ? 0.6 : 0.3; // Reduced for mobile
        const positionSensitivity = isMobile ? 0.8 : 0.5; // Reduced for mobile
        
        // Calculate rotation based on input position
        targetRotation.current.x = inputPosition.y * rotationSensitivity - 0.01;
        targetRotation.current.y = inputPosition.x * rotationSensitivity - 0.2;
        targetRotation.current.z = inputPosition.x * (rotationSensitivity / 6) - 0.1; // Reduced Z rotation

        // Calculate position based on input
        targetPosition.current.x = inputPosition.x * positionSensitivity;
        targetPosition.current.y = -inputPosition.y * positionSensitivity;
        targetPosition.current.z = Math.abs(inputPosition.x) * 0.1; // Reduced Z movement
      } else {
        // Idle animation when not interacting
        const t = state.clock.getElapsedTime();
        const idleIntensity = 0.03;
        
        // Gentle floating animation
        targetRotation.current.x = Math.sin(t * 0.6) * idleIntensity - 0.01;
        targetRotation.current.y = Math.cos(t * 0.4) * idleIntensity * 2 - 0.2;
        targetRotation.current.z = Math.sin(t * 0.5) * idleIntensity - 0.1;

        // Subtle position movement
        targetPosition.current.y = Math.sin(t * 0.8) * 0.05;
        targetPosition.current.x = Math.cos(t * 0.6) * 0.03;
        targetPosition.current.z = 0;
      }

      // Apply smooth interpolation
      const rotationSpeed = isInteracting ? 0.15 : 0.08;
      const positionSpeed = isInteracting ? 0.12 : 0.06;
      
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

const ComputersCanvas = ({ isMobile }) => {
  const [inputPosition, setInputPosition] = useState(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const canvasRef = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isMobile) return;
      
      const rect = canvasRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      
      setInputPosition({ x, y });
    };

    const handleMouseEnter = () => {
      if (isMobile) return;
      setIsInteracting(true);
    };

    const handleMouseLeave = () => {
      if (isMobile) return;
      setIsInteracting(false);
      setInputPosition(null);
    };

    const handleTouchStart = (e) => {
      if (!isMobile) return;
      setIsInteracting(true);
      handleTouchMove(e);
    };

    const handleTouchMove = (e) => {
      if (!isMobile || !isInteracting) return;
      e.preventDefault();
      
      const touch = e.touches[0];
      const rect = canvasRef.current.getBoundingClientRect();
      
      // Normalize touch coordinates to [-0.5, 0.5] range (like desktop)
      const x = (touch.clientX - rect.left) / rect.width - 0.5;
      const y = (touch.clientY - rect.top) / rect.height - 0.5;
      
      setInputPosition({ x, y });
    };

    const handleTouchEnd = () => {
      if (!isMobile) return;
      setIsInteracting(false);
      setInputPosition(null);
    };

    const canvas = canvasRef.current;
    if (canvas) {
      // Desktop events
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseenter', handleMouseEnter);
      canvas.addEventListener('mouseleave', handleMouseLeave);
      
      // Mobile events
      canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
      canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
      canvas.addEventListener('touchend', handleTouchEnd);
      canvas.addEventListener('touchcancel', handleTouchEnd);
    }

    return () => {
      if (canvas) {
        // Clean up desktop events
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseenter', handleMouseEnter);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
        
        // Clean up mobile events
        canvas.removeEventListener('touchstart', handleTouchStart);
        canvas.removeEventListener('touchmove', handleTouchMove);
        canvas.removeEventListener('touchend', handleTouchEnd);
        canvas.removeEventListener('touchcancel', handleTouchEnd);
      }
    };
  }, [isMobile, isInteracting]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Canvas
        ref={canvasRef}
        frameloop="always"
        shadows
        dpr={[1, 1]}
        camera={{ position: [20, 3, 5], fov: 25 }}
        gl={{ preserveDrawingBuffer: true }}
        style={{ 
          touchAction: isMobile ? 'none' : 'auto'
        }}
      >
        <Suspense fallback={null}>
          <Computers 
            isMobile={isMobile} 
            inputPosition={inputPosition}
            isInteracting={isInteracting}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

// Main Hero component
const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <section className="relative w-full h-screen mx-auto">
      <div className="absolute inset-0 top-[120px] max-w-7xl mx-auto flex flex-row items-start gap-5">
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div>
          <h1 className="text-white font-black text-5xl lg:text-7xl sm:text-6xl">
            Hi, I'm <span className="text-[#915EFF]">Kamesh</span>
          </h1>
          <p className="text-white-100 font-medium text-2xl mt-2 lg:text-3xl sm:text-2xl">
            I develop modern, user <br className="sm:block hidden" />
            interfaces and web applications
          </p>
        </div>
      </div>

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-9 h-16 rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <div className="w-3 h-3 rounded-full bg-secondary mb-1 animate-bounce" />
          </div>
        </a>
      </div>

      <div className="absolute top-1/4 left-0 w-full h-3/4">
        <ComputersCanvas isMobile={isMobile} />
      </div>
    </section>
  );
};

export default Hero;