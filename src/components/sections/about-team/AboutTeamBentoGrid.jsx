"use client";

import { motion } from "framer-motion";
import { aboutTeamData } from "@/data/aboutTeam";
import Heading from "@/components/texts/Heading";

const TeamBentoCard = ({ item, className = "" }) => {
  const getGridClass = (gridSpan) => {
    switch (gridSpan) {
      case "large":
        return "col-span-12 md:col-span-6 lg:col-span-5 row-span-2";
      case "medium":
        return "col-span-12 md:col-span-6 lg:col-span-4 row-span-1";
      case "small":
        return "col-span-12 sm:col-span-6 lg:col-span-3";
      default:
        return "col-span-12 sm:col-span-6 lg:col-span-4";
    }
  };

  return (
    <motion.div
      className={`
        relative rounded-2xl overflow-hidden h-64 lg:h-80
        group cursor-pointer transform transition-all duration-500
        hover:scale-[1.02] hover:shadow-2xl
        ${getGridClass(item.gridSpan)} ${className}
      `}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat
                   transition-transform duration-700 ease-out
                   group-hover:scale-110"
        style={{ backgroundImage: `url(${item.image})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent
                      group-hover:from-black/90 group-hover:via-black/50 transition-all duration-300" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-6">
        <motion.h3
          className="text-xl lg:text-2xl font-bold text-white mb-2 
                     group-hover:text-brand-identity transition-colors duration-300"
          whileHover={{ x: 5 }}
        >
          {item.title}
        </motion.h3>
        <motion.p
          className="text-white/90 text-sm lg:text-base leading-relaxed
                     group-hover:text-white transition-colors duration-300"
          whileHover={{ x: 5 }}
        >
          {item.description}
        </motion.p>

        {/* Hover indicator */}
        <motion.div
          className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ x: -10 }}
          whileHover={{ x: 0 }}
        >
          <div className="w-12 h-0.5 bg-brand-identity"></div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const AboutTeamBentoGrid = () => {
  const { bentoGrid } = aboutTeamData;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Heading
            variant="lg"
            isSlashed={true}
            dark={false}
            className="mb-4"
          >
            {bentoGrid.title}
          </Heading>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Meet the talented individuals who make magic happen
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-6">
          {bentoGrid.items.map((item, index) => (
            <TeamBentoCard
              key={item.id}
              item={item}
              style={{ animationDelay: `${index * 0.1}s` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutTeamBentoGrid;
