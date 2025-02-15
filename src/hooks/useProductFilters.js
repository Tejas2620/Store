import { useState, useMemo } from "react";

const getCategoryColor = (category) => {
  const colors = {
    Basketball: "blue",
    Lifestyle: "green",
    Collaboration: "purple",
    Running: "red",
    Training: "orange",
  };
  return colors[category] || "gray";
};

const filterProducts = (products, searchQuery, category) => {
  return products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = category === "All" || product.category === category;
    return matchesSearch && matchesCategory;
  });
};

const sortProducts = (products, sortBy) => {
  const sortedProducts = [...products];
  switch (sortBy) {
    case "newest":
      return sortedProducts.reverse();
    case "oldest":
      return sortedProducts;
    case "priceAsc":
      return sortedProducts.sort((a, b) => a.price - b.price);
    case "priceDesc":
      return sortedProducts.sort((a, b) => b.price - a.price);
    case "nameAsc":
      return sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    case "nameDesc":
      return sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    default:
      return sortedProducts;
  }
};

export const useProductFilters = (products) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const categories = useMemo(() => {
    if (!products) return [];
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    return uniqueCategories.map(category => ({
      name: category,
      count: products.filter(p => p.category === category).length,
      color: getCategoryColor(category)
    }));
  }, [products]);

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return sortProducts(
      filterProducts(products, searchQuery, selectedCategory),
      sortBy
    );
  }, [products, searchQuery, selectedCategory, sortBy]);

  const handleSearch = (e) => setSearchQuery(e.target.value);
  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? "All" : category);
  };
  const handleSort = (e) => setSortBy(e.target.value);

  return {
    searchQuery,
    selectedCategory,
    sortBy,
    filteredProducts,
    handleSearch,
    handleCategoryClick,
    handleSort,
    categories
  };
};