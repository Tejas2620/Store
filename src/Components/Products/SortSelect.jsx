import React from "react";

export const SortSelect = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="px-4 py-2 rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="newest">Newest First</option>
      <option value="oldest">Oldest First</option>
      <option value="priceAsc">Price: Low to High</option>
      <option value="priceDesc">Price: High to Low</option>
      <option value="nameAsc">Name: A to Z</option>
      <option value="nameDesc">Name: Z to A</option>
    </select>
  );
};