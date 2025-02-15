import React from "react";
import { motion } from "framer-motion";

export const StockStatus = ({ inStock }) => {
  return (
    <motion.div
      initial={{ x: 20 }}
      whileInView={{ x: 0 }}
      whileHover={{ scale: 1.05 }}
      className={`px-4 py-2 rounded-full flex items-center gap-2 ${
        inStock ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
      } transition-colors duration-300`}
    >
      <motion.span
        animate={{ scale: inStock ? [1, 1.2, 1] : 1 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
        className={`w-2 h-2 rounded-full ${inStock ? "bg-white" : "bg-white/50"}`}
      />
      <span className="text-white font-medium">
        {inStock ? "In Stock" : "Out of Stock"}
      </span>
    </motion.div>
  );
};