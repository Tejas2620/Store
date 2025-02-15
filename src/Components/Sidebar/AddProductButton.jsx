import React from "react";
import { Link } from "react-router-dom";

export const AddProductButton = () => {
  return (
    <Link
      to="/add-product"
      className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
    >
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
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
      Add New Sneaker
    </Link>
  );
};