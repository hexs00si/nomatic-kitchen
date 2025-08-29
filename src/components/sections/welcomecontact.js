'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

export default function WelcomeContact() {
  const containerRef = useRef(null)
  const textRefs = useRef([])
  const lenisRef = useRef(null)

  // Text sections with proper key props
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

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
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

    // GSAP scroll-triggered animations for text
    const ctx = gsap.context(() => {
      textRefs.current.forEach((textRef, index) => {
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

      // Background fade-out animation
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

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #383838 0%, #1F1E1E 100%)',
      }}
    >
      {/* Animated background lines - Fixed positioning to cover all sections */}
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
