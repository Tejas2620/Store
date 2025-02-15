import React from "react";
import { motion } from "framer-motion";
import { typography } from "../../styles/typography";

const sidebarVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  }
};

export const Sidebar = ({
  categories,
  selectedCategory,
  onCategoryClick,
  searchQuery,
  onSearch,
  sortBy,
  onSort
}) => {
  return (
    <motion.div
      variants={sidebarVariants}
      initial="hidden"
      animate="visible"
      className="bg-white rounded-2xl shadow-lg p-6"
    >
      {/* Search Section */}
      <motion.div variants={itemVariants} className="mb-8">
        <h2 className={`${typography.heading3} text-gray-800 mb-4`}>Search</h2>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={onSearch}
            placeholder="Search sneakers..."
            className={`${typography.body2} w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none`}
          />
          <svg
            className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </motion.div>

      {/* Sort Section */}
      <motion.div variants={itemVariants} className="mb-8">
        <h2 className={`${typography.heading3} text-gray-800 mb-4`}>Sort By</h2>
        <select
          value={sortBy}
          onChange={onSort}
          className={`${typography.body2} w-full px-4 py-2.5 rounded-xl border border-gray-200
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none
            bg-gradient-to-r from-gray-50 to-gray-100 cursor-pointer`}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="nameAsc">Name: A to Z</option>
          <option value="nameDesc">Name: Z to A</option>
        </select>
      </motion.div>

      {/* Categories Section */}
      <motion.div variants={itemVariants}>
        <h2 className={`${typography.heading3} text-gray-800 mb-4`}>Categories</h2>
        <div className="space-y-2">
          {categories.map((category) => (
            <motion.button
              key={category.name}
              onClick={() => onCategoryClick(category.name)}
              className={`w-full px-4 py-2.5 rounded-xl flex items-center justify-between group transition-all duration-300 ${
                selectedCategory === category.name
                  ? `bg-gradient-to-r ${category.color} text-white`
                  : "bg-gray-50 hover:bg-gray-100 text-gray-700"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className={typography.button}>{category.name}</span>
              <span className={`${typography.caption} ${
                selectedCategory === category.name
                  ? "bg-white/20"
                  : "bg-gray-200 group-hover:bg-gray-300"
              } px-2 py-0.5 rounded-full transition-colors duration-300`}>
                {category.count}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};