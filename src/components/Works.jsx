import React, { useState, useEffect, useRef } from "react";


const works = [
  {
    id: 1,
    name: "Version Text AI - Add text Behind Image",
    description: "An AI-powered application that intelligently places text behind objects in images using advanced computer vision and machine learning algorithms.",
    category: "ml",
    image: "https://vheer.com/_next/image?url=%2Fimages%2FlandingPages%2Ftext_behind_image%2Fmain_image_1.webp&w=3840&q=75",
    tags: [
      { name: "HTML", color: "text-orange-400" },
      { name: "UI/UX", color: "text-purple-400" },
      { name: "Javascript", color: "text-yellow-400" },
      { name: "Image Rendering", color: "text-green-400" }
    ],
    source_code_link: "https://github.com/kamesh952/Kalm_Holidays.git",
    live_link: "https://visiontest-ai.onrender.com/",
  },
  {
    id: 2,
    name: "Erase X Background Remover",
    description: "A powerful background removal tool using state-of-the-art AI models to precisely separate subjects from backgrounds with professional quality results.",
    category: "ml",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop&crop=center",
    tags: [
      { name: "HTML", color: "text-orange-400" },
      { name: "UI/UX", color: "text-purple-400" },
      { name: "Javascript", color: "text-yellow-400" },
      { name: "API Integration", color: "text-blue-400" }
    ],
    source_code_link: "https://github.com/kamesh952/Erase-X.git",
    live_link: "https://erase-x.onrender.com/",
  },
  {
    id: 3,
    name: "Hotel Database Management-DBMS Project",
    description: "A comprehensive database management system for hotels featuring room booking, customer management, and analytics with a modern React frontend.",
    category: "web",
    image: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
    tags: [
      { name: "React", color: "text-cyan-400" },
      { name: "MongoDB", color: "text-green-400" },
      { name: "Backend-Python", color: "text-blue-400" }
    ],
    source_code_link: "https://github.com/kamesh952/hotel_db_client.git",
    live_link: "https://hotel-db-client.onrender.com/",
  },
  {
    id: 4,
    name: "KalmAura - A MERN Stack Shopping Project",
    description: "A full-featured e-commerce platform built with the MERN stack, featuring user authentication, payment integration, and admin dashboard.",
    category: "web",
    image: "https://images.pexels.com/photos/325876/pexels-photo-325876.jpeg",
    tags: [
      { name: "MongoDB", color: "text-green-400" },
      { name: "Node.js", color: "text-green-500" },
      { name: "Express.js", color: "text-gray-400" },
      { name: "React (Vite)", color: "text-cyan-400" }
    ],
    source_code_link: "https://github.com/kamesh952/Kalm-Aura.git",
    live_link: "https://kalmaura-pi.vercel.app/",
    featured: true,
  },
  {
    id: 5,
    name: "Kalm Photo Editor",
    description: "An advanced photo editing application with AI-enhanced features, filters, and professional-grade editing tools built with Python and Streamlit.",
    category: "ml",
    image: "https://media.istockphoto.com/id/1405395631/photo/professional-retoucher-working-on-graphic-tablet-at-desk-in-office.jpg?s=612x612&w=is&k=20&c=Oox3Ep4fnW3RvHt2Wc5znu9UWJaDYouE4zDAIVkRnbo=",
    tags: [
      { name: "Python-Flask", color: "text-red-400" },
      { name: "Python-Streamlit", color: "text-pink-400" },
      { name: "Python-CV", color: "text-green-400" }
    ],
    source_code_link: "https://github.com/kamesh952/Kalm_Photo_Editor.git",
    live_link: "https://kalmphotoeditor.streamlit.app/",
  },
  {
    id: 6,
    name: "Convert iQ - Image format Converter",
    description: "A fast and efficient image format converter supporting multiple formats with batch processing capabilities and optimized compression algorithms.",
    category: "ml",
    image: "https://content-management-files.canva.com/35bbc1b1-dc94-48c0-883f-1f0ffcb4fd8e/tools-feature_image-converter_lead_01_2x.jpg",
    tags: [
      { name: "HTML", color: "text-orange-400" },
      { name: "UI/UX", color: "text-purple-400" },
      { name: "Javascript", color: "text-yellow-400" }
    ],
    source_code_link: "https://github.com/kamesh952/Convert-IQ.git",
    live_link: "https://convert-iq.onrender.com/",
  },
  {
    id: 7,
    name: "AI Chatbot",
    description: "An intelligent conversational AI chatbot powered by Google's Gemini API with natural language processing capabilities and modern React interface.",
    category: "ml",
    image: "https://static.vecteezy.com/system/resources/previews/027/776/370/non_2x/abstract-chatbot-ai-artificial-intelligence-chatbot-ai-is-a-software-application-used-to-chat-with-humans-with-network-technology-on-a-blue-background-vector.jpg",
    tags: [
      { name: "Gemini API", color: "text-blue-400" },
      { name: "React/vite", color: "text-cyan-400" }
    ],
    source_code_link: "https://github.com/kamesh952/Kalm_ChatBot.git",
    live_link: "https://kamesh952.github.io/Kalm_ChatBot/",
  },
  {
    id: 8,
    name: "FreshMart - An E-commerce Website",
    description: "A comprehensive e-commerce platform for fresh groceries and products with real-time inventory management, secure payments, and user-friendly interface.",
    category: "web",
    image: "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg",
    tags: [
      { name: "React", color: "text-cyan-400" },
      { name: "Node js", color: "text-green-500" },
      { name: "Express js", color: "text-gray-400" },
      { name: "MongoDB", color: "text-green-400" }
    ],
    source_code_link: "https://github.com/kamesh952/fmart.git",
    live_link: "https://fmart-frontend.onrender.com",
    featured: true,
  },
  {
    id: 9,
    name: "Skill Sync AI - A Resume Analyzer AI",
    description: "An AI-powered resume analysis tool that provides intelligent feedback, skill gap analysis, and career recommendations using advanced NLP algorithms.",
    category: "ml",
    image: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg",
    tags: [
      { name: "Node js", color: "text-green-500" },
      { name: "Gemini API Integration", color: "text-blue-400" },
      { name: "HTML", color: "text-orange-400" }
    ],
    source_code_link: "https://github.com/kamesh952/skillsync_ai_client.git",
    live_link: "https://skillsync-ai-client.onrender.com/",
  },
  {
    id: 10,
    name: "Event Hub - An Event Management System",
    description: "A comprehensive event management platform with booking system, attendee management, and real-time notifications built with modern web technologies.",
    category: "web",
    image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg",
    tags: [
      { name: "React", color: "text-cyan-400" },
      { name: "Node js", color: "text-green-500" },
      { name: "Express js", color: "text-gray-400" },
      { name: "PostgreSQL", color: "text-blue-600" }
    ],
    source_code_link: "https://github.com/kamesh952/Event_Management",
    live_link: "https://event-db-client.onrender.com/",
  },
  {
    id: 11,
    name: "Tourism E-commerce Website - A Tourism Booking Project",
    description: "A beautiful and responsive tourism booking platform featuring destination showcases, booking management, and travel planning tools.",
    category: "web",
    image: "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg",
    tags: [
      { name: "Front End", color: "text-cyan-400" },
      { name: "UI/UX", color: "text-purple-400" },
      { name: "Vite/React", color: "text-cyan-500" }
    ],
    source_code_link: "https://github.com/kamesh952/Kalm_Holidays.git",
    live_link: "https://kalmholidays.onrender.com/",
  },
];

const WorkCard = ({ work, index, useHorizontalLayout, isFeaturedLayout }) => {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [touchTimer, setTouchTimer] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 150);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  const isML = work.category === "ml";

  const handleTouchStart = () => {
    setIsTouched(true);
    setIsHovered(true);
    
    if (touchTimer) clearTimeout(touchTimer);
    
    const timer = setTimeout(() => {
      setIsTouched(false);
      setIsHovered(false);
    }, 3000);
    
    setTouchTimer(timer);
  };

  const handleTouchEnd = () => {
    // Touch end logic can be added here if needed
  };

  if (isFeaturedLayout) {
    return (
      <div
        ref={cardRef}
        className={`relative group transition-all duration-700 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="bg-gray-900 rounded-3xl w-full relative overflow-hidden transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl flex flex-col border-2 border-transparent hover:border-purple-500">
          <div className="absolute inset-0 rounded-3xl p-[3px] bg-gradient-to-r from-yellow-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
            <div className="bg-gray-900 rounded-3xl h-full w-full" />
          </div>
          
          <div className="absolute top-5 right-5 z-30">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 shadow-lg">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Featured Project
            </div>
          </div>

          <div className="relative w-full h-[400px] lg:h-[500px] overflow-hidden">
            <img
              src={work.image}
              alt={work.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className={`absolute top-5 left-5 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider ${
              isML 
                ? 'bg-purple-500 text-white' 
                : 'bg-blue-500 text-white'
            }`}>
              {isML ? 'AI Project' : 'Web Project'}
            </div>

            <div className={`absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/90 to-transparent transition-all duration-500 ${
              (isHovered || isTouched) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              <h3 className="text-white font-bold text-2xl lg:text-3xl mb-3 leading-tight">
                {work.name}
              </h3>
              
              <p className="text-gray-200 text-lg leading-relaxed mb-4">
                {work.description}
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                {work.tags.map((tag, tagIndex) => (
                  <span
                    key={`${work.name}-${tag.name}`}
                    className={`text-base font-medium ${tag.color} bg-gray-800/90 px-4 py-2 rounded-full`}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>

              <div className="flex gap-6 relative z-30">
                <a
                  href={work.live_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-3 transition-all duration-300 hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Live Demo
                </a>
                <a
                  href={work.source_code_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800/90 hover:bg-gray-700/90 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-3 transition-all duration-300 hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" />
                  </svg>
                  View Code
                </a>
              </div>
            </div>
          </div>

          <div className="p-6 lg:hidden">
            <h3 className="text-white font-bold text-2xl mb-3 leading-tight">
              {work.name}
            </h3>
            
            <div className="flex flex-wrap gap-3 mb-6">
              {work.tags.map((tag, tagIndex) => (
                <span
                  key={`${work.name}-${tag.name}`}
                  className={`text-base font-medium ${tag.color} bg-gray-800 px-3 py-1 rounded-full`}
                >
                  {tag.name}
                </span>
              ))}
            </div>

            <div className="flex gap-4">
              <a
                href={work.live_link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 flex-1 justify-center"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
              </a>
              <a
                href={work.source_code_link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 flex-1 justify-center"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" />
                </svg>
                Code
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (useHorizontalLayout) {
    return (
      <div
        ref={cardRef}
        className={`relative group transition-all duration-700 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="bg-gray-900 p-5 rounded-2xl w-full relative overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl flex flex-col md:flex-row h-full border-2 border-transparent hover:border-purple-500">
          <div className={`absolute inset-0 rounded-2xl p-[2px] ${
            isML 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500'
              : 'bg-gradient-to-r from-blue-500 to-cyan-500'
          } opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}>
            <div className="bg-gray-900 rounded-2xl h-full w-full" />
          </div>
          
          <div className="relative w-full md:w-2/5 h-[230px] md:h-[280px] rounded-2xl overflow-hidden z-10">
            <img
              src={work.image}
              alt={work.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
              isML 
                ? 'bg-purple-500 text-white' 
                : 'bg-blue-500 text-white'
            }`}>
              {isML ? 'AI Project' : 'Web Project'}
            </div>

            <div className="absolute inset-0 flex justify-center items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 z-20">
              <a
                href={work.live_link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/95 hover:bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
              </a>
              <a
                href={work.source_code_link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-900/95 hover:bg-gray-900 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" />
                </svg>
                Code
              </a>
            </div>
          </div>

          <div className="relative z-10 flex-1 md:pl-8 mt-5 md:mt-0 flex flex-col justify-between">
            <div>
              <h3 className="text-white font-bold text-xl leading-tight mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-500">
                {work.name}
              </h3>
              
              {/* Always show description on desktop for ML and Web sections */}
              <div className="overflow-hidden transition-all duration-500 max-h-40 opacity-100">
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {work.description}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {work.tags.map((tag, tagIndex) => (
                  <span
                    key={`${work.name}-${tag.name}`}
                    className={`text-sm font-medium ${tag.color} bg-gray-800 px-3 py-1 rounded-full transition-all duration-300 hover:scale-105 hover:bg-gray-700`}
                    style={{
                      animationDelay: `${tagIndex * 100}ms`,
                    }}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 md:hidden relative z-20">
                <a
                  href={work.live_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-105 flex-1 justify-center shadow-lg"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Live Demo
                </a>
                <a
                  href={work.source_code_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-105 flex-1 justify-center shadow-lg"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" />
                  </svg>
                  Code
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      className={`relative group transition-all duration-700 transform h-full ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="bg-gray-900 p-5 rounded-2xl w-full relative overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl h-full flex flex-col border-2 border-transparent hover:border-purple-500">
        <div className={`absolute inset-0 rounded-2xl p-[2px] ${
          isML 
            ? 'bg-gradient-to-r from-purple-500 to-pink-500'
            : 'bg-gradient-to-r from-blue-500 to-cyan-500'
        } opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}>
          <div className="bg-gray-900 rounded-2xl h-full w-full" />
        </div>
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="relative w-full h-[230px] rounded-2xl overflow-hidden">
            <img
              src={work.image}
              alt={work.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
              isML 
                ? 'bg-purple-500 text-white' 
                : 'bg-blue-500 text-white'
            }`}>
              {isML ? 'AI Project' : 'Web Project'}
            </div>

            <div className="absolute inset-0 flex justify-center items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 z-20">
              <a
                href={work.live_link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/95 hover:bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
              </a>
              <a
                href={work.source_code_link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-900/95 hover:bg-gray-900 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" />
                </svg>
                Code
              </a>
            </div>
          </div>

          <div className="mt-5 space-y-4 flex-1 flex flex-col">
            <h3 className="text-white font-bold text-xl leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-500">
              {work.name}
            </h3>
            
            {/* Always show description on desktop for ML and Web sections */}
            <div className="overflow-hidden transition-all duration-500 max-h-40 opacity-100 flex-1">
              <p className="text-gray-300 text-sm leading-relaxed">
                {work.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-auto">
              {work.tags.map((tag, tagIndex) => (
                <span
                  key={`${work.name}-${tag.name}`}
                  className={`text-sm font-medium ${tag.color} bg-gray-800 px-3 py-1 rounded-full transition-all duration-300 hover:scale-105 hover:bg-gray-700`}
                  style={{
                    animationDelay: `${tagIndex * 100}ms`,
                  }}
                >
                  {tag.name}
                </span>
              ))}
            </div>

            <div className="flex gap-4 sm:hidden mt-4 relative z-20">
              <a
                href={work.live_link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-105 flex-1 justify-center shadow-lg"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
              </a>
              <a
                href={work.source_code_link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-105 flex-1 justify-center shadow-lg"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" />
                </svg>
                Code
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };


const Works = () => {
  const [filter, setFilter] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const filteredWorks = filter === "all" 
    ? works 
    : works.filter((work) => work.category === filter);

  const filterOptions = [
    { key: "all", label: "All Projects" },
    { key: "web", label: "Web Development" },
    { key: "ml", label: "AI Applications" },
  ];

  const useHorizontalLayout = filter !== "all";

  const getGridClasses = () => {
    if (useHorizontalLayout) {
      return "grid grid-cols-1 gap-8";
    }
    return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8";
  };

  return (
    <div ref={sectionRef} className="bg-gray-950 min-h-screen py-16 px-4 sm:px-6 lg:px-8" id="works">
      <div className="max-w-7xl mx-auto">
        <div className={`text-center transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <p className="text-gray-400 text-lg font-medium tracking-wider uppercase mb-2">
            My work
          </p>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Projects.
            </span>
          </h2>
          <p className="mt-4 text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            Following projects showcase my skills and experience through real-world examples of my work. Each project is briefly described with links to code repositories and live demos. It reflects my ability to solve complex problems, work with different technologies, and manage projects effectively.
          </p>
        </div>

        <div className={`flex justify-center flex-wrap gap-4 my-12 transition-all duration-1000 delay-300 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {filterOptions.map((option) => (
            <button
              key={option.key}
              onClick={() => setFilter(option.key)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center gap-2 ${
                filter === option.key
                  ? option.key === "web" 
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                    : option.key === "ml"
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                    : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className={getGridClasses() + " mt-16"}>
          {filteredWorks.map((work, index) => (
            <div
              key={work.id}
              className={work.featured && filter === "all" ? "col-span-full" : ""}
            >
              <WorkCard 
                work={work} 
                index={index} 
                useHorizontalLayout={useHorizontalLayout}
                isFeaturedLayout={work.featured && filter === "all"}
              />
            </div>
          ))}
        </div>

        <div className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1000 delay-700 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {[
            { number: works.length, label: "Projects Completed" },
            { number: works.filter(w => w.category === "web").length, label: "Web Applications" },
            { number: works.filter(w => w.category === "ml").length, label: "AI Projects" },
            { number: works.filter(w => w.featured).length, label: "Featured Works" },
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.number}+
              </div>
              <div className="text-gray-400 text-sm font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Works;