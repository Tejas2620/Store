import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { typography } from '../../styles/typography';

export const ContentSection = ({ product, onDelete }) => {
  return (
    <div className="p-8 md:p-12 flex flex-col md:w-1/2 h-full overflow-y-auto">
      <div className="mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${typography.heading1} bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4`}
        >
          {product.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`${typography.body1} text-gray-600`}
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
        <motion.h2
          className={`${typography.heading3} bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6`}
        >
          Specifications
        </motion.h2>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(product.specifications).map(([key, value], index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.1 * index,
                duration: 0.3,
                type: "spring",
                stiffness: 300
              }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
              className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-xl hover:shadow-md transition-shadow duration-300"
            >
              <motion.p className={`${typography.caption} text-blue-600 mb-1`}>
                {key}
              </motion.p>
              <motion.p className={`${typography.subtitle2} text-gray-900`}>
                {value}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="mt-auto flex gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Link
          to="/"
          className={`${typography.button} px-6 py-3 rounded-xl bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300 transition-all duration-300 shadow-sm hover:shadow`}
        >
          Back to Home
        </Link>
        <motion.button
          onClick={onDelete}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`${typography.button} px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-sm hover:shadow`}
        >
          Delete Product
        </motion.button>
      </motion.div>
    </div>
  );
};