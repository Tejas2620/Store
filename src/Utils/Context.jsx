import React, { createContext, useState, useEffect } from "react";
import { mockData } from "./mockData";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("products");
    return savedProducts ? JSON.parse(savedProducts) : mockData;
  });

  const [toast, setToast] = useState(null);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    const savedProducts = localStorage.getItem("products");
    if (!savedProducts) {
      setProducts(mockData);
      localStorage.setItem("products", JSON.stringify(mockData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addProduct = (product) => {
    setProducts([...products, product]);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const resetToMockProducts = () => {
    setProducts(mockData);
  };

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const addToCart = (product, quantity = 1) => {
    if (!product.inStock) {
      showToast("Product is out of stock", "error");
      return;
    }

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > product.stockQuantity) {
          showToast("Cannot add more than available stock", "error");
          return prevCart;
        }
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: newQuantity } : item
        );
      }

      showToast(`Added ${product.name} to cart`, "success");
      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const itemToRemove = prevCart.find((item) => item.id === productId);
      if (itemToRemove) {
        showToast(`Removed ${itemToRemove.name} from cart`, "success");
      }
      return prevCart.filter((item) => item.id !== productId);
    });
  };

  const updateCartQuantity = (productId, quantity) => {
    setCart((prevCart) => {
      const product = products.find((p) => p.id === productId);

      if (quantity > product.stockQuantity) {
        showToast("Cannot exceed available stock", "error");
        return prevCart;
      }

      return prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: Math.max(0, quantity) }
            : item
        )
        .filter((item) => item.quantity > 0);
    });
  };

  const clearCart = () => {
    setCart([]);
    showToast("Cart cleared", "success");
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        addProduct,
        deleteProduct,
        resetToMockProducts,
        toast,
        setToast,
        showToast,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
