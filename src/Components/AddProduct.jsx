import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../Utils/Context";

function AddProduct() {
  const navigate = useNavigate();
  const { products, addProduct, showToast } = useContext(ProductContext);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "Basketball",
    inStock: true,
    isNew: false,
    specifications: {
      Brand: "",
      Model: "",
      Colorway: "",
      Material: "",
      Release: "",
      Style: "",
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSpecChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const newProduct = {
        id: Date.now(),
        ...formData,
        price: Number(formData.price),
      };
      addProduct(newProduct);
      showToast("Product added successfully!");
      navigate("/");
    } catch (error) {
      showToast("Failed to add product", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Sneaker</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sneaker Name
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Nike Air Jordan 1 High OG"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price
              </label>
              <input
                type="number"
                name="price"
                required
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 199"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              required
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter product description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="url"
              name="image"
              required
              value={formData.image}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter image URL"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="category"
                  list="categories"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter or select category"
                />
                <datalist id="categories">
                  <option value="Basketball" />
                  <option value="Lifestyle" />
                  <option value="Collaboration" />
                  <option value="Running" />
                  <option value="Training" />
                  <option value="Skateboarding" />
                  <option value="Tennis" />
                  <option value="Golf" />
                </datalist>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">In Stock</span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isNew"
                  checked={formData.isNew}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">New Release</span>
              </label>
            </div>
          </div>

          {/* Specifications */}
          <div className="border-t pt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.keys(formData.specifications).map((spec) => (
                <div key={spec}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {spec}
                  </label>
                  <input
                    type="text"
                    name={spec}
                    value={formData.specifications[spec]}
                    onChange={handleSpecChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder={`Enter ${spec.toLowerCase()}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-6 py-3 rounded-xl border-2 border-gray-200 text-gray-600 hover:bg-gray-50 transition-all duration-200 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 font-semibold"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;