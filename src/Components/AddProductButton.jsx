import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { typography } from "../styles/typography";

export const AddProductButton = () => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Link
        to="/add"
        className={`${typography.button} bg-gradient-to-r from-blue-500 to-blue-600
          text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl
          transition-all duration-300 flex items-center gap-2 hover:scale-105`}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        Add Product
      </Link>
    </motion.div>
  );
};