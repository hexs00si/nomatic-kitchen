"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const CustomCursor = ({ isVisible, progress = 0 }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (isVisible && !isMobile) {
      document.addEventListener("mousemove", updateMousePosition);
    }

    return () => {
      document.removeEventListener("mousemove", updateMousePosition);
    };
  }, [isVisible, isMobile]);

  // Don't show cursor on mobile devices
  if (!isVisible || isMobile) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-50"
      style={{
        left: mousePosition.x - 60, 
        top: mousePosition.y - 60,  
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
          <path
            className="text-white/20"
            stroke="currentColor"
            strokeWidth="0.2"
            fill="none"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          {/* Progress Circle - Thinner */}
          <path
            className="text-brand-identity"
            stroke="currentColor"
            strokeWidth="0.5"
            fill="none"
            strokeDasharray={`${progress}, 100`}
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          />
        </svg>
        
        {/* Center Content - Transparent Background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-transparent backdrop-blur-none rounded-full w-20 h-20 flex flex-col items-center justify-center">
            <div className="text-white text-xs font-medium text-center leading-tight">
              <div>Click</div>
              <div>to change</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CustomCursor;
