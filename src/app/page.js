'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'

export default function Home() {
  const [currentVideo, setCurrentVideo] = useState(0)
  const [progress, setProgress] = useState(0)
  const videoRef = useRef(null)
  const progressIntervalRef = useRef(null)

  // Video data with placeholder URLs (replace with your actual video URLs)
  const videos = [
    {
      id: 1,
      src: '/videos/kitchen-1.mp4',
      poster: '/images/kitchen-poster-1.jpg'
    },
    {
      id: 2,
      src: '/videos/kitchen-2.mp4',
      poster: '/images/kitchen-poster-2.jpg'
    },
    {
      id: 3,
      src: '/videos/kitchen-3.mp4',
      poster: '/images/kitchen-poster-3.jpg'
    },
    {
      id: 4,
      src: '/videos/kitchen-4.mp4',
      poster: '/images/kitchen-poster-4.jpg'
    }
  ]

  // Update progress based on video time
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const updateProgress = () => {
      if (video.duration > 0) {
        const progressPercent = (video.currentTime / video.duration) * 100
        setProgress(progressPercent)
      }
    }

    const handleVideoEnd = () => {
      // Auto-advance to next video when current one ends
      setCurrentVideo((prev) => (prev + 1) % videos.length)
      setProgress(0)
    }

    video.addEventListener('timeupdate', updateProgress)
    video.addEventListener('ended', handleVideoEnd)

    return () => {
      video.removeEventListener('timeupdate', updateProgress)
      video.removeEventListener('ended', handleVideoEnd)
    }
  }, [currentVideo, videos.length])

  // Handle video switching
  const handleVideoSwitch = (index) => {
    if (index !== currentVideo) {
      setCurrentVideo(index)
      setProgress(0)
    }
  }

  // Handle video load
  const handleVideoLoad = () => {
    const video = videoRef.current
    if (video) {
      video.play().catch(console.error)
    }
  }

  return (
    <main className="relative overflow-hidden">
      <Navbar />
      
      {/* Video Background Container */}
      <div className="relative min-h-screen w-full">
        {/* Video Element */}
        <AnimatePresence mode="wait">
          <motion.video
            key={currentVideo}
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover z-0"
            autoPlay
            muted
            playsInline
            poster={videos[currentVideo].poster}
            onLoadedData={handleVideoLoad}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <source src={videos[currentVideo].src} type="video/mp4" />
            Your browser does not support the video tag.
          </motion.video>
        </AnimatePresence>

        {/* Video Overlay for Better Text Readability */}
        <div className="absolute inset-0 bg-black/30 z-10" />

        {/* Main Content Container */}
        <div className="relative z-20 min-h-screen flex flex-col justify-end px-8 lg:px-16 pb-20 lg:pb-12">
          
          {/* Top Content Row - Main heading and right content */}
          <div className="flex items-end justify-between mb-4">
            {/* Left Content - Main Heading */}
            <div className="max-w-3xl text-white">
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Lorem ipsum dolor
                <br />
                sit amet consectetur
                <br />
                adipiscing elit.
              </motion.h1>
            </div>

            {/* Right Content - Aligned with heading baseline */}
            <motion.div 
              className="hidden lg:block text-white/70 max-w-sm text-right self-end"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <p className="text-sm lg:text-base leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </motion.div>
          </div>

          {/* Responsive Horizontal Line */}
          <motion.div 
            className="w-[25vw] lg:w-[92vw] h-0.5 bg-white/40 mb-4"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.6 }}
          />

          {/* Bottom Content Row - Subtitle and video controls */}
          <div className="flex items-start justify-between mt-1.5">
            {/* Left Content - Subtitle below line */}
            <motion.div 
              className="text-white max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <p className="text-lg md:text-xl lg:text-2xl text-white/80 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipiscing elit.
              </p>
            </motion.div>

            {/* Right Content - Video Controls */}
            <div className="hidden lg:flex space-x-4">
              {videos.map((video, index) => (
                <motion.button
                  key={video.id}
                  onClick={() => handleVideoSwitch(index)}
                  className="relative w-16 h-2 bg-white/20 backdrop-blur-sm rounded-full overflow-hidden hover:bg-white/30 transition-colors duration-200"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Progress Fill */}
                  <motion.div
                    className="absolute left-0 top-0 h-full bg-white rounded-full"
                    style={{
                      width: index === currentVideo ? `${progress}%` : '0%'
                    }}
                    animate={{
                      width: index === currentVideo ? `${progress}%` : '0%'
                    }}
                    transition={{ duration: 0.1 }}
                  />

                  {/* Active State Indicator */}
                  {index === currentVideo && (
                    <motion.div
                      className="absolute inset-0 bg-white/50 rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}

                  {/* Button Label (Hidden by default, shown on hover) */}
                  <span className="sr-only">Play video {index + 1}</span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Mobile Video Controls - Horizontal layout at bottom center */}
          <div className="lg:hidden flex justify-center mt-6">
            <div className="flex space-x-3">
              {videos.map((video, index) => (
                <motion.button
                  key={video.id}
                  onClick={() => handleVideoSwitch(index)}
                  className="relative w-12 h-2 bg-white/20 backdrop-blur-sm rounded-full overflow-hidden"
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Progress Fill */}
                  <motion.div
                    className="absolute left-0 top-0 h-full bg-white rounded-full"
                    animate={{
                      width: index === currentVideo ? `${progress}%` : '0%'
                    }}
                    transition={{ duration: 0.1 }}
                  />

                  {/* Active State */}
                  {index === currentVideo && (
                    <motion.div
                      className="absolute inset-0 bg-white/50 rounded-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Sections (if needed) */}
      <section className="relative z-30 bg-white">
        {/* Your other page content goes here */}
      </section>
    </main>
  )
}
