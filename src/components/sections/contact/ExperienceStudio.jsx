'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Character-by-character text component similar to LetterByLetterText
const CharByCharText = ({ text, progress, highlightWord, className = "" }) => {
  const [visibleCount, setVisibleCount] = useState(0)
  const totalChars = text.length

  useEffect(() => {
    const newVisibleCount = Math.round(progress * totalChars)
    setVisibleCount(Math.max(0, Math.min(newVisibleCount, totalChars)))
  }, [progress, totalChars])

  const renderText = () => {
    const chars = text.split('')

    if (highlightWord) {
      const highlightIndex = text.indexOf(highlightWord)
      const highlightEnd = highlightIndex + highlightWord.length

      return chars.map((char, index) => {
        const isVisible = index < visibleCount
        const isHighlightChar = index >= highlightIndex && index < highlightEnd

        return (
          <span
            key={index}
            className={`transition-colors duration-200 ease-out ${
              isVisible
                ? isHighlightChar
                  ? "text-[#EB1B26] font-bold"
                  : "text-white font-normal"
                : "text-[#969696] opacity-60"
            }`}
          >
            {char}
          </span>
        )
      })
    }

    return chars.map((char, index) => {
      const isVisible = index < visibleCount

      return (
        <span
          key={index}
          className={`transition-colors duration-200 ease-out ${
            isVisible ? "text-white font-normal" : "text-[#969696] opacity-60"
          }`}
        >
          {char}
        </span>
      )
    })
  }

  return (
    <p className={`text-2xl sm:text-3xl md:text-4xl leading-relaxed ${className}`}>
      {renderText()}
    </p>
  )
}

export default function ExperienceStudio() {
  const containerRef = useRef(null)
  const stickyRef = useRef(null)
  const [twinklingDots, setTwinklingDots] = useState([])
  const [textProgress, setTextProgress] = useState(0)
  const scrollTriggerRef = useRef(null)
  
  const studioText = "Step into our Experience Studio and discover interiors that truly define you. Whether you're designing a modular kitchen, a tailored wardrobe, or a media wall, we're here to bring your vision to life."
  const highlightWord = "Experience Studio"

  useEffect(() => {
    // Generate random dot properties on the client side
    const dots = [...Array(20)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 3 + 2}s`,
      animationDelay: `${Math.random() * 2}s`,
    }))
    setTwinklingDots(dots)

    const container = containerRef.current
    const sticky = stickyRef.current
    
    if (!container || !sticky) return

    // Create ScrollTrigger for pinned character animation
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1, // Smooth scrubbing
      pin: sticky, // Pin the sticky element
      pinSpacing: true, // Maintain spacing
      onUpdate: (self) => {
        // Update progress based on scroll position
        setTextProgress(self.progress)
      },
    })

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill()
      }
      ScrollTrigger.refresh()
    }
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div
        ref={stickyRef}
        className="h-screen flex flex-col items-center justify-center px-4 md:px-8 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #383838 0%, #1F1E1E 100%)',
        }}
      >
        {/* Background Dotted Grid */}
        <div 
          className="absolute inset-0 z-0 opacity-10" 
          style={{
            backgroundImage: 'radial-gradient(circle, #EB1B26 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        
        {/* Twinkling dots animation */}
        {twinklingDots.map((dot, i) => (
          <div 
            key={i} 
            className="absolute w-1 h-1 rounded-full bg-[#EB1B26] z-0" 
            style={{
              top: dot.top,
              left: dot.left,
              animation: `twinkle ${dot.animationDuration} ease-in-out infinite alternate`,
              animationDelay: dot.animationDelay,
            }}
          />
        ))}

        <div className="relative z-10 max-w-4xl text-center">
          <CharByCharText
            text={studioText}
            progress={textProgress}
            highlightWord={highlightWord}
          />
        </div>

        <style jsx>{`
          @keyframes twinkle {
            0%, 100% { opacity: 0; transform: scale(0.5); }
            50% { opacity: 1; transform: scale(1); }
          }
        `}</style>
      </div>
    </div>
  )
}