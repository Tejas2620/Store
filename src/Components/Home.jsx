import React from "react";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar/Sidebar";
import { ProductCard } from "./ProductCard";
import { useProductFilters } from "../hooks/useProductFilters";
import { SEO } from "./SEO";
import { LoadingScreen } from "./LoadingScreen";
import { typography } from "../styles/typography";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <motion.div
            className="text-center mb-12"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1
              className={`${typography.heading1} text-6xl font-black mb-4 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent`}
            >
              Premium Sneaker Collection
            </h1>
            <p
              className={`${typography.subtitle1} text-gray-600 max-w-2xl mx-auto leading-relaxed`}
            >
              Discover our curated selection of exclusive sneakers, featuring
              the latest designs and timeless classics.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8">
            <Sidebar
              selectedCategory={selectedCategory}
              onCategoryClick={handleCategoryClick}
              categories={categories}
              sortBy={sortBy}
              onSort={handleSort}
              searchQuery={searchQuery}
              onSearch={handleSearch}
            />

            <motion.div
              className="flex-1"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Product Grid */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>

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
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Home;
