import React from "react";
import { motion } from "framer-motion";
import { ProductCard } from "./ProductCard";
import { SortSelect } from "./SortSelect";

export const ProductGrid = ({ products, sortBy, onSortChange }) => {
  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5 },
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="flex-1 p-8"
    >
      <motion.div
        variants={fadeInUp}
        className="flex justify-between items-center mb-6"
      >
        <h1 className="text-3xl font-bold text-gray-800">
          Featured Products
        </h1>
        <SortSelect value={sortBy} onChange={onSortChange} />
      </motion.div>

      <motion.div
        variants={{
          animate: {
            transition: { staggerChildren: 0.1 }
          }
        }}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </motion.div>
    </motion.main>
  );
};