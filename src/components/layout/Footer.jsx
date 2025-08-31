"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { footerData } from "../../data/footer";
import Logo from "../common/Logo";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0.25, 0.75] ,
      },
    },
  };

  return (
    <motion.footer
      className="bg-brand-dark text-white py-16"
      initial="hidden"
      whileInView="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Logo and Description */}
        <motion.div className="mb-12" variants={itemVariants}>
          <motion.div className="mb-6" transition={{ duration: 0.3 }}>
            <Logo
              width={200}
              height={45}
              className="h-12 w-auto"
              priority={false}
              isLink={true}
              href="/"
            />
            <motion.div
              className="text-sm text-gray-400 mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
            </motion.div>
          </motion.div>
          <motion.p
            className="text-gray-300 max-w-md leading-relaxed"
            variants={itemVariants}
          >
            Premium, modern interiors tailored to your lifestyle — with zero
            hassle, zero delays, and 100% heart. Crafting spaces that evolve
            with you.
          </motion.p>
        </motion.div>

        {/* Footer Links Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
          variants={containerVariants}
        >
          {/* Contact Us */}
          <motion.div variants={itemVariants}>
            <motion.h3
              className="text-white font-semibold text-lg mb-4"
              whileHover={{ color: "#EB1B26" }}
              transition={{ duration: 0.3 }}
            >
              {footerData.contactUs.title}
            </motion.h3>
            <div className="space-y-3 text-gray-400">
              <motion.p
                whileHover={{ x: 5, color: "#ffffff" }}
                transition={{ duration: 0.2 }}
              >
                Call: {footerData.contactUs.phone}
              </motion.p>
              <motion.p
                whileHover={{ x: 5, color: "#ffffff" }}
                transition={{ duration: 0.2 }}
              >
                Email: {footerData.contactUs.email}
              </motion.p>
              <Link href={footerData.contactUs.showroomDirections.link}>
                <motion.p
                  className="cursor-pointer hover:text-white transition-colors"
                  whileHover={{ x: 5, color: "#EB1B26" }}
                  transition={{ duration: 0.2 }}
                >
                  {footerData.contactUs.showroomDirections.text}
                </motion.p>
              </Link>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <motion.h3
              className="text-white font-semibold text-lg mb-4"
              whileHover={{ color: "#EB1B26" }}
              transition={{ duration: 0.3 }}
            >
              {footerData.services.title}
            </motion.h3>
            <ul className="space-y-3 text-gray-400">
              {footerData.services.items.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link href={item.link}>
                    <motion.span
                      className="cursor-pointer hover:text-white transition-colors block"
                      whileHover={{ x: 5, color: "#ffffff" }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.text}
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Visit and Info */}
          <motion.div variants={itemVariants}>
            <motion.h3
              className="text-white font-semibold text-lg mb-4"
              whileHover={{ color: "#EB1B26" }}
              transition={{ duration: 0.3 }}
            >
              {footerData.visitAndInfo.title}
            </motion.h3>
            <ul className="space-y-3 text-gray-400">
              {footerData.visitAndInfo.items.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Link href={item.link}>
                    <motion.span
                      className="cursor-pointer hover:text-white transition-colors block"
                      whileHover={{ x: 5, color: "#ffffff" }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.text}
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Connect and Follow */}
          <motion.div variants={itemVariants}>
            <motion.h3
              className="text-white font-semibold text-lg mb-4"
              whileHover={{ color: "#EB1B26" }}
              transition={{ duration: 0.3 }}
            >
              {footerData.connectAndFollow.title}
            </motion.h3>
            <ul className="space-y-3 text-gray-400">
              {footerData.connectAndFollow.items.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  {item.link.startsWith("http") ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cursor-pointer hover:text-white transition-colors"
                    >
                      <motion.span
                        className="block"
                        whileHover={{ x: 5, color: "#ffffff" }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.text}
                      </motion.span>
                    </a>
                  ) : (
                    <Link href={item.link}>
                      <motion.span
                        className="cursor-pointer hover:text-white transition-colors block"
                        whileHover={{ x: 5, color: "#ffffff" }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.text}
                      </motion.span>
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="border-t border-gray-700 pt-8"
          variants={itemVariants}
        >
          <motion.p
            className="text-gray-400 text-sm"
            whileHover={{ color: "#EB1B26" }}
            transition={{ duration: 0.3 }}
          >
            {footerData.copyright}
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
