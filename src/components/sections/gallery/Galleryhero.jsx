'use client'

import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

export default function GalleryHero() {
  const containerRef = useRef(null)
  const lenisRef = useRef(null)
  const headingRef = useRef(null)
  const subheadingRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '-20% 0px' })
  
  // State for client-side random twinkling dots to fix hydration error
  const [twinklingDots, setTwinklingDots] = useState([]);

  // Data for the collage images with consistent properties
  const images = [
    { src: '/images/wardrobe-1.jpg', alt: 'Modern Kitchen', width: '30%', initialPos: { top: '5%', left: '5%', rotate: -8 } },
    { src: '/images/wardrobe-2.jpg', alt: 'Walk-in Wardrobe', width: '25%', initialPos: { top: '15%', right: '5%', rotate: 12 } },
    { src: '/images/wardrobe-3.jpg', alt: 'Bespoke Furniture', width: '35%', initialPos: { bottom: '5%', left: '20%', rotate: 5 } },
    { src: '/images/wardrobe-4.jpg', alt: 'Designer Vanity', width: '28%', initialPos: { bottom: '10%', right: '20%', rotate: -10 } },
    { src: '/images/wardrobe-5.jpg', alt: 'Living Room', width: '32%', initialPos: { top: '30%', left: '40%', rotate: 8 } },
  ]

  // Lenis and GSAP setup for smooth scrolling and animations
  useEffect(() => {
    // Initialize Lenis
    if (!lenisRef.current) {
      lenisRef.current = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        smoothTouch: true,
      })

      function raf(time) {
        lenisRef.current?.raf(time)
        requestAnimationFrame(raf)
      }
      requestAnimationFrame(raf)
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current, {
        y: 0,
        opacity: 1,
      }, {
        y: -100,
        opacity: 0.1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
      gsap.fromTo(subheadingRef.current, {
        y: 0,
        opacity: 1,
      }, {
        y: -50,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
    }, containerRef)

    // Generate random dot properties on the client side
    const dots = [...Array(20)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 3 + 2}s`,
      animationDelay: `${Math.random() * 2}s`,
    }));
    setTwinklingDots(dots);


    return () => {
      ctx.revert()
      lenisRef.current?.destroy()
    }
  }, [])

  // Variants for staggered entry animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { scale: 0.8, opacity: 0, y: 50 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  }

  const borderAnimation = {
    background: [
      "linear-gradient(0deg, #EB1B26, #FF4757, #EB1B26)",
      "linear-gradient(90deg, #EB1B26, #FF4757, #EB1B26)",
      "linear-gradient(180deg, #EB1B26, #FF4757, #EB1B26)",
      "linear-gradient(270deg, #EB1B26, #FF4757, #EB1B26)",
      "linear-gradient(360deg, #EB1B26, #FF4757, #EB1B26)"
    ]
  };

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col justify-center items-center min-h-screen pt-24 pb-12 px-4 md:px-8 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #1A1A1A 0%, #000000 100%)',
      }}
    >
      {/* Background Dotted Grid */}
      <div className="absolute inset-0 z-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle, #EB1B26 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}/>
      {/* Twinkling dots animation (rendered on client side) */}
      {twinklingDots.map((dot, i) => (
        <div key={i} className="absolute w-1 h-1 rounded-full bg-[#EB1B26] z-0" style={{
          top: dot.top,
          left: dot.left,
          animation: `twinkle ${dot.animationDuration} ease-in-out infinite alternate`,
          animationDelay: dot.animationDelay,
        }}/>
      ))}
      
      {/* Hero Text */}
      <div className="relative text-center z-10 max-w-4xl mx-auto">
        <motion.h1
          ref={headingRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white tracking-tight leading-tight"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          Crafting Your Dream Space
        </motion.h1>
        <motion.p
          ref={subheadingRef}
          className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-white max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        >
          Explore our gallery of bespoke kitchen designs, wardrobes, vanities, and furniture, each tailored to reflect your unique style and needs.
        </motion.p>
      </div>

      {/* Interactive Image Collage with Drag-and-Drop */}
      <motion.div
        className="absolute inset-0 w-full h-full pointer-events-none"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {images.map((img, index) => (
          <motion.div
            key={index}
            className="absolute p-2 rounded-2xl cursor-grab active:cursor-grabbing will-change-transform"
            style={{
              ...img.initialPos,
              width: img.width,
              aspectRatio: '4/3',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08)',
              pointerEvents: 'auto',
            }}
            variants={itemVariants}
            whileHover={{ scale: 1.05, zIndex: 100 }}
            drag
            dragConstraints={containerRef}
            dragElastic={0.2}
            dragTransition={{ power: 0.1, timeConstant: 200, bounceDamping: 10 }}
            whileDrag={{ zIndex: 200 }}
          >
            {/* Animated glowing border effect */}
            <motion.div
              className="absolute inset-[1px] rounded-2xl opacity-75 blur-sm -z-10"
              animate={borderAnimation}
              transition={{ duration: 3, repeat: Infinity }}
            />
            {/* Image container */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                priority
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 40vw, 30vw"
                className="object-cover pointer-events-none"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}