'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'

export default function Home() {
  const [currentVideo, setCurrentVideo] = useState(0)
  const [progress, setProgress] = useState(0)
  const videoRef = useRef(null)

  // Video data with placeholder URLs
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

  // Auto-advance to next video
  const goToNextVideo = () => {
    const nextIndex = (currentVideo + 1) % videos.length
    console.log(`Switching from video ${currentVideo + 1} to video ${nextIndex + 1}`)
    setCurrentVideo(nextIndex)
    setProgress(0)
  }

  // Handle manual video switch
  const handleVideoSwitch = (index) => {
    if (index !== currentVideo) {
      console.log(`Manual switch to video ${index + 1}`)
      setCurrentVideo(index)
      setProgress(0)
    }
  }

  // Main effect for video management - runs whenever currentVideo changes
  useEffect(() => {
    const video = videoRef.current
    if (!video) {
      console.log('No video element found')
      return
    }

    console.log(`Setting up video ${currentVideo + 1}`)
    
    // Set the video source
    video.src = videos[currentVideo].src
    video.poster = videos[currentVideo].poster
    
    // Reset states
    setProgress(0)

    // Event handlers
    const handleLoadedData = () => {
      console.log(`Video ${currentVideo + 1} loaded, duration: ${video.duration}s`)
      video.play().catch(error => {
        console.error('Play failed:', error)
      })
    }

    const handleTimeUpdate = () => {
      if (video.duration > 0) {
        const progressPercent = (video.currentTime / video.duration) * 100
        setProgress(progressPercent)
      }
    }

    const handleEnded = () => {
      console.log(`Video ${currentVideo + 1} ended - advancing to next`)
      setProgress(100)
      // Small delay before switching
      setTimeout(() => {
        goToNextVideo()
      }, 200)
    }

    const handlePlay = () => {
      console.log(`Video ${currentVideo + 1} started playing`)
    }

    const handleError = (e) => {
      console.error(`Video ${currentVideo + 1} error:`, e.target.error)
      // Auto-advance on error
      setTimeout(() => {
        goToNextVideo()
      }, 1000)
    }

    // Add event listeners
    video.addEventListener('loadeddata', handleLoadedData)
    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('ended', handleEnded)
    video.addEventListener('play', handlePlay)
    video.addEventListener('error', handleError)

    // Load the video
    video.load()

    // Cleanup function
    return () => {
      console.log(`Cleaning up video ${currentVideo + 1}`)
      video.removeEventListener('loadeddata', handleLoadedData)
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('error', handleError)
    }
  }, [currentVideo]) // Only depend on currentVideo

  return (
    <main className="relative overflow-hidden">
      <Navbar />
      
      {/* Video Background Container */}
      <div className="relative min-h-screen w-full">
        {/* Single Video Element - NO AnimatePresence */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          playsInline
          preload="auto"
        >
          Your browser does not support the video tag.
        </video>

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
                <button
                  key={video.id}
                  onClick={() => handleVideoSwitch(index)}
                  className="relative w-16 h-2 bg-white/20 backdrop-blur-sm rounded-full overflow-hidden hover:bg-white/30 transition-all duration-200 hover:scale-105"
                >
                  {/* Progress Fill */}
                  <div
                    className="absolute left-0 top-0 h-full bg-white rounded-full transition-all duration-100 ease-linear"
                    style={{
                      width: index === currentVideo ? `${progress}%` : '0%'
                    }}
                  />

                  {/* Active State Indicator */}
                  {index === currentVideo && (
                    <div className="absolute inset-0 bg-white/30 rounded-full" />
                  )}

                  {/* Button Label */}
                  <span className="sr-only">Play video {index + 1}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Video Controls */}
          <div className="lg:hidden flex justify-center mt-6">
            <div className="flex space-x-3">
              {videos.map((video, index) => (
                <button
                  key={video.id}
                  onClick={() => handleVideoSwitch(index)}
                  className="relative w-12 h-2 bg-white/20 backdrop-blur-sm rounded-full overflow-hidden transition-transform duration-200 active:scale-95"
                >
                  {/* Progress Fill */}
                  <div
                    className="absolute left-0 top-0 h-full bg-white rounded-full transition-all duration-100 ease-linear"
                    style={{
                      width: index === currentVideo ? `${progress}%` : '0%'
                    }}
                  />

                  {/* Active State */}
                  {index === currentVideo && (
                    <div className="absolute inset-0 bg-white/30 rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Debug Info - Development only */}
          {process.env.NODE_ENV === 'development' && (
            <div className="fixed top-20 right-4 bg-black/90 text-white p-4 rounded-lg text-sm font-mono backdrop-blur">
              <div className="space-y-1">
                <div>Current Video: {currentVideo + 1}/{videos.length}</div>
                <div>Progress: {Math.round(progress)}%</div>
                <div>Source: {videos[currentVideo].src.split('/').pop()}</div>
                <div className="mt-2 text-xs text-gray-300">
                  Auto-loop: {currentVideo + 1} → {((currentVideo + 1) % videos.length) + 1}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Additional Sections */}
      <section className="relative z-30 bg-white">
        {/* Your other page content goes here */}
      </section>
    </main>
  )
}
