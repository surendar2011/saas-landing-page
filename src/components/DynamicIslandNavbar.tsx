'use client';

// Import React hooks and Framer Motion components
import { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';

export default function DynamicIslandNavbar() {
  // State to determine if the page has been scrolled
  const [isScrolled, setIsScrolled] = useState(false);

  // Effect hook to listen for scroll events and update isScrolled accordingly
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // Navbar container, fixed and centered at the top
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <LayoutGroup>
        {/* Main navigation bar with animated padding based on scroll state */}
        <motion.div
          layout
          className="bg-black rounded-full flex items-center shadow-lg backdrop-blur-sm"
          initial={false}
          animate={{
            paddingLeft: isScrolled ? '1.5rem' : '1rem',
            paddingRight: isScrolled ? '1.5rem' : '1rem',
            paddingTop: '0.625rem',
            paddingBottom: '0.625rem',
          }}
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
        >
          {/* Logo block */}
          <motion.div
            layout
            className="flex-shrink-0"
            initial={false}
          >
            <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
              <span className="text-black text-xs font-bold">L</span>
            </div>
          </motion.div>

          {/* Animated Navigation Links block, shown only when scrolled */}
          <AnimatePresence mode="popLayout">
            {isScrolled && (
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
                {/* Features link */}
                <a
                  href="#features"
                  className="text-white text-sm font-medium hover:text-gray-300 transition-colors whitespace-nowrap"
                >
                  Features
                </a>
                {/* Pricing link */}
                <a
                  href="#pricing"
                  className="text-white text-sm font-medium hover:text-gray-300 transition-colors whitespace-nowrap"
                >
                  Pricing
                </a>
                {/* Docs link */}
                <a
                  href="#docs"
                  className="text-white text-sm font-medium hover:text-gray-300 transition-colors whitespace-nowrap"
                >
                  Docs
                </a>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Join Waitlist button block */}
          <motion.button
            layout
            className="bg-white text-black text-sm font-medium px-4 py-1.5 rounded-full hover:bg-gray-100 transition-colors whitespace-nowrap ml-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Join Waitlist
          </motion.button>
        </motion.div>
      </LayoutGroup>
    </nav>
  );
}
