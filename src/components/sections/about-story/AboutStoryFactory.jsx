"use client";

import { motion } from "framer-motion";
import { aboutStoryData } from "@/data/aboutStory";
import Heading from "@/components/texts/Heading";

const AboutStoryFactory = () => {
  const { factory } = aboutStoryData;

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
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };

  return (
    <section className="py-20 bg-brand-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="bg-white rounded-3xl overflow-hidden shadow-2xl"
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
            {/* Content Side */}
            <motion.div 
              className="p-8 md:p-12 lg:p-16 flex flex-col justify-center"
              variants={itemVariants}
            >
              <motion.div variants={itemVariants}>
                <Heading 
                  variant="lg" 
                  isSlashed={true} 
                  dark={false} 
                  className="mb-6"
                >
                  {factory.title}
                </Heading>
              </motion.div>

              <motion.h3 
                className="text-2xl md:text-3xl font-bold text-brand-dark mb-6"
                variants={itemVariants}
              >
                {factory.subtitle}
              </motion.h3>

              <motion.p 
                className="text-gray-600 text-base md:text-lg leading-relaxed mb-8"
                variants={itemVariants}
              >
                {factory.description}
              </motion.p>

              {/* Features/Stats */}
              <motion.div 
                className="grid grid-cols-1 gap-6"
                variants={containerVariants}
              >
                {factory.features.map((feature, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center space-x-4"
                    variants={itemVariants}
                  >
                    <div className="flex-shrink-0 w-16 h-16 bg-brand-identity rounded-xl flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {feature.value}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-dark mb-1">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Image Side */}
            <motion.div 
              className="relative h-64 lg:h-full"
              variants={itemVariants}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${factory.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutStoryFactory;
