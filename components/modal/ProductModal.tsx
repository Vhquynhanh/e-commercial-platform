"use client";
import { useEffect } from "react";
import { Product } from "@/types/product";
import {
  X,
  Star,
  Users,
  Clock,
  Heart,
  ShoppingCart,
  PlayCircle
} from "lucide-react";
import { useProduct } from "@/contexts/ProductContext";
import { formatPrice } from "@/lib/utils";

export default function ProductModal() {
  const {
    selectedProduct,
    showModal,
    handleCloseModal,
    favorites,
    handleToggleFavorite
  } = useProduct();
  const isOpen = showModal;
  const product = selectedProduct;
  const isFavorite = selectedProduct
    ? favorites.includes(selectedProduct.id)
    : false;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const onToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (handleToggleFavorite) {
      handleToggleFavorite(product.id);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-600 p-6 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex-1 pr-4">
            {product.name}
          </h2>
          <button
            onClick={handleCloseModal}
            className="p-2 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-900 dark:text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Image and Info */}
            <div>
              {/* Image */}
              <div className="relative mb-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-xl"
                />
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${
                      product.level === "Beginner"
                        ? "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100"
                        : product.level === "Intermediate"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100"
                        : "bg-red-100 text-red-800 dark:bg-red-700 dark:text-red-100"
                    }`}
                  >
                    {product.level}
                  </span>
                </div>
              </div>

              {/* Rating and Reviews */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {product.rating}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    ({product.reviews} đánh giá)
                  </span>
                </div>
                <span className="text-blue-600 dark:text-blue-400 font-medium">
                  {product.category}
                </span>
              </div>

              {/* Meta Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {product.students.toLocaleString()} học viên
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    {product.duration}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <PlayCircle className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <span className="text-gray-700 dark:text-gray-300">
                    Giảng viên: {product.instructor}
                  </span>
                </div>
              </div>

              {/* Tags */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">
                  Chủ đề:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full dark:bg-blue-600 dark:text-blue-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Description and Actions */}
            <div>
              {/* Description */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">
                  Mô tả khoá học:
                </h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {product.longDescription}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {product.shortDescription}
                </p>
              </div>

              {/* What you'll learn */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">
                  Bạn sẽ học được gì:
                </h4>
                <ul className="space-y-2">
                  {product.tags.map((tag, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-700 dark:text-gray-300">
                        Thành thạo {tag}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price and Actions */}
              <div className="border-t pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                  <button
                    onClick={onToggleFavorite}
                    className={`p-3 rounded-full transition-all duration-200 ${
                      isFavorite
                        ? "bg-red-500 text-white shadow-lg"
                        : "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
                    }`}
                  >
                    <Heart
                      className={`w-6 h-6 ${isFavorite ? "fill-current" : ""}`}
                    />
                  </button>
                </div>

                <div className="space-y-3">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2">
                    <ShoppingCart className="w-5 h-5" />
                    <span>Mua ngay</span>
                  </button>
                  <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold transition-colors duration-200 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500">
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
