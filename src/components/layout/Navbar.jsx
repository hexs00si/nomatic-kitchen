"use client";

import Logo from "@/components/common/Logo";
import Button from "@/components/ui/Button";
import { contactInfo, menuData, navLinks } from "@/data/navbar";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ left: 0, top: 0, width: 1000 });
  const [mobileExpandedItems, setMobileExpandedItems] = useState({});
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [scrollDirection, setScrollDirection] = useState('up');
  const [showScrollButtons, setShowScrollButtons] = useState({});
  const [canScrollLeft, setCanScrollLeft] = useState({});
  const [canScrollRight, setCanScrollRight] = useState({});
  
  const navRef = useRef(null);
  const containerRef = useRef(null);
  const dropdownRef = useRef(null);
  const idle = useRef(null);
  const scrollRefs = useRef({});
  const linkRefs = useRef({});
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const calculateDropdownPosition = () => {
    if (containerRef.current && activeDropdown) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const itemCount = menuData[activeDropdown]?.length || 0;
      const viewportWidth = window.innerWidth;
      
      // Calculate responsive width based on screen size
      const itemWidth = 320;
      const gapWidth = 8;
      const padding = 25; // Reduced from 16 to 8 (4px on each side)
      
      // Determine how many items can fit on screen
      const maxWidth = viewportWidth - 20; // 20px margin on each side
      const maxItemsPerRow = Math.floor((maxWidth - padding) / (itemWidth + gapWidth));
      const visibleItems = Math.min(itemCount, maxItemsPerRow);
      
      // Calculate dropdown width
      let dropdownWidth;
      if (itemCount <= visibleItems) {
        // All items fit - calculate exact width
        dropdownWidth = itemCount * itemWidth + (itemCount - 1) * gapWidth + padding;
      } else {
        // Some items need scrolling - use available width
        dropdownWidth = visibleItems * itemWidth + (visibleItems - 1) * gapWidth + padding;
      }
      
      // Ensure minimum width and don't exceed screen
      dropdownWidth = Math.min(maxWidth, Math.max(360, dropdownWidth));

      const containerCenter = containerRect.left + containerRect.width / 2;
      let left = containerCenter - dropdownWidth / 2;

      const minLeft = 20;
      const maxLeft = viewportWidth - dropdownWidth -20;
      left = Math.max(minLeft, Math.min(left, maxLeft));

      setDropdownPosition({
        left: left,
        top: containerRect.bottom + 8,
        width: dropdownWidth
      });
    }
  };

  useLayoutEffect(() => {
    if (activeDropdown) {
      calculateDropdownPosition();
    }
  }, [activeDropdown]);

  // Enhanced scroll handler with better animation control
  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(updateNavbar);
        ticking.current = true;
      }
    };

    const updateNavbar = () => {
      if (window.innerWidth >= 1024 && containerRef.current) {
        const currentScrollY = window.scrollY;
        const scrollDifference = currentScrollY - lastScrollY.current;
        
        // Determine scroll direction with threshold to avoid jitter
        if (Math.abs(scrollDifference) > 5) {
          const newDirection = scrollDifference > 0 ? 'down' : 'up';
          if (newDirection !== scrollDirection) {
            setScrollDirection(newDirection);
          }
        }

        // Show/hide logic
        if (currentScrollY < 100) {
          // Always show at top of page
          showNavbar();
        } else if (scrollDirection === 'down' && currentScrollY > lastScrollY.current) {
          // Hide when scrolling down
          hideNavbar();
        } else if (scrollDirection === 'up' && currentScrollY < lastScrollY.current) {
          // Show when scrolling up
          showNavbar();
          startIdleTimer();
        }

        lastScrollY.current = currentScrollY;
      }
      ticking.current = false;
    };

    const showNavbar = () => {
      if (containerRef.current) {
        containerRef.current.style.opacity = "1";
        containerRef.current.style.transform = "translateX(-50%) translateY(0)";
        containerRef.current.style.pointerEvents = "auto";
        setIsNavVisible(true);
      }
      clearTimeout(idle.current);
    };

    const hideNavbar = () => {
      if (containerRef.current && !activeDropdown) {
        containerRef.current.style.opacity = "0";
        containerRef.current.style.transform = "translateX(-50%) translateY(-40px)";
        containerRef.current.style.pointerEvents = "none";
        setIsNavVisible(false);
      }
      clearTimeout(idle.current);
    };

    const startIdleTimer = () => {
      clearTimeout(idle.current);
      idle.current = setTimeout(() => {
        if (!activeDropdown && window.scrollY > 100) {
          hideNavbar();
        }
      }, 3000);
    };

    const handleMouseMove = (e) => {
      if (window.innerWidth >= 1024) {
        // Show navbar on mouse movement near top of screen
        if (e.clientY < 150) {
          showNavbar();
          startIdleTimer();
        }
      }
    };

    const handleResize = () => {
      if (activeDropdown) {
        calculateDropdownPosition();
      }
      // Reset navbar state on resize
      if (window.innerWidth >= 1024) {
        showNavbar();
      }
    };

    // Event listeners
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("resize", handleResize);

    // Initial setup
    if (window.innerWidth >= 1024) {
      showNavbar();
      startIdleTimer();
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      clearTimeout(idle.current);
    };
  }, [activeDropdown, scrollDirection]);

  // Handle dropdown state changes
  useEffect(() => {
    if (activeDropdown) {
      // Keep navbar visible when dropdown is active
      if (containerRef.current) {
        containerRef.current.style.opacity = "1";
        containerRef.current.style.transform = "translateX(-50%) translateY(0)";
        containerRef.current.style.pointerEvents = "auto";
      }
      clearTimeout(idle.current);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      // Restart idle timer when dropdown closes
      if (window.scrollY > 100 && window.innerWidth >= 1024) {
        idle.current = setTimeout(() => {
          if (containerRef.current && !activeDropdown) {
            containerRef.current.style.opacity = "0";
            containerRef.current.style.transform = "translateX(-50%) translateY(-40px)";
            containerRef.current.style.pointerEvents = "none";
          }
        }, 3000);
      }
    }
  }, [activeDropdown]);

  /* -------------------------------------------------- scroll functions */
  const checkScrollCapability = (menuKey) => {
    const container = scrollRefs.current[menuKey];
    if (container) {
      const canScrollLeftValue = container.scrollLeft > 0;
      const canScrollRightValue = container.scrollLeft < container.scrollWidth - container.clientWidth;
      
      setCanScrollLeft(prev => ({ ...prev, [menuKey]: canScrollLeftValue }));
      setCanScrollRight(prev => ({ ...prev, [menuKey]: canScrollRightValue }));
      
      // Show scroll buttons if there's content to scroll
      const hasScrollableContent = container.scrollWidth > container.clientWidth;
      setShowScrollButtons(prev => ({ ...prev, [menuKey]: hasScrollableContent }));
    }
  };

  const scroll = (direction, menuKey) => {
    const container = scrollRefs.current[menuKey];
    if (container) {
      const scrollAmount = 320; // Increased to match card width + gap
      const newScrollLeft =
        direction === "left"
          ? container.scrollLeft - scrollAmount
          : container.scrollLeft + scrollAmount;

      container.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
      
      // Update scroll button states after scrolling
      setTimeout(() => checkScrollCapability(menuKey), 300);
    }
  };

  /* -------------------------------------------------- helpers */
  const toggle = () => {
    setOpen((prev) => !prev);
    if (open) {
      setMobileExpandedItems({}); // Reset expanded items when closing menu
    }
  };

  const toggleMobileSubmenu = (item) => {
    setMobileExpandedItems((prev) => ({
      ...prev,
      [item]: !prev[item],
    }));
  };

  const handleMouseEnter = (item) => {
    if (menuData[item]) {
      setActiveDropdown(item);
      // Check scroll capabilities after dropdown is rendered
      setTimeout(() => checkScrollCapability(item), 100);
    }
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  /* -------------------------------------------------- motion variants */
  const backdrop = {
    hidden: { opacity: 0, scaleY: 0, originY: 0 },
    visible: {
      opacity: 1,
      scaleY: 1,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
    exit: {
      opacity: 0,
      scaleY: 0,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
  };

  const dropdown = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.2, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: { duration: 0.15, ease: "easeIn" },
    },
  };

  /* -------------------------------------------------- jsx */
  return (
    <>
      {/* MOBILE / TABLET TOP BAR (≤ lg) */}
      <header className="fixed top-0 left-0 z-50 flex w-full items-center justify-center lg:hidden px-4 py-3 bg-[#1E1F1F]/80 backdrop-blur">
        <button
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={toggle}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") toggle();
          }}
          className="absolute left-4 flex h-6 w-6 flex-col justify-between focus:outline-none focus:ring-2 focus:ring-white/50 rounded-sm"
        >
          <span
            className={`h-0.5 w-full bg-white transition-all duration-300 ${
              open ? "translate-y-[11px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-full bg-white transition-opacity duration-300 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`h-0.5 w-full bg-white transition-all duration-300 ${
              open ? "-translate-y-[11px] -rotate-45" : ""
            }`}
          />
        </button>

        <Logo
          className="w-auto object-contain"
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
                          href={
                            item === "Home" ? "/" : `/${item.toLowerCase()}`
                          }
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
                              isExpanded ? "rotate-180" : ""
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
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
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
                <Button
                  href={contactInfo.href}
                  variant="secondary"
                  size="lg"
                  className="border border-white hover:border-white"
                  onClick={toggle}
                >
                  {contactInfo.label}
                </Button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* DESKTOP NAVIGATION - Enhanced with better scroll animations */}
      <div
        ref={containerRef}
        className="hidden lg:flex fixed top-6 left-1/2 z-40 w-full max-w-4xl px-4"
        style={{ 
          transform: "translateX(-50%) translateY(-20px)",
          opacity: 0,
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          pointerEvents: "none"
        }}
        onMouseLeave={handleMouseLeave}
      >
        <nav
          ref={navRef}
          className="flex items-center flex-row justify-between rounded-xl px-4 py-3 bg-[#1E1F1F]/95 backdrop-blur-md w-full shadow-lg border border-white/10"
        >
          <div className="flex-shrink-0">
            <Logo
              className="w-auto object-contain scale-75 mb-[-5px] ml-[-10px]"
              priority
              isLink={true}
              href="/"
            />
          </div>

          <div className="flex flex-row items-center ml-auto">
            <ul className="flex items-center space-x-4 xl:space-x-6">
              {navLinks.map((item) => (
                <li
                  key={item}
                  onMouseEnter={() => handleMouseEnter(item)}
                  className="relative"
                >
                  <Link
                    ref={(el) => (linkRefs.current[item] = el)}
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="relative text-xs font-light tracking-wide text-white/85 hover:text-white transition-colors duration-200 group whitespace-nowrap flex items-center gap-1"
                  >
                    {item}
                    {menuData[item] && menuData[item].length > 0 && (
                      <svg
                        className="w-3 h-3 text-white/60 group-hover:text-white transition-colors duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-white transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>

            <Button
              href={contactInfo.href}
              variant="secondary"
              size="sm"
              className="ml-6 xl:ml-8 border border-white hover:border-white text-xs flex-shrink-0"
            >
              {contactInfo.label}
            </Button>
          </div>
        </nav>
      </div>

      {/* DROPDOWN MENU */}
      <AnimatePresence>
        {activeDropdown && menuData[activeDropdown] && (
          <motion.div
            key={`dropdown-${activeDropdown}`}
            ref={dropdownRef}
            variants={dropdown}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="hidden lg:block fixed z-30 rounded-xl p-2 shadow-2xl bg-[#1E1F1F]/95 backdrop-blur-md border border-white/10"
            style={{
              left: dropdownPosition.left,
              top: dropdownPosition.top,
              width: dropdownPosition.width,
            }}
            onMouseEnter={() => setActiveDropdown(activeDropdown)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative">
              {/* Left Scroll Arrow */}
              {showScrollButtons[activeDropdown] && canScrollLeft[activeDropdown] && (
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  onClick={() => scroll("left", activeDropdown)}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-brand-identity/90 hover:bg-brand-identity rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 group"
                  aria-label="Scroll left"
                >
                  <svg
                    className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </motion.button>
              )}

              {/* Right Scroll Arrow */}
              {showScrollButtons[activeDropdown] && canScrollRight[activeDropdown] && (
                <motion.button
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  onClick={() => scroll("right", activeDropdown)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-brand-identity/90 hover:bg-brand-identity rounded-full flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110 group"
                  aria-label="Scroll right"
                >
                  <svg
                    className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </motion.button>
              )}

              <div
                ref={(el) => {
                  scrollRefs.current[activeDropdown] = el;
                  // Check scroll capability when ref is set
                  if (el) {
                    setTimeout(() => checkScrollCapability(activeDropdown), 50);
                  }
                }}
                className="flex gap-2 overflow-x-auto scrollbar-hide"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  paddingLeft: showScrollButtons[activeDropdown] && canScrollLeft[activeDropdown] ? "48px" : "4px",
                  paddingRight: showScrollButtons[activeDropdown] && canScrollRight[activeDropdown] ? "48px" : "4px",
                  paddingBottom: "2px",
                  scrollBehavior: "smooth",
                }}
                onScroll={() => checkScrollCapability(activeDropdown)}
                onWheel={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const container = e.currentTarget;
                  const scrollAmount = e.deltaY * 2;
                  container.scrollLeft += scrollAmount;
                  // Update scroll button states after wheel scroll
                  setTimeout(() => checkScrollCapability(activeDropdown), 100);
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
                          <div className="flex-1">
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
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M7 17L17 7M17 7H7M17 7V17"
                                />
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
  );
}