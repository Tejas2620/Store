import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../Utils/Context";
import { WishlistButton } from "./WishlistButton";
import { motion } from "framer-motion";

function Home() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const { products, loading, showToast } = useContext(ProductContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  // Calculate unique categories and their counts from products
  const getCategoryCounts = () => {
    // Get all unique categories from products
    const uniqueCategories = [
      ...new Set(products?.map((product) => product.category)),
    ];

    // Calculate counts for each category
    const counts = products?.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {});

    // Assign colors to categories (maintain consistent colors for existing categories)
    const categoryColors = {
      Basketball: "blue",
      Lifestyle: "red",
      Collaboration: "green",
      Running: "purple",
      Training: "orange",
      Skateboarding: "pink",
      Tennis: "yellow",
      Golf: "emerald",
    };

    // Create category objects with dynamic colors
    return uniqueCategories.map((category) => ({
      name: category,
      count: counts[category] || 0,
      color: categoryColors[category] || "indigo", // fallback color for new categories
    }));
  };

  const categories = getCategoryCounts();

  // Filter products based on search and category
  const filteredProducts = products?.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Update search input
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Update category selection
  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? "All" : category);
  };

  const sortProducts = (products) => {
    switch (sortBy) {
      case "price-low":
        return [...products].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...products].sort((a, b) => b.price - a.price);
      case "newest":
        return [...products].sort((a, b) => b.id - a.id);
      default:
        return products;
    }
  };

  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.5 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-blue-50 flex">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full flex items-center justify-center"
        >
          <div className="text-center space-y-4">
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute top-0 left-0 w-full h-full border-8 border-blue-200 rounded-full animate-pulse"></div>
              <div className="absolute top-0 left-0 w-full h-full border-8 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
            </div>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-2xl font-bold text-gray-800"
            >
              Loading Amazing Products...
            </motion.h2>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-blue-50 flex"
    >
      {/* Sidebar Navigation with Animation */}
      <motion.nav
        initial={{ x: -280 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
        className="w-[280px] h-screen bg-white/80 backdrop-blur-md shadow-xl flex flex-col gap-6 p-8 sticky top-0"
      >
        <motion.div variants={fadeInUp} className="mb-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Store</h2>
          <p className="text-gray-500 text-sm">Discover amazing products</p>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link
            className="group relative px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center shadow-lg shadow-blue-500/20"
            to="/add-product"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600/0 via-white/20 to-blue-600/0 transform translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add a new product
          </Link>
        </motion.div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
            value={searchQuery}
            onChange={handleSearch}
          />
          <svg
            className="w-5 h-5 absolute right-3 top-2.5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Categories */}
        <div className="mt-4">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Categories</h3>
          <ul className="space-y-2">
            {/* "All" category */}
            <li className="group">
              <button
                className={`w-full p-3 flex items-center rounded-xl hover:bg-gray-50 transition-all duration-300 ${
                  selectedCategory === "All" ? "bg-gray-50" : ""
                }`}
                onClick={() => handleCategoryClick("All")}
              >
                <span className="w-3 h-3 rounded-full bg-gray-400 mr-3 group-hover:animate-pulse"></span>
                <span className="text-gray-700 font-medium">All Products</span>
                <span className="ml-auto text-gray-400 text-sm">
                  {products?.length || 0}
                </span>
              </button>
            </li>

            {/* Dynamic categories */}
            {categories.map((category) => (
              <li key={category.name} className="group">
                <button
                  className={`w-full p-3 flex items-center rounded-xl hover:bg-${
                    category.color
                  }-50 transition-all duration-300 ${
                    selectedCategory === category.name
                      ? `bg-${category.color}-50`
                      : ""
                  }`}
                  onClick={() => handleCategoryClick(category.name)}
                >
                  <span
                    className={`w-3 h-3 rounded-full bg-${category.color}-500 mr-3 group-hover:animate-pulse`}
                  ></span>
                  <span
                    className={`text-gray-700 group-hover:text-${category.color}-600 font-medium`}
                  >
                    {category.name}
                  </span>
                  <span className="ml-auto text-gray-400 text-sm">
                    {category.count}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </motion.nav>

      {/* Main Content with Animation */}
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
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500"
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {sortProducts(filteredProducts)?.map((product, index) => (
            <motion.div
              key={product.id}
              variants={fadeInUp}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 group h-[400px] flex flex-col"
            >
              <Link
                to={`/details/${product.id}`}
                className="block relative h-[200px] overflow-hidden"
              >
                <motion.img
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
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
                <WishlistButton productId={product.id} />
              </Link>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="p-4 flex flex-col flex-grow"
              >
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2 h-[40px]">
                    {product.description}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-green-500 bg-green-50 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                  <Link
                    to={`/details/${product.id}`}
                    className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center group"
                  >
                    View Details
                    <svg
                      className="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.main>
    </motion.div>
  );
}

export default Home;
