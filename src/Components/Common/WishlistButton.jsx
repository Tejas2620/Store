import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { WishlistContext } from '../../Utils/WishlistContext';
import { typography } from '../../styles/typography';

export const WishlistButton = ({ product, showText = false, className = '' }) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  const inWishlist = isInWishlist(product.id);

  const handleClick = (e) => {
    e.preventDefault(); // Prevent navigation when in ProductCard
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${typography.button} group relative ${showText ? 'px-4 py-2' : 'p-2'} rounded-full
        flex items-center gap-2 transition-all duration-300
        ${inWishlist
          ? 'bg-red-50 text-red-500 hover:bg-red-100'
          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
        } ${className}`}
    >
      <motion.svg
        className={`w-5 h-5 ${inWishlist ? 'text-red-500' : 'text-gray-600'}`}
        initial={false}
        animate={inWishlist ? { scale: [1.2, 1] } : { scale: 1 }}
        fill={inWishlist ? "currentColor" : "none"}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </motion.svg>
      {showText && (
        <span className="relative z-10">
          {inWishlist ? 'Wishlisted' : 'Add to Wishlist'}
        </span>
      )}
    </motion.button>
  );
};