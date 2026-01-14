'use client';

// Import React hooks and Framer Motion components
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function DynamicIslandNavbar() {
  // State to determine if the page has been scrolled
  const [isScrolled, setIsScrolled] = useState(false);
  // State for mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // State to detect mobile screen size
  const [isMobile, setIsMobile] = useState(false);
  // State to track hover
  const [isHovered, setIsHovered] = useState(false);

  // Effect hook to listen for scroll events and update isScrolled accordingly
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Check if mobile on mount and resize (breakpoint at 768px for md screens)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      // Close mobile menu when resizing to desktop
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkMobile);
    
    // Cleanup the event listeners on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Smooth scroll handler for anchor links
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      // Calculate offset: navbar height (top-4 = 1rem = 16px, navbar content ~40px, total ~72px) + some padding
      const navbarOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      // Close mobile menu if open
      setIsMobileMenuOpen(false);
    }
  };

  // Navigation links data
  const navLinks = [
    { href: '#features', label: 'Features' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#docs', label: 'Docs' },
  ];

  return (
    <>
      {/* Navbar container, fixed and centered at the top */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-[95vw] px-4 md:px-0">
        <LayoutGroup>
          {/* Main navigation bar with animated padding based on scroll state */}
          <motion.div
            layout
            className="bg-black dark:bg-white rounded-full flex items-center shadow-lg backdrop-blur-sm mx-auto max-w-fit"
            initial={false}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            animate={{
              paddingLeft: isHovered 
                ? (isScrolled && !isMobile ? '2rem' : '1.5rem')
                : (isScrolled && !isMobile ? '1.5rem' : '1rem'),
              paddingRight: isHovered 
                ? (isScrolled && !isMobile ? '2rem' : '1.5rem')
                : (isScrolled && !isMobile ? '1.5rem' : '1rem'),
              paddingTop: isHovered ? '0.875rem' : '0.625rem',
              paddingBottom: isHovered ? '0.875rem' : '0.625rem',
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{
              layout: {
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1],
              },
              default: {
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
              },
            }}
          >
            {/* Logo block */}
            <motion.div
              layout
              className="flex-shrink-0"
              initial={false}
            >
              <Link href="/" className="block">
                <div className="w-6 h-6 bg-white dark:bg-black rounded flex items-center justify-center border border-gray-200 dark:border-gray-800">
                  <span className="text-black dark:text-white text-xs font-bold">L</span>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation Links - shown on hover or when scrolled, on desktop only */}
            <AnimatePresence mode="popLayout">
              {(isHovered || isScrolled) && !isMobile && (
                <motion.div
                  key="nav-links"
                  layout
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 'auto', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{
                    layout: {
                      duration: 0.4,
                      ease: [0.4, 0, 0.2, 1],
                    },
                    default: {
                      duration: 0.4,
                      ease: [0.4, 0, 0.2, 1],
                    },
                  }}
                  className="overflow-hidden flex items-center gap-6 ml-4"
                >
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleSmoothScroll(e, link.href)}
                      className="text-white dark:text-black text-sm font-medium hover:text-gray-300 dark:hover:text-gray-700 transition-colors whitespace-nowrap"
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mobile Menu Button - shown on mobile */}
            {isMobile && (
              <motion.button
                layout
                className="ml-4 p-2 text-white dark:text-black hover:text-gray-300 dark:hover:text-gray-700 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </motion.button>
            )}

            {/* Theme Toggle - shown when scrolled on desktop or always on mobile (when menu not open) */}
            {(!isMobile || !isMobileMenuOpen) && (
              <motion.div
                layout
                className="ml-4"
                initial={false}
              >
                <ThemeToggle />
              </motion.div>
            )}

            {/* Join Waitlist button - hidden on mobile when menu is open, shown on desktop */}
            {(!isMobile || !isMobileMenuOpen) && (
              <motion.button
                layout
                className="bg-white dark:bg-gray-800 text-black dark:text-white text-sm font-medium px-4 py-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors whitespace-nowrap ml-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Join Waitlist
              </motion.button>
            )}
          </motion.div>
        </LayoutGroup>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobile && isMobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            {/* Menu dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 z-40 w-[90vw] max-w-md"
            >
              <div className="bg-black dark:bg-white rounded-2xl shadow-xl backdrop-blur-sm p-2 border border-gray-800 dark:border-gray-200">
                <div className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleSmoothScroll(e, link.href)}
                      className="text-white dark:text-black text-sm font-medium hover:text-gray-300 dark:hover:text-gray-700 transition-colors px-4 py-2.5 rounded-lg hover:bg-gray-900 dark:hover:bg-gray-100 active:bg-gray-800 dark:active:bg-gray-200"
                    >
                      {link.label}
                    </Link>
                  ))}
                  {/* Theme Toggle in Mobile Menu */}
                  <div className="px-4 py-2.5 flex items-center">
                    <span className="text-white dark:text-black text-sm font-medium mr-3">Theme</span>
                    <ThemeToggle />
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
