'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const calculateScrollProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      // Calculate the maximum scrollable distance
      const maxScroll = documentHeight - windowHeight;
      
      // Calculate progress percentage (0-100)
      const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
      
      setScrollProgress(Math.min(Math.max(progress, 0), 100));
    };

    // Calculate initial progress
    calculateScrollProgress();

    // Throttle scroll events for better performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          calculateScrollProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleResize = () => {
      calculateScrollProgress();
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 z-40"
      initial={{ width: 0 }}
      animate={{ width: '100%' }}
      transition={{ duration: 0 }}
    >
      <motion.div
        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400"
        initial={{ width: '0%' }}
        animate={{ width: `${scrollProgress}%` }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 30,
          mass: 0.5,
        }}
      />
    </motion.div>
  );
}
