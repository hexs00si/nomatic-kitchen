'use client'

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function FindShowroomSection() {
  const slashRef = useRef(null)

  // Showroom location details
  const showroomLocation = {
    address: "Plot No. 11, Sector 82, JLPL Industrial Area, Mohali, Punjab 140306",
    googleMapsUrl: "https://www.google.com/maps?um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KZ9f9p396w85MW6sfiIcCIlf&daddr=Plot+No.+11,+Sector+82,+JLPL+Industrial+Area,+Mohali,+Punjab+140306"
  }

  // Smooth continuous rotation for the slash
  useEffect(() => {
    if (slashRef.current) {
      const element = slashRef.current
      let rotation = 0
      
      const animate = () => {
        rotation += 1
        element.style.transform = `rotate(${rotation}deg)`
        requestAnimationFrame(animate)
      }
      
      animate()
    }
  }, [])

  const handleLocationClick = () => {
    window.open(showroomLocation.googleMapsUrl, '_blank')
  }

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 lg:p-8"
      style={{
        background: 'linear-gradient(135deg, #FFFFFF 0%, #E3E3E3 100%)'
      }}
    >
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-16 items-start min-h-[80vh]">
          
          {/* Left side - Content */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-12 flex flex-col justify-start order-1 lg:order-1">
            
            {/* Heading - Top Left */}
            <motion.h2 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-none font-sf-pro-expanded"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-[#EB1B26]">/</span>
              <span className="text-[#111111] ml-2">VISIT US</span>
            </motion.h2>

            {/* Address Content */}
            <motion.div 
              className="space-y-4 sm:space-y-6 mt-4 sm:mt-6 lg:mt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.div 
                className="space-y-3 sm:space-y-4 cursor-pointer group"
                onClick={handleLocationClick}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="space-y-1 sm:space-y-2">
                  <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-700 font-medium">
                    Plot No. 11, JLPL,
                  </p>
                  <p className="text-base sm:text-lg lg:text-xl xl:text-2xl text-gray-700 font-medium">
                    Industrial Park Sector 82,
                  </p>
                  <p className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold">
                    <span className="text-[#EB1B26]">Mohali, Punjab</span> 
                    <span className="text-gray-700"> - 140306.</span>
                  </p>
                </div>
                
                <p className="text-sm sm:text-base lg:text-lg text-gray-600 mt-4 sm:mt-6 font-light">
                  {showroomLocation.features}
                </p>

                {/* Hover indicator */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center space-x-2 text-[#EB1B26]">
                    <span className="text-xs sm:text-sm font-medium">Click to open in Maps</span>
                    <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Right side - Map and Buttons */}
          <div className="flex flex-col space-y-4 sm:space-y-6 order-2 lg:order-2 w-full">
            {/* Map */}
            <motion.div 
              className="relative h-[250px] sm:h-[300px] md:h-[400px] lg:h-[500px] rounded-xl lg:rounded-2xl overflow-hidden shadow-xl lg:shadow-2xl cursor-pointer group w-full"
              onClick={handleLocationClick}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Map container with embedded Google Maps */}
              <div className="absolute inset-0 bg-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3432.0304905272037!2d76.73476769999999!3d30.661269899999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390febfd9df65f9f%3A0x5f89081c227eac6e!2sNomatic%20Kitchens!5e0!3m2!1sen!2sin!4v1756900498720!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Showroom Location"
                />
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#EB1B26]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg">
                  <div className="flex items-center space-x-2 text-[#EB1B26]">
                    <span className="font-semibold text-sm sm:text-base">Open in Google Maps</span>
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </div>
                </div>
              </div>

              
            </motion.div>

            {/* Open Maps Button and Rotating Slash - Below Map (Mobile Responsive) */}
            <motion.div 
              className="flex items-center justify-start space-x-3 sm:space-x-4 lg:space-x-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {/* Rotating Slash - Separate Circle */}
              <div className="relative flex-shrink-0">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full border-2 border-gray-300 flex items-center justify-center bg-white shadow-md">
                  <div 
                    ref={slashRef}
                    className="text-[#EB1B26] font-bold text-lg sm:text-xl lg:text-2xl"
                  >
                    \
                  </div>
                </div>
              </div>

              {/* Open Maps Button - Responsive */}
              <motion.button
                onClick={handleLocationClick}
                className="group flex items-center justify-between bg-white border-2 border-gray-300 hover:border-[#EB1B26] px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300 min-w-0 flex-1 max-w-[280px] sm:max-w-none"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-gray-800 font-semibold text-sm sm:text-base lg:text-lg underline whitespace-nowrap">
                  Open Maps
                </span>
                
                {/* Long Arrow - Responsive */}
                <motion.div
                  className="flex items-center ml-2 sm:ml-4 flex-shrink-0"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="h-0.5 bg-[#EB1B26] w-8 sm:w-12 lg:w-16"></div>
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-[#EB1B26] -ml-1 sm:-ml-2" />
                </motion.div>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
