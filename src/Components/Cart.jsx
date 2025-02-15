import React, { useContext, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductContext } from '../Utils/Context';
import { CartQuantityControls } from './Cart/CartQuantityControls';
import { typography } from '../styles/typography';
import { Link } from 'react-router-dom';

const Cart = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    getCartTotal,
    clearCart
  } = useContext(ProductContext);

  // Save cart state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <h2 className={`${typography.heading2} text-gray-800 mb-4 text-2xl md:text-3xl`}>
            Your cart is empty
          </h2>
          <p className={`${typography.body1} text-gray-600 mb-8`}>
            Add some products to your cart to see them here.
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className={`${typography.heading1} text-2xl md:text-3xl lg:text-4xl text-gray-800`}>
            Shopping Cart
          </h1>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              to="/"
              className="flex-1 sm:flex-none text-center px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              Continue Shopping
            </Link>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={clearCart}
              className="flex-1 sm:flex-none text-center px-4 py-2 text-red-600 hover:text-red-700 font-medium"
            >
              Clear Cart
            </motion.button>
          </div>
        </motion.div>

        {/* Cart Items */}
        <AnimatePresence>
          <div className="space-y-4">
            {cart.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-4 md:p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                    {/* Product Image */}
                    <Link
                      to={`/details/${item.id}`}
                      className="w-full sm:w-24 h-48 sm:h-24 rounded-lg overflow-hidden flex-shrink-0 hover:opacity-80 transition-opacity"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0 w-full">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                        <Link to={`/details/${item.id}`}>
                          <h3 className={`${typography.heading3} text-lg md:text-xl text-gray-800 hover:text-blue-600 transition-colors`}>
                            {item.name}
                          </h3>
                        </Link>
                        <p className={`${typography.heading3} text-gray-800 order-1 sm:order-none`}>
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      <p className={`${typography.body2} text-gray-600 mb-4`}>
                        ${item.price.toFixed(2)} each
                      </p>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <CartQuantityControls
                          quantity={item.quantity}
                          maxQuantity={item.stockQuantity}
                          onIncrease={() => updateCartQuantity(item.id, item.quantity + 1)}
                          onDecrease={() => updateCartQuantity(item.id, item.quantity - 1)}
                        />

                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => removeFromCart(item.id)}
                          className="w-full sm:w-auto text-red-500 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          <span className="sm:hidden">Remove</span>
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatePresence>

        {/* Cart Summary */}
        <motion.div
          layout
          className="mt-8 bg-white rounded-xl shadow-md p-4 md:p-6"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <h2 className={`${typography.heading2} text-xl md:text-2xl text-gray-800`}>Cart Total</h2>
            <p className={`${typography.heading2} text-xl md:text-2xl text-gray-800`}>
              ${getCartTotal().toFixed(2)}
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg transition-colors text-lg"
          >
            Proceed to Checkout
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Cart;