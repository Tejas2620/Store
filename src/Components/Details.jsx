import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ProductContext } from "../Utils/Context";
import { WishlistContext } from "../Utils/WishlistContext";
import { SEO } from "./SEO";
import { ImageSection } from "./Details/ImageSection";
import { ContentSection } from "./Details/ContentSection";
import { DeleteModal } from "./Modals/DeleteModal";
import { LoadingScreen } from "./LoadingScreen";

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, deleteProduct, loading, addToCart } =
    useContext(ProductContext);
  const { addToWishlist } = useContext(WishlistContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showSizeError, setShowSizeError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  const product = products.find((p) => p.id === id || p.id === parseInt(id));

  // Handle recently viewed products
  useEffect(() => {
    if (product) {
      const viewed = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
      const updatedViewed = [
        product,
        ...viewed.filter((p) => p.id !== product.id),
      ].slice(0, 4);
      localStorage.setItem("recentlyViewed", JSON.stringify(updatedViewed));
      setRecentlyViewed(updatedViewed.filter((p) => p.id !== product.id));
    }
  }, [product]);

  if (loading) return <LoadingScreen />;

  if (!product) {
    useEffect(() => {
      navigate("/");
    }, [navigate]);
    return null;
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      setShowSizeError(true);
      return;
    }
    addToCart({ ...product, size: selectedSize, quantity });
    // Show success toast or modal
  };

  const handleDelete = () => {
    deleteProduct(id);
    navigate("/");
  };

  const handleBack = () => {
    navigate(-1); // This will go back to the previous page
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96],
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.4 },
    },
  };

  const cardVariants = {
    initial: { opacity: 0, y: 50, scale: 0.98 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  };

  const recentlyViewedVariants = {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.4,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <SEO
        title={`${product.name} | SneakPro`}
        description={`Check out ${product.name} at SneakPro - Your premium sneaker destination`}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb with animation */}
          <motion.nav variants={pageVariants} className="mb-8">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li>
                <a href="/" className="hover:text-blue-600">
                  Home
                </a>
              </li>
              <li>/</li>
              <li>
                <a href="/category" className="hover:text-blue-600">
                  {product.category}
                </a>
              </li>
              <li>/</li>
              <li className="text-gray-900 font-medium">{product.name}</li>
            </ol>
          </motion.nav>

          {/* Main Product Card with enhanced animation */}
          <motion.div
            variants={cardVariants}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-row w-full"
            style={{ height: "550px" }}
            whileHover={{
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
              transition: { duration: 0.3 },
            }}
          >
            {/* Left Side - Image */}
            <div className="w-1/2 relative">
              <ImageSection
                product={product}
                imageLoaded={imageLoaded}
                setImageLoaded={setImageLoaded}
                onDelete={() => setShowDeleteModal(true)}
                onBack={handleBack}
              />
            </div>

            {/* Right Side - Content */}
            <div className="w-1/2 overflow-y-auto p-6 md:p-8 flex flex-col bg-white border-l border-gray-100">
              <ContentSection
                product={product}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
                showSizeError={showSizeError}
                setShowSizeError={setShowSizeError}
                quantity={quantity}
                setQuantity={setQuantity}
                onAddToCart={handleAddToCart}
              />
            </div>
          </motion.div>

          {/* Recently Viewed Section with enhanced animation */}
          {recentlyViewed.length > 0 && (
            <motion.div variants={recentlyViewedVariants} className="mt-12">
              <motion.h2
                variants={pageVariants}
                className="text-2xl font-bold text-gray-900 mb-6"
              >
                Recently Viewed
              </motion.h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {recentlyViewed.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.5,
                        delay: index * 0.1,
                        ease: [0.43, 0.13, 0.23, 0.96],
                      },
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -5,
                      transition: { duration: 0.2 },
                    }}
                    className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                    onClick={() => {
                      navigate(`/details/${item.id}`);
                      window.scrollTo(0, 0);
                    }}
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <motion.img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        whileHover={{
                          scale: 1.1,
                          transition: { duration: 0.4 },
                        }}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: { delay: 0.2 },
                        }}
                        className="absolute top-2 right-2 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-bold text-blue-600 shadow-md"
                      >
                        ${item.price}
                      </motion.div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 mb-1 truncate">
                        {item.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">
                          {item.brand}
                        </span>
                        <motion.span
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{
                            scale: 1,
                            opacity: 1,
                            transition: { delay: 0.3 },
                          }}
                          className={`text-sm px-2 py-1 rounded-full ${
                            item.inStock
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {item.inStock ? "In Stock" : "Out of Stock"}
                        </motion.span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDelete}
        itemName={product.name}
      />
    </motion.div>
  );
};

export default Details;
