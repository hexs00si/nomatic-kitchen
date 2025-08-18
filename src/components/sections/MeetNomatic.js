'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'

export default function MeetNomatic() {
  // Core state
  const [sectionProgress, setSectionProgress] = useState(0)
  const [currentParagraph, setCurrentParagraph] = useState(0)
  const [charProgress, setCharProgress] = useState(0)
  const [isScrollLocked, setIsScrollLocked] = useState(false)
  const [scrollDirection, setScrollDirection] = useState('down')
  
  // Refs
  const sectionRef = useRef(null)
  const lastScrollY = useRef(0)
  const scrollAccumulator = useRef(0)
  const isLockingRef = useRef(false)
  const animationFrame = useRef(null)
  const updateTimeoutRef = useRef(null)

  // Content data
  const contentData = [
    {
      id: 1,
      text: "For over 15 years, Nomatic has been crafting exceptional modular kitchens, custom furniture, and complete interiors. We transform spaces with precision-engineered designs that blend function and timeless style.",
      image: '/images/kitchen-interior-1.jpg'
    },
    {
      id: 2,
      text: "Our expert team works closely with homeowners, architects, and developers to deliver bespoke solutions. From concept to installation, we manage every detail with skill and care.",
      image: '/images/kitchen-interior-2.jpg'
    },
    {
      id: 3,
      text: "We excel in kitchens, wardrobes, custom furniture, bathrooms, wall panelling, and full-scale interiors—each tailored to your vision.",
      image: '/images/kitchen-interior-3.jpg'
    },
    {
      id: 4,
      text: "Discover our expertise and visit our showroom to experience Nomatic quality firsthand. Let us transform your space into something extraordinary.",
      image: '/images/kitchen-interior-4.jpg'
    }
  ]

  // FIXED: Calculate character positions as static refs to prevent recalculation
  const paragraphLengths = useRef(contentData.map(p => p.text.length)).current
  const cumulativeLengths = useRef(paragraphLengths.reduce((acc, len, i) => {
    acc[i] = (acc[i - 1] || 0) + len
    return acc
  }, [])).current
  const totalChars = useRef(cumulativeLengths[cumulativeLengths.length - 1]).current

  // Viewport detection
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current
      if (!section) return

      const rect = section.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const currentScrollY = window.scrollY
      
      const direction = currentScrollY > lastScrollY.current ? 'down' : 'up'
      setScrollDirection(direction)
      lastScrollY.current = currentScrollY
      
      const isFullyVisible = rect.top <= 50 && rect.bottom >= windowHeight - 50
      
      if (isFullyVisible && !isLockingRef.current) {
        console.log(`🔒 LOCKING - Direction: ${direction}`)
        isLockingRef.current = true
        setIsScrollLocked(true)
        
        if (direction === 'down' && scrollAccumulator.current === 0) {
          scrollAccumulator.current = 0
        } else if (direction === 'up' && scrollAccumulator.current >= totalChars - 10) {
          scrollAccumulator.current = totalChars - 1
        }
        
      } else if (!isFullyVisible && isLockingRef.current) {
        console.log('🔓 UNLOCKING')
        isLockingRef.current = false
        setIsScrollLocked(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current)
      }
    }
  }, [totalChars])

  // FIXED: Smooth character animation restored with immediate paragraph updates
  useEffect(() => {
    // Find which paragraph this progress belongs to
    let paragraphIndex = 0
    let localCharIndex = sectionProgress
    
    for (let i = 0; i < cumulativeLengths.length; i++) {
      if (sectionProgress <= cumulativeLengths[i]) {
        paragraphIndex = i
        localCharIndex = sectionProgress - (cumulativeLengths[i - 1] || 0)
        break
      }
    }
    
    paragraphIndex = Math.max(0, Math.min(paragraphIndex, contentData.length - 1))
    localCharIndex = Math.max(0, Math.min(localCharIndex, paragraphLengths[paragraphIndex]))
    
    // IMMEDIATELY update paragraph for instant transitions
    setCurrentParagraph(paragraphIndex)
    
    // SMOOTHLY animate character progress for fluid sync
    if (animationFrame.current) cancelAnimationFrame(animationFrame.current)
    
    const animate = () => {
      setCharProgress(prev => {
        const diff = localCharIndex - prev
        if (Math.abs(diff) < 0.1) return localCharIndex
        
        // Much faster, more responsive animation
        const next = prev + (diff * 0.8) // Increased from 0.15 to 0.8 for faster response
        if (Math.abs(localCharIndex - next) > 0.1) {
          animationFrame.current = requestAnimationFrame(animate)
        }
        return next
      })
    }
    
    animationFrame.current = requestAnimationFrame(animate)
    
    console.log(`📖 Sync: Para ${paragraphIndex + 1}, LocalChar: ${Math.floor(localCharIndex)}, SectionProgress: ${Math.floor(sectionProgress)}`)
  }, [sectionProgress]) // FIXED: Only depend on sectionProgress

  // FIXED: Character scrolling with minimal debouncing 
  useEffect(() => {
    if (!isScrollLocked) return

    let isUpdating = false
    
    const handleWheel = (e) => {
      if (isUpdating) return // Prevent overwhelming updates
      
      const delta = Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY) / 0.02, 400) // Increased speed by 200x
      const newProgress = scrollAccumulator.current + delta
      
      if (newProgress <= 0 && delta < 0) {
        console.log('⬆️ UNLOCKING UP - at start')
        scrollAccumulator.current = 0
        setSectionProgress(0)
        isLockingRef.current = false
        setIsScrollLocked(false)
        return
      }
      
      if (newProgress >= totalChars - 1 && delta > 0) {
        console.log('⬇️ UNLOCKING DOWN - at end')
        scrollAccumulator.current = totalChars - 1
        setSectionProgress(totalChars - 1)
        isLockingRef.current = false
        setIsScrollLocked(false)
        return
      }
      
      e.preventDefault()
      e.stopPropagation()
      
      scrollAccumulator.current = Math.max(0, Math.min(newProgress, totalChars - 1))
      
      // FIXED: Minimal throttling for smooth updates
      isUpdating = true
      requestAnimationFrame(() => {
        setSectionProgress(scrollAccumulator.current)
        isUpdating = false
      })
    }

    window.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      window.removeEventListener('wheel', handleWheel)
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current)
    }
  }, [isScrollLocked, totalChars])

  // Manual paragraph jump
  const jumpToParagraph = useCallback((index) => {
    const targetProgress = cumulativeLengths[index - 1] || 0
    scrollAccumulator.current = targetProgress
    setSectionProgress(targetProgress)
  }, [cumulativeLengths])

  // Text rendering with perfect bidirectional sync
  const renderText = useCallback((text, progress) => {
    return text.split('').map((char, i) => {
      const visible = Math.floor(progress)
      const partial = progress - visible
      
      let className = 'text-gray-400'
      let style = { opacity: 1 }
      
      if (i < visible) {
        className = 'text-white'
      } else if (i === visible && partial > 0) {
        className = partial > 0.3 ? 'text-white' : 'text-gray-400'
        style.opacity = 0.4 + (partial * 0.6)
        style.textShadow = '0 0 3px rgba(255,255,255,0.4)'
      }
      
      return (
        <span
          key={`${currentParagraph}-${i}`}
          className={`${className} transition-colors duration-100`}
          style={style}
        >
          {char}
        </span>
      )
    })
  }, [currentParagraph])

  // Progress calculation with perfect sync
  const getProgress = useCallback((index) => {
    const paragraphStart = cumulativeLengths[index - 1] || 0
    const paragraphEnd = cumulativeLengths[index]
    const paragraphLength = paragraphLengths[index]
    
    if (sectionProgress < paragraphStart) return 0
    if (sectionProgress >= paragraphEnd) return 100
    
    const progressInParagraph = sectionProgress - paragraphStart
    return Math.min(100, Math.max(0, (progressInParagraph / paragraphLength) * 100))
  }, [sectionProgress, cumulativeLengths, paragraphLengths])

  const currentText = contentData[currentParagraph]?.text || ''
  const isAtStart = sectionProgress <= 5
  const isAtEnd = sectionProgress >= totalChars - 5

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden"
      style={{ backgroundColor: '#1E1F1F' }}
    >
      {/* Debug Info */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 left-4 z-50 bg-black/90 text-white p-3 rounded text-xs font-mono space-y-1">
          <div>Locked: {isScrollLocked ? '🔒' : '🔓'}</div>
          <div>Direction: {scrollDirection === 'up' ? '⬆️' : '⬇️'}</div>
          <div>SectionProg: {Math.floor(sectionProgress)}/{totalChars}</div>
          <div>Para: {currentParagraph + 1}/{contentData.length}</div>
          <div>CharProg: {Math.floor(charProgress)}/{paragraphLengths[currentParagraph]}</div>
          <div>Progress%: {Math.round(getProgress(currentParagraph))}%</div>
        </div>
      )}

      {/* Lock Status */}
      {isScrollLocked && (
        <div className="fixed top-4 right-4 z-50 bg-[#EB1B26] text-white px-4 py-2 rounded-lg text-sm shadow-xl">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            <span>Reading Mode</span>
            <span>{scrollDirection === 'up' ? '⬆️' : '⬇️'}</span>
          </div>
          <div className="text-xs mt-1 opacity-90">
            {isAtStart ? "⬆️ Scroll up to exit" : 
             isAtEnd ? "⬇️ Scroll down to exit" : 
             `Reading ${scrollDirection === 'up' ? 'backwards' : 'forwards'}`}
          </div>
        </div>
      )}

      <div className="min-h-screen w-full px-4 sm:px-8 lg:px-16 py-12 lg:py-20">
        
        {/* Heading */}
        <div className="relative mb-12 lg:mb-16">
          <div className="relative z-10 flex items-center justify-start">
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-none font-sf-pro-expanded">
                <span className="text-[#EB1B26]">/</span>
                <span className="text-white ml-2">MEET NOM</span>
                <span className="text-[#EB1B26]">A</span>
                <span className="text-white">TIC</span>
              </h2>
              <div
                className="absolute right-0 top-1/2 transform -translate-y-1/2 h-px bg-[#EB1B26] w-[50vw] z-0 hidden sm:block"
                style={{ left: '100%', marginLeft: '2rem' }}
              />
            </motion.div>
          </div>
        </div>

        {/* Mobile-responsive content with progress buttons on left */}
        <div className="min-h-[60vh] lg:min-h-[50vh] flex lg:flex-row lg:gap-20">
          
          {/* Mobile: Progress buttons on left side of text */}
          <div className="lg:hidden flex items-center mr-4">
            <div className="flex flex-col space-y-3">
              {contentData.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => jumpToParagraph(index)}
                  className="relative w-1 h-8 bg-white/20 rounded-full overflow-hidden hover:bg-white/30 transition-all duration-200 active:scale-95"
                >
                  <div
                    className="absolute bottom-0 left-0 w-full bg-[#EB1B26] rounded-full transition-all duration-100"
                    style={{ height: `${getProgress(index)}%` }}
                  />
                  {index === currentParagraph && (
                    <div className="absolute inset-0 bg-[#EB1B26]/30 rounded-full animate-pulse" />
                  )}
                </button>
              ))}
            </div>
          </div>
          
          {/* Text Column - Centered vertically */}
          <div className="flex-1 flex items-center justify-center w-full">
            <div className="relative w-full max-w-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentParagraph}
                  className="w-full"
                  initial={{ opacity: 0, y: scrollDirection === 'up' ? -20 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: scrollDirection === 'up' ? 20 : -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-base sm:text-lg lg:text-xl xl:text-2xl leading-relaxed tracking-wide text-center lg:text-left">
                    {renderText(currentText, charProgress)}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop: Image Column with Vertical Progress Buttons */}
          <div className="hidden lg:flex flex-1 items-center justify-center relative">
            <div className="relative">
              {/* Image Container */}
              <motion.div
                className="relative aspect-[4/3] w-full max-w-lg rounded-lg overflow-hidden"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentParagraph}
                    className="w-full h-full"
                    initial={{ opacity: 0, scale: scrollDirection === 'up' ? 0.98 : 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: scrollDirection === 'up' ? 1.02 : 0.98 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="w-full h-full bg-gray-800 flex flex-col items-center justify-center">
                      <span className="text-gray-500 text-lg mb-2">Kitchen Interior {currentParagraph + 1}</span>
                      <div className="w-24 h-1 bg-gray-700 rounded-full overflow-hidden mb-2">
                        <div
                          className="h-full bg-[#EB1B26] transition-all duration-100 rounded-full"
                          style={{ width: `${getProgress(currentParagraph)}%` }}
                        />
                      </div>
                      <span className="text-gray-600 text-sm">
                        {Math.round(getProgress(currentParagraph))}% Complete
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        Overall: {Math.round((sectionProgress / totalChars) * 100)}%
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
                
                <div className="absolute top-4 right-4 w-1 h-16 bg-[#EB1B26]" />
                <div className="absolute bottom-4 left-4 h-1 w-16 bg-[#EB1B26]" />
              </motion.div>

              {/* Vertical Progress Buttons - Desktop */}
              <div className="absolute -right-16 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4">
                {contentData.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => jumpToParagraph(index)}
                    className="relative w-2 h-16 bg-white/20 rounded-full overflow-hidden hover:bg-white/30 transition-all duration-200 hover:scale-105 group"
                  >
                    <div
                      className="absolute bottom-0 left-0 w-full bg-[#EB1B26] rounded-full transition-all duration-100"
                      style={{ height: `${getProgress(index)}%` }}
                    />
                    {index === currentParagraph && (
                      <div className="absolute inset-0 bg-[#EB1B26]/30 rounded-full animate-pulse" />
                    )}
                    
                    {/* Tooltip */}
                    <div className="absolute left-full top-1/2 transform -translate-y-1/2 ml-3 px-3 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                      Paragraph {index + 1}
                    </div>
                  </button>
                ))}
              </div>

              {/* Vertical Progress Labels - Desktop */}
              <div className="absolute -right-24 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4">
                {contentData.map((item, index) => (
                  <div key={item.id} className="w-8 h-16 flex items-center justify-center">
                    <span
                      className={`text-xs font-medium transition-all duration-200 ${
                        index === currentParagraph
                          ? 'text-[#EB1B26] font-bold'
                          : getProgress(index) === 100
                          ? 'text-green-400'
                          : 'text-gray-500'
                      }`}
                    >
                      {getProgress(index) === 100 ? '✓' : `${Math.round(getProgress(index))}%`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Display - Mobile responsive */}
        {isScrollLocked && (
          <motion.div
            className="fixed bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-auto sm:max-w-md bg-black/80 text-white text-sm px-4 py-3 rounded-xl backdrop-blur border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 space-y-2 sm:space-y-0">
              <span className="text-xs sm:text-sm">Paragraph {currentParagraph + 1}/{contentData.length}</span>
              <div className="w-full sm:w-32 h-1 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#EB1B26] transition-all duration-100 rounded-full"
                  style={{ width: `${getProgress(currentParagraph)}%` }}
                />
              </div>
              <span className="text-xs font-mono">
                {Math.floor(charProgress)}/{paragraphLengths[currentParagraph]}
              </span>
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {isAtStart ? "⬆️ At start - scroll up to exit" : 
               isAtEnd ? "⬇️ At end - scroll down to exit" : 
               `Reading ${scrollDirection === 'up' ? 'backwards' : 'forwards'} - ${Math.round(getProgress(currentParagraph))}%`}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
