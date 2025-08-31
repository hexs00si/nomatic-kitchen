"use client";

import { motion } from "framer-motion";
import { faqData } from "../../../data/faq";
import FAQItem from "../../common/FAQItem";
import Heading from "../../texts/Heading";

const HomeFAQ = () => {
  return (
    <motion.section
      className="bg-black py-16"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          className="mb-12"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Heading variant="lg" isSlashed={true} dark={true} className="mb-4">
            FAQ
          </Heading>
          <motion.p
            className="text-white text-lg"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Frequently <span className="text-brand-identity">A</span>sked
            Questions
          </motion.p>
        </motion.div>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {faqData.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ x: 10, transition: { duration: 0.3 } }}
            >
              <FAQItem
                id={faq.id}
                question={faq.question}
                answer={faq.answer}
                index={index}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HomeFAQ;
