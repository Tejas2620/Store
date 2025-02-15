import React, { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

const mockProducts = [
  {
    id: 1,
    name: "Nike Air Jordan 1 High OG 'Chicago Lost & Found'",
    description:
      "A reimagined version of the classic 1985 colorway with a vintage aesthetic, featuring aged details and premium leather construction.",
    price: 180,
    image:
      "https://i.pinimg.com/736x/1b/97/b8/1b97b89ffea370ebdce2237b78c53d60.jpg",
    inStock: true,
    isNew: true,
    category: "Basketball",
    specifications: {
      Brand: "Nike",
      Model: "Air Jordan 1",
      Colorway: "Varsity Red/Black-White",
      Material: "Premium Leather",
      Release: "November 2022",
      Style: "DZ5485-612",
    },
  },
  {
    id: 2,
    name: "Adidas Yeezy Boost 350 V2 'Beluga'",
    description:
      "Features a gray Primeknit upper with a bright orange streak running from heel to toe, complete with BOOST cushioning.",
    price: 230,
    image:
      "https://i.pinimg.com/736x/b6/8b/65/b68b65e7dbd2fa6746662890f70d619b.jpg",
    inStock: false,
    isNew: false,
    category: "Lifestyle",
    specifications: {
      Brand: "Adidas",
      Model: "Yeezy Boost 350 V2",
      Colorway: "Beluga/Steel Grey",
      Material: "Primeknit",
      Cushioning: "Full-length BOOST",
      Style: "BB1826",
    },
  },
  {
    id: 3,
    name: "Travis Scott x Nike Air Jordan 1 Low 'Reverse Mocha'",
    description:
      "Features a brown and white color scheme with reverse swoosh design and Travis Scott's signature details.",
    price: 150,
    image:
      "https://i.pinimg.com/736x/d1/3b/4c/d13b4cbb0ca8573988961a4cd3566a94.jpg",
    inStock: true,
    isNew: true,
    category: "Collaboration",
    specifications: {
      Brand: "Nike",
      Model: "Air Jordan 1 Low OG",
      Colorway: "Sail/Dark Mocha",
      Material: "Premium Suede/Leather",
      Release: "July 2022",
      Style: "DM7866-162",
    },
  },
  {
    id: 4,
    name: "New Balance 550 'White Green'",
    description:
      "A retro basketball silhouette featuring a clean white leather upper with green accents.",
    price: 110,
    image:
      "https://i.pinimg.com/736x/26/90/a5/2690a56f154a76fa366c7865df33416a.jpg",
    inStock: true,
    isNew: false,
    category: "Basketball",
    specifications: {
      Brand: "New Balance",
      Model: "550",
      Colorway: "White/Green",
      Material: "Leather/Mesh",
      Release: "2021",
      Style: "BB550WT1",
    },
  },
  {
    id: 5,
    name: "Nike Air Max 90 'Infrared'",
    description:
      "An iconic colorway of the legendary Air Max 90, featuring the classic infrared accent that helped define sneaker culture in the 90s.",
    price: 120,
    image:
      "https://i.pinimg.com/736x/5e/a1/f0/5ea1f0d52736523fd43f90aedd15c260.jpg",
    inStock: true,
    isNew: false,
    category: "Lifestyle",
    specifications: {
      Brand: "Nike",
      Model: "Air Max 90",
      Colorway: "White/Black/Infrared",
      Material: "Mesh/Suede/Leather",
      Release: "2020",
      Style: "CT1685-100",
    },
  },
  {
    id: 6,
    name: "Nike Air Jordan 1 x Travis Scott 'Mocha'",
    description:
      "A highly coveted collaboration featuring premium suede and leather construction, with Travis Scott's signature reverse Swoosh and Cactus Jack branding.",
    price: 175,
    image:
      "https://i.pinimg.com/736x/f3/12/bd/f312bd774d9f1fd2f751df12d65f8149.jpg",
    inStock: true,
    isNew: false,
    category: "Collaboration",
    specifications: {
      Brand: "Nike",
      Model: "Air Jordan 1 High OG",
      Colorway: "Dark Mocha/Black-Sail",
      Material: "Premium Suede/Leather",
      Release: "May 2019",
      Style: "CD4487-100",
    },
  },
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("products");
    return savedProducts ? JSON.parse(savedProducts) : mockProducts;
  });

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const addProduct = (newProduct) => {
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts, newProduct];
      localStorage.setItem("products", JSON.stringify(updatedProducts));
      return updatedProducts;
    });
  };

  const addToCart = async (product) => {
    setLoading(true);
    try {
      setCart((prev) => [...prev, { ...product, quantity: 1 }]);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const toggleWishlist = (productId) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const deleteProduct = (productId) => {
    setProducts((prevProducts) => {
      const filteredProducts = prevProducts.filter(
        (product) => product.id !== productId
      );
      localStorage.setItem("products", JSON.stringify(filteredProducts));
      return filteredProducts;
    });
  };

  const resetToMockProducts = () => {
    setProducts(mockProducts);
    localStorage.setItem("products", JSON.stringify(mockProducts));
  };

  // Simulate loading for better UX
  React.useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        addProduct,
        loading,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        wishlist,
        toggleWishlist,
        showToast,
        toast,
        setToast,
        deleteProduct,
        resetToMockProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
