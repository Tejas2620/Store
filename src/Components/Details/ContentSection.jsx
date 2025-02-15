import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ProductContext } from "../../Utils/Context";
import { WishlistContext } from "../../Utils/WishlistContext";
import { typography } from "../../styles/typography";

export const ContentSection = ({
  product,
  selectedSize,
  setSelectedSize,
  showSizeError,
  setShowSizeError,
  quantity,
  setQuantity,
  onAddToCart,
}) => {
  const { addToCart } = useContext(ProductContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } =
    useContext(WishlistContext);

  const specifications = [
    { label: "Brand", value: product.brand || "Nike" },
    { label: "Model", value: product.name?.split(" ")[0] || "Air Jordan" },
    { label: "Colorway", value: product.color || "Classic" },
    { label: "Material", value: "Premium Leather" },
    { label: "Style", value: product.category || "Athletic" },
    { label: "Stock", value: `${product.stockQuantity} available` },
  ];

  const containerAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6, staggerChildren: 0.1 },
  };

  const itemAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <motion.div className="h-full flex flex-col" {...containerAnimation}>
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1
          className={`${typography.heading1} text-2xl md:text-3xl font-bold text-gray-900 mb-2`}
        >
          {product.name}
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-2xl font-bold text-blue-600">
            ${product.price}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              product.inStock
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </motion.div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${typography.body1} text-gray-600 mb-6`}
      >
        {product.description}
      </motion.p>

      {/* Specifications */}
      <motion.div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Specifications
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {specifications.map((spec, index) => (
            <motion.div
              key={spec.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.4, 0, 0.2, 1],
              }}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.2 },
              }}
              className="bg-gray-50 rounded-lg p-4 hover:shadow-lg hover:bg-white transition-all duration-300"
            >
              <div className="flex flex-col">
                <span className="text-sm text-gray-500 mb-1">{spec.label}</span>
                <span className="font-medium text-gray-900">{spec.value}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Additional Features */}
      <motion.div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Features</h2>
        <ul className="space-y-3">
          {[
            `Authentic ${product.brand} ${product.category}`,
            `Premium ${product.material} construction`,
            `${product.color} colorway`,
            product.features &&
              Object.entries(product.features).map(
                ([key, value]) => `${value}`
              ),
          ]
            .flat()
            .filter(Boolean)
            .map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-center gap-3 text-gray-700"
              >
                <svg
                  className="w-5 h-5 text-blue-600 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {feature}
              </motion.li>
            ))}
        </ul>
      </motion.div>

      {/* Action Buttons */}
      <div className="mt-auto pt-6 border-t border-gray-100">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onAddToCart}
          className="w-full py-3 px-6 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors mb-4"
        >
          Add to Cart
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() =>
            isInWishlist(product.id)
              ? removeFromWishlist(product.id)
              : addToWishlist(product)
          }
          className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
            isInWishlist(product.id)
              ? "bg-red-50 text-red-600 hover:bg-red-100"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {isInWishlist(product.id)
            ? "Remove from Wishlist"
            : "Add to Wishlist"}
        </motion.button>
      </div>
    </motion.div>
  );
};
