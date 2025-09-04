"use client";

import { useState } from "react";
import VerticalMarquee from "@/components/common/VerticalMarquee";
import Button from "@/components/ui/Button";
import { happyClientsContent } from "@/data/happyClients";
import { testimonials } from "@/data/testimonials";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const HomeOurHappyClients = () => {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const firstColumnTestimonials = testimonials.slice(0, 3);
  const secondColumnTestimonials = testimonials.slice(3, 6);

  const nextTestimonial = () =>
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);

  const prevTestimonial = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );

  return (
    <motion.section
      className="bg-brand-light relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh] sm:min-h-[70vh] lg:h-[90vh] items-stretch">
          {/* Right side (Heading + Subheading + Button) */}
          <motion.div
            className="flex items-center justify-center bg-brand-light px-6 sm:px-8 lg:px-16 order-1 lg:order-2"
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4 sm:space-y-6 flex flex-col h-full justify-between max-w-2xl py-8 sm:py-10 lg:py-12">
              <motion.div
                className="space-y-4 sm:space-y-6"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.h2
                  className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-brand-dark leading-tight"
                  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                >
                  <span className="text-brand-identity">/</span>{" "}
                  {happyClientsContent.title}
                </motion.h2>

                <motion.p
                  className="text-base sm:text-lg lg:text-xl xl:text-2xl font-light text-gray-600 leading-relaxed"
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  Every testimonial is a story of commitment, reliability, and
                  exceptional craftsmanship. Hear directly from our clients about
                  the experiences that make us their preferred choice.
                </motion.p>
              </motion.div>

              <motion.div
                className="pt-6"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                <Button
                  variant="arrowed"
                  onClick={() => setViewerOpen(true)}
                  className="hover:shadow-lg w-full"
                >
                  {happyClientsContent.buttonText}
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Left side (Marquee) */}
          <motion.div
            className="relative bg-brand-dark border-b-8 lg:border-b-0 lg:border-r-8 border-brand-identity order-2 lg:order-1"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8 h-full py-8 lg:py-0">
              <VerticalMarquee
                testimonials={firstColumnTestimonials}
                direction="up"
                speed={15}
              />
              <VerticalMarquee
                testimonials={secondColumnTestimonials}
                direction="down"
                speed={15}
              />
            </div>
            <div className="absolute top-0 left-0 right-0 h-12 sm:h-16 lg:h-20 bg-gradient-to-b from-brand-dark to-transparent pointer-events-none z-10"></div>
            <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 lg:h-20 bg-gradient-to-t from-brand-dark to-transparent pointer-events-none z-10"></div>
          </motion.div>
        </div>
      </div>

      {/* Fullscreen Testimonial Viewer */}
      <AnimatePresence>
        {viewerOpen && (
          <motion.div
            className="fixed inset-0 bg-brand-dark z-50 flex items-center justify-center p-6 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Close button */}
            <button
              onClick={() => setViewerOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-brand-identity"
            >
              <X size={32} />
            </button>

            {/* Testimonial Card */}
            <motion.div
              key={currentIndex}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-12 max-w-3xl w-full text-center"
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: -50 }}
              transition={{ duration: 0.4 }}
            >
              {/* Category */}
              {testimonials[currentIndex].category && (
                <div className="inline-block px-3 py-1 bg-brand-identity text-white text-xs sm:text-sm font-medium rounded-full mb-4">
                  {testimonials[currentIndex].category}
                </div>
              )}

              {/* Rating */}
              {testimonials[currentIndex].rating && (
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="text-yellow-400 text-lg sm:text-xl"
                      initial={{ opacity: 0, rotate: -180 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                    >
                      ★
                    </motion.span>
                  ))}
                </div>
              )}

              {/* Quote */}
              <blockquote className="text-lg sm:text-xl lg:text-2xl font-light italic text-white mb-6">
                “{testimonials[currentIndex].text}”
              </blockquote>

              {/* Author */}
              <div>
                <p className="text-white font-semibold text-lg">
                  {testimonials[currentIndex].author}
                </p>
                {testimonials[currentIndex].location && (
                  <p className="text-white/70 text-sm">
                    {testimonials[currentIndex].location}
                  </p>
                )}
              </div>

              {/* Progress Dots */}
              <div className="flex justify-center mt-6 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                      index === currentIndex
                        ? "bg-brand-identity"
                        : "bg-white/30 hover:bg-white/50"
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
              </div>
            </motion.div>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-6 text-white hover:text-brand-identity"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-6 text-white hover:text-brand-identity"
            >
              <ChevronRight size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};

export default HomeOurHappyClients;
