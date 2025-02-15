import React, { useContext, useState } from "react";
import { ProductContext } from "../Utils/Context";
import { motion } from "framer-motion";
import { LoadingScreen } from "./LoadingScreen";
import { Sidebar } from "./Sidebar/Sidebar";
import { ProductGrid } from "./Products/ProductGrid";
import { useProductFilters } from "../hooks/useProductFilters";

function Home() {
  const { products, loading } = useContext(ProductContext);
  const {
    searchQuery,
    selectedCategory,
    sortBy,
    filteredProducts,
    handleSearch,
    handleCategoryClick,
    handleSort,
    categories,
  } = useProductFilters(products);

  if (loading) return <LoadingScreen />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-blue-50 flex"
    >
      <Sidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryClick={handleCategoryClick}
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
      />
      <ProductGrid
        products={filteredProducts}
        sortBy={sortBy}
        onSortChange={handleSort}
      />
    </motion.div>
  );
}

export default Home;
