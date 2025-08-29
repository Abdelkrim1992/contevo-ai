import React from 'react';
import { motion } from 'framer-motion';

export const TextEffect = ({ 
  children, 
  className = "", 
  delay = 0.1, 
  stagger = 0.05,
  duration = 0.5,
  y = 20,
  ...props 
}) => {
  const words = typeof children === 'string' ? children.split(' ') : children;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: y,
      filter: 'blur(10px)'
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: duration,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      className={`flex flex-wrap ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      {...props}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          className="mr-2"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}; 