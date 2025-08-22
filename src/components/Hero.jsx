import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef();
  
  const name = "Kamesh";

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || 
                    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Mouse tracking for desktop
    const handleMouseMove = (event) => {
      if (!containerRef.current || isMobile) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      
      setMousePosition({ x, y });
    };

    // Touch tracking for mobile
    const handleTouchMove = (event) => {
      if (!containerRef.current || !isMobile) return;
      
      const touch = event.touches[0];
      const rect = containerRef.current.getBoundingClientRect();
      const x = (touch.clientX - rect.left) / rect.width - 0.5;
      const y = (touch.clientY - rect.top) / rect.height - 0.5;
      
      setMousePosition({ x: x * 0.5, y: y * 0.5 }); // Reduced sensitivity for touch
    };

    // Device orientation for mobile
    const handleOrientation = (event) => {
      if (!isMobile) return;
      
      const x = (event.gamma || 0) / 90; // -1 to 1 range
      const y = (event.beta || 0) / 90;  // -1 to 1 range
      
      setMousePosition({ 
        x: Math.max(-0.3, Math.min(0.3, x * 0.3)), 
        y: Math.max(-0.3, Math.min(0.3, y * 0.3)) 
      });
    };

    // Set up event listeners
    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove);
    } else {
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      if (window.DeviceOrientationEvent) {
        window.addEventListener("deviceorientation", handleOrientation);
      }
    }

    // Trigger visibility for animations
    const timer = setTimeout(() => setIsVisible(true), 300);
    
    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      if (window.DeviceOrientationEvent) {
        window.removeEventListener("deviceorientation", handleOrientation);
      }
      clearTimeout(timer);
    };
  }, [isMobile]);

  // Animation variants for different elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const textVariants = {
    hidden: { 
      opacity: 0, 
      y: isMobile ? 30 : 50,
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const lineVariants = {
    hidden: { 
      height: 0,
      opacity: 0 
    },
    visible: { 
      height: isMobile ? "128px" : "320px",
      opacity: 1,
      transition: { 
        duration: 1.2,
        ease: "easeOut",
        delay: 0.3
      }
    }
  };

  const dotVariants = {
    hidden: { 
      scale: 0,
      opacity: 0 
    },
    visible: { 
      scale: 1,
      opacity: 1,
      transition: { 
        duration: 0.6,
        ease: "backOut",
        delay: 0.2
      }
    }
  };

  const scrollIndicatorVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        delay: 1.5
      }
    }
  };

  // Mobile-specific floating animation
  const mobileFloating = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  };

  return (
    <motion.section 
      ref={containerRef} 
      className="relative w-full h-screen mx-auto overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      {/* Animated background gradient for mobile */}
      {isMobile && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-blue-900/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        />
      )}

      {/* Hero Text Content */}
      <div className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-3 sm:gap-5 z-10`}>
        {/* Animated Decorative Line */}
        <div className='flex flex-col justify-center items-center mt-16 sm:mt-28 md:mt-5'>
          <motion.div 
            className='w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#915EFF]'
            variants={dotVariants}
            whileHover={{ scale: 1.2, glow: true }}
          />
          <motion.div 
            className='w-1 violet-gradient'
            variants={lineVariants}
            style={{ 
              background: 'linear-gradient(180deg, #915EFF 0%, transparent 100%)'
            }}
          />
        </div>

        {/* Main Content with Enhanced Mobile Animations */}
        <motion.div 
          className="mt-16 sm:mt-28 md:mt-5"
          variants={textVariants}
          animate={isMobile ? mobileFloating : undefined}
        >
          <motion.h1 
            className={`${styles.heroHeadText} text-white text-[30px] sm:text-[50px] md:text-[60px] lg:text-[80px] leading-[35px] sm:leading-[55px] md:leading-[65px] lg:leading-[85px]`}
            initial={{ opacity: 0, y: isMobile ? 20 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Hi, I'm{" "}
            </motion.span>
            <span className='text-[#915EFF]'>
              {name.split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.8 + index * 0.1,
                    ease: "backOut"
                  }}
                  whileHover={!isMobile ? { 
                    scale: 1.1, 
                    color: "#c4b5fd",
                    transition: { duration: 0.2 }
                  } : undefined}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          <motion.p 
            className={`${styles.heroSubText} mt-2 text-white-100 text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-[20px] sm:leading-[24px] md:leading-[28px] lg:leading-[32px] max-w-3xl`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              Web Developer & UI/UX Designer
            </motion.span>
            <br className="hidden sm:block"/>
            <span className="sm:hidden"> & </span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.6 }}
            >
              I develop modern, user{" "}
            </motion.span>
            <br className="hidden sm:block"/>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.6 }}
            >
              interfaces and web applications
            </motion.span>
          </motion.p>
        </motion.div>
      </div>

      {/* Computer Canvas with Enhanced Mobile Integration */}
      <motion.div 
        className={`
          absolute 
          ${isMobile 
            ? 'top-[40%] left-0 w-full h-[60%]' 
            : 'top-[25%] left-0 w-full h-[75%]'
          }
        `}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
      >
        <ComputersCanvas 
          className={`
            ${isMobile 
              ? 'scale-[0.7] sm:scale-[0.85] md:scale-100' 
              : 'scale-100'
            }
            transition-transform duration-300
          `}
          mousePosition={mousePosition}
          isMobile={isMobile}
        />
      </motion.div>

      {/* Enhanced Scroll Indicator */}
      <motion.div 
        className='absolute bottom-8 sm:bottom-10 w-full flex justify-center items-center z-10'
        variants={scrollIndicatorVariants}
      >
        <motion.a 
          href='#about'
          whileHover={!isMobile ? { scale: 1.1 } : undefined}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer"
        >
          <motion.div 
            className='w-[28px] h-[50px] sm:w-[35px] sm:h-[64px] rounded-3xl border-2 sm:border-4 border-secondary flex justify-center items-start p-1 sm:p-2'
            animate={isMobile ? {
              y: [0, -5, 0],
              boxShadow: [
                "0 0 0px rgba(145, 94, 255, 0.3)",
                "0 0 20px rgba(145, 94, 255, 0.6)",
                "0 0 0px rgba(145, 94, 255, 0.3)"
              ]
            } : undefined}
            transition={isMobile ? {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            } : undefined}
          >
            <motion.div
              animate={{
                y: isMobile ? [0, 12, 0] : [0, 16, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              }}
              className='w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-secondary mb-1'
            />
          </motion.div>
        </motion.a>
      </motion.div>

      {/* Mobile Touch Hint */}
      {isMobile && (
        <motion.div
          className="absolute top-1/2 right-4 text-white/60 text-xs z-20"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ delay: 3, duration: 0.8 }}
        >
          <motion.p
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
          </motion.p>
        </motion.div>
      )}
    </motion.section>
  );
};

export default Hero;