import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductContext } from "../Utils/Context";
import { SEO } from "./SEO";
import { useKeyboardNavigation } from "../hooks/useKeyboardNavigation";
import { motion } from "framer-motion";
import { LoadingScreen } from "./LoadingScreen";
import { ImageSection } from "./Details/ImageSection";
import { ContentSection } from "./Details/ContentSection";

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
  const { products, loading, deleteProduct, showToast } =
    useContext(ProductContext);
  const [product, setProduct] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (!loading && products) {
      const foundProduct = products.find(
        (p) => p.id === parseInt(id) || p.id === id
      );
      if (foundProduct) {
        setProduct(foundProduct);
        // Update recently viewed products
        const recentlyViewed = JSON.parse(
          localStorage.getItem("recentlyViewed") || "[]"
        );
        const updatedRecent = [
          foundProduct,
          ...recentlyViewed.filter((p) => p.id !== foundProduct.id),
        ].slice(0, 4); // Keep only last 4 items
        localStorage.setItem("recentlyViewed", JSON.stringify(updatedRecent));
      } else {
        navigate("/");
      }
    }
  }, [id, products, loading, navigate]);

  useKeyboardNavigation(() => navigate("/"));

  const handleDelete = () => {
    deleteProduct(product.id);
    showToast("Product deleted successfully", "success");
    navigate("/");
  };

  if (loading || !product) {
    return <LoadingScreen />;
  }

  return (
    <>
      <SEO
        title={product.name}
        description={`Check out ${product.name} at SneakPro - Your premium sneaker destination`}
      />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 flex items-center justify-center">
        <motion.div
          className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row w-full max-w-6xl mx-auto h-[600px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ImageSection
            product={product}
            imageLoaded={imageLoaded}
            setImageLoaded={setImageLoaded}
          />
          <ContentSection
            product={product}
            onDelete={() => setShowDeleteModal(true)}
          />
        </motion.div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Delete Product
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this product? This action cannot
              be undone.
            </p>
            <div className="flex justify-end gap-4">
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
