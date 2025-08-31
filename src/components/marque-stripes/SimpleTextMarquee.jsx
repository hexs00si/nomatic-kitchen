"use client";
import { motion } from "framer-motion";

const SimpleTextMarquee = ({ text = "QUALITY • INNOVATION • EXCELLENCE • CRAFTSMANSHIP", bgColor = "bg-brand-dark", textColor = "text-white" }) => {
  const MarqueeContent = () => (
    <>
      {[...Array(6)].map((_, index) => (
        <span key={index} className={`${textColor} text-4xl md:text-6xl font-bold tracking-wider mx-16`}>
          {text}
        </span>
      ))}
    </>
  );

  return (
    <div className={`w-full overflow-hidden py-8 ${bgColor}`}>
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: [0, "-50%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
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

export default SimpleTextMarquee;
