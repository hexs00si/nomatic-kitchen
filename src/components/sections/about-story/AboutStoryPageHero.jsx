"use client";

import CustomCursor from "@/components/common/CustomCursor";
import Heading from "@/components/texts/Heading";
import { aboutStoryData } from "@/data/aboutStory";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const AboutStoryPageHero = () => {
  const { storyHero } = aboutStoryData;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showCustomCursor, setShowCustomCursor] = useState(false);

  // Background images from data file
  const heroImages = storyHero.heroImages;

  // Auto-progress animation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentImageIndex((prevIndex) => 
            prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
          );
          return 0;
        }
        return prev + 1;
      });
    }, 50); // Progress updates every 50ms, completes in 5 seconds

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const handleImageChange = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
    );
    setProgress(0);
  };

  const handleMouseEnter = () => {
    setShowCustomCursor(true);
    document.body.style.cursor = 'none'; // Hide default cursor
  };

  const handleMouseLeave = () => {
    setShowCustomCursor(false);
    document.body.style.cursor = 'auto'; // Restore default cursor
  };

  const decorativeLines = [
    { width: "w-16", opacity: "opacity-80" },
    { width: "w-12", opacity: "opacity-60" },
    { width: "w-8", opacity: "opacity-40" },
    { width: "w-20", opacity: "opacity-70" },
    { width: "w-6", opacity: "opacity-50" },
  ];

  return (
    <>
      <CustomCursor isVisible={showCustomCursor} progress={progress} />
      <section className="max-h-[100vh-50rem] bg-gray-50 pt-2 px-2 mb-2">
        <div className="w-full mx-auto">
          <motion.div
            className="relative w-full rounded-xl overflow-hidden shadow-2xl cursor-none"
            style={{ height: "90vh" }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            onClick={handleImageChange}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
            style={{ backgroundImage: `url(${heroImages[currentImageIndex]})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/30" />

          <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-12">
            <div className="flex flex-col md:flex-row justify-between items-end">
              <motion.div
                className="text-white mb-8 md:mb-0"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-wide">
                  MEET NOM<span className="text-brand-identity">A</span>TIC
                </h2>
                <p className="text-lg md:text-xl text-gray-200 max-w-lg leading-relaxed">
                  {storyHero.description}
                </p>
              </motion.div>
              <motion.div
                className="flex flex-row md:flex-col gap-4 items-end"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <motion.div
                  className="text-white text-right"
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
                    Our Story
                  </Heading>
                </motion.div>
              </motion.div>
            </div>
          </div>
          <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10 pointer-events-none" />
        </motion.div>
      </div>
    </section>
    </>
  );
};

export default AboutStoryPageHero;
