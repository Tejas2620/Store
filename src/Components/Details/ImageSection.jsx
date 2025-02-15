import React from "react";
import { motion } from "framer-motion";
import { PriceTag } from "./PriceTag";
import { InfoOverlay } from "./InfoOverlay";

export const ImageSection = ({ product, imageLoaded, setImageLoaded }) => {
  return (
    <div className="w-full md:w-1/2 relative h-full overflow-hidden group">
      <motion.div
        className="relative w-full h-full font-['Poppins']"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: imageLoaded ? 1 : 0,
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Hover Overlay */}
        <motion.div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Stock Status */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
          className="absolute top-6 right-6 z-10"
        >
          <motion.div
            className={`px-4 py-2 rounded-full text-sm font-medium shadow-xl backdrop-blur-sm flex items-center gap-2.5 ${
              product.inStock
                ? "bg-green-500/90 text-white"
                : "bg-red-500/90 text-white"
            }`}
            whileHover={{ scale: 1.02 }}
          >
            <motion.span
              animate={{ scale: product.inStock ? [1, 1.2, 1] : 1 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className={`w-2 h-2 rounded-full ${
                product.inStock ? "bg-white" : "bg-white/50"
              }`}
            />
            <span className="tracking-wide font-semibold">
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </motion.div>
        </motion.div>

        <PriceTag price={product.price} />
        <InfoOverlay product={product} />
      </motion.div>
    </div>
  );
};
