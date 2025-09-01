"use client";

import VerticalMarquee from "@/components/common/VerticalMarquee";
import Button from "@/components/ui/Button";
import { happyClientsContent } from "@/data/happyClients";
import { testimonials } from "@/data/testimonials";
import { motion } from "framer-motion";

const HomeOurHappyClients = () => {
  const firstColumnTestimonials = testimonials.slice(0, 3);
  const secondColumnTestimonials = testimonials.slice(3, 6);

  return (
    <motion.section
      className="bg-brand-light"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh] sm:min-h-[70vh] lg:h-[90vh] items-stretch">
          <motion.div
            className="relative bg-brand-dark border-b-8 lg:border-b-0 lg:border-r-8 border-brand-identity order-2 lg:order-1"
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-8 h-full py-8 lg:py-0">
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <VerticalMarquee
                  testimonials={firstColumnTestimonials}
                  direction="up"
                  speed={15}
                />
              </motion.div>
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <VerticalMarquee
                  testimonials={secondColumnTestimonials}
                  direction="down"
                  speed={15}
                />
              </motion.div>
            </div>
            <div className="absolute top-0 left-0 right-0 h-12 sm:h-16 lg:h-20 bg-gradient-to-b from-brand-dark to-transparent pointer-events-none z-10"></div>
            <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 lg:h-20 bg-gradient-to-t from-brand-dark to-transparent pointer-events-none z-10"></div>
          </motion.div>
          <motion.div
            className="flex items-center justify-center bg-brand-light px-6 sm:px-8 lg:px-16 order-1 lg:order-2"
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
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
                  Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et
                  massa mi. Aliquam in hendrerit urna. Pellentesque{" "}
                  <span className="text-brand-identity font-semibold">sit</span>{" "}
                  amet sapien fringilla, mattis ligula consectetur, ultrices
                  mauris. Maecenas vitae mattis tellus.
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
                  onClick={happyClientsContent.buttonAction}
                  className="hover:shadow-lg w-full"
                >
                  {happyClientsContent.buttonText}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default HomeOurHappyClients;
