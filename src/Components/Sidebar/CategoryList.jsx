import React from "react";
import { motion } from "framer-motion";

export const CategoryList = ({ categories, selectedCategory, onCategoryClick }) => {
  return (
    <div>
      <h3 className="text-lg font-bold text-gray-800 mb-4">Categories</h3>
      <ul className="space-y-2">
        {/* "All" category */}
        <li className="group">
          <button
            className={`w-full p-3 flex items-center rounded-xl hover:bg-gray-50 transition-all duration-300 ${
              selectedCategory === "All" ? "bg-gray-50" : ""
            }`}
            onClick={() => onCategoryClick("All")}
          >
            <span className="w-3 h-3 rounded-full bg-gray-400 mr-3 group-hover:animate-pulse"></span>
            <span className="text-gray-700 font-medium">All Products</span>
            <span className="ml-auto text-gray-400 text-sm">
              {categories.reduce((sum, cat) => sum + cat.count, 0)}
            </span>
          </button>
        </li>

        {categories.map((category) => (
          <li key={category.name} className="group">
            <button
              className={`w-full p-3 flex items-center rounded-xl hover:bg-gray-50 transition-all duration-300 ${
                selectedCategory === category.name ? "bg-gray-50" : ""
              }`}
              onClick={() => onCategoryClick(category.name)}
            >
              <span className={`w-3 h-3 rounded-full bg-blue-500 mr-3 group-hover:animate-pulse`}></span>
              <span className="text-gray-700 font-medium">{category.name}</span>
              <span className="ml-auto text-gray-400 text-sm">{category.count}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};