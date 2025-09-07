"use client";

import ThreeBrandingDots from "@/components/common/ThreeBrandingDots";
import Heading from "@/components/texts/Heading";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const VisionMissionCard = ({ 
  type, 
  title, 
  content, 
  image,
  gradient, 
  delay = 0,
  isReversed = false 
}) => (
  <motion.div
    className={`relative group ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} flex flex-col lg:flex gap-12 items-center`}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay }}
    viewport={{ once: true }}
  >
    {/* Image Section */}
    <motion.div
      className="relative flex-shrink-0"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-3xl overflow-hidden shadow-2xl">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 768px) 320px, 384px"
        />
        {/* Overlay gradient */}
        <div className={`absolute inset-0 ${gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`} />
        
        {/* Corner accent */}
        <div className="absolute top-4 left-4 w-12 h-12 border-l-4 border-t-4 border-brand-identity rounded-tl-2xl opacity-80" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-r-4 border-b-4 border-brand-identity rounded-br-2xl opacity-80" />
      </div>
      
      {/* Floating Elements */}
      <motion.div
        className="absolute -top-4 -right-4 w-6 h-6 bg-brand-identity rounded-full shadow-lg"
        animate={{ 
          y: [0, -10, 0],
          opacity: [0.7, 1, 0.7] 
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      />
      <motion.div
        className="absolute -bottom-4 -left-4 w-4 h-4 bg-brand-dark rounded-full shadow-lg"
        animate={{ 
          y: [0, 10, 0],
          opacity: [0.5, 1, 0.5] 
        }}
        transition={{ 
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />
    </motion.div>

    {/* Content Section */}
    <motion.div
      className={`flex-1 ${isReversed ? 'lg:text-right' : 'lg:text-left'} text-center lg:text-left max-w-2xl space-y-6`}
      initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: delay + 0.2 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="inline-block px-6 py-3 bg-brand-identity/10 rounded-full border border-brand-identity/20"
        whileHover={{ scale: 1.05, backgroundColor: "rgba(235, 27, 38, 0.15)" }}
        transition={{ duration: 0.3 }}
      >
        <span className="text-brand-identity font-semibold text-sm uppercase tracking-wider">
          {type}
        </span>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: delay + 0.3 }}
        viewport={{ once: true }}
      >
        <Heading 
          variant="lg" 
          isSlashed={true} 
          dark={false}
          className="mb-6 leading-tight hover:text-brand-identity transition-colors duration-300"
        >
          {title}
        </Heading>
      </motion.div>
      
      <motion.p
        className="text-gray-600 leading-relaxed text-lg font-light"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: delay + 0.4 }}
        viewport={{ once: true }}
      >
        {content}
      </motion.p>

      {/* Enhanced Decorative Elements */}
      <motion.div
        className={`flex items-center gap-4 ${isReversed ? 'lg:justify-end' : 'lg:justify-start'} justify-center mt-8`}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.6 }}
        viewport={{ once: true }}
      >
        <div className="w-12 h-1 bg-brand-identity rounded-full" />
        <div className="w-6 h-1 bg-brand-dark rounded-full" />
        <div className="w-3 h-1 bg-brand-identity/50 rounded-full" />
      </motion.div>
    </motion.div>
  </motion.div>
);

const HomeVisionMission = () => {
  const sectionRef = useRef(null);

  const visionData = {
    type: "Our Vision",
    title: "Crafting Enduring Spaces",
    content: "To craft enduring spaces that evolve with you. Where routine becomes ritual and design holds meaning. Every element reflects who you are. In a world that constantly transitions, we create designs that stand the test of time and forever hold the essence of you.",
    image: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=800&auto=format&fit=crop&q=80",
    gradient: "bg-gradient-to-br from-brand-identity/30 via-red-500/30 to-orange-500/30"
  };

  const missionData = {
    type: "Our Mission",
    title: "Curating Your Perfect Space",
    content: "At Nomatic, we aim to curate spaces that you want to surround yourself with – be it living, cooking, working, relaxing or simply just being. We morph your ever evolving lifestyle into spaces that speak for you.",
    image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&auto=format&fit=crop&q=80",
    gradient: "bg-gradient-to-br from-brand-dark/30 via-gray-700/30 to-brand-dark-secondary/30"
  };

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

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-brand-background via-white to-brand-light relative overflow-hidden" ref={sectionRef}>
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1F1E1E_1px,transparent_1px),linear-gradient(to_bottom,#1F1E1E_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-identity/[0.01] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true }}
        >
          {/* Enhanced Header */}
          <motion.div
            className="text-center mb-20 lg:mb-28"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Heading 
                variant="lg" 
                isSlashed={true} 
                dark={false}
                className="mb-8 text-center justify-center"
              >
                Vision & Mission
              </Heading>
            </motion.div>
            
            <motion.p
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Discover the driving forces behind Nomatic's commitment to creating extraordinary spaces that resonate with your lifestyle.
            </motion.p>
            
            <motion.div
              className="flex justify-center items-center gap-2 mt-8"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="w-8 h-1 bg-brand-identity rounded-full" />
              <div className="w-4 h-1 bg-brand-dark rounded-full" />
              <div className="w-2 h-1 bg-brand-identity/50 rounded-full" />
            </motion.div>
          </motion.div>

          {/* Vision Section */}
          <div className="mb-24 lg:mb-32">
            <VisionMissionCard
              type={visionData.type}
              title={visionData.title}
              content={visionData.content}
              image={visionData.image}
              gradient={visionData.gradient}
              delay={0.2}
              isReversed={false}
            />
          </div>

          {/* Mission Section */}
          <div className="mb-20">
            <VisionMissionCard
              type={missionData.type}
              title={missionData.title}
              content={missionData.content}
              image={missionData.image}
              gradient={missionData.gradient}
              delay={0.4}
              isReversed={true}
            />
          </div>

          {/* Enhanced Bottom Decoration */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8, type: "spring" }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.1,
              rotate: 360,
              transition: { duration: 0.5 }
            }}
          >
            <div className="p-8 rounded-full bg-white shadow-xl border border-brand-identity/10">
              <ThreeBrandingDots />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Floating Background Elements */}
      <motion.div
        className="absolute top-32 left-16 w-3 h-3 bg-brand-identity rounded-full opacity-40 shadow-lg"
        animate={{
          y: [0, -30, 0],
          opacity: [0.4, 0.8, 0.4],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-40 right-20 w-4 h-4 bg-brand-dark rounded-full opacity-30 shadow-lg"
        animate={{
          y: [0, 25, 0],
          opacity: [0.3, 0.7, 0.3],
          scale: [1, 1.3, 1]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      <motion.div
        className="absolute top-1/2 left-8 w-2 h-2 bg-brand-identity/60 rounded-full shadow-lg"
        animate={{
          scale: [1, 2, 1],
          opacity: [0.6, 1, 0.6],
          rotate: [0, 180, 360]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />
      <motion.div
        className="absolute top-1/4 right-12 w-1 h-8 bg-gradient-to-b from-brand-identity to-transparent rounded-full opacity-20"
        animate={{
          scaleY: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
    </section>
  );
};

export default HomeVisionMission;