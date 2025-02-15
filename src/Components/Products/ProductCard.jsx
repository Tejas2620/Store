import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { WishlistButton } from "../Common/WishlistButton";

export const ProductCard = ({ product }) => {
  const [hoveredCard, setHoveredCard] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setHoveredCard(true)}
      onHoverEnd={() => setHoveredCard(false)}
      className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 group h-[400px] flex flex-col"
    >
      <Link
        to={`/details/${product.id}`}
        className="block relative h-[200px] overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover object-center transform transition-transform duration-500 ${
            hoveredCard ? "scale-110" : "scale-100"
          }`}
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-blue-600 font-medium text-sm">
            ${product.price}
          </span>
        </div>
        {product.isNew && (
          <div className="absolute bottom-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
            New
          </div>
        )}
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {product.description}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">
            {product.category}
          </span>
          <span
            className={`text-sm font-medium ${
              product.inStock ? "text-green-500" : "text-red-500"
            }`}
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>

      <div className="absolute top-4 right-4 z-10">
        <WishlistButton product={product} showText={false} />
      </div>
    </motion.div>
  );
};