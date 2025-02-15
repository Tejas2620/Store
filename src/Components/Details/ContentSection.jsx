import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const ContentSection = ({ product, onDelete }) => {
  return (
    <div className="p-8 md:p-12 flex flex-col md:w-1/2 h-full overflow-y-auto">
      <div className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-900 mb-4"
        >
          {product.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600"
        >
          {product.description}
        </motion.p>
      </div>

      {/* Specifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">Specifications</h2>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(product.specifications).map(([key, value], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-gray-50 p-4 rounded-xl"
            >
              <p className="text-sm text-gray-500">{key}</p>
              <p className="text-gray-900 font-medium">{value}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <div className="mt-auto flex gap-4">
        <Link
          to="/"
          className="px-6 py-3 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors duration-200"
        >
          Back to Home
        </Link>
        <button
          onClick={onDelete}
          className="px-6 py-3 rounded-xl bg-red-500 text-white hover:bg-red-600 transition-colors duration-200"
        >
          Delete Product
        </button>
      </div>
    </div>
  );
};