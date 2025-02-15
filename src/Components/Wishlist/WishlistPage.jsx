import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { WishlistContext } from '../../Utils/WishlistContext';
import { ProductCard } from '../Products/ProductCard';
import { typography } from '../../styles/typography';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

export const WishlistPage = () => {
  const { wishlist } = useContext(WishlistContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="flex justify-between items-center">
            <h1 className={`${typography.heading1} text-gray-900`}>
              My Wishlist
            </h1>
            <Link
              to="/"
              className={`${typography.button} px-6 py-3 rounded-xl
                bg-gradient-to-r from-blue-500 to-blue-600 text-white
                hover:from-blue-600 hover:to-blue-700
                transition-all duration-300 shadow-sm hover:shadow-md`}
            >
              Continue Shopping
            </Link>
          </motion.div>

          {/* Wishlist Items */}
          {wishlist.length > 0 ? (
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {wishlist.map((product) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <ProductCard product={product} showWishlistButton />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              variants={itemVariants}
              className="text-center py-20 bg-white rounded-2xl shadow-sm"
            >
              <div className="max-w-md mx-auto">
                <svg
                  className="w-24 h-24 mx-auto mb-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <h2 className={`${typography.heading2} text-gray-900 mb-4`}>
                  Your wishlist is empty
                </h2>
                <p className={`${typography.body1} text-gray-600 mb-8`}>
                  Start adding your favorite products to your wishlist!
                </p>
                <Link
                  to="/"
                  className={`${typography.button} px-6 py-3 rounded-xl
                    bg-gradient-to-r from-blue-500 to-blue-600 text-white
                    hover:from-blue-600 hover:to-blue-700
                    transition-all duration-300 shadow-sm hover:shadow-md`}
                >
                  Explore Products
                </Link>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};