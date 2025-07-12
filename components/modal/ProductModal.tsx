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
      <div className="background-light100_dark100 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 background-light100_dark100 border-b border-light200_dark600 p-6 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-dark900_light100 flex-1 pr-4">
            {product.name}
          </h2>
          <button
            onClick={handleCloseModal}
            className="p-2 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-dark900_light100" />
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
                  <span className="text-lg font-semibold text-dark900_light100">
                    {product.rating}
                  </span>
                  <span className="text-dark600_light400">
                    ({product.reviews} đánh giá)
                  </span>
                </div>
                <span className="text-primary-600 dark:text-primary-400 font-medium">
                  {product.category}
                </span>
              </div>

              {/* Meta Info */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-light-500 dark:text-light-400" />
                  <span className="text-dark700_light300">
                    {product.students.toLocaleString()} học viên
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-light-500 dark:text-light-400" />
                  <span className="text-dark700_light300">
                    {product.duration}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <PlayCircle className="w-5 h-5 text-light-500 dark:text-light-400" />
                  <span className="text-dark700_light300">
                    Giảng viên: {product.instructor}
                  </span>
                </div>
              </div>

              {/* Tags */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-dark900_light100">
                  Chủ đề:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full dark:bg-primary-600 dark:text-primary-200"
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
                <h4 className="font-semibold mb-3 text-dark900_light100">
                  Mô tả khoá học:
                </h4>
                <p className="text-dark700_light300 leading-relaxed mb-4">
                  {product.longDescription}
                </p>
                <p className="text-sm text-dark600_light400">
                  {product.shortDescription}
                </p>
              </div>

              {/* What you'll learn */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-dark900_light100">
                  Bạn sẽ học được gì:
                </h4>
                <ul className="space-y-2">
                  {product.tags.map((tag, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span className="text-dark700_light300">
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
                    <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                      {formatPrice(product.price)}
                    </span>
                  </div>
                  <button
                    onClick={onToggleFavorite}
                    className={`p-3 rounded-full transition-all duration-200 ${
                      isFavorite
                        ? "bg-red-500 text-white shadow-lg"
                        : "background-light150_dark700 text-dark600_light100 hover:bg-red-50 hover:text-red-500 dark:hover:bg-dark-600"
                    }`}
                  >
                    <Heart
                      className={`w-6 h-6 ${isFavorite ? "fill-current" : ""}`}
                    />
                  </button>
                </div>

                <div className="space-y-3">
                  <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2">
                    <ShoppingCart className="w-5 h-5" />
                    <span>Mua ngay</span>
                  </button>
                  <button className="w-full background-light150_dark600 text-dark700_light200 py-3 px-6 rounded-lg font-semibold transition-colors duration-200 hover:bg-light-200 dark:hover:bg-light-500">
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
