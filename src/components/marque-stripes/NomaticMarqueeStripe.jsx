"use client";
import { motion } from "framer-motion";
import NomaticBrandText from "../texts/NomaticBrandText";

const NomaticMarqueeStripe = () => {
  const MarqueeContent = () => (
    <>
      {[...Array(8)].map((_, index) => (
        <div key={index} className="flex items-center">
          <NomaticBrandText variant="dark" caps={true} />
          <div className="mx-12 inline-flex items-center justify-center w-8 h-8 rounded-full border-brand-light border">
            <span className="text-brand-identity font-black text-lg transform -rotate-12 leading-none flex items-center justify-center">
              \
            </span>
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className="w-full overflow-hidden py-4 bg-brand-dark">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: [0, "-50%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 40,
            ease: "linear",
          },
        }}
      >
        <MarqueeContent />
        <MarqueeContent />
      </motion.div>
    </div>
  );
};

export default NomaticMarqueeStripe;
