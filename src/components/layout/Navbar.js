'use client'

import { useEffect, useRef, useState, useLayoutEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [dropdownPosition, setDropdownPosition] = useState({ left: 0, top: 0 })
  const navRef = useRef(null)
  const containerRef = useRef(null)
  const dropdownRef = useRef(null)
  const idle = useRef(null)
  const scrollRefs = useRef({})
  const linkRefs = useRef({})

  /* -------------------------------------------------- dropdown data */
  const menuData = {
    'Wardrobe': [
      { id: 1, title: 'Classical Wardrobes', image: '/images/wardrobe-1.jpg', href: '/wardrobe/walk-in' },
      { id: 2, title: 'Modern Wardrobes', image: '/images/wardrobe-2.jpg', href: '/wardrobe/sliding' },
      { id: 3, title: 'Neo-Classical Wardrobes', image: '/images/wardrobe-3.jpg', href: '/wardrobe/hinged' },
    ],
    'Kitchen': [
      { id: 1, title: 'Modular Kitchen', image: '/images/kitchen-1.jpg', href: '/kitchen/modular' },
      { id: 2, title: 'L-Shaped Kitchen', image: '/images/kitchen-2.jpg', href: '/kitchen/l-shaped' },
      { id: 3, title: 'U-Shaped Kitchen', image: '/images/kitchen-3.jpg', href: '/kitchen/u-shaped' },
      { id: 4, title: 'Island Kitchen', image: '/images/kitchen-4.jpg', href: '/kitchen/island' },
    ],
    'Services': [
      { id: 1, title: '3D Design', image: '/images/service-1.jpg', href: '/services/3d-design' },
      { id: 2, title: 'Installation', image: '/images/service-2.jpg', href: '/services/installation' },
      { id: 3, title: 'Maintenance', image: '/images/service-3.jpg', href: '/services/maintenance' },
    ],
    'Gallery': [
      { id: 1, title: 'Recent Projects', image: '/images/gallery-1.jpg', href: '/gallery/recent' },
      { id: 2, title: 'Kitchen Gallery', image: '/images/gallery-2.jpg', href: '/gallery/kitchen' },
      { id: 3, title: 'Wardrobe Gallery', image: '/images/gallery-3.jpg', href: '/gallery/wardrobe' },
      { id: 4, title: 'Living Room', image: '/images/gallery-4.jpg', href: '/gallery/living' },
    ],
    'About': [
      { id: 1, title: 'Our Story', image: '/images/about-1.jpg', href: '/about/story' },
      { id: 2, title: 'Our Team', image: '/images/about-2.jpg', href: '/about/team' },
      { id: 3, title: 'Certifications', image: '/images/about-3.jpg', href: '/about/certifications' },
    ]
  }

  const links = ['Home', 'Wardrobe', 'Kitchen', 'Services', 'Gallery', 'About']

  /* -------------------------------------------------- calculate dropdown position centered to navbar */
  const calculateDropdownPosition = () => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect()
      const dropdownWidth = 1000 // Fixed dropdown width
      
      // Center dropdown relative to the entire navbar container
      const containerCenter = containerRect.left + (containerRect.width / 2)
      let left = containerCenter - (dropdownWidth / 2)
      
      // Ensure dropdown doesn't go off-screen
      const minLeft = 20
      const maxLeft = window.innerWidth - dropdownWidth - 20
      left = Math.max(minLeft, Math.min(left, maxLeft))
      
      setDropdownPosition({
        left: left,
        top: containerRect.bottom + 8 // 8px gap below navbar
      })
    }
  }

  /* -------------------------------------------------- update position when dropdown opens or window resizes */
  useLayoutEffect(() => {
    if (activeDropdown) {
      calculateDropdownPosition()
    }
  }, [activeDropdown])

  /* -------------------------------------------------- desktop idle-hide */
  useEffect(() => {
    const reveal = () => {
      if (window.innerWidth >= 1024 && containerRef.current) {
        containerRef.current.style.opacity = '1'
        containerRef.current.style.transform = 'translateX(-50%) translateY(0)'
        clearTimeout(idle.current)
        idle.current = setTimeout(() => {
          if (!activeDropdown) {
            containerRef.current.style.opacity = '0'
            containerRef.current.style.transform = 'translateX(-50%) translateY(-20px)'
          }
        }, 3_000)
      }
    }

    const handleResize = () => {
      if (activeDropdown) {
        calculateDropdownPosition()
      }
    }

    window.addEventListener('mousemove', reveal)
    window.addEventListener('scroll', reveal)
    window.addEventListener('resize', handleResize)
    reveal()

    return () => {
      window.removeEventListener('mousemove', reveal)
      window.removeEventListener('scroll', reveal)
      window.removeEventListener('resize', handleResize)
      clearTimeout(idle.current)
    }
  }, [activeDropdown])

  /* -------------------------------------------------- scroll functions */
  const scroll = (direction, menuKey) => {
    const container = scrollRefs.current[menuKey]
    if (container) {
      const scrollAmount = 280
      const newScrollLeft = direction === 'left' 
        ? container.scrollLeft - scrollAmount 
        : container.scrollLeft + scrollAmount
      
      container.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      })
    }
  }

  /* -------------------------------------------------- helpers */
  const toggle = () => setOpen((p) => !p)

  const handleMouseEnter = (item) => {
    if (menuData[item]) {
      setActiveDropdown(item)
    }
  }

  const handleMouseLeave = () => {
    setActiveDropdown(null)
  }

  /* -------------------------------------------------- motion variants */
  const backdrop = {
    hidden: { opacity: 0, scaleY: 0, originY: 0 },
    visible: { opacity: 1, scaleY: 1, transition: { duration: 0.4, ease: 'easeInOut' } },
    exit: { opacity: 0, scaleY: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
  }

  const dropdown = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.2, ease: 'easeOut' }
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      scale: 0.95,
      transition: { duration: 0.15, ease: 'easeIn' }
    }
  }

  /* -------------------------------------------------- jsx */
  return (
    <>
      {/* MOBILE / TABLET TOP BAR (≤ lg) */}
      <header className="fixed top-0 left-0 z-50 flex w-full items-center justify-center lg:hidden px-4 py-3 bg-[#1E1F1F]/80 backdrop-blur">
        <button
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          onClick={toggle}
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggle() }}
          className="absolute left-4 flex h-6 w-6 flex-col justify-between focus:outline-none focus:ring-2 focus:ring-white/50 rounded-sm"
        >
          <span className={`h-0.5 w-full bg-white transition-all duration-300 ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
          <span className={`h-0.5 w-full bg-white transition-opacity duration-300 ${open ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`h-0.5 w-full bg-white transition-all duration-300 ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
        </button>

        <Image
          src="/logo-nomatic.png"
          alt="Nomatic Kitchens & Wardrobes"
          width={130}
          height={32}
          className="h-8 w-auto"
          priority
        />
      </header>

      {/* BACKDROP MENU with animation */}
      <AnimatePresence>
        {open && (
          <motion.nav
            key="mobileMenu"
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 flex flex-col items-center justify-center space-y-7 bg-black/90 backdrop-blur-lg"
          >
            {links.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={toggle}
                className="text-2xl font-light tracking-wide text-white hover:text-gray-200 transition-colors duration-200"
              >
                {item}
              </a>
            ))}

            <a
              href="#contact"
              onClick={toggle}
              className="rounded-sm bg-[#3D3D3D] px-9 py-3 text-lg text-white hover:bg-[#575757] transition-colors duration-200"
            >
              Contact
            </a>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* DESKTOP NAVIGATION */}
      <div 
        ref={containerRef}
        className="hidden lg:flex-row lg:flex w-[57rem] lg:flex-wrap fixed top-6 left-1/2 z-40 transition-all duration-500 ease-out"
        style={{ transform: 'translateX(-50%)' }}
        onMouseLeave={handleMouseLeave}
      >
        <nav
          ref={navRef}
          className="flex items-center rounded-xl px-8 py-4 bg-[#1E1F1F]"
        >
          <Image
            src="/logo-nomatic.png"
            alt="Nomatic Kitchens & Wardrobes"
            width={160}
            height={36}
            className="h-9 w-auto flex-shrink-0"
            priority
          />

          <ul className="ml-8 flex items-center space-x-10">
            {links.map((item) => (
              <li 
                key={item}
                onMouseEnter={() => handleMouseEnter(item)}
                className="relative"
              >
                <a
                  ref={(el) => linkRefs.current[item] = el}
                  href={`#${item.toLowerCase()}`}
                  className="relative text-sm font-light tracking-wide text-white/85 hover:text-white transition-colors duration-200 group whitespace-nowrap"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="ml-8 rounded-lg h-full bg-[#3D3D3D] px-7 py-2.5 text-sm font-light tracking-wide text-white hover:bg-[#575757] transition-colors duration-200 flex-shrink-0"
          >
            Contact
          </a>
        </nav>
      </div>

      {/* DROPDOWN MEGA MENU - Fixed positioned centered to navbar */}
      <AnimatePresence>
        {activeDropdown && menuData[activeDropdown] && (
          <motion.div
            key={`dropdown-${activeDropdown}`}
            ref={dropdownRef}
            variants={dropdown}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="hidden lg:block fixed z-30 rounded-xl p-6 shadow-2xl bg-[#1E1F1F]"
            style={{ 
              left: dropdownPosition.left,
              top: dropdownPosition.top,
              width: '1000px'
            }}
            onMouseEnter={() => setActiveDropdown(activeDropdown)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative">
              {/* Left Arrow */}
              {menuData[activeDropdown].length > 3 && (
                <button
                  onClick={() => scroll('left', activeDropdown)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  aria-label="Scroll left"
                >
                  <ChevronLeftIcon className="w-5 h-5 text-white" />
                </button>
              )}

              {/* Scrollable Container */}
              <div
                ref={(el) => scrollRefs.current[activeDropdown] = el}
                className="flex gap-6 overflow-x-auto scrollbar-hide"
                style={{ 
                  scrollbarWidth: 'none', 
                  msOverflowStyle: 'none',
                  paddingLeft: menuData[activeDropdown].length > 3 ? '60px' : '20px',
                  paddingRight: menuData[activeDropdown].length > 3 ? '60px' : '20px',
                }}
              >
                {menuData[activeDropdown].map((subItem) => (
                  <a
                    key={subItem.id}
                    href={subItem.href}
                    className="flex-shrink-0 w-80 group cursor-pointer"
                  >
                    <div className="relative h-72 rounded-lg overflow-hidden bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                      {/* Background Image */}
                      <div 
                        className="absolute inset-0 bg-cover bg-center bg-gray-600 transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundImage: `url(${subItem.image})` }}
                      />
                      
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      {/* Content Container */}
                      <div className="absolute inset-0 p-6 flex flex-col justify-end">
                        <div className="flex items-end justify-between">
                          {/* Left Side - Title and Description */}
                          <div className="flex-1 mr-4">
                            <h3 className="text-white font-semibold text-sm mb-1 leading-tight">
                              {subItem.title}
                            </h3>
                            <p className="text-white/70 text-xs leading-tight">
                              Explore our premium {subItem.title.toLowerCase()} collection
                            </p>
                          </div>
                          
                          {/* Right Side - Action Button */}
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-200 p-4">
                              <svg 
                                className="w-8 h-8 text-white transition-transform duration-200 group-hover:scale-110" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Right Arrow */}
              {menuData[activeDropdown].length > 3 && (
                <button
                  onClick={() => scroll('right', activeDropdown)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  aria-label="Scroll right"
                >
                  <ChevronRightIcon className="w-5 h-5 text-white" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
