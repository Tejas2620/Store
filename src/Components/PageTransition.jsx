import React from "react";
import { motion } from "framer-motion";

export const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.4,
          ease: [0.43, 0.13, 0.23, 0.96]
        }
      }}
      exit={{
        opacity: 0,
        y: -20,
        transition: {
          duration: 0.3,
          ease: [0.43, 0.13, 0.23, 0.96]
        }
      }}
    >
      {children}
    </motion.div>
  );
};