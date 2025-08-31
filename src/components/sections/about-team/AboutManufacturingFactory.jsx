"use client";

import { aboutStoryData } from "@/data/aboutStory";
import { motion } from "framer-motion";
import Image from "next/image";

const AboutManufacturingFactory = () => {
  const { manufacturingFactory } = aboutStoryData;

  return (
    <section className="py-20 bg-brand-light">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="inline-block bg-brand-identity text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
            Manufacturing Excellence
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-brand-dark mb-6">
            {manufacturingFactory.title}
          </h2>
          <p className="text-xl text-brand-dark/70 max-w-3xl mx-auto">
            {manufacturingFactory.subtitle}
          </p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-12 gap-6 h-[80vh]">
          {/* Main Description Card */}
          <motion.div
            className="col-span-12 lg:col-span-5 bg-white rounded-3xl p-8 flex flex-col justify-center shadow-lg"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-brand-dark mb-6">
              {manufacturingFactory.subtitle}
            </h3>
            <p className="text-brand-dark/70 text-lg leading-relaxed mb-8">
              {manufacturingFactory.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-brand-identity mb-1">
                  100%
                </div>
                <div className="text-brand-dark/60 text-sm">
                  Quality Assured
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-brand-identity mb-1">
                  24/7
                </div>
                <div className="text-brand-dark/60 text-sm">Production</div>
              </div>
            </div>
          </motion.div>

          {/* Image Gallery Cards */}
          <div className="col-span-12 lg:col-span-7 grid grid-cols-2 gap-6">
            {manufacturingFactory.gallery.map((image, index) => (
              <motion.div
                key={index}
                className={`
                  relative rounded-2xl overflow-hidden shadow-lg
                  ${index === 0 ? "row-span-2" : ""}
                `}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Image
                  src={image}
                  alt={`Manufacturing facility ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </motion.div>
            ))}
          </div>

          {/* Features Grid */}
          <div className="col-span-12 grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
            {manufacturingFactory.features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h4 className="font-bold text-brand-dark mb-3">
                  {feature.title}
                </h4>
                <p className="text-brand-dark/60 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutManufacturingFactory;
