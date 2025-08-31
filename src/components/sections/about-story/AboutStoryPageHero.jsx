"use client";

import { motion } from "framer-motion";
import { aboutStoryData } from "@/data/aboutStory";
import Heading from "@/components/texts/Heading";

const AboutStoryPageHero = () => {
  const { storyHero } = aboutStoryData;

  return (
    <section className="min-h-screen relative overflow-hidden pt-24">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${storyHero.image})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Heading 
              variant="xl" 
              isSlashed={true} 
              dark={true} 
              className="mb-6"
            >
              {storyHero.title}
            </Heading>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-8 tracking-wide"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {storyHero.subtitle}
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {storyHero.description}
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default AboutStoryPageHero;
