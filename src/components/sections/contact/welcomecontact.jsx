'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

export default function WelcomeContact() {
  const containerRef = useRef(null)
  const textRefs = useRef([])
  const lenisRef = useRef(null)
  const cursorImageRef = useRef(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  // Array of images for cursor follow effect
  const cursorImages = [
    '/images/Cursor1.jpg',
    '/images/Cursor2.jpg',
    '/images/Cursor3.jpg',
    '/images/Cursor4.jpg',
  ]

  // Text sections
  const textSections = [
    <span key="welcome">WELCOME TO</span>,
    <span key="studio">
      OUR EXPERIENCE STUD<span className="text-[#EB1B26]">I</span>O
    </span>,
    <span key="craft">
      WHERE WE CR<span className="text-[#EB1B26]">A</span>FT WHAT DEFINES YOU
    </span>,
    <span key="vision">
      WHERE WE BRING YOUR V<span className="text-[#EB1B26]">I</span>SION TO LIFE
    </span>
  ]

  // Lenis and GSAP animations
  useEffect(() => {
    // Initialize Lenis
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    })

    function raf(time) {
      lenisRef.current?.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // GSAP text animations
    const ctx = gsap.context(() => {
      textRefs.current.forEach((textRef) => {
        if (!textRef) return

        gsap.set(textRef, {
          opacity: 0,
          y: 100,
          scale: 0.8,
        })

        ScrollTrigger.create({
          trigger: textRef,
          start: "top 80%",
          end: "bottom 20%",
          onEnter: () => {
            gsap.to(textRef, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.2,
              ease: "power3.out",
            })
          },
          onLeave: () => {
            gsap.to(textRef, {
              opacity: 0,
              y: -100,
              scale: 0.8,
              duration: 0.8,
              ease: "power3.in",
            })
          },
          onEnterBack: () => {
            gsap.to(textRef, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.2,
              ease: "power3.out",
            })
          },
          onLeaveBack: () => {
            gsap.to(textRef, {
              opacity: 0,
              y: 100,
              scale: 0.8,
              duration: 0.8,
              ease: "power3.in",
            })
          },
        })
      })

      // Background fade-out
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "bottom bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          gsap.to(containerRef.current, {
            opacity: 1 - self.progress,
            duration: 0.1,
          })
        }
      })
    }, containerRef)

    return () => {
      ctx.revert()
      lenisRef.current?.destroy()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  // Mouse tracking - completely separate from GSAP
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      
      // Change image randomly
      if (Math.random() > 0.95) {
        const newIndex = Math.floor(Math.random() * cursorImages.length)
        setCurrentImageIndex(newIndex)
      }
    }

    const handleMouseEnter = () => {
      setIsHovered(true)
      if (containerRef.current) {
        containerRef.current.style.cursor = 'none'
      }
    }

    const handleMouseLeave = () => {
      setIsHovered(false)
      if (containerRef.current) {
        containerRef.current.style.cursor = 'auto'
      }
    }

    // Add event listeners to the container
    const container = containerRef.current
    if (container) {
      container.addEventListener('mouseenter', handleMouseEnter)
      container.addEventListener('mouseleave', handleMouseLeave)
      // Use document for mousemove to track across entire container
      document.addEventListener('mousemove', handleGlobalMouseMove)
    }

    return () => {
      if (container) {
        container.removeEventListener('mouseenter', handleMouseEnter)
        container.removeEventListener('mouseleave', handleMouseLeave)
      }
      document.removeEventListener('mousemove', handleGlobalMouseMove)
    }
  }, [cursorImages.length])

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #383838 0%, #1F1E1E 100%)',
      }}
    >
      {/* Cursor following image - Using position state instead of GSAP */}
      <div
        className="fixed pointer-events-none z-50 w-32 h-32 sm:w-40 sm:h-40 rounded-lg border-2 border-[#EB1B26] shadow-2xl overflow-hidden transition-opacity duration-300"
        style={{
          left: mousePosition.x - 64, // Half of w-32 (128px/2)
          top: mousePosition.y - 64,  // Half of h-32 (128px/2)
          opacity: isHovered ? 1 : 0,
          transform: 'translate3d(0, 0, 0)',
          mixBlendMode: 'screen'
        }}
      >
        <Image
          src={cursorImages[currentImageIndex]}
          alt="Interior design showcase"
          fill
          sizes="(max-width: 640px) 128px, 160px"
          className="object-cover"
          priority
        />
      </div>

      {/* Animated background lines */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Vertical lines */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`vertical-${i}`}
            className="absolute animate-line-vertical"
            style={{
              left: `${10 + i * 12}%`,
              top: '-10px',
              width: '1px',
              height: '100vh',
              background: 'linear-gradient(to bottom, transparent, rgba(235, 27, 38, 0.3), rgba(235, 27, 38, 0.1), transparent)',
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}

        {/* Horizontal lines */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`horizontal-${i}`}
            className="absolute animate-line-horizontal"
            style={{
              top: `${15 + i * 15}%`,
              left: '-10px',
              height: '1px',
              width: '100vw',
              background: 'linear-gradient(to right, transparent, rgba(235, 27, 38, 0.3), rgba(235, 27, 38, 0.1), transparent)',
              animationDelay: `${i * 0.8}s`,
            }}
          />
        ))}
      </div>

      {textSections.map((textContent, index) => (
        <section
          key={index}
          className="flex items-center justify-center min-h-screen w-full relative px-4 sm:px-6 lg:px-8 z-10"
        >
          <div
            ref={(el) => (textRefs.current[index] = el)}
            className="text-center max-w-6xl mx-auto"
          >
            {index === 1 ? (
              <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold font-sf-pro-expanded leading-tight text-white">
                {textContent}
              </h1>
            ) : (
              <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-sf-pro-expanded text-white leading-tight tracking-wide">
                {textContent}
              </h1>
            )}
            
            <div className="mt-6 sm:mt-8 mx-auto w-20 sm:w-24 h-1 bg-gradient-to-r from-transparent via-[#EB1B26] to-transparent opacity-60" />
          </div>
        </section>
      ))}
      
      <div className="h-5 sm:h-5" />

      {/* CSS animations */}
      <style jsx>{`
        @keyframes line-vertical {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          50% {
            opacity: 0.8;
          }
          100% {
            opacity: 0;
            transform: translateY(20px);
          }
        }

        @keyframes line-horizontal {
          0% {
            opacity: 0;
            transform: translateX(-20px);
          }
          50% {
            opacity: 0.8;
          }
          100% {
            opacity: 0;
            transform: translateX(20px);
          }
        }

        .animate-line-vertical {
          animation: line-vertical 4s ease-in-out infinite;
        }

        .animate-line-horizontal {
          animation: line-horizontal 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
