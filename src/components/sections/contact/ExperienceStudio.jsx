'use client'

import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText)

export default function ExperienceStudio() {
  const containerRef = useRef(null)
  const textRef = useRef(null)
  const [twinklingDots, setTwinklingDots] = useState([]);
  
  const studioText = "Step into our Experience Studio and discover interiors that truly define you. Whether you're designing a modular kitchen, a tailored wardrobe, or a media wall, we’re here to bring your vision to life."
  const highlightWord = "Experience Studio";

  useEffect(() => {
    // Generate random dot properties on the client side
    const dots = [...Array(20)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 3 + 2}s`,
      animationDelay: `${Math.random() * 2}s`,
    }));
    setTwinklingDots(dots);

    // Ensure the text element exists before proceeding with GSAP
    if (!textRef.current) return;

    // Use GSAP Context for proper cleanup
    const ctx = gsap.context(() => {
      // Create a SplitText instance
      const splitText = new SplitText(textRef.current, { type: 'chars' });
      const chars = splitText.chars;

      // Set initial colors
      gsap.set(chars, { color: '#969696' });

      // Create the GSAP timeline with ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
        },
      });

      // Animate the color of each character on scroll
      tl.to(chars, {
        color: (i) => {
          const text = textRef.current.textContent;
          const highlightStartIndex = text.indexOf(highlightWord);
          const highlightEndIndex = highlightStartIndex + highlightWord.length;

          // Check if the current character is part of the highlight word
          if (i >= highlightStartIndex && i < highlightEndIndex) {
            return '#EB1B26';
          }
          return '#FFFFFF';
        },
        stagger: 0.005,
        ease: 'none',
      });
      
    }, containerRef);

    // Cleanup function
    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center py-16 px-4 md:px-8 overflow-hidden min-h-screen"
      style={{
        background: 'linear-gradient(135deg, #383838 0%, #1F1E1E 100%)',
      }}
    >
      {/* Background Dotted Grid */}
      <div className="absolute inset-0 z-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle, #EB1B26 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}/>
      {/* Twinkling dots animation (client side) */}
      {twinklingDots.map((dot, i) => (
        <div key={i} className="absolute w-1 h-1 rounded-full bg-[#EB1B26] z-0" style={{
          top: dot.top,
          left: dot.left,
          animation: `twinkle ${dot.animationDuration} ease-in-out infinite alternate`,
          animationDelay: dot.animationDelay,
        }}/>
      ))}

      <div className="relative z-10 max-w-4xl text-center">
        <p 
          ref={textRef} 
          className="text-2xl sm:text-3xl md:text-4xl leading-relaxed font-normal"
        >
          {studioText}
        </p>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0; transform: scale(0.5); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}