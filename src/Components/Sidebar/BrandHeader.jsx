import React from "react";
import { motion } from "framer-motion";

export const BrandHeader = () => {
  return (
    <div className="mb-2">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-gray-800"
      >
        SneakPro
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-gray-500 text-sm"
      >
        Discover amazing sneakers
      </motion.p>
    </div>
  );
};