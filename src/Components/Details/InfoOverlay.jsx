import React from "react";
import { motion } from "framer-motion";
import { StockStatus } from "./StockStatus";

export const InfoOverlay = ({ product }) => {
  return (
    <motion.div className="absolute bottom-0 left-0 right-0 translate-y-[105%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]">
      <div className="bg-gradient-to-t from-black via-black/50 to-transparent pt-16 pb-6 px-6">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="flex justify-between items-center"
        >
          <ProductInfo brand={product.specifications.Brand} model={product.specifications.Model} />
          <StockStatus inStock={product.inStock} />
        </motion.div>
      </div>
    </motion.div>
  );
};

const ProductInfo = ({ brand, model }) => (
  <motion.div
    initial={{ x: -20 }}
    whileInView={{ x: 0 }}
    transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
  >
    <motion.h3 className="text-white text-2xl font-bold transform-gpu" whileHover={{ scale: 1.02 }}>
      {model}
    </motion.h3>
    <motion.p
      className="text-gray-300 text-lg"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      {brand}
    </motion.p>
  </motion.div>
);