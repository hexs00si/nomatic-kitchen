"use client";

import { motion } from "framer-motion";
import { aboutTeamData } from "@/data/aboutTeam";
import Heading from "@/components/texts/Heading";

const AboutTeamIntro = () => {
  const { hero } = aboutTeamData;

  return (
    <section className="min-h-screen bg-brand-background pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center min-h-[80vh]">
          <motion.div
            className="text-center max-w-4xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Heading
                variant="xl"
                isSlashed={true}
                dark={false}
                className="mb-6"
              >
                {hero.subtitle}
              </Heading>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-brand-dark mb-8 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {hero.title}
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {hero.description}
            </motion.p>

            {/* Decorative dots */}
            <motion.div
              className="flex justify-center items-center space-x-4 mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="w-2 h-2 bg-brand-identity rounded-full"></div>
              <div className="w-2 h-2 bg-brand-dark rounded-full"></div>
              <div className="w-2 h-2 bg-brand-identity rounded-full"></div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutTeamIntro;
