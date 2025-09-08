"use client";

import Button from "@/components/ui/Button";
import { aboutTeamData } from "@/data/aboutTeam";
import { motion } from "framer-motion";

const AboutTeamCareers = () => {
  const { careers } = aboutTeamData;

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
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.section
      className="py-20 lg:py-32 bg-white overflow-hidden"
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          variants={itemVariants}
        >
          {/* Minimal Header */}
          <motion.div
            className="inline-block mb-8"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-brand-identity font-medium text-sm tracking-widest uppercase">
              Join Us
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-light text-brand-dark mb-8"
            variants={itemVariants}
          >
            {careers.subtitle}
          </motion.h2>

          <motion.p
            className="text-lg lg:text-xl text-gray-600 leading-relaxed mb-12 max-w-3xl mx-auto font-light"
            variants={itemVariants}
          >
            {careers.description}
          </motion.p>

          {/* Minimal CTA */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-8"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="primary"
                size="lg"
                href="mailto:careers@nomatic.com"
                className="px-12 py-4 text-base font-medium tracking-wide"
              >
                View Open Roles
              </Button>
            </motion.div>

            <motion.div
              className="text-gray-500 text-sm"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <a
                href="mailto: info@nomaticluxe.com"
                className="hover:text-brand-identity transition-colors duration-300"
              >
                 info@nomaticluxe.com →
              </a>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Floating Decorative Elements */}
        <div className="relative mt-20">
          <motion.div
            className="absolute top-10 left-10 w-2 h-2 bg-brand-identity rounded-full opacity-60"
            variants={floatingVariants}
            animate="animate"
          />
          <motion.div
            className="absolute top-20 right-20 w-1 h-1 bg-gray-400 rounded-full opacity-40"
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: "1s" }}
          />
          <motion.div
            className="absolute bottom-10 left-1/4 w-1.5 h-1.5 bg-brand-identity rounded-full opacity-50"
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: "2s" }}
          />
          <motion.div
            className="absolute bottom-20 right-1/3 w-1 h-1 bg-gray-300 rounded-full opacity-30"
            variants={floatingVariants}
            animate="animate"
            style={{ animationDelay: "3s" }}
          />
        </div>
      </div>
    </motion.section>
  );
};

export default AboutTeamCareers;
