"use client";
import { useState } from "react";
import { Product } from "@/types/product";
import { Sparkles, RefreshCw, AlertCircle } from "lucide-react";
import ProductCard from "../card/ProductCard";
import { mockSuggestions } from "@/data/mockSuggestion";
import { Loader } from "../shared/loader/loader-ai";
import ErrorDisplay from "../shared/error/error";

export default function AISuggestions({ className = "" }) {
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
      className={`bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-800 dark:to-blue-800 rounded-xl p-6 ${className}`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-100 dark:bg-purple-700 rounded-lg">
            <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-200" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-dark900_light100">
              Gợi ý AI cho bạn
            </h2>
            <p className="text-dark600_light200 text-sm">
              Dựa trên lịch sử xem và sở thích của bạn
            </p>
          </div>
        </div>

        {hasRequested && (
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 background-light100_dark100 hover:background-light50_dark700 text-dark700_light300 rounded-lg border border-light200_dark600 transition-colors disabled:opacity-50"
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
            <p className="text-dark600_light50 mb-4">
              Khám phá những khoá học phù hợp với bạn nhất
            </p>
            <p className="text-sm text-light-500 dark:text-light-50 mb-6">
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
      {loading && <Loader />}

      {/* Error State */}
      {error && <ErrorDisplay error={error} onRetry={fetchSuggestions} />}

      {/* Suggestions Results */}
      {suggestions.length > 0 && !loading && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-dark700_light150">
              Tìm thấy{" "}
              <span className="font-semibold">{suggestions.length}</span> khoá
              học phù hợp
            </p>
            <div className="flex items-center space-x-2 text-sm text-light-500 dark:text-light-400">
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
