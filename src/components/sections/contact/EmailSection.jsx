"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  AtSign,
  Inbox,
  Mail,
  MessageSquare,
  Send,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function EmailSection() {
  const emailTextRef = useRef(null);
  const headingRef = useRef(null);
  const [emailText, setEmailText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Fix hydration error by ensuring client-only rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    // Animated heading with letter-by-letter reveal
    if (headingRef.current) {
      const text = headingRef.current.textContent;
      const letters = text.split("");
      headingRef.current.innerHTML = letters
        .map((letter) => {
          if (letter === " ") return "&nbsp;";
          return `<span class="inline-block" style="transform: translateY(100%); opacity: 0;">${letter}</span>`;
        })
        .join("");

      const spans = headingRef.current.querySelectorAll("span");
      spans.forEach((span, i) => {
        setTimeout(() => {
          span.style.transition =
            "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
          span.style.transform = "translateY(0)";
          span.style.opacity = "1";
        }, i * 100 + 500);
      });
    }

    // Enhanced typewriter effect for email with looping
    const fullEmail = "info@nomaticluxe.com";
    let currentIndex = 0;
    let isDeleting = false;
    let typewriterInterval;

    const typeWriter = () => {
      if (!isDeleting) {
        if (currentIndex <= fullEmail.length) {
          setEmailText(fullEmail.slice(0, currentIndex));
          currentIndex++;
        } else {
          setTimeout(() => {
            isDeleting = true;
          }, 2000);
        }
      } else {
        if (currentIndex > 0) {
          setEmailText(fullEmail.slice(0, currentIndex - 1));
          currentIndex--;
        } else {
          isDeleting = false;
          setTimeout(() => {
            currentIndex = 0;
          }, 1000);
        }
      }
    };

    setTimeout(() => {
      typewriterInterval = setInterval(typeWriter, isDeleting ? 50 : 120);
    }, 2000);

    // Cursor blinking
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => {
      clearInterval(typewriterInterval);
      clearInterval(cursorInterval);
    };
  }, [isClient]);

  const handleEmailClick = () => {
    const email = "info@nomaticluxe.com";
    const subject = "Inquiry from Nomatic Website";
    const body = `Hello Nomatic Team,%0D%0A%0D%0AI am interested in your services and would like to discuss my requirements further.%0D%0AHere are my details. %0D%0A%0D%0AName:%0D%0A%0D%0APhone:%0D%0A%0D%0ALocation:%0D%0A%0D%0AThank you for your time.%0D%0A%0D%0ABest regards`;

    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${body}`;
    window.location.href = mailtoUrl;
  };

  // Prevent hydration mismatch by not rendering until client
  if (!isClient) {
    return null;
  }

  // Array of email-related icons for background (only render on client)
  const emailIcons = [Mail, Send, MessageSquare, AtSign, Inbox, Mail];

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-16 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #383838 0%, #1F1E1E 100%)",
      }}
    >
      {/* Enhanced floating background icons */}
      <div className="absolute inset-0 pointer-events-none">
        {emailIcons.map((IconComponent, i) => (
          <motion.div
            key={`icon-${i}`}
            className="absolute"
            style={{
              top: `${10 + ((i * 15) % 60)}%`,
              left: `${5 + ((i * 20) % 90)}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.sin(i) * 20, 0],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 180, 360],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "easeInOut",
            }}
          >
            <IconComponent
              size={40 + (i % 3) * 15}
              className="text-[#EB1B26]"
              style={{ opacity: 0.15 }}
            />
          </motion.div>
        ))}
      </div>

      {/* Subtle background glow effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#EB1B26] rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#EB1B26] rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="text-center space-y-8 md:space-y-16 max-w-6xl mx-auto relative z-10 w-full">
        {/* Animated heading - Fixed to stay on one line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="space-y-4 md:space-y-8 w-full overflow-hidden"
        >
          <h1
            ref={headingRef}
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-sf-pro-expanded text-white whitespace-nowrap px-2"
          >
            <span className="text-[#EB1B26]">/</span>Get in Touch
          </h1>
        </motion.div>

        {/* Enhanced email display with cursor */}
        <div className="space-y-8 md:space-y-12">
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <div
              ref={emailTextRef}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-mono font-bold text-white tracking-wider select-none overflow-hidden"
              style={{ minHeight: "1.2em" }}
            >
              {emailText}
            </div>
            <span
              className={`inline-block w-1 sm:w-1.5 md:w-2 h-6 sm:h-8 md:h-10 lg:h-12 xl:h-14 bg-[#EB1B26] ml-1 sm:ml-2 transition-opacity duration-300 ${
                showCursor ? "opacity-100" : "opacity-0"
              }`}
            />
          </motion.div>

          {/* Decorative line */}
          <motion.div
            className="w-full max-w-4xl mx-auto h-px bg-gradient-to-r from-transparent via-[#EB1B26] to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 2.5 }}
          />
        </div>

        {/* Email Now button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 3 }}
          className="pt-4 md:pt-0"
        >
          <motion.button
            onClick={handleEmailClick}
            className="group relative inline-flex items-center gap-2 sm:gap-3 bg-transparent border-2 border-white text-white px-6 py-3 sm:px-10 sm:py-4 md:px-14 md:py-5 lg:px-16 lg:py-6 rounded-full font-bold text-base sm:text-lg md:text-xl uppercase tracking-wide transition-all duration-300 hover:bg-white hover:text-[#383838] shadow-lg hover:shadow-[0_10px_40px_rgba(255,255,255,0.2)]"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 40px rgba(255, 255, 255, 0.3)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 underline group-hover:no-underline transition-all duration-300">
              Email Now
            </span>

            {/* Animated arrow */}
            <motion.div
              className="relative z-10"
              animate={{ x: [0, 8, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8" />
            </motion.div>

            {/* Button background glow */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-white to-gray-200 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </motion.button>
        </motion.div>

        {/* Additional floating particles for depth */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-[#EB1B26] rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 4 + Math.random() * 6,
                repeat: Infinity,
                delay: Math.random() * 4,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
