import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [handPosition, setHandPosition] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [cameraPermission, setCameraPermission] = useState('idle');
  const containerRef = useRef();

  const name = "Kamesh";

  useEffect(() => {
    const checkMobile = () => {
      const mobile =
        window.innerWidth < 768 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      setIsMobile(mobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    const handleMouseMove = (event) => {
      if (!containerRef.current || isMobile) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      setMousePosition({ x, y });
    };

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMobile]);

  // Initialize hand tracking when on mobile
  useEffect(() => {
    if (!isMobile) return;

    let detector = null;
    let video = null;
    let animationFrame = null;

    const initializeHandDetection = async () => {
      try {
        // Check if media devices are available
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          console.warn("Camera access not supported in this browser");
          return;
        }

        // Load TensorFlow.js and handpose model
        const tf = await import('@tensorflow/tfjs');
        const handpose = await import('@tensorflow-models/handpose');
        
        await tf.ready();
        
        // Create detector
        detector = await handpose.load();
        
        // Setup camera
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user' }
        });
        
        video = document.createElement('video');
        video.srcObject = stream;
        video.onloadedmetadata = () => {
          video.play();
          detectHands();
        };
        
        setCameraPermission('granted');
      } catch (error) {
        console.error("Error initializing hand detection:", error);
        setCameraPermission('denied');
      }
    };

    const detectHands = async () => {
      if (!detector || !video) return;

      try {
        const hands = await detector.estimateHands(video);
        
        if (hands.length > 0) {
          // Get the palm base (wrist) keypoint
          const wrist = hands[0].landmarks[0];
          
          // Normalize coordinates to [-1, 1] range
          const x = (wrist[0] / video.videoWidth) * 2 - 1;
          const y = -((wrist[1] / video.videoHeight) * 2 - 1);
          
          setHandPosition({ x, y });
        } else {
          setHandPosition(null);
        }
      } catch (error) {
        console.error("Error detecting hands:", error);
      }
      
      animationFrame = requestAnimationFrame(detectHands);
    };

    initializeHandDetection();

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      
      if (video && video.srcObject) {
        video.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, [isMobile]);

  // Request camera permission with user interaction
  const requestCameraAccess = async () => {
    try {
      setCameraPermission('requesting');
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // Immediately stop the stream since we just needed permission
      stream.getTracks().forEach(track => track.stop());
      setCameraPermission('granted');
      
      // Reload the page to restart hand detection
      window.location.reload();
    } catch (error) {
      console.error("Camera access denied:", error);
      setCameraPermission('denied');
    }
  };

  // Animation variants with faster timings
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4, // faster fade-in
        staggerChildren: 0.15,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: isMobile ? 30 : 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const lineVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: {
      height: isMobile ? "128px" : "320px",
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
    },
  };

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.4, ease: "backOut", delay: 0.15 },
    },
  };

  const scrollIndicatorVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 1.1 },
    },
  };

  const mobileFloating = {
    y: [0, -10, 0],
    transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
  };

  return (
    <motion.section
      ref={containerRef}
      className="relative w-full h-screen mx-auto overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
    >
      {isMobile && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-blue-900/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        />
      )}

      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-3 sm:gap-5 z-10`}
      >
        {/* Line + Dot */}
        <div className="flex flex-col justify-center items-center mt-16 sm:mt-28 md:mt-5">
          <motion.div
            className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#915EFF]"
            variants={dotVariants}
            whileHover={{ scale: 1.2 }}
          />
          <motion.div
            className="w-1 violet-gradient"
            variants={lineVariants}
            style={{
              background: "linear-gradient(180deg, #915EFF 0%, transparent 100%)",
            }}
          />
        </div>

        {/* Text */}
        <motion.div
          className="mt-16 sm:mt-28 md:mt-5"
          variants={textVariants}
          animate={isMobile ? mobileFloating : undefined}
        >
          <motion.h1
            className={`${styles.heroHeadText} text-white text-[32px] xs:text-[40px] sm:text-[50px] md:text-[60px] lg:text-[80px] leading-[36px] xs:leading-[44px] sm:leading-[55px] md:leading-[65px] lg:leading-[85px]`}
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              viewport={{ once: false }}
              className="inline-block whitespace-nowrap"
            >
              Hi, I'm{" "}
            </motion.span>
            <span className="text-[#915EFF] block xs:inline-block mt-1 xs:mt-0">
              {name.split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.25,
                    delay: 0.6 + index * 0.08,
                    ease: "backOut",
                  }}
                  whileHover={
                    !isMobile
                      ? {
                          scale: 1.1,
                          color: "#c4b5fd",
                          transition: { duration: 0.15 },
                        }
                      : undefined
                  }
                  viewport={{ once: false }}
                  className="inline-block"
                  style={{ 
                    minWidth: char === ' ' ? '0.25em' : 'auto',
                    textShadow: !isMobile ? "0 0 10px rgba(145, 94, 255, 0.5)" : "none"
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          <motion.p
            className={`${styles.heroSubText} mt-2 text-white-100 text-[14px] xs:text-[16px] sm:text-[18px] md:text-[20px] leading-[20px] xs:leading-[22px] sm:leading-[24px] md:leading-[28px] max-w-3xl`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            viewport={{ once: false }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.4 }}
              className="block xs:inline"
            >
              Web Developer & UI/UX Designer
            </motion.span>
            <span className="hidden xs:inline">, </span>
            <br className="xs:hidden" />
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.4 }}
              className="block xs:inline"
            >
              I develop modern, user{" "}
            </motion.span>
            <br className="hidden sm:block" />
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.4 }}
              className="block xs:inline"
            >
              interfaces and web applications
            </motion.span>
          </motion.p>
        </motion.div>
      </div>

      {/* Canvas - Reduced size for mobile */}
      <motion.div
        className={`absolute ${
          isMobile
            ? "top-[35%] left-0 w-full h-[60%] scale-75"
            : "top-[25%] left-0 w-full h-[75%] scale-100"
        } transition-all duration-300`}
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.6, ease: "easeOut" }}
        viewport={{ once: false }}
      >
        <ComputersCanvas
          mousePosition={isMobile ? handPosition : mousePosition}
          isMobile={isMobile}
        />
      </motion.div>

      {/* Camera Permission Prompt */}
      {isMobile && cameraPermission !== 'granted' && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-20 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-gray-900/90 backdrop-blur-sm rounded-xl p-6 max-w-md text-center">
            <h3 className="text-white text-xl font-bold mb-3">Hand Gesture Control</h3>
            <p className="text-gray-300 mb-5">
              Move your hand in front of your camera to control the 3D model
            </p>
            <button
              onClick={requestCameraAccess}
              className="bg-[#915EFF] hover:bg-[#7a4bd8] text-white font-medium py-3 px-6 rounded-lg transition-colors"
              disabled={cameraPermission === 'requesting'}
            >
              {cameraPermission === 'denied' 
                ? 'Permission Denied - Try Again' 
                : cameraPermission === 'requesting'
                  ? 'Requesting...'
                  : 'Enable Camera Access'
              }
            </button>
            {cameraPermission === 'denied' && (
              <p className="text-gray-400 text-sm mt-4">
                Please check your browser permissions and allow camera access for this site
              </p>
            )}
          </div>
        </motion.div>
      )}

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 sm:bottom-10 w-full flex justify-center items-center z-10"
        variants={scrollIndicatorVariants}
      >
        <motion.a
          href="#about"
          whileHover={!isMobile ? { scale: 1.1 } : undefined}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer"
        >
          <motion.div
            className="w-[28px] h-[50px] sm:w-[35px] sm:h-[64px] rounded-3xl border-2 sm:border-4 border-secondary flex justify-center items-start p-1 sm:p-2"
            animate={
              isMobile
                ? {
                    y: [0, -5, 0],
                    boxShadow: [
                      "0 0 0px rgba(145, 94, 255, 0.3)",
                      "0 0 20px rgba(145, 94, 255, 0.6)",
                      "0 0 0px rgba(145, 94, 255, 0.3)",
                    ],
                  }
                : undefined
            }
            transition={
              isMobile
                ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
                : undefined
            }
          >
            <motion.div
              animate={{ y: isMobile ? [0, 12, 0] : [0, 16, 0] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
              className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-secondary mb-1"
            />
          </motion.div>
        </motion.a>
      </motion.div>
    </motion.section>
  );
};

export default Hero;