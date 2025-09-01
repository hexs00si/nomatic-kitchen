"use client";

import { motion } from "framer-motion";

const FollowUsMarqueeStripe = () => {
  const socialLinks = [
    { name: "INSTAGRAM", handle: "@nomatickitchens" },
    { name: "FACEBOOK", handle: "/nomatickitchens" },
    { name: "YOUTUBE", handle: "/nomaticdesigns" },
    { name: "LINKEDIN", handle: "/company/nomatic" },
  ];

  const MarqueeContent = () => (
    <>
      {[...Array(8)].map((_, index) => (
        <div key={index} className="flex items-center">
          <span className="text-white font-bold text-lg tracking-wider mr-12">
            FOLLOW US
          </span>
          {socialLinks.map((social, socialIndex) => (
            <div key={socialIndex} className="flex items-center mr-12">
              <span className="text-brand-identity font-semibold text-base mr-3">
                {social.name}
              </span>
              <span className="text-white/80 text-base font-light">
                {social.handle}
              </span>
            </div>
          ))}
          <div className="w-2 h-2 bg-brand-identity rounded-full mr-12"></div>
        </div>
      ))}
    </>
  );

  return (
    <div className="w-full overflow-hidden py-8 bg-brand-dark-secondary">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: [0, "-50%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 45,
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

export default FollowUsMarqueeStripe;