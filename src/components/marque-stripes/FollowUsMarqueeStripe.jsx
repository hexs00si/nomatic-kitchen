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
      {[...Array(6)].map((_, index) => (
        <div key={index} className="flex items-center">
          <span className="text-white font-bold text-lg tracking-wide">
            FOLLOW US
          </span>
          <div className="mx-8 flex items-center space-x-6">
            {socialLinks.map((social, socialIndex) => (
              <div key={socialIndex} className="flex items-center space-x-2">
                <span className="text-brand-identity font-medium text-sm">
                  {social.name}
                </span>
                <span className="text-white/70 text-sm">{social.handle}</span>
              </div>
            ))}
          </div>
          <div className="mx-8 inline-flex items-center justify-center w-6 h-6 rounded-full border-white/30 border">
            <span className="text-brand-identity font-black text-sm transform rotate-45 leading-none flex items-center justify-center">
              +
            </span>
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className="w-full overflow-hidden py-6 bg-brand-dark-secondary">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: [0, "-50%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 50,
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
