import React from "react";
import { motion } from "framer-motion";

export const InfoOverlay = ({ product }) => {
  return (
    <motion.div className="absolute bottom-0 left-0 right-0 translate-y-[105%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
      <div className="bg-gradient-to-t from-black via-black/50 to-transparent pt-16 pb-6 px-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex justify-between items-center font-['Poppins']"
        >
          <ProductInfo brand={product.specifications.Brand} model={product.specifications.Model} />
          <AddToCartButton inStock={product.inStock} />
        </motion.div>
      </div>
    </motion.div>
  );
};

const ProductInfo = ({ brand, model }) => (
  <motion.div
    initial={{ x: -20 }}
    whileInView={{ x: 0 }}
    transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
  >
    <motion.h3
      className="text-white text-2xl font-bold transform-gpu tracking-tight"
      whileHover={{ scale: 1.02 }}
    >
      {model}
    </motion.h3>
    <motion.p
      className="text-gray-300 text-lg tracking-wide"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      {brand}
    </motion.p>
  </motion.div>
);

const AddToCartButton = ({ inStock }) => (
  <motion.button
    initial={{ x: 20 }}
    whileInView={{ x: 0 }}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    disabled={!inStock}
    className={`px-6 py-3 rounded-full flex items-center gap-3 font-semibold tracking-wide transition-all duration-300 ${
      inStock
        ? "bg-white/95 text-gray-900 hover:bg-blue-500 hover:text-white shadow-xl"
        : "bg-gray-400/80 text-gray-200 cursor-not-allowed"
    }`}
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
        strokeWidth="2"
        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
      />
    </svg>
    {inStock ? "Add to Cart" : "Out of Stock"}
  </motion.button>
);