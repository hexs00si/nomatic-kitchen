"use client";

import BentoGrid from "@/components/common/BentoGrid";
import ThreeBrandingDots from "@/components/common/ThreeBrandingDots";
import { services } from "@/data/services";
import { motion } from "framer-motion";

const HomeOurServices = () => {
  return (
    <motion.section
      className="bg-brand-background min-h-screen flex items-center py-8 sm:py-12 lg:py-20 px-4 sm:px-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          className="mb-8 sm:mb-10 lg:mb-12"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-brand-dark"
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
          >
            <span className="text-brand-identity">/</span> Our Services
          </motion.h2>
        </motion.div>
        <motion.div
          className="relative"
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.div
            whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
          >
            <BentoGrid services={services} />
          </motion.div>
          <motion.div
            className="absolute -bottom-8 lg:-bottom-16 right-0"
            initial={{ rotate: 0, scale: 0 }}
            whileInView={{ rotate: 360, scale: 1 }}
            transition={{ duration: 1, delay: 0.8, type: "spring" }}
            viewport={{ once: true }}
            whileHover={{
              rotate: 720,
              scale: 1.1,
              transition: { duration: 0.5 },
            }}
          >
            <ThreeBrandingDots />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HomeOurServices;
