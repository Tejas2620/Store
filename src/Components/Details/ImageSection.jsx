import React from "react";
import { motion } from "framer-motion";

export const ImageSection = ({
  product,
  imageLoaded,
  setImageLoaded,
  onDelete,
  onBack,
}) => {
  return (
    <div className="relative w-full h-full group">
      {/* Navigation Buttons */}
      <div className="absolute top-6 left-6 z-20 flex items-center gap-4">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onBack}
          className="p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white transition-colors"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </motion.button>

        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          onClick={onDelete}
          className="p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full h-full"
      >
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: imageLoaded ? 1 : 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1],
          }}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Hover Overlay with Gradient */}
        <motion.div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-all duration-300" />

        {/* Price Tag */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.4,
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="absolute top-6 right-6 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-lg font-bold text-blue-600 z-10 shadow-lg"
        >
          ${product.price}
        </motion.div>
      </motion.div>
    </div>
  );
};
