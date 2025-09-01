"use client";

import Heading from "@/components/texts/Heading";
import { visionMissionData } from "@/data/homeVisionMission";
import { motion } from "framer-motion";

const HomeVisionMission = () => {
  const { vision, mission } = visionMissionData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
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
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const CardComponent = ({ data, isReverse = false }) => (
    <motion.div
      className={`grid lg:grid-cols-2 gap-12 items-center ${isReverse ? 'lg:gap-16' : ''}`}
      variants={itemVariants}
    >
      {/* Content */}
      <div className={`space-y-6 ${isReverse ? 'lg:order-2' : ''}`}>
        <div className="inline-flex items-center space-x-3 bg-brand-identity/10 rounded-full px-4 py-2">
          <span className="text-2xl">{data.icon}</span>
          <span className="text-sm font-medium text-brand-identity tracking-wide">
            {data.title.toUpperCase()}
          </span>
        </div>

        <Heading
          variant="lg"
          isSlashed={false}
          dark={false}
          className="text-brand-dark"
        >
          {data.subtitle}
        </Heading>

        <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
          {data.description}
        </p>

        {/* Decorative Line */}
        <motion.div
          className="h-1 w-20 bg-gradient-to-r from-brand-identity to-brand-identity/30 rounded-full"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />
      </div>

      {/* Image */}
      <div className={`relative ${isReverse ? 'lg:order-1' : ''}`}>
        <motion.div
          className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl"
          whileHover={{ scale: 1.02, y: -5 }}
          transition={{ duration: 0.4 }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${data.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          
          {/* Floating Icon */}
          <motion.div
            className="absolute top-6 left-6 w-16 h-16 bg-white/90 backdrop-blur rounded-2xl flex items-center justify-center shadow-lg"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.8, type: "spring" }}
          >
            <span className="text-3xl">{data.icon}</span>
          </motion.div>
        </motion.div>

        {/* Background Decoration */}
        <div className={`absolute -z-10 inset-0 bg-brand-identity/5 rounded-2xl transform ${isReverse ? 'translate-x-4 -translate-y-4' : '-translate-x-4 translate-y-4'}`} />
      </div>
    </motion.div>
  );

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="space-y-20"
          initial="hidden"
          whileInView="visible"
          variants={containerVariants}
          viewport={{ once: true }}
        >
          {/* Vision */}
          <CardComponent data={vision} />
          
          {/* Divider */}
          <motion.div
            className="flex items-center justify-center"
            variants={itemVariants}
          >
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-brand-identity rounded-full"></div>
              <div className="w-3 h-3 bg-brand-dark rounded-full"></div>
              <div className="w-3 h-3 bg-brand-identity rounded-full"></div>
            </div>
          </motion.div>

          {/* Mission */}
          <CardComponent data={mission} isReverse={true} />
        </motion.div>
      </div>
    </section>
  );
};

export default HomeVisionMission;
