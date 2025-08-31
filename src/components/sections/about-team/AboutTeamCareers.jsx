"use client";

import { motion } from "framer-motion";
import { aboutTeamData } from "@/data/aboutTeam";
import Heading from "@/components/texts/Heading";
import Button from "@/components/ui/Button";

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
    <section className="py-20 bg-brand-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="bg-brand-dark rounded-3xl overflow-hidden shadow-2xl"
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
            {/* Content Side */}
            <motion.div
              className="p-8 md:p-12 lg:p-16 flex flex-col justify-center text-white"
              variants={itemVariants}
            >
              <motion.div variants={itemVariants}>
                <Heading
                  variant="lg"
                  isSlashed={true}
                  dark={true}
                  className="mb-6"
                >
                  {careers.title}
                </Heading>
              </motion.div>

              <motion.h3
                className="text-3xl md:text-4xl font-bold mb-6 text-brand-identity"
                variants={itemVariants}
              >
                {careers.subtitle}
              </motion.h3>

              <motion.p
                className="text-gray-300 text-lg leading-relaxed mb-8"
                variants={itemVariants}
              >
                {careers.description}
              </motion.p>

              <motion.p
                className="text-gray-400 text-base mb-8"
                variants={itemVariants}
              >
                {careers.contactInfo}
              </motion.p>

              <motion.div variants={itemVariants}>
                <Button
                  variant="primary"
                  size="lg"
                  href="mailto:careers@nomatic.com"
                  className="inline-flex items-center space-x-2"
                >
                  <span>Join Our Team</span>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Button>
              </motion.div>
            </motion.div>

            {/* Visual Side - Career Benefits */}
            <motion.div
              className="relative p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-gradient-to-br from-brand-identity/10 to-brand-identity/5"
              variants={itemVariants}
            >
              <div className="space-y-6">
                <motion.div
                  className="flex items-start space-x-4"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-brand-identity rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 10 5.16-.26 9-4.45 9-10V7l-10-5z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Growth & Learning</h4>
                    <p className="text-gray-300 text-sm">Continuous skill development and career advancement</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start space-x-4"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-brand-identity rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A1.507 1.507 0 0 0 18.5 7h-5c-.8 0-1.53.5-1.84 1.25l-3.32 9.75H10v6h2v-4h8v4h2z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Creative Freedom</h4>
                    <p className="text-gray-300 text-sm">Express your creativity in innovative projects</p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-start space-x-4"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-brand-identity rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Work-Life Balance</h4>
                    <p className="text-gray-300 text-sm">Flexible working arrangements and supportive culture</p>
                  </div>
                </motion.div>
              </div>

              {/* Background decoration */}
              <div className="absolute top-6 right-6 w-32 h-32 bg-brand-identity/5 rounded-full"></div>
              <div className="absolute bottom-6 left-6 w-20 h-20 bg-brand-identity/10 rounded-full"></div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutTeamCareers;
