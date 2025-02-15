import React from "react";
import { motion } from "framer-motion";
import { CategoryList } from "./CategoryList";
import { SearchBar } from "./SearchBar";
import { AddProductButton } from "./AddProductButton";
import { BrandHeader } from "./BrandHeader";

export const Sidebar = ({
  categories,
  selectedCategory,
  onCategoryClick,
  searchQuery,
  onSearchChange
}) => {
  return (
    <motion.nav
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="w-[280px] h-screen bg-white/80 backdrop-blur-md shadow-xl flex flex-col gap-6 p-8 sticky top-0"
    >
      <BrandHeader />
      <AddProductButton />
      <SearchBar value={searchQuery} onChange={onSearchChange} />
      <CategoryList
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryClick={onCategoryClick}
      />
    </motion.nav>
  );
};