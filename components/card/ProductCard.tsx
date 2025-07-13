"use client";
import { useState } from "react";
import { Product } from "@/types/product";
import { Heart, Star, Users, Clock, Eye } from "lucide-react";
import { formatPrice } from "@/lib/util";
import { useProduct } from "@/contexts/ProductContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: Product;
  isFavorite?: boolean;
  onToggleFavorite?: (productId: string) => void;
  onViewDetail?: (product: Product) => void;
  onAddToHistory?: (productId: string) => void;
}

export default function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const {
    favorites,
    handleToggleFavorite,
    handleAddToHistory,
    handleViewDetail
  } = useProduct();
  const isFavorite = favorites.includes(product.id);
  const [isHovered, setIsHovered] = useState(false);

  const onViewDetail = () => {
    if (handleAddToHistory) {
      handleAddToHistory(product.id);
    }
    if (handleViewDetail) {
      handleViewDetail(product);
    }
  };

  const onToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    const isCurrentlyFavorite = favorites.includes(product.id);

    handleToggleFavorite(product.id);

    if (!isCurrentlyFavorite) {
      toast.success(`Đã thêm '${product.name}' vào danh sách yêu thích`, {
        action: {
          label: "Xem",
          onClick: () => router.push("/product/favourites")
        },
        duration: 3000
      });
    } else {
      toast(`Đã xoá '${product.name}' xoá khỏi yêu thích`, {
        action: {
          label: "Hoàn tác",
          onClick: () => handleToggleFavorite(product.id)
        },
        duration: 3000
      });
    }
  };

  return (
    <div
      className={`background-light100_dark100 rounded-xl shadow-md overflow-hidden transition-all duration-300 cursor-pointer ${
        isHovered ? "shadow-xl transform -translate-y-1" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onViewDetail}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-300 ${
            isHovered ? "scale-105" : ""
          }`}
        />

        {/* Favorite Button */}
        <button
          onClick={onToggleFavorite}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
            isFavorite
              ? "bg-red-500 text-white shadow-lg"
              : "background-light120_dark700 text-dark600_light100 hover:background-light100_dark600 hover:text-red-500"
          }`}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
        </button>

        {/* Level Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${
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

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-primary-600 font-medium dark:text-primary-400">
            {product.category}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-dark600_light300">
              {product.rating}
            </span>
            <span className="text-sm text-light400_light200">
              ({product.reviews})
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-lg text-dark900_light100 mb-2 line-clamp-2 leading-tight ">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-dark600_light300 text-sm mb-3 line-clamp-2">
          {product.shortDescription}
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-light500_light200 mb-3">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{product.students.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{product.duration}</span>
            </div>
          </div>
        </div>

        {/* Instructor */}
        <p className="text-sm mb-3 text-dark600_light300">
          Giảng viên: <span className="font-medium">{product.instructor}</span>
        </p>

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {formatPrice(product.price)}
            </span>
          </div>
          <button
            className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
            onClick={onViewDetail}
          >
            <Eye className="w-4 h-4" />
            <span>Chi tiết</span>
          </button>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-3">
          {product.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 background-light100_dark700 text-dark600_light300 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
          {product.tags.length > 3 && (
            <span className="px-2 py-1 background-light100_dark700 text-dark600_light300 text-xs rounded-full">
              +{product.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
