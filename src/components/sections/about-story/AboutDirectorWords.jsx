"use client";

import { aboutStoryData } from "@/data/aboutStory";
import { motion } from "framer-motion";

const AboutDirectorWords = () => {
  const { directorWords } = aboutStoryData;

  return (
    <section className="py-20 bg-brand-background">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <motion.div
          className="bg-white rounded-3xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="grid lg:grid-cols-2 min-h-[60vh]">
            {/* Director Image */}
            <motion.div
              className="relative h-64 lg:h-full"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${directorWords.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

              {/* Quote Icon */}
              <motion.div
                className="absolute top-6 left-6 bg-brand-identity rounded-full p-3 shadow-lg"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                </svg>
              </motion.div>
            </motion.div>

            {/* Content */}
            <div className="p-8 lg:p-16 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <span className="inline-block bg-brand-identity text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                  Words from Leadership
                </span>

                <blockquote className="text-xl lg:text-2xl text-brand-dark leading-relaxed mb-8 italic">
                  "{directorWords.quote}"
                </blockquote>

                {/* Signature */}
                <motion.div
                  className="border-t border-brand-dark/10 pt-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-center space-x-4">
                    <div>
                      <div className="font-bold text-brand-dark text-lg">
                        {directorWords.name}
                      </div>
                      <div className="text-brand-dark/60 text-sm">
                        {directorWords.position}
                      </div>
                    </div>
                    <div className="flex-1 h-px bg-brand-dark/10"></div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutDirectorWords;
