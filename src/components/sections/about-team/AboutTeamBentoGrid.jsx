"use client";

import ThreeBrandingDots from "@/components/common/ThreeBrandingDots";
import { aboutTeamData } from "@/data/aboutTeam";
import { motion } from "framer-motion";

const TeamBentoCard = ({ item, className = "" }) => {
  return (
    <div
      className={`
        relative rounded-2xl overflow-hidden
        hover:shadow-xl transition-all duration-500 ease-out
        flex flex-col justify-end
        h-full
        group cursor-pointer
        transform hover:scale-[1.02]
        ${className}
      `}
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat 
                   transition-transform duration-700 ease-out
                   group-hover:scale-110"
        style={{ backgroundImage: `url(${item.image})` }}
      >
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-300"></div>
      </div>

      <div className="relative z-10 p-4 lg:p-6 text-white transform translate-y-0 group-hover:-translate-y-1 transition-transform duration-300">
        <h3 className="text-lg lg:text-xl font-bold mb-2 group-hover:text-brand-identity transition-colors duration-300">
          {item.title}
        </h3>
        <p className="text-white/90 group-hover:text-white text-xs lg:text-sm leading-relaxed transition-colors duration-300">
          {item.description}
        </p>

        {/* Hover indicator */}
        <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-brand-identity text-sm font-medium">
            Meet Team →
          </span>
        </div>
      </div>
    </div>
  );
};

const TeamBentoGrid = ({ teamItems }) => {
  return (
    <div className="grid grid-cols-12 gap-4 w-full h-[60vh]">
      {teamItems.map((item, index) => {
        let gridClass = "";

        if (index === 0) {
          gridClass = "col-span-12 md:col-span-6 lg:col-span-4 row-span-2";
        } else if (index === 1) {
          gridClass = "col-span-12 md:col-span-6 lg:col-span-4";
        } else if (index === 2) {
          gridClass = "col-span-12 md:col-span-6 lg:col-span-4 row-span-2";
        } else if (index === 3) {
          gridClass = "col-span-12 sm:col-span-6 lg:col-span-4";
        } else if (index === 4) {
          gridClass = "col-span-12 sm:col-span-6 lg:col-span-12";
        } else {
          gridClass = "col-span-12 sm:col-span-6 lg:col-span-4";
        }

        return (
          <TeamBentoCard key={item.id} item={item} className={gridClass} />
        );
      })}
    </div>
  );
};

const AboutTeamBentoGrid = () => {
  const { bentoGrid } = aboutTeamData;

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
            <span className="text-brand-identity">/</span> {bentoGrid.title}
          </motion.h2>
          <p className="text-lg lg:text-xl text-gray-600 max-w-2xl mt-4">
            Meet the talented individuals who make magic happen
          </p>
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
            <TeamBentoGrid teamItems={bentoGrid.items} />
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

export default AboutTeamBentoGrid;
