'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

export default function Navbar() {
  const navRef = useRef(null)
  const idleTimerRef = useRef(null)

  /* ─────────────────────────  idle-hide logic  ───────────────────────── */
  useEffect(() => {
    const reveal = () => {
      if (!navRef.current) return
      navRef.current.style.opacity = '1'
      navRef.current.style.transform = 'translateX(-50%) translateY(0)'
      clearTimeout(idleTimerRef.current)

      idleTimerRef.current = setTimeout(() => {
        navRef.current.style.opacity = '0'
        navRef.current.style.transform = 'translateX(-50%) translateY(-20px)'
      }, 3_000)
    }

    window.addEventListener('mousemove', reveal)
    window.addEventListener('scroll', reveal)
    reveal()

    return () => {
      window.removeEventListener('mousemove', reveal)
      window.removeEventListener('scroll', reveal)
      clearTimeout(idleTimerRef.current)
    }
  }, [])

  /* ──────────────────────────────  JSX  ─────────────────────────────── */
  return (
    <nav
      ref={navRef}
      className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 rounded-xl transition-all duration-500 ease-out flex items-center px-8 py-4"
      style={{ 
        backgroundColor: '#1E1F1F',
        minWidth: '1000px' // Ensure enough width
      }}
    >
      {/* Logo */}
      <Image
        src="/logo-nomatic.png"
        alt="Nomatic Kitchens & Wardrobes"
        width={160}
        height={36}
        className="h-9 w-auto flex-shrink-0"
        priority
      />

      {/* Navigation Links - Using flex-grow to center */}
      <div className="flex-grow flex justify-center items-center">
        <ul className="flex items-center space-x-10">
          {[
            'Home',
            'Wardrobe',
            'Modular Kitchen', // This will be handled with non-breaking space
            'Services',
            'Gallery',
            'About',
          ].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="relative text-sm font-light tracking-wide text-white/85 hover:text-white transition-colors duration-300 whitespace-nowrap"
              >
                {item.replace('Modular Kitchen', 'Modular\u00A0Kitchen')}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Contact Button - Now truly inside the same container */}
      <a
        href="#contact"
        className="rounded-full px-7 py-2.5 text-sm font-light tracking-wide text-white hover:bg-opacity-80 transition-all duration-300 ml-8"
        style={{ backgroundColor: '#3D3D3D' }}
      >
        Contact
      </a>
    </nav>
  )
}
