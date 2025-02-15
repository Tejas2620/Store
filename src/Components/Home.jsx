import React from "react";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar/Sidebar";
import { ProductGrid } from "./Products/ProductGrid";
import { useProductFilters } from "../hooks/useProductFilters";
import { SEO } from "./SEO";
import { typography } from "../styles/typography";
import { LoadingScreen } from "./LoadingScreen";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

function Home() {
  const {
    searchQuery,
    selectedCategory,
    sortBy,
    filteredProducts,
    handleSearch,
    handleCategoryClick,
    handleSort,
    categories,
    loading,
  } = useProductFilters();

  if (loading) return <LoadingScreen />;

  return (
    <>
      <SEO title="SneakPro | Premium Sneaker Collection" />
      <motion.div
        className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-[1600px] mx-auto p-6">
          <motion.div
            className="flex flex-col md:flex-row gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Sidebar */}
            <motion.div
              variants={childVariants}
              className="w-full md:w-72 shrink-0"
            >
              <Sidebar
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryClick={handleCategoryClick}
                searchQuery={searchQuery}
                onSearch={handleSearch}
              />
            </motion.div>

            {/* Main Content */}
            <motion.div variants={childVariants} className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <motion.h1
                  className={`${typography.heading2} bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent`}
                >
                  {selectedCategory === "All"
                    ? "All Sneakers"
                    : `${selectedCategory} Collection`}
                </motion.h1>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <select
                    value={sortBy}
                    onChange={handleSort}
                    className={`${typography.body2} px-4 py-2 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`}
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="priceAsc">Price: Low to High</option>
                    <option value="priceDesc">Price: High to Low</option>
                    <option value="nameAsc">Name: A to Z</option>
                    <option value="nameDesc">Name: Z to A</option>
                  </select>
                </motion.div>
              </div>

              {/* Products Grid */}
              <ProductGrid products={filteredProducts} />

              {/* No Results Message */}
              {filteredProducts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-20"
                >
                  <h2 className={`${typography.heading3} text-gray-600 mb-4`}>
                    No sneakers found
                  </h2>
                  <p className={`${typography.body1} text-gray-500`}>
                    Try adjusting your search or filters to find what you're
                    looking for.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
}

export default Home;
