import React from "react";
import { motion } from "framer-motion";

export const PriceTag = ({ price }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
      className="absolute top-6 left-6 z-10"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
        transition={{ rotate: { duration: 0.5, ease: "easeInOut" } }}
        className="bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-xl"
      >
        <span className="text-blue-600 font-bold text-xl tracking-tight font-['Poppins']">
          ${price.toFixed(2)}
        </span>
      </motion.div>
    </motion.div>
  );
};