"use client";

import CustomCursor from "@/components/common/CustomCursor";
import Heading from "@/components/texts/Heading";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const GenericHero = ({ 
  title, 
  images = [], 
  className = "",
  height = "90vh",
  showCursor = true 
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showCustomCursor, setShowCustomCursor] = useState(false);

  // Auto-progress animation
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentImageIndex((prevIndex) => 
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
          );
          return 0;
        }
        return prev + 1;
      });
    }, 50); // Progress updates every 50ms, completes in 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const handleImageChange = () => {
    if (images.length <= 1) return;
    
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
    setProgress(0);
  };

  const handleMouseEnter = () => {
    if (!showCursor || images.length <= 1) return;
    
    setShowCustomCursor(true);
    document.body.style.cursor = 'none';
  };

  const handleMouseLeave = () => {
    if (!showCursor) return;
    
    setShowCustomCursor(false);
    document.body.style.cursor = 'auto';
  };

  return (
    <>
      {showCursor && <CustomCursor isVisible={showCustomCursor} progress={progress} />}
      <section className={`max-h-[100vh-50rem] bg-gray-50 pt-2 px-2 mb-2 ${className}`}>
        <div className="w-full mx-auto">
          <motion.div
            className={`relative w-full rounded-xl overflow-hidden shadow-2xl ${showCursor && images.length > 1 ? 'cursor-none' : ''}`}
            style={{ height }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            onClick={handleImageChange}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
              style={{ backgroundImage: `url(${images[currentImageIndex] || images[0]})` }}
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/30" />

            {/* Title at bottom right */}
            <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12">
              <div className="flex justify-end">
                <motion.div
                  className="text-right"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <Heading 
                    variant="xl" 
                    isSlashed={true} 
                    dark={true} 
                    className="text-white"
                  >
                    {title}
                  </Heading>
                </motion.div>
              </div>
            </div>
            
            {/* Border ring */}
            <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10 pointer-events-none" />
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default GenericHero;
