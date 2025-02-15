import React from "react";
import { motion } from "framer-motion";

export const CartQuantityControls = ({
  quantity,
  onIncrease,
  onDecrease,
  maxQuantity,
  className = ""
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onDecrease}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
          quantity <= 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800'
        }`}
        disabled={quantity <= 1}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </motion.button>

      <span className="w-8 text-center font-medium text-gray-700">
        {quantity}
      </span>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onIncrease}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
          quantity >= maxQuantity
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800'
        }`}
        disabled={quantity >= maxQuantity}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
      </motion.button>
    </div>
  );
};

