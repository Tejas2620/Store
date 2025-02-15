import React from "react";
import { motion } from "framer-motion";
import { PriceTag } from "./PriceTag";
import { InfoOverlay } from "./InfoOverlay";

export const ImageSection = ({ product, imageLoaded, setImageLoaded }) => {
  return (
    <div className="w-full md:w-1/2 relative h-full overflow-hidden group">
      <motion.div
        className="relative w-full h-full"
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

        <PriceTag price={product.price} />
        <InfoOverlay product={product} />
      </motion.div>
    </div>
  );
};
