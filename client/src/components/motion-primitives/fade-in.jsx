import React from 'react';
import { motion } from 'framer-motion';

export const FadeIn = ({ 
  children, 
  className = "", 
  delay = 0,
  duration = 0.5,
  y = 20,
  ...props 
}) => {
  const variants = {
    hidden: { 
      opacity: 0,
      y: y,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      animate="visible"
      {...props}
    >
      {children}
    </motion.div>
  );
}; 