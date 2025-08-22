import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
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

    const handleTouchMove = (event) => {
      if (!containerRef.current || !isMobile) return;
      const touch = event.touches[0];
      const rect = containerRef.current.getBoundingClientRect();
      const x = (touch.clientX - rect.left) / rect.width - 0.5;
      const y = (touch.clientY - rect.top) / rect.height - 0.5;
      setMousePosition({ x: x * 0.5, y: y * 0.5 });
    };

    const handleOrientation = (event) => {
      if (!isMobile) return;
      const x = (event.gamma || 0) / 90;
      const y = (event.beta || 0) / 90;
      setMousePosition({
        x: Math.max(-0.3, Math.min(0.3, x * 0.3)),
        y: Math.max(-0.3, Math.min(0.3, y * 0.3)),
      });
    };

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove);
    } else {
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      if (window.DeviceOrientationEvent) {
        window.addEventListener("deviceorientation", handleOrientation);
      }
    }

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      if (window.DeviceOrientationEvent) {
        window.removeEventListener("deviceorientation", handleOrientation);
      }
    };
  }, [isMobile]);

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
            className={`${styles.heroHeadText} text-white text-[30px] sm:text-[50px] md:text-[60px] lg:text-[80px] leading-[35px] sm:leading-[55px] md:leading-[65px] lg:leading-[85px]`}
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              viewport={{ once: false }}
            >
              Hi, I'm{" "}
            </motion.span>
            <span className="text-[#915EFF]">
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
                >
                  {char}
                </motion.span>
              ))}
            </span>
          </motion.h1>

          <motion.p
            className={`${styles.heroSubText} mt-2 text-white-100 text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] leading-[20px] sm:leading-[24px] md:leading-[28px] lg:leading-[32px] max-w-3xl`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            viewport={{ once: false }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.4 }}
            >
              Web Developer & UI/UX Designer
            </motion.span>
            <br className="hidden sm:block" />
            <span className="sm:hidden"> & </span>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.4 }}
            >
              I develop modern, user{" "}
            </motion.span>
            <br className="hidden sm:block" />
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.4 }}
            >
              interfaces and web applications
            </motion.span>
          </motion.p>
        </motion.div>
      </div>

      {/* Canvas */}
      <motion.div
        className={`absolute ${
          isMobile
            ? "top-[40%] left-0 w-full h-[60%]"
            : "top-[25%] left-0 w-full h-[75%]"
        }`}
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.6, ease: "easeOut" }}
        viewport={{ once: false }}
      >
        <ComputersCanvas
          className={`${
            isMobile ? "scale-[0.7] sm:scale-[0.85] md:scale-100" : "scale-100"
          } transition-transform duration-300`}
          mousePosition={mousePosition}
          isMobile={isMobile}
        />
      </motion.div>

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
