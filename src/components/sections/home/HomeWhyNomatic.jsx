"use client";

import ThreeBrandingDots from "@/components/common/ThreeBrandingDots";
import { whyNomaticData } from "@/data/homeVisionMission";
import { motion } from "framer-motion";
import { useRef } from "react";

const WhyNomaticCard = ({ reason, className = "", delay = 0 }) => (
  <motion.div
    className={`relative group cursor-pointer ${className}`}
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
    whileHover={{ y: -5 }}
  >
    <div className="relative h-full bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
      {/* Background Image */}
      <div className="relative h-48">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${reason.image})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Icon */}
        <div className="absolute top-4 left-4 w-12 h-12 bg-white/90 backdrop-blur rounded-xl flex items-center justify-center">
          <span className="text-2xl">{reason.icon}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-identity transition-colors">
          {reason.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {reason.description}
        </p>
      </div>

      {/* Hover Indicator */}
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-8 h-8 bg-brand-identity rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  </motion.div>
);

const HomeWhyNomatic = () => {
  const { title, subtitle, description, reasons } = whyNomaticData;
  const titleRef = useRef(null);

  // Animated title with staggered character reveal
  const AnimatedTitle = ({ text, className = "" }) => {
    const chars = text.split('').map((char, index) => (
      <motion.span
        key={index}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5, 
          delay: index * 0.05,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        viewport={{ once: true }}
        className={`inline-block ${char === ' ' ? 'mr-2' : ''} ${className}`}
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
    ));

    return <div className="overflow-hidden">{chars}</div>;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
    <section className="py-20 bg-brand-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true }}
        >
          {/* Header with Animated Title */}
          <motion.div
            className="text-center mb-16"
            variants={itemVariants}
          >
            <div className="mb-4">
              <AnimatedTitle 
                text={title}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-dark"
              />
            </div>
            <motion.h3 
              className="text-2xl font-bold text-brand-dark mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              {subtitle}
            </motion.h3>
            <motion.p 
              className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              viewport={{ once: true }}
            >
              {description}
            </motion.p>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* First Row */}
            <WhyNomaticCard
              reason={reasons[0]}
              className="md:col-span-1"
              delay={0.2}
            />
            <WhyNomaticCard
              reason={reasons[1]}
              className="md:col-span-1 lg:row-span-2"
              delay={0.3}
            />
            <WhyNomaticCard
              reason={reasons[2]}
              className="md:col-span-2 lg:col-span-1"
              delay={0.4}
            />

            {/* Second Row */}
            <WhyNomaticCard
              reason={reasons[3]}
              className="md:col-span-1 lg:col-span-2"
              delay={0.5}
            />
            <WhyNomaticCard
              reason={reasons[4]}
              className="md:col-span-2 lg:col-span-1"
              delay={0.6}
            />

            {/* Third Row - Full Width */}
            <WhyNomaticCard
              reason={reasons[5]}
              className="md:col-span-2 lg:col-span-3"
              delay={0.7}
            />
          </div>

          {/* Bottom Decoration */}
          <motion.div
            className="flex justify-center"
            variants={itemVariants}
          >
            <ThreeBrandingDots />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeWhyNomatic;
