"use client";

import Heading from "@/components/texts/Heading";
import { aboutStoryData } from "@/data/aboutStory";
import { motion } from "framer-motion";

const AboutDirectorWords = () => {
  const { directorWords } = aboutStoryData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true }}
        >
          {/* Section Header */}
          <motion.div
            className="text-center mb-12"
            variants={itemVariants}
          >
            <Heading
              variant="lg"
              isSlashed={true}
              dark={false}
              className="mb-2"
            >
              Leadership
            </Heading>
          </motion.div>

          {/* Main Dark Card */}
          <motion.div
            className="bg-brand-dark rounded-lg overflow-hidden shadow-xl"
            variants={itemVariants}
          >
            <div className="grid lg:grid-cols-3 gap-0">
              {/* Director Image */}
              <div className="lg:col-span-1 h-80 lg:h-auto relative">
                <div 
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${directorWords.image})` }}
                />
                <div className="absolute inset-0 bg-brand-dark/20" />
                
                {/* Director Info Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-brand-dark/80 backdrop-blur-sm rounded px-4 py-3">
                    <h4 className="text-lg font-semibold text-white">
                      {directorWords.name}
                    </h4>
                    <p className="text-brand-identity text-sm font-medium">
                      {directorWords.position}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quote Content */}
              <div className="lg:col-span-2 p-8 lg:p-12">
                {/* Quote Mark */}
                <div className="w-10 h-10 bg-brand-identity rounded flex items-center justify-center mb-6">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                  </svg>
                </div>

                {/* Quote */}
                <blockquote className="text-xl lg:text-2xl text-white leading-relaxed mb-8 font-light">
                  "{directorWords.quote}"
                </blockquote>

                {/* Bottom Line */}
                <div className="flex items-center gap-4">
                  <div className="h-px bg-brand-identity/30 flex-1"></div>
                  <span className="text-brand-identity text-sm font-medium tracking-wider uppercase">
                    Leadership Vision
                  </span>
                  <div className="h-px bg-brand-identity/30 flex-1"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutDirectorWords;