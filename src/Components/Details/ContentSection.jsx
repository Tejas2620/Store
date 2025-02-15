import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { typography } from "../../styles/typography";

export const ContentSection = ({ product, onDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = () => {
    onDelete();
    setShowDeleteModal(false);
  };

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
                stiffness: 300,
              }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
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
        className="mt-auto flex gap-4 pt-8 border-t border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Link
          to="/"
          className={`${typography.button} group relative flex-1 px-6 py-3.5 rounded-xl
            bg-gradient-to-r from-gray-100 to-gray-200
            text-gray-700 transition-all duration-300 shadow-sm hover:shadow-md
            flex items-center justify-center gap-3 overflow-hidden`}
        >
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300
              opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
          <svg
            className="w-5 h-5 relative z-10 transition-transform duration-300
              transform group-hover:-translate-x-1"
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
          <span className="relative z-10">Back to Home</span>
        </Link>

        <motion.button
          onClick={() => setShowDeleteModal(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`${typography.button} group relative flex-1 px-6 py-3.5 rounded-xl
            bg-gradient-to-r from-red-500 to-red-600 text-white
            transition-all duration-300 shadow-sm hover:shadow-md
            flex items-center justify-center gap-3 overflow-hidden`}
        >
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700
              opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
          <svg
            className="w-5 h-5 relative z-10 transition-transform duration-300
              transform group-hover:rotate-12"
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
          <span className="relative z-10">Delete Product</span>
        </motion.button>
      </motion.div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-xl p-8 max-w-md w-full shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <h3
                  className={`${typography.heading3} text-center text-gray-900 mb-2`}
                >
                  Delete Product
                </h3>
                <p className={`${typography.body1} text-center text-gray-600`}>
                  Are you sure you want to delete this product? This action
                  cannot be undone.
                </p>
              </div>
              <div className="flex gap-4">
                <motion.button
                  onClick={() => setShowDeleteModal(false)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`${typography.button} flex-1 px-6 py-3 rounded-xl
                    border-2 border-gray-200 text-gray-700 hover:bg-gray-50
                    transition-all duration-200 hover:shadow-md`}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={handleDelete}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`${typography.button} flex-1 px-6 py-3 rounded-xl
                    bg-gradient-to-r from-red-500 to-red-600 text-white
                    hover:from-red-600 hover:to-red-700
                    transition-all duration-200 hover:shadow-md`}
                >
                  Delete
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
