"use client";
import { useState } from "react";
import { Product } from "@/types/product";
import { Sparkles, RefreshCw, AlertCircle, Loader2 } from "lucide-react";
import ProductCard from "../card/ProductCard";
import { mockSuggestions } from "@/data/mockSuggestion";

interface AISuggestionsProps {
  onToggleFavorite: (productId: string) => void;
  onViewDetail: (product: Product) => void;
  onAddToHistory: (productId: string) => void;
  favorites: string[];
  viewHistory: string[];
  className?: string;
}

export default function AISuggestions({
  onToggleFavorite,
  onViewDetail,
  onAddToHistory,
  favorites,
  viewHistory,
  className = ""
}: AISuggestionsProps) {
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasRequested, setHasRequested] = useState(false);

  // Mock AI suggestions API call
  const fetchSuggestions = async () => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate random success/failure for demo
      if (Math.random() > 0.2) {
        setSuggestions(mockSuggestions);
        setHasRequested(true);
      } else {
        throw new Error("Không thể lấy gợi ý lúc này");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đã xảy ra lỗi");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchSuggestions();
  };

  return (
    <div
      className={`bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-800 dark:to-blue-800 rounded-xl p-6 ${className}`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-100 dark:bg-purple-700 rounded-lg">
            <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-200" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Gợi ý AI cho bạn
            </h2>
            <p className="text-gray-600 dark:text-gray-200 text-sm">
              Dựa trên lịch sử xem và sở thích của bạn
            </p>
          </div>
        </div>

        {hasRequested && (
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg border transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            <span>Làm mới</span>
          </button>
        )}
      </div>

      {/* Initial State */}
      {!hasRequested && !loading && (
        <div className="text-center py-8">
          <div className="mb-4">
            <Sparkles className="w-12 h-12 text-purple-400 mx-auto mb-3" />
            <p className="text-gray-600 dark:text-slate-50 mb-4">
              Khám phá những khoá học phù hợp với bạn nhất
            </p>
            <p className="text-sm text-gray-500 dark:text-slate-50 mb-6">
              AI sẽ phân tích sở thích và đề xuất khoá học tốt nhất
            </p>
          </div>
          <button
            onClick={fetchSuggestions}
            className="bg-purple-600 dark:bg-purple-700 hover:bg-purple-700 dark:hover:bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2 mx-auto"
          >
            <Sparkles className="w-5 h-5" />
            <span>Nhận gợi ý thông minh</span>
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-8">
          <Loader2 className="w-8 h-8 text-purple-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300">
            AI đang phân tích để tìm khoá học phù hợp nhất...
          </p>

          {/* Loading Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-700 rounded-xl p-4 animate-pulse"
              >
                <div className="h-48 bg-gray-200 dark:bg-gray-600 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-8">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button
            onClick={fetchSuggestions}
            className="bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Thử lại
          </button>
        </div>
      )}

      {/* Suggestions Results */}
      {suggestions.length > 0 && !loading && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-700 dark:text-gray-100">
              Tìm thấy{" "}
              <span className="font-semibold">{suggestions.length}</span> khoá
              học phù hợp
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <Sparkles className="w-4 h-4" />
              <span>Được đề xuất bởi AI</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestions.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
