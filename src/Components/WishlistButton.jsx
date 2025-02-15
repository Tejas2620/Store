import React from 'react';
import { useContext } from 'react';
import { ProductContext } from '../Utils/Context';

export const WishlistButton = ({ productId }) => {
  const { wishlist, toggleWishlist } = useContext(ProductContext);
  const isWishlisted = wishlist.includes(productId);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        toggleWishlist(productId);
      }}
      className={`absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur-sm transition-all duration-300 ${
        isWishlisted ? 'text-red-500' : 'text-gray-400'
      }`}
    >
      <svg
        className="w-6 h-6"
        fill={isWishlisted ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
};