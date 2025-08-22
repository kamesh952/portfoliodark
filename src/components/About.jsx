import React, { useRef, useEffect } from "react";
import { Tilt } from "react-tilt";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";

gsap.registerPlugin(ScrollTrigger);

const useGsap = (elementRef, animation, delay = 0) => {
  useEffect(() => {
    if (elementRef.current) {
      gsap.fromTo(elementRef.current, animation.from, {
        ...animation.to,
        delay,
        scrollTrigger: {
          trigger: elementRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }
  }, [elementRef, animation, delay]);
};

const ServiceCard = ({ index, title, icon }) => {
  const cardRef = useRef(null);
  useGsap(
    cardRef,
    {
      from: { opacity: 0, y: 100, scale: 0.8 },
      to: { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" },
    },
    index * 0.2
  );

  return (
    <Tilt className="xs:w-[250px] w-full">
      <div
        ref={cardRef}
        className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
      >
        <div className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
          <img
            src={icon}
            alt="web-development"
            className="w-16 h-16 object-contain"
          />
          <h3 className="text-white text-[20px] font-bold text-center">
            {title}
          </h3>
        </div>
      </div>
    </Tilt>
  );
};

const About = () => {
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const imageRef = useRef(null);

  // Heading Animation
  useGsap(headingRef, {
    from: { opacity: 0, x: -50 },
    to: { opacity: 1, x: 0, duration: 1, ease: "power2.out" },
  });

  // Paragraph Animation
  useGsap(
    paragraphRef,
    {
      from: { opacity: 0, y: 50 },
      to: { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
    },
    0.3
  );

  // Image Animation
  useGsap(
    imageRef,
    {
      from: { opacity: 0, x: 50, scale: 0.9 },
      to: { opacity: 1, x: 0, scale: 1, duration: 1.2, ease: "power3.out" },
    },
    0.5
  );

  return (
    <>
      {/* Main Content Section with Text and Image */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-16">
        {/* Left Content */}
        <div className="flex-1">
          <div ref={headingRef}>
            <p className={styles.sectionSubText}>Introduction</p>
            <h2 className={styles.sectionHeadText}>Overview.</h2>
          </div>

          <p
            ref={paragraphRef}
            className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
          >
            Hello! I'm Kamesh R, an enthusiastic IT student at MIT, Chennai,
            with a deep interest in web development and technology. I'm
            passionate about building sleek, functional websites and exploring
            the ever-evolving digital world.
          </p>
          <p
            ref={paragraphRef}
            className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
          >
            I enjoy combining logical thinking with creativity to solve
            real-world problems through code. Currently, I'm honing my skills in
            both front-end and back-end development, and always eager to learn
            new technologies to stay ahead in the tech game.
          </p>
        </div>

        {/* Right Image */}
        <div className="flex-shrink-0 w-full lg:w-auto flex justify-center lg:justify-end">
          <div ref={imageRef} className="relative group">
            {/* Animated gradient border */}
            <div className="absolute -inset-2 bg-transparent rounded-full blur-sm opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>

            {/* Outer glow ring */}
            <div className="absolute -inset-1 bg-transparent rounded-full opacity-60 group-hover:opacity-80 transition-all duration-500 animate-spin-slow"></div>

            {/* Main image container */}
            <div className="relative">
              <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-white/10 backdrop-blur-sm bg-white/5 shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:border-white/20">
                <img
                  src="/kamesh.png" // Replace with your actual image path
                  alt="Kamesh R"
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                />
                {/* Subtle overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10 rounded-full"></div>
              </div>

              {/* Floating elements for extra visual interest */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#915EFF] rounded-full blur-sm opacity-80 animate-bounce delay-300"></div>
              <div className="absolute -bottom-3 -left-3 w-4 h-4 bg-pink-500 rounded-full blur-sm opacity-60 animate-bounce delay-700"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Cards Section */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-center gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
