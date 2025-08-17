'use client'

import { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'

const services = [
  {
    id: 1,
    title: "Modular Kitchens",
    description: "Custom modular kitchen solutions designed to maximize space and functionality with premium finishes",
    image: "/images/kitchen-service.jpg",
    icon: "🍳",
  },
  {
    id: 2,
    title: "Wardrobes & Storage",
    description: "Bespoke wardrobe designs and storage solutions tailored to your lifestyle and space requirements",
    image: "/images/wardrobe-service.jpg",
    icon: "👔",
  },
  {
    id: 3,
    title: "Complete Interiors",
    description: "Full-scale interior design and execution services for residential and commercial spaces",
    image: "/images/interior-service.jpg",
    icon: "🏠",
  },
  {
    id: 4,
    title: "Office Solutions",
    description: "Professional workspace design and furniture solutions for enhanced productivity",
    image: "/images/office-service.jpg",
    icon: "💼",
  },
  {
    id: 5,
    title: "Custom Furniture",
    description: "Handcrafted furniture pieces designed and manufactured to your exact specifications",
    image: "/images/furniture-service.jpg",
    icon: "🪑",
  },
  {
    id: 6,
    title: "Renovation Services",
    description: "Complete home and office renovation services with end-to-end project management",
    image: "/images/renovation-service.jpg",
    icon: "🔨",
  },
]

export default function OurServices() {
  const [hoveredCard, setHoveredCard] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isClient, setIsClient] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Tilt effect motion values
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(y, [0, 1], [15, -15]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(x, [0, 1], [-15, 15]), { stiffness: 200, damping: 20 })

  useEffect(() => {
    setIsClient(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)

    // Gyro sensor for mobile tilt
    if (typeof window !== 'undefined' && window.DeviceOrientationEvent) {
      const handleOrientation = (event) => {
        const normX = Math.min(Math.max((event.gamma + 90) / 180, 0), 1)
        const normY = Math.min(Math.max((event.beta + 90) / 180, 0), 1)
        x.set(normX)
        y.set(normY)
      }

      if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission().then(response => {
          if (response === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation)
          }
        })
      } else {
        window.addEventListener('deviceorientation', handleOrientation)
      }

      return () => {
        window.removeEventListener('resize', checkMobile)
        window.removeEventListener('deviceorientation', handleOrientation)
      }
    }

    return () => window.removeEventListener('resize', checkMobile)
  }, [x, y])

  // Desktop hover grid logic
  const getGridTemplate = () => {
    if (hoveredCard === null) {
      return {
        gridTemplateColumns: "1fr 1fr 1fr",
        gridTemplateRows: "1fr 1fr",
      }
    }
    const hoveredIndex = services.findIndex((s) => s.id === hoveredCard)
    const row = Math.floor(hoveredIndex / 3)
    const col = hoveredIndex % 3
    const cols = ["0.7fr", "0.7fr", "0.7fr"]
    const rows = ["0.7fr", "0.7fr"]
    cols[col] = "1.6fr"
    rows[row] = "1.6fr"
    return {
      gridTemplateColumns: cols.join(" "),
      gridTemplateRows: rows.join(" "),
    }
  }

  const getBorderRadius = () => {
    if (!isClient) return "12px"
    return window.innerWidth >= 1024 ? "16px" : "12px"
  }

  // Mobile touch handlers
  const handleMobileTouch = (e) => {
    if (!isClient || !isMobile) return
    const touch = e.touches[0]
    const screenWidth = window.innerWidth
    const half = screenWidth / 2

    if (touch.clientX > half) {
      // Right side touched - next card (circular)
      setActiveIndex((prev) => (prev + 1) % services.length)
    } else {
      // Left side touched - previous card (circular)
      setActiveIndex((prev) => (prev - 1 + services.length) % services.length)
    }
    x.set(0.5)
    y.set(0.5)
  }

  const handleTouchMove = (e) => {
    const touch = e.touches[0]
    const rect = e.currentTarget.getBoundingClientRect()
    const posX = (touch.clientX - rect.left) / rect.width
    const posY = (touch.clientY - rect.top) / rect.height
    
    x.set(posX)
    y.set(posY)
  }

  const handleTouchEnd = () => {
    x.set(0.5)
    y.set(0.5)
  }

  const handleDotClick = (index) => {
    setActiveIndex(index)
    x.set(0.5)
    y.set(0.5)
  }

  // Desktop mouse handlers
  const handleMouseMove = (e) => {
    if (hoveredCard !== null) {
      const rect = e.currentTarget.getBoundingClientRect()
      const posX = (e.clientX - rect.left) / rect.width
      const posY = (e.clientY - rect.top) / rect.height
      
      x.set(posX)
      y.set(posY)
    }
  }

  const handleMouseLeave = () => {
    x.set(0.5)
    y.set(0.5)
  }

  if (!isClient) return null

  return (
    <section
      className="min-h-screen w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-16 relative overflow-hidden"
      style={{
        background: `
          linear-gradient(135deg, 
            rgba(217, 217, 217, 0.4) 0%, 
            rgba(240, 240, 240, 0.25) 25%,
            rgba(255, 255, 255, 0.1) 50%, 
            rgba(245, 245, 245, 0.2) 75%,
            rgba(217, 217, 217, 0.15) 100%
          ),
          radial-gradient(ellipse at top left, rgba(235, 27, 38, 0.05) 0%, transparent 50%),
          radial-gradient(ellipse at bottom right, rgba(150, 150, 150, 0.08) 0%, transparent 50%)
        `,
      }}
      onTouchStart={isMobile ? handleMobileTouch : undefined}
    >
      {/* Enhanced background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-0 w-1/4 h-1/2 bg-gradient-to-bl from-gray-200/20 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-1/4 w-1/2 h-1/3 bg-gradient-to-tr from-gray-100/15 to-transparent rounded-full blur-3xl"></div>
        
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)`,
            backgroundSize: '20px 20px'
          }}
        />
      </div>

      {/* Desktop View */}
      {!isMobile && (
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="relative mb-12 lg:mb-16">
            <div className="relative z-10 flex items-center justify-start">
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-none">
                  <span className="text-[#EB1B26]">/</span>
                  <span className="text-[#111111] ml-2">OUR SERVICES</span>
                </h2>
               
              </motion.div>
            </div>
          </div>

          <motion.div
            className="grid gap-2 sm:gap-3 mb-8 lg:mb-16 rounded-xl lg:rounded-2xl overflow-hidden"
            style={{ 
              height: 'clamp(400px, 60vh, 700px)',
              background: `
                linear-gradient(145deg, 
                  rgba(255, 255, 255, 0.15) 0%, 
                  rgba(240, 240, 240, 0.1) 50%, 
                  rgba(255, 255, 255, 0.05) 100%
                )
              `,
              backdropFilter: 'blur(5px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              perspective: '1200px',
              transformStyle: 'preserve-3d'
            }}
            animate={getGridTemplate()}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            {services.map((service, index) => {
              const isHovered = hoveredCard === service.id
              
              return (
                <motion.div
                  key={service.id}
                  className="relative overflow-hidden cursor-pointer group"
                  style={{
                    background: `
                      linear-gradient(145deg, 
                        rgba(255, 255, 255, 0.8) 0%, 
                        rgba(250, 250, 250, 0.6) 50%,
                        rgba(245, 245, 245, 0.7) 100%
                      )
                    `,
                    backdropFilter: "blur(15px)",
                    border: "1px solid rgba(255, 255, 255, 0.4)",
                    borderRadius: getBorderRadius(),
                    boxShadow: isHovered
                      ? "0 35px 60px -12px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(235, 27, 38, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.4)"
                      : "0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                    
                    rotateX: isHovered ? rotateX : 0,
                    rotateY: isHovered ? rotateY : 0,
                    transformStyle: "preserve-3d",
                    translateZ: isHovered ? 30 : 0,
                  }}
                  onHoverStart={() => {
                    setHoveredCard(service.id)
                    x.set(0.5)
                    y.set(0.5)
                  }}
                  onHoverEnd={() => {
                    setHoveredCard(null)
                    x.set(0.5)
                    y.set(0.5)
                  }}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  whileHover={{ y: isHovered ? -8 : -2 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative h-full w-full">
                    <div 
                      className="absolute inset-0"
                      style={{
                        background: `
                          linear-gradient(145deg, 
                            rgba(250, 250, 250, 0.8) 0%, 
                            rgba(240, 240, 240, 0.4) 50%, 
                            rgba(235, 235, 235, 0.6) 100%
                          )
                        `
                      }}
                    >
                      <div className="absolute inset-0 opacity-5">
                        <div 
                          className="w-full h-full" 
                          style={{
                            backgroundImage: `radial-gradient(circle at 25% 25%, #EB1B26 1px, transparent 1px)`,
                            backgroundSize: '24px 24px'
                          }}
                        />
                      </div>
                    </div>

                    <motion.div
                      className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 backdrop-blur-md rounded-full flex items-center justify-center text-lg sm:text-xl lg:text-2xl border"
                      style={{
                        background: 'rgba(255, 255, 255, 0.4)',
                        borderColor: 'rgba(255, 255, 255, 0.6)',
                        translateZ: isHovered ? 20 : 0,
                      }}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {service.icon}
                    </motion.div>

                    <div
                      className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 lg:p-6"
                      style={{
                        transform: isHovered ? 'translateZ(15px)' : 'translateZ(0px)',
                      }}
                    >
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                      >
                        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold mb-1 sm:mb-2 text-[#111111]">
                          {service.title}
                        </h3>
                        <motion.p
                          className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{
                            height: isHovered ? "auto" : "clamp(2rem, 4vw, 3rem)",
                            opacity: 1,
                          }}
                          transition={{ duration: 0.3 }}
                          style={{ overflow: 'hidden' }}
                        >
                          {service.description}
                        </motion.p>

                        <motion.div
                          className="mt-2 sm:mt-3 flex items-center text-[#EB1B26] text-xs sm:text-sm font-medium"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{
                            opacity: isHovered ? 1 : 0,
                            x: isHovered ? 0 : -10,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          Learn more →
                        </motion.div>
                      </motion.div>
                    </div>

                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                      style={{
                        background: `
                          linear-gradient(145deg, 
                            rgba(235, 27, 38, 0.05) 0%, 
                            transparent 50%, 
                            rgba(235, 27, 38, 0.03) 100%
                          )
                        `,
                        boxShadow: isHovered ? "inset 0 0 20px rgba(235, 27, 38, 0.1)" : "none",
                      }}
                    />
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Desktop navigation dots (only 3) */}
          <motion.div
            className="flex justify-end gap-3 sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-4 h-4 sm:w-5 sm:h-5 rounded-full shadow-lg cursor-pointer"
                style={{
                  backgroundColor: i === 0 ? '#EB1B26' : i === 1 ? '#FFFFFF' : '#969696',
                  border: i === 1 ? '2px solid #DDD' : 'none'
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </motion.div>
        </div>
      )}

      {/* Mobile/Tablet View */}
      {isMobile && (
        <div className="relative h-screen w-full overflow-hidden">
          {/* Header positioned at bottom left */}
          <div className="absolute bottom-4 left-4 z-20">
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <span className="text-[#EB1B26]">/</span>
              <span className="text-[#111111] ml-2">OUR SERV</span>
              <span className="text-[#EB1B26]">I</span>
              <span className="text-[#111111]">CES</span>
            </motion.h2>
          </div>

          {/* Mobile card container */}
          <div className="h-full w-full flex items-center justify-center p-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={services[activeIndex].id}
                className="relative w-full max-w-md h-3/4"
                style={{
                  perspective: '1000px',
                  transformStyle: 'preserve-3d'
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  rotateX: rotateX,
                  rotateY: rotateY,
                }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Mobile card */}
                <div
                  className="relative h-full w-full rounded-2xl overflow-hidden shadow-xl"
                  style={{
                    background: `
                      linear-gradient(145deg, 
                        rgba(255, 255, 255, 0.9) 0%, 
                        rgba(250, 250, 250, 0.8) 50%,
                        rgba(245, 245, 245, 0.9) 100%
                      )
                    `,
                    border: '2px solid rgba(255, 255, 255, 0.4)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  }}
                >
                  <div className="absolute inset-0 opacity-5">
                    <div 
                      className="w-full h-full" 
                      style={{
                        backgroundImage: `radial-gradient(circle at 25% 25%, #EB1B26 2px, transparent 2px)`,
                        backgroundSize: '32px 32px'
                      }}
                    />
                  </div>

                  <div className="relative h-full flex flex-col justify-center items-center p-6">
                    <motion.div
                      className="text-8xl mb-6 select-none"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      {services[activeIndex].icon}
                    </motion.div>
                    
                    <motion.h3 
                      className="text-2xl sm:text-3xl font-bold text-center mb-3 text-[#111111]"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      {services[activeIndex].title}
                    </motion.h3>
                    
                    <motion.p
                      className="text-base sm:text-lg text-gray-700 text-center leading-relaxed mb-4"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                      {services[activeIndex].description}
                    </motion.p>
                    
                    <motion.div
                      className="flex items-center text-[#EB1B26] text-sm font-medium"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      Learn more →
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile navigation dots (6 circles with red/white/gray pattern) */}
          <div className="absolute bottom-4 right-4 z-20 flex gap-2">
            {services.map((_, index) => (
              <motion.div
                key={index}
                className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-200 ${
                  index === activeIndex ? 'opacity-100 scale-125' : 'opacity-60'
                } ${
                  index % 3 === 0 ? 'bg-[#EB1B26]' : 
                  index % 3 === 1 ? 'bg-white border border-gray-200' : 
                  'bg-[#969696]'
                }`}
                onClick={() => handleDotClick(index)}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
