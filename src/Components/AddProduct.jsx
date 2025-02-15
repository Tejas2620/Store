import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../Utils/Context";
import { typography } from "../styles/typography";
import { LoadingScreen } from "./LoadingScreen";

const AddProduct = () => {
  const navigate = useNavigate();
  const { addProduct, showToast } = useContext(ProductContext);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    inStock: true,
    isNew: true,
    specifications: {
      Brand: "",
      Model: "",
      Colorway: "",
      Material: "",
      Release: "",
      Style: "",
    },
  });

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    if (name.includes("spec.")) {
      const specName = name.split(".")[1];
      setFormData(prev => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [specName]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === "checkbox" ? e.target.checked : value
      }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newProduct = {
        ...formData,
        id: Date.now() + Math.floor(Math.random() * 1000),
        price: parseFloat(formData.price),
      };

      addProduct(newProduct);
      showToast("Product added successfully!", "success");
      navigate("/");
    } catch (error) {
      showToast("Failed to add product. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  if (pageLoading) {
    return <LoadingScreen />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6"
    >
      <div className="max-w-3xl mx-auto">
        {/* Progress Bar */}
        <motion.div className="mb-8">
          <div className="flex justify-between mb-2">
            {["Basic Info", "Specifications", "Preview"].map((label, idx) => (
              <motion.div
                key={idx}
                className={`flex flex-col items-center ${
                  idx + 1 === step ? "text-blue-600" : "text-gray-400"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-2
                    ${idx + 1 === step
                      ? "bg-blue-600 text-white"
                      : idx + 1 < step
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                >
                  {idx + 1 < step ? "✓" : idx + 1}
                </div>
                <span className={`${typography.caption} hidden sm:block`}>
                  {label}
                </span>
              </motion.div>
            ))}
          </div>
          <div className="relative h-2 bg-gray-200 rounded-full">
            <motion.div
              className="absolute top-0 left-0 h-full bg-blue-600 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${((step - 1) / 2) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
        >
          <div className="p-8">
            <h1 className={`${typography.heading2} text-gray-900 mb-6`}>
              Add New Product
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    {/* Basic Info Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className={`${typography.label} text-gray-700`}>
                          Product Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="mt-1 w-full px-4 py-2 rounded-xl border border-gray-200
                            focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className={`${typography.label} text-gray-700`}>
                          Price
                        </label>
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          className="mt-1 w-full px-4 py-2 rounded-xl border border-gray-200
                            focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`${typography.label} text-gray-700`}>
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={4}
                        className="mt-1 w-full px-4 py-2 rounded-xl border border-gray-200
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className={`${typography.label} text-gray-700`}>
                        Category
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="mt-1 w-full px-4 py-2 rounded-xl border border-gray-200
                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="">Select Category</option>
                        <option value="Basketball">Basketball</option>
                        <option value="Lifestyle">Lifestyle</option>
                        <option value="Collaboration">Collaboration</option>
                      </select>
                    </div>

                    <div className="flex gap-6">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="inStock"
                          checked={formData.inStock}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-blue-600 rounded
                            focus:ring-2 focus:ring-blue-500"
                        />
                        <span className={`${typography.body2} text-gray-700`}>
                          In Stock
                        </span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="isNew"
                          checked={formData.isNew}
                          onChange={handleInputChange}
                          className="w-4 h-4 text-blue-600 rounded
                            focus:ring-2 focus:ring-blue-500"
                        />
                        <span className={`${typography.body2} text-gray-700`}>
                          New Arrival
                        </span>
                      </label>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    {/* Specifications Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Object.keys(formData.specifications).map((spec) => (
                        <div key={spec}>
                          <label className={`${typography.label} text-gray-700`}>
                            {spec}
                          </label>
                          <input
                            type="text"
                            name={`spec.${spec}`}
                            value={formData.specifications[spec]}
                            onChange={handleInputChange}
                            className="mt-1 w-full px-4 py-2 rounded-xl border border-gray-200
                              focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>
                      ))}
                    </div>

                    <div>
                      <label className={`${typography.label} text-gray-700`}>
                        Product Image
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300
                        border-dashed rounded-xl hover:border-blue-500 transition-colors">
                        <div className="space-y-1 text-center">
                          {imagePreview ? (
                            <div className="relative w-48 h-48 mx-auto">
                              <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-full h-full object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setImagePreview(null);
                                  setFormData(prev => ({ ...prev, image: "" }));
                                }}
                                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full
                                  hover:bg-red-600 transition-colors"
                              >
                                ✕
                              </button>
                            </div>
                          ) : (
                            <>
                              <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                              >
                                <path
                                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <div className="flex justify-center text-sm text-gray-600">
                                <label className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                                  <span>Upload a file</span>
                                  <input
                                    type="file"
                                    className="sr-only"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                  />
                                </label>
                              </div>
                              <p className={`${typography.caption} text-gray-500`}>
                                PNG, JPG, GIF up to 10MB
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    {/* Preview Section */}
                    <div className="bg-gray-50 rounded-xl p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                          {imagePreview ? (
                            <img
                              src={imagePreview}
                              alt="Product preview"
                              className="w-full h-64 object-cover rounded-xl shadow-lg"
                            />
                          ) : (
                            <div className="w-full h-64 bg-gray-200 rounded-xl flex items-center justify-center">
                              <span className="text-gray-400">No image uploaded</span>
                            </div>
                          )}
                        </div>
                        <div className="space-y-4">
                          <h2 className={`${typography.heading3} text-gray-900`}>
                            {formData.name || "Product Name"}
                          </h2>
                          <p className={`${typography.body1} text-gray-600`}>
                            {formData.description || "Product description"}
                          </p>
                          <p className={`${typography.price} text-blue-600`}>
                            ${formData.price || "0.00"}
                          </p>
                          <div className="flex gap-2">
                            <span className={`${typography.caption} px-2 py-1 rounded-full
                              ${formData.inStock
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"}`}
                            >
                              {formData.inStock ? "In Stock" : "Out of Stock"}
                            </span>
                            {formData.isNew && (
                              <span className={`${typography.caption} px-2 py-1 rounded-full
                                bg-blue-100 text-blue-800`}
                              >
                                New Arrival
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t border-gray-200">
                {step > 1 ? (
                  <motion.button
                    type="button"
                    onClick={prevStep}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`${typography.button} px-6 py-2 rounded-xl
                      border-2 border-gray-200 text-gray-600
                      hover:bg-gray-50 transition-colors`}
                  >
                    Previous
                  </motion.button>
                ) : (
                  <div />
                )}

                {step < 3 ? (
                  <motion.button
                    type="button"
                    onClick={nextStep}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`${typography.button} px-6 py-2 rounded-xl
                      bg-blue-600 text-white hover:bg-blue-700
                      transition-colors`}
                  >
                    Next
                  </motion.button>
                ) : (
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`${typography.button} px-6 py-2 rounded-xl
                      bg-blue-600 text-white hover:bg-blue-700
                      transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                      flex items-center gap-2`}
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Adding Product...
                      </>
                    ) : (
                      "Add Product"
                    )}
                  </motion.button>
                )}
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AddProduct;