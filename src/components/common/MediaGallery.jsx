'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

const article = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const MediaGallery = ({ 
  items, 
  expandedWidth = 700, 
  collapsedWidth = 100, 
  height = 600,
  gap = 2,
  initialIndex = 2 
}) => {
  const [index, setIndex] = useState(initialIndex);

  return (
    <div className="w-full flex justify-center items-center px-4 sm:px-0">
      <div className="flex gap-1 sm:gap-2 pb-6 sm:pb-8 lg:pb-10 pt-3 sm:pt-4 lg:pt-5 overflow-x-auto justify-center items-center">
        {items.slice(0, 5).map((item, i) => {
          return (
            <motion.div
              whileTap={{ scale: 0.95 }}
              className={`rounded-lg sm:rounded-xl relative ${
                index === i ? 'w-[280px] sm:w-[400px] lg:w-[700px]' : 'w-[60px] sm:w-[80px] lg:w-[100px]'
              } h-[300px] sm:h-[400px] lg:h-[600px] flex-shrink-0 transition-[width] ease-in-linear duration-500 origin-center`}
              key={i}
              onClick={() => {
                setIndex(i);
              }}
              onMouseEnter={() => {
                setIndex(i);
              }}
            >
              <motion.img
                src={item?.url}
                className={`${
                  index === i ? 'cursor-default' : 'cursor-pointer'
                } w-full rounded-lg sm:rounded-xl h-full object-cover`}
                alt={item?.title}
              />
              <AnimatePresence mode="wait">
                {index === i && (
                  <motion.article
                    variants={article}
                    initial="hidden"
                    animate="show"
                    className="absolute inset-0 flex rounded-lg sm:rounded-xl flex-col justify-end w-full h-full p-4 sm:p-6 lg:p-8 space-y-2 sm:space-y-3 lg:space-y-4 overflow-hidden bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                  >
                    <motion.h1
                      variants={article}
                      className="text-lg sm:text-2xl lg:text-3xl font-bold text-white text-center"
                    >
                      {item?.title}
                    </motion.h1>
                    <motion.p 
                      variants={article} 
                      className="leading-[140%] text-gray-200 text-xs sm:text-sm lg:text-base text-center max-w-lg mx-auto"
                    >
                      {item?.description}
                    </motion.p>
                  </motion.article>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default MediaGallery;
