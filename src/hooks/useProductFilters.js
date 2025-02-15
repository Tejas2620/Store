import { useState, useEffect, useContext } from "react";
import { ProductContext } from "../Utils/Context";

const getCategoryColor = (category) => {
  const colors = {
    Basketball: "from-blue-500 to-blue-600",
    Lifestyle: "from-green-500 to-green-600",
    Collaboration: "from-purple-500 to-purple-600",
    Running: "from-red-500 to-red-600",
    Training: "from-orange-500 to-orange-600",
    All: "from-gray-700 to-gray-800"
  };
  return colors[category] || "from-gray-500 to-gray-600";
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

export const useProductFilters = () => {
  const { products, loading } = useContext(ProductContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Process categories with counts and colors
  useEffect(() => {
    if (products) {
      const categoryCounts = products.reduce((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
      }, {});

      const allCount = products.length;
      const uniqueCategories = ["All", ...new Set(products.map(p => p.category))];

      const processedCategories = uniqueCategories.map(category => ({
        name: category,
        count: category === "All" ? allCount : categoryCounts[category] || 0,
        color: getCategoryColor(category)
      }));

      setCategories(processedCategories);
    }
  }, [products]);

  // Filter and sort products
  useEffect(() => {
    if (!products) return;

    let result = [...products];

    // Apply category filter
    if (selectedCategory !== "All") {
      result = result.filter(product => product.category === selectedCategory);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "priceAsc":
          return a.price - b.price;
        case "priceDesc":
          return b.price - a.price;
        case "nameAsc":
          return a.name.localeCompare(b.name);
        case "nameDesc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

    setFilteredProducts(result);
  }, [products, selectedCategory, searchQuery, sortBy]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
  };

  return {
    searchQuery,
    selectedCategory,
    sortBy,
    filteredProducts,
    handleSearch,
    handleCategoryClick,
    handleSort,
    categories,
    loading
  };
};