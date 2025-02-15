import React, { useContext, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ProductContext, ProductProvider } from "./Utils/Context";
import { WishlistProvider } from "./Utils/WishlistContext";
import Home from "./Components/Home";
import Details from "./Components/Details";
import AddProduct from "./Components/AddProduct";
import Cart from "./Components/Cart";
import ErrorBoundary from "./Components/ErrorBoundary";
import { Toast } from "./Components/Toast";
import { LoadingOverlay } from "./Components/LoadingOverlay";
import { SEO } from "./Components/SEO";
import { WishlistPage } from "./Components/Wishlist/WishlistPage";
import { Navbar } from "./Components/Navigation/Navbar";
import { motion, AnimatePresence } from "framer-motion";

const App = () => {
  const { toast, showToast, setToast, resetToMockProducts, products } =
    useContext(ProductContext);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Initial loading animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Check if stored products have any unwanted categories
    const hasUnwantedCategories = products?.some(
      (product) =>
        !["Basketball", "Lifestyle", "Collaboration"].includes(product.category)
    );

    // Check if Travis Scott product is in wrong category
    const travisScottProduct = products?.find((product) =>
      product.name.includes("Travis Scott")
    );
    const isTravisScottWrongCategory =
      travisScottProduct && travisScottProduct.category !== "Collaboration";

    // Reset if there are any issues
    if (hasUnwantedCategories || isTravisScottWrongCategory) {
      resetToMockProducts();
      showToast("Products have been reset to maintain consistency", "success");
    }
  }, [products, resetToMockProducts, showToast]);

  return (
    <ErrorBoundary>
      <SEO
        title="Welcome"
        description="Discover amazing products at great prices"
      />
      <ProductProvider>
        <WishlistProvider>
          <div className="min-h-screen">
            <Navbar />
            <main className="pt-16">
              <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                  <Route path="/" element={<Home />} />
                  <Route path="/details/:id" element={<Details />} />
                  <Route path="/add-product" element={<AddProduct />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/wishlist" element={<WishlistPage />} />
                </Routes>
              </AnimatePresence>
            </main>
          </div>

          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50"
            >
              <LoadingOverlay />
            </motion.div>
          )}

          <AnimatePresence>
            {toast && (
              <Toast
                message={toast.message}
                type={toast.type}
                onClose={() => setToast(null)}
              />
            )}
          </AnimatePresence>
        </WishlistProvider>
      </ProductProvider>
    </ErrorBoundary>
  );
};

export default App;
