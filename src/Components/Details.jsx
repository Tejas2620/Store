import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "../Utils/Context";
import { SEO } from "../Components/SEO";
import { useKeyboardNavigation } from "../hooks/useKeyboardNavigation";
import { motion } from "framer-motion";

// Add this CSS class at the top of your component
const hideScrollbarStyle = {
  scrollbarWidth: "none" /* Firefox */,
  msOverflowStyle: "none" /* IE and Edge */,
  "&::-webkit-scrollbar": {
    display: "none" /* Chrome, Safari and Opera */,
  },
};

function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading, addToCart, deleteProduct, showToast } =
    useContext(ProductContext);
  const [product, setProduct] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (!loading && products) {
      const foundProduct = products.find(
        (p) => p.id === parseInt(id) || p.id === id
      );
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        navigate("/");
      }
    }
  }, [id, products, loading, navigate]);

  const handleAddToCart = () => {
    if (product.inStock) {
      setIsLoading(true);
      try {
        addToCart(product);
        showToast("Added to cart successfully!");
        navigate("/cart");
      } catch (error) {
        showToast("Failed to add to cart", "error");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDelete = () => {
    try {
      deleteProduct(product.id);
      showToast("Product deleted successfully");
      navigate("/");
    } catch (error) {
      showToast("Failed to delete product", "error");
    }
  };

  const getStockStatus = () => {
    if (product.inStock) {
      return {
        text: "In Stock",
        colorClass: "text-green-500 bg-green-50",
        dotClass: "bg-green-500",
        buttonClass: "bg-blue-600 text-white hover:bg-blue-700",
        buttonText: "Add to Cart",
      };
    } else {
      return {
        text: "Out of Stock",
        colorClass: "text-red-500 bg-red-50",
        dotClass: "bg-red-500",
        buttonClass: "bg-gray-300 text-gray-500 cursor-not-allowed",
        buttonText: "Out of Stock",
      };
    }
  };

  useKeyboardNavigation(() => {
    navigate("/");
  });

  if (loading || !product) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row w-full max-w-6xl h-[600px] animate-pulse">
          <div className="w-full md:w-1/2 relative h-full bg-gray-200"></div>
          <div className="p-8 md:p-12 flex flex-col justify-center space-y-6 md:w-1/2">
            <div className="h-12 bg-gray-200 rounded-lg w-3/4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
            <div className="flex items-center justify-between">
              <div className="h-8 bg-gray-200 rounded-lg w-24"></div>
              <div className="h-6 bg-gray-200 rounded-full w-20"></div>
            </div>
            <div className="h-12 bg-gray-200 rounded-xl w-32"></div>
          </div>
        </div>
      </div>
    );
  }

  const stockStatus = getStockStatus();

  return (
    <>
      <SEO
        title={product?.name || "Product Details"}
        description={product?.description}
        image={product?.image}
      />
      <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row w-full max-w-6xl h-[700px] transform hover:scale-[1.01] transition-all duration-500">
          {/* Image Section */}
          <div className="w-full md:w-1/2 relative h-full bg-gray-100 overflow-hidden group">
            <motion.img
              src={product.image}
              alt={product.name}
              className={`w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={() => setImageLoaded(true)}
            />

            {/* Subtle Gradient Overlay */}
            <motion.div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

            {/* Price Tag - Top Left */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg transform -translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
            >
              <span className="text-blue-600 font-bold text-lg">
                ${product.price}
              </span>
            </motion.div>

            {/* Model Info - Bottom */}
            <motion.div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-all duration-500">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-gray-500 text-sm">Model</span>
                    <h3 className="text-gray-800 font-bold">
                      {product.specifications.Model}
                    </h3>
                  </div>
                  {product.inStock ? (
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      In Stock
                    </span>
                  ) : (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Sold Out
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-12 flex flex-col md:w-1/2 h-full">
            {/* Main Content */}
            <div
              className="flex-grow space-y-6 overflow-y-auto pr-2"
              style={hideScrollbarStyle}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-tight animate-fade-in">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                {product.description}
              </p>

              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold text-gray-800">
                    ${product.price}
                  </p>
                  <span
                    className={`${stockStatus.colorClass} px-4 py-1 rounded-full text-sm font-medium flex items-center`}
                  >
                    <span
                      className={`w-2 h-2 ${stockStatus.dotClass} rounded-full mr-2 animate-pulse`}
                    ></span>
                    {stockStatus.text}
                  </span>
                </div>
              </div>

              {/* Specifications */}
              {product.specifications && (
                <div className="border-t border-gray-100 pt-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                      />
                    </svg>
                    Specifications
                  </h2>
                  <ul
                    className="grid grid-cols-2 gap-4 max-h-[180px] overflow-y-auto pr-2"
                    style={hideScrollbarStyle}
                  >
                    {Object.entries(product.specifications).map(
                      ([key, value]) => (
                        <li
                          key={key}
                          className="group relative flex flex-col text-gray-600 bg-gray-50 p-4 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:bg-white cursor-pointer min-h-[80px]"
                        >
                          {/* Animated Background */}
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                          {/* Border Animation */}
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                            <div className="absolute inset-y-0 right-0 w-0.5 bg-gradient-to-b from-indigo-500 to-blue-500 transform origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500 delay-100"></div>
                            <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 transform origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-200"></div>
                            <div className="absolute inset-y-0 left-0 w-0.5 bg-gradient-to-t from-blue-500 to-indigo-500 transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 delay-300"></div>
                          </div>

                          {/* Content */}
                          <div className="relative flex flex-col justify-between h-full pr-6">
                            <span className="text-sm font-medium text-gray-500 group-hover:text-blue-600 transition-colors duration-200 mb-1">
                              {key}
                            </span>
                            <span className="font-medium text-gray-800 break-words group-hover:text-gray-900 transition-colors duration-200">
                              {value}
                            </span>

                            {/* Icon */}
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transform translate-x-full group-hover:translate-x-0 transition-all duration-300">
                              <svg
                                className="w-4 h-4 text-blue-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                              </svg>
                            </div>
                          </div>

                          {/* Hover Effect Overlay */}
                          <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-indigo-500/0"></div>
                          </div>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* Action Buttons - Updated */}
            <div className="flex gap-4 pt-6 mt-6 border-t border-gray-100">
              <button
                onClick={() => {
                  addToCart(product);
                  navigate("/cart");
                }}
                disabled={!product.inStock}
                className={`flex-1 inline-flex items-center justify-center px-8 py-4 rounded-xl transform hover:-translate-y-1 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl ${
                  product.inStock
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {product.inStock ? "Add to Cart" : "Out of Stock"}
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </button>

              <button
                onClick={() => setShowDeleteModal(true)}
                className="px-6 py-4 rounded-xl border-2 border-red-200 text-red-600 hover:bg-red-50 transform hover:-translate-y-1 transition-all duration-200 font-semibold"
              >
                Delete
              </button>

              <Link
                to="/"
                className="px-6 py-4 rounded-xl border-2 border-gray-200 text-gray-600 hover:bg-gray-50 transform hover:-translate-y-1 transition-all duration-200 font-semibold"
              >
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Delete Product
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{product.name}"? This action
              cannot be undone.
            </p>
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-lg border-2 border-gray-200 text-gray-600 hover:bg-gray-50 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all duration-200"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

export default Details;
