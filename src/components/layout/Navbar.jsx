'use client'

import Logo from '@/components/common/Logo';
import { contactInfo, menuData, navLinks } from '@/data/navbar';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link'; // Import Link from Next.js
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [dropdownPosition, setDropdownPosition] = useState({ left: 0, top: 0 })
  const [mobileExpandedItems, setMobileExpandedItems] = useState({})
  const navRef = useRef(null)
  const containerRef = useRef(null)
  const dropdownRef = useRef(null)
  const idle = useRef(null)
  const scrollRefs = useRef({})
  const linkRefs = useRef({})

  const calculateDropdownPosition = () => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect()
      const dropdownWidth = 1000
      
      const containerCenter = containerRect.left + (containerRect.width / 2)
      let left = containerCenter - (dropdownWidth / 2)
      
      const minLeft = 20
      const maxLeft = window.innerWidth - dropdownWidth - 20
      left = Math.max(minLeft, Math.min(left, maxLeft))
      
      setDropdownPosition({
        left: left,
        top: containerRect.bottom + 8
      })
    }
  }

  useLayoutEffect(() => {
    if (activeDropdown) {
      calculateDropdownPosition()
    }
  }, [activeDropdown])

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
    const toggle = () => {
    setOpen(prev => !prev)
    if (open) {
      setMobileExpandedItems({}) // Reset expanded items when closing menu
    }
  }

  const toggleMobileSubmenu = (item) => {
    setMobileExpandedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }))
  }

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
          <span className={`h-0.5 w-full bg-white transition-all duration-300 ${open ? 'translate-y-[11px] rotate-45' : ''}`} />
          <span className={`h-0.5 w-full bg-white transition-opacity duration-300 ${open ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`h-0.5 w-full bg-white transition-all duration-300 ${open ? '-translate-y-[11px] -rotate-45' : ''}`} />
        </button>

        <Logo
          width={130}
          height={32}
          className="h-8 w-auto"
          priority
          isLink={true}
          href="/"
        />
      </header>

      {/* MOBILE BACKDROP MENU with expandable sublinks */}
      <AnimatePresence>
        {open && (
          <motion.nav
            key="mobileMenu"
            variants={backdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 flex flex-col items-center justify-start pt-20 px-6 bg-black/90 backdrop-blur-lg overflow-y-auto"
          >
            <div className="flex flex-col items-center space-y-4 w-full max-w-sm">
              {navLinks.map((item) => {
                const hasSubmenu = menuData[item] && menuData[item].length > 0;
                const isExpanded = mobileExpandedItems[item];
                
                return (
                  <div key={item} className="w-full">
                    <div className="flex items-center justify-between w-full">
                      {hasSubmenu ? (
                        <button
                          onClick={() => toggleMobileSubmenu(item)}
                          className="flex-1 text-left text-2xl font-light tracking-wide text-white hover:text-gray-200 transition-colors duration-200"
                        >
                          {item}
                        </button>
                      ) : (
                        <Link 
                          href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                          onClick={toggle}
                          className="flex-1 text-left text-2xl font-light tracking-wide text-white hover:text-gray-200 transition-colors duration-200"
                        >
                          {item}
                        </Link>
                      )}
                      
                      {hasSubmenu && (
                        <button
                          onClick={() => toggleMobileSubmenu(item)}
                          className="ml-3 p-1"
                          aria-label={`Toggle ${item} submenu`}
                        >
                          <svg
                            className={`w-5 h-5 text-white transition-transform duration-200 ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                    
                    {/* Submenu Items */}
                    {hasSubmenu && (
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 pt-3 space-y-2">
                              {menuData[item].map((subItem) => (
                                <Link
                                  key={subItem.id}
                                  href={subItem.href}
                                  onClick={toggle}
                                  className="block text-lg font-light text-gray-300 hover:text-white transition-colors duration-200 py-1"
                                >
                                  {subItem.title}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                );
              })}

              <div className="pt-6">
                <Link
                  href={contactInfo.href}
                  onClick={toggle}
                  className="rounded-sm bg-[#3D3D3D] px-9 py-3 text-lg text-white hover:bg-[#575757] transition-colors duration-200"
                >
                  {contactInfo.label}
                </Link>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* DESKTOP NAVIGATION - FIXED: Use Link instead of anchor */}
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
          <Logo
            width={160}
            height={36}
            className="h-9 w-auto flex-shrink-0"
            priority
            isLink={true}
            href="/"
          />

          <ul className="ml-8 flex items-center space-x-10">
            {navLinks.map((item) => (
              <li 
                key={item}
                onMouseEnter={() => handleMouseEnter(item)}
                className="relative"
              >
                <Link
                  ref={(el) => linkRefs.current[item] = el}
                  href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className="relative text-sm font-light tracking-wide text-white/85 hover:text-white transition-colors duration-200 group whitespace-nowrap"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href={contactInfo.href}
            className="ml-8 rounded-lg h-full bg-[#3D3D3D] px-7 py-2.5 text-sm font-light tracking-wide text-white hover:bg-[#575757] transition-colors duration-200 flex-shrink-0"
          >
            {contactInfo.label}
          </Link>
        </nav>
      </div>
      <AnimatePresence>
        {activeDropdown && menuData[activeDropdown] && (
          <motion.div
            key={`dropdown-${activeDropdown}`}
            ref={dropdownRef}
            variants={dropdown}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="hidden lg:block fixed z-30 rounded-xl p-2 shadow-2xl bg-[#1E1F1F]"
            style={{ 
              left: dropdownPosition.left,
              top: dropdownPosition.top,
              width: '1000px'
            }}
            onMouseEnter={() => {
              setActiveDropdown(activeDropdown)
              document.body.style.overflow = 'hidden'
            }}
            onMouseLeave={() => {
              handleMouseLeave()
              document.body.style.overflow = 'auto'
            }}
          >
            <div className="relative">
              <div
                ref={(el) => scrollRefs.current[activeDropdown] = el}
                className="flex gap-2 overflow-x-auto scrollbar-hide"
                style={{ 
                  scrollbarWidth: 'none', 
                  msOverflowStyle: 'none',
                  paddingLeft: '2px',
                  paddingRight: '2px',
                  paddingBottom: '2px',
                }}
                onWheel={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  const container = e.currentTarget
                  const scrollAmount = e.deltaY * 2
                  container.scrollLeft += scrollAmount
                }}
              >
                {menuData[activeDropdown].map((subItem) => (
                  <Link
                    key={subItem.id}
                    href={subItem.href}
                    className="flex-shrink-0 w-80 group cursor-pointer"
                  >
                    <div className="relative h-72 rounded-lg overflow-hidden bg-gray-800 transition-all duration-300 hover:scale-[1.006] hover:shadow-xl">
                      <div 
                        className="absolute inset-0 bg-cover bg-center bg-gray-600 transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundImage: `url(${subItem.image})` }}
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      <div className="absolute inset-0 p-6 flex flex-col justify-end">
                        <div className="flex items-end justify-between">
                          <div className="flex-1 mr-4">
                            <h3 className="text-white font-semibold text-sm mb-1 leading-tight">
                              {subItem.title}
                            </h3>
                            <p className="text-white/70 text-xs leading-tight">
                              {subItem.description}
                            </p>
                          </div>
                          
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
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
