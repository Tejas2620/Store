import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar/Sidebar";
import { ProductGrid } from "./Products/ProductGrid";
import { useProductFilters } from "../hooks/useProductFilters";
import { SEO } from "./SEO";
import { typography } from "../styles/typography";
import { LoadingScreen } from "./LoadingScreen";
import { Link } from "react-router-dom";

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

  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    const saved = localStorage.getItem("recentlyViewed");
    return saved ? JSON.parse(saved) : [];
  });

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
                sortBy={sortBy}
                onSort={handleSort}
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
              </div>

              {/* Recently Viewed Section */}
              {recentlyViewed.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8 bg-white/50 backdrop-blur-sm rounded-2xl p-6"
                >
                  <h2 className={`${typography.heading3} text-gray-800 mb-4`}>
                    Recently Viewed
                  </h2>
                  <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                    {recentlyViewed.map((product) => (
                      <motion.div
                        key={product.id}
                        whileHover={{ y: -5 }}
                        className="flex-shrink-0 w-48"
                      >
                        <Link
                          to={`/details/${product.id}`}
                          className="block bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                          <div className="h-32 overflow-hidden">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <div className="p-3">
                            <h3
                              className={`${typography.subtitle2} text-gray-800 line-clamp-1`}
                            >
                              {product.name}
                            </h3>
                            <p className={`${typography.price} text-blue-600`}>
                              ${product.price}
                            </p>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

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
