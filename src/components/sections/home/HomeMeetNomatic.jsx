"use client";

import { meetNomaticContent, meetNomaticSection } from "@/data/meetNomatic";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LetterByLetterText = ({
  text,
  progress,
  highlightWord,
  className = "",
}) => {
  const [visibleCount, setVisibleCount] = useState(0);
  const totalChars = text.length;

  useEffect(() => {
    const newVisibleCount = Math.round(progress * totalChars);
    setVisibleCount(Math.max(0, Math.min(newVisibleCount, totalChars)));
  }, [progress, totalChars]);

  const renderText = () => {
    const chars = text.split("");

    if (highlightWord) {
      const highlightIndex = text.indexOf(highlightWord);
      const highlightEnd = highlightIndex + highlightWord.length;

      return chars.map((char, index) => {
        const isVisible = index < visibleCount;
        const isHighlightChar = index >= highlightIndex && index < highlightEnd;

        return (
          <span
            key={index}
            className={`transition-colors duration-200 ease-out ${
              isVisible
                ? isHighlightChar
                  ? "text-brand-identity font-bold"
                  : "text-white font-medium"
                : "text-gray-500 opacity-60"
            }`}
          >
            {char}
          </span>
        );
      });
    }

    return chars.map((char, index) => {
      const isVisible = index < visibleCount;

      return (
        <span
          key={index}
          className={`transition-colors duration-200 ease-out ${
            isVisible ? "text-white font-medium" : "text-gray-500 opacity-60"
          }`}
        >
          {char}
        </span>
      );
    });
  };

  return (
    <p className={`text-lg leading-relaxed ${className}`}>{renderText()}</p>
  );
};

const HomeMeetNomatic = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paragraphProgress, setParagraphProgress] = useState(
    new Array(meetNomaticContent.length).fill(0)
  );
  
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const scrollTriggerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const sticky = stickyRef.current;

    if (!container || !sticky) return;

    // Create a timeline for the entire animation
    const tl = gsap.timeline({
      ease: "none",
    });

    // Set up scroll trigger
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: 1, // Smooth scrubbing
      pin: sticky,
      pinSpacing: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const totalParagraphs = meetNomaticContent.length;
        
        // Calculate progress for each paragraph
        const newParagraphProgress = [];
        let newActiveIndex = 0;

        for (let i = 0; i < totalParagraphs; i++) {
          const paragraphStart = i / totalParagraphs;
          const paragraphEnd = (i + 1) / totalParagraphs;
          
          if (progress <= paragraphStart) {
            newParagraphProgress[i] = 0;
          } else if (progress >= paragraphEnd) {
            newParagraphProgress[i] = 1;
            newActiveIndex = i;
          } else {
            const paragraphLocalProgress = (progress - paragraphStart) / (paragraphEnd - paragraphStart);
            newParagraphProgress[i] = paragraphLocalProgress;
            newActiveIndex = i;
          }
        }

        // Update active index based on which paragraph is currently being animated
        for (let i = 0; i < totalParagraphs; i++) {
          if (newParagraphProgress[i] > 0 && newParagraphProgress[i] < 1) {
            newActiveIndex = i;
            break;
          }
          if (i === totalParagraphs - 1 && newParagraphProgress[i] === 1) {
            newActiveIndex = i;
          }
        }

        setParagraphProgress(newParagraphProgress);
        setActiveIndex(newActiveIndex);
      },
    });

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill();
      }
      ScrollTrigger.refresh();
    };
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-[400vh]">
      <div
        ref={stickyRef}
        className="h-screen bg-brand-dark text-white overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center h-full">
            <div className="space-y-8">
              <motion.h2
                className="text-4xl lg:text-5xl font-bold"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-brand-identity">/</span>{" "}
                {meetNomaticSection.title.split(" ")[0]} NOM
                <span className="text-brand-identity">A</span>TIC
              </motion.h2>
              
              <div className="space-y-8">
                {meetNomaticContent.map((content, index) => {
                  const text = content.text;
                  const highlightWord = content.highlight;
                  const currentProgress = paragraphProgress[index] || 0;

                  return (
                    <motion.div
                      key={content.id}
                      className="relative"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-2 h-2 rounded-full mt-3 flex-shrink-0 transition-colors duration-300 ${
                            index === activeIndex
                              ? "bg-brand-identity"
                              : "bg-gray-600"
                          }`}
                        />
                        <div className="flex-1">
                          <LetterByLetterText
                            text={text}
                            progress={currentProgress}
                            highlightWord={highlightWord}
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="relative h-[600px] lg:h-[700px] flex items-center gap-1">
              <div className="flex-1 h-full">
                <div className="relative w-full h-full">
                  {meetNomaticContent.map((content, index) => (
                    <motion.div
                      key={content.id}
                      className="absolute inset-0 rounded-2xl overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: index === activeIndex ? 1 : 0,
                        scale: index === activeIndex ? 1 : 1.05,
                      }}
                      transition={{
                        duration: 0.8,
                        ease: [0.4, 0, 0.2, 1],
                      }}
                    >
                      <img
                        src={content.image}
                        alt={`Nomatic ${content.id}`}
                        className="w-full h-full object-cover rounded-2xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent rounded-2xl"></div>
                      <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-xs">
                        {content.id}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col space-y-2 h-full justify-center">
                {meetNomaticContent.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`w-1 flex-1 rounded-full transition-all duration-500 ${
                      index === activeIndex
                        ? "bg-brand-identity"
                        : "bg-white/30"
                    }`}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeMeetNomatic;