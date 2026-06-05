import React from 'react';
import { motion } from 'framer-motion';

export function FadeIn({ 
  children, 
  delay = 0, 
  direction = 'none', 
  fullWidth = false,
  className = '' 
}) {
  // Define directional offsets for the entry animation
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -45, y: 0 },
    none: { x: 0, y: 0 }
  };

  const offset = directions[direction] || directions.none;

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...offset 
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0 
      }}
      viewport={{ 
        once: true, 
        margin: '-100px' 
      }}
      transition={{ 
        duration: 0.7, 
        delay: delay, 
        ease: [0.21, 0.47, 0.32, 0.98] // Clean, premium feeling cubic-bezier ease
      }}
      className={`${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
}