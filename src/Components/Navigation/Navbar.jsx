import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { WishlistContext } from '../../Utils/WishlistContext';
import { typography } from '../../styles/typography';

export const Navbar = () => {
  const { wishlist } = useContext(WishlistContext);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled
          ? 'bg-white/90 backdrop-blur-md shadow-lg'
          : 'bg-white/50 backdrop-blur-sm'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Home */}
          <Link
            to="/"
            className="flex items-center"
          >
            <motion.span
              className={`${typography.heading3} bg-gradient-to-r from-blue-600 to-blue-800
                bg-clip-text text-transparent font-bold`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              SneakPro
            </motion.span>
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center gap-8">
            {/* Cart Link */}
            <Link
              to="/cart"
              className={`relative p-2 transition-colors duration-200 group
                ${location.pathname === '/cart'
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-blue-600'}`}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative"
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
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <motion.span
                  className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-blue-600
                    group-hover:w-full group-hover:-translate-x-1/2
                    transition-all duration-300"
                  animate={{
                    width: location.pathname === '/cart' ? '100%' : '0%',
                    translateX: location.pathname === '/cart' ? '-50%' : '0%'
                  }}
                />
              </motion.div>
              <span className="sr-only">Cart</span>
            </Link>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className={`relative p-2 transition-colors duration-200 group
                ${location.pathname === '/wishlist'
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-blue-600'}`}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative"
              >
                <svg
                  className="w-6 h-6"
                  fill={location.pathname === '/wishlist' ? "currentColor" : "none"}
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
                <motion.span
                  className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-blue-600
                    group-hover:w-full group-hover:-translate-x-1/2
                    transition-all duration-300"
                  animate={{
                    width: location.pathname === '/wishlist' ? '100%' : '0%',
                    translateX: location.pathname === '/wishlist' ? '-50%' : '0%'
                  }}
                />
                <AnimatePresence>
                  {wishlist.length > 0 && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                        transition: {
                          type: "spring",
                          stiffness: 500,
                          damping: 25
                        }
                      }}
                      exit={{ scale: 0, opacity: 0 }}
                      className="absolute -top-2 -right-1"
                    >
                      <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-50" />
                      <motion.div
                        className="relative bg-gradient-to-r from-blue-500 to-blue-600
                          text-white text-xs font-bold px-2 min-w-[20px] h-5
                          flex items-center justify-center rounded-full
                          shadow-lg shadow-blue-500/30 border border-white"
                        whileHover={{
                          scale: 1.1,
                          transition: { type: "spring", stiffness: 400 }
                        }}
                      >
                        {wishlist.length}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              <span className="sr-only">Wishlist</span>
            </Link>

            {/* Add Product Button */}
            <Link
              to="/add-product"
              className={`${typography.button} px-4 py-2 rounded-xl
                bg-gradient-to-r from-blue-500 to-blue-600 text-white
                hover:from-blue-600 hover:to-blue-700
                transition-all duration-300 shadow-md hover:shadow-lg
                flex items-center gap-2 transform hover:-translate-y-0.5`}
            >
              <motion.div
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
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
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </motion.div>
              Add Product
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};