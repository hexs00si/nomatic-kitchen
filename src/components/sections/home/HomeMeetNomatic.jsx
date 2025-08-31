"use client";

import { meetNomaticContent, meetNomaticSection } from "@/data/meetNomatic";
import { motion, useScroll } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const LetterByLetterText = ({
  text,
  progress,
  highlightWord,
  className = "",
}) => {
  const [visibleCount, setVisibleCount] = useState(0);
  const totalChars = text.length;

  useEffect(() => {
    // Direct progress value instead of motion value
    if (typeof progress === 'number') {
      const newVisibleCount = Math.round(progress * totalChars);
      setVisibleCount(Math.max(0, Math.min(newVisibleCount, totalChars)));
    } else {
      const unsubscribe = progress.onChange((latest) => {
        const newVisibleCount = Math.round(latest * totalChars);
        setVisibleCount(Math.max(0, Math.min(newVisibleCount, totalChars)));
      });

      return unsubscribe;
    }
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
  const [paragraphProgress, setParagraphProgress] = useState([]);
  const containerRef = useRef(null);
  const stickyRef = useRef(null);
  const textRefs = useRef([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((latest) => {
      const totalParagraphs = meetNomaticContent.length;
      const newParagraphProgress = [];
      let newActiveIndex = 0;

      // Calculate progress for each paragraph
      for (let i = 0; i < totalParagraphs; i++) {
        const paragraphStart = i / totalParagraphs;
        const paragraphEnd = (i + 1) / totalParagraphs;
        
        if (latest <= paragraphStart) {
          newParagraphProgress[i] = 0;
        } else if (latest >= paragraphEnd) {
          newParagraphProgress[i] = 1;
          newActiveIndex = i;
        } else {
          const paragraphLocalProgress = (latest - paragraphStart) / (paragraphEnd - paragraphStart);
          newParagraphProgress[i] = paragraphLocalProgress;
          newActiveIndex = i;
        }
      }

      // Only move to next paragraph if current one is complete
      for (let i = 0; i < totalParagraphs; i++) {
        if (newParagraphProgress[i] < 1) {
          newActiveIndex = i;
          break;
        }
        if (i === totalParagraphs - 1) {
          newActiveIndex = i;
        }
      }

      setParagraphProgress(newParagraphProgress);
      if (newActiveIndex !== activeIndex) {
        setActiveIndex(newActiveIndex);
      }
    });

    return unsubscribe;
  }, [activeIndex, scrollYProgress]);

  return (
    <div ref={containerRef} className="relative h-[600vh]">
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen bg-brand-dark text-white overflow-hidden"
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

                  // Use direct progress value
                  const currentProgress = paragraphProgress[index] || 0;

                  return (
                    <motion.div
                      key={content.id}
                      className="relative"
                      ref={(el) => {
                        textRefs.current[index] = el;
                      }}
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
              <div className="flex space-x-2 pt-8">
                {meetNomaticContent.map((_, index) => {
                  const currentProgress = paragraphProgress[index] || 0;

                  return (
                    <motion.div
                      key={index}
                      className="h-1 rounded-full bg-gray-600 relative overflow-hidden"
                      style={{ width: 32 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-brand-identity rounded-full origin-left"
                        style={{
                          scaleX: currentProgress,
                        }}
                      />
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
