import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { WishlistContext } from "../Utils/WishlistContext";
import { ProductContext } from "../Utils/Context";
import { typography } from "../styles/typography";

export const ProductCard = ({ product }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);
  const { addToCart, cart } = useContext(ProductContext);
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const itemInCart = cart.find(item => item.id === product.id);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    setIsAdding(true);

    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 500));

    addToCart(product);
    setIsAdding(false);
  };

  return (
    <motion.div
      className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link to={`/details/${product.id}`}>
        <div className="relative aspect-square overflow-hidden">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          />

          {/* Price Tag - Moved to left side */}
          <motion.div
            className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              ${product.price}
            </span>
          </motion.div>

          {/* New Badge - Moved below price tag */}
          {product.isNew && (
            <motion.div
              className="absolute top-16 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              New
            </motion.div>
          )}
        </div>

        <div className="p-6">
          <h3 className={`${typography.heading3} text-xl font-bold mb-2 text-gray-800 line-clamp-1`}>
            {product.name}
          </h3>
          <p className={`${typography.body2} text-gray-600 line-clamp-2 mb-4`}>
            {product.description}
          </p>

          {/* Category, Stock, and Add to Cart */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                {product.category}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm ${
                product.inStock
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* Action Buttons Container */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <motion.button
          className={`w-full ${
            isAdding
              ? 'bg-blue-400'
              : itemInCart
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-blue-600 hover:bg-blue-700'
          } text-white py-2 px-4 rounded-full font-medium shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2`}
          onClick={handleAddToCart}
          whileTap={{ scale: 0.95 }}
          disabled={!product.inStock || isAdding}
        >
          {isAdding ? (
            <>
              <motion.div
                className="w-5 h-5 border-3 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <span>Adding...</span>
            </>
          ) : itemInCart ? (
            <>
              <span>In Cart ({itemInCart.quantity})</span>
              <span>+</span>
            </>
          ) : product.inStock ? (
            'Add to Cart'
          ) : (
            'Out of Stock'
          )}
        </motion.button>
      </div>

      {/* Wishlist Button */}
      <motion.button
        className="absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-lg z-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => isInWishlist(product.id) ? removeFromWishlist(product.id) : addToWishlist(product)}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill={isInWishlist(product.id) ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
          animate={{
            color: isInWishlist(product.id) ? "#EF4444" : "#6B7280",
            scale: isInWishlist(product.id) ? [1, 1.2, 1] : 1
          }}
          transition={{ duration: 0.3 }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </motion.svg>
      </motion.button>
    </motion.div>
  );
};