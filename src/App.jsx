import React, { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { ProductContext } from "./Utils/Context";
import Home from "./Components/Home";
import Details from "./Components/Details";
import AddProduct from "./Components/AddProduct";
import Cart from "./Components/Cart";
import ErrorBoundary from "./Components/ErrorBoundary";
import { Toast } from "./Components/Toast";
import { LoadingOverlay } from "./Components/LoadingOverlay";
import { SEO } from "./Components/SEO";

function App() {
  const { toast, showToast, setToast, resetToMockProducts, products } =
    useContext(ProductContext);

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
  }, [products]);

  return (
    <ErrorBoundary>
      <SEO
        title="Welcome"
        description="Discover amazing products at great prices"
      />
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
