"use client";
import { useState, useEffect, useMemo } from "react";
import ProductCard from "@/components/card/ProductCard";
import ProductModal from "@/components/modal/ProductModal";
import SearchBar from "@/components/ui/SearchBar";
import FilterBar from "@/components/ui/FilterBar";
import AISuggestions from "@/components/ui/AISuggestions";
import { Heart, History, ShoppingBag, Menu, X } from "lucide-react";
import { Product, SearchFilters } from "@/types/product";
import { mockProducts } from "@/data/mockProduct";
import { mockUser } from "@/data/mockUser";
import Navbar from "../shared/navbar/Navbar";
import Link from "next/link";

export default function HomePageForm() {
  const [products] = useState<Product[]>(mockProducts);
  const [favorites, setFavorites] = useState<string[]>(mockUser.favorites);
  const [viewHistory, setViewHistory] = useState<string[]>(
    mockUser.viewHistory
  );
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentView, setCurrentView] = useState<
    "home" | "favorites" | "history"
  >("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showToast, setShowToast] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({
    show: false,
    message: "",
    type: "success"
  });

  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    priceRange: "all",
    category: "",
    level: ""
  });

  // Get unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.category)));
  }, [products]);

  // Filter products based on current filters
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Text search
    if (filters.query) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(filters.query.toLowerCase()) ||
          product.shortDescription
            .toLowerCase()
            .includes(filters.query.toLowerCase()) ||
          product.instructor
            .toLowerCase()
            .includes(filters.query.toLowerCase()) ||
          product.tags.some((tag) =>
            tag.toLowerCase().includes(filters.query.toLowerCase())
          )
      );
    }

    // Price range filter
    if (filters.priceRange !== "all") {
      filtered = filtered.filter((product) => {
        switch (filters.priceRange) {
          case "under-500k":
            return product.price < 500000;
          case "500k-1m":
            return product.price >= 500000 && product.price <= 1000000;
          case "over-1m":
            return product.price > 1000000;
          default:
            return true;
        }
      });
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(
        (product) => product.category === filters.category
      );
    }

    // Level filter
    if (filters.level) {
      filtered = filtered.filter((product) => product.level === filters.level);
    }

    return filtered;
  }, [products, filters]);

  // Get favorite products
  const favoriteProducts = useMemo(() => {
    return products.filter((product) => favorites.includes(product.id));
  }, [products, favorites]);

  // Get history products
  const historyProducts = useMemo(() => {
    return viewHistory
      .map((id) => products.find((p) => p.id === id))
      .filter(Boolean) as Product[];
  }, [products, viewHistory]);

  // Handle search
  const handleSearch = (query: string) => {
    setFilters((prev) => ({ ...prev, query }));
  };

  // Handle filter changes
  const handleFiltersChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };

  // Handle toggle favorite
  const handleToggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];

      // Show toast
      const isAdding = !prev.includes(productId);
      const product = products.find((p) => p.id === productId);
      showToastMessage(
        isAdding
          ? `Đã thêm "${product?.name}" vào danh sách yêu thích`
          : `Đã xóa "${product?.name}" khỏi danh sách yêu thích`,
        "success"
      );

      return newFavorites;
    });
  };

  // Handle view detail
  const handleViewDetail = (product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  // Handle add to history
  const handleAddToHistory = (productId: string) => {
    setViewHistory((prev) => {
      const newHistory = [productId, ...prev.filter((id) => id !== productId)];
      return newHistory.slice(0, 10); // Keep only last 10 items
    });
  };

  // Show toast message
  const showToastMessage = (message: string, type: "success" | "error") => {
    setShowToast({ show: true, message, type });
    setTimeout(() => {
      setShowToast({ show: false, message: "", type: "success" });
    }, 3000);
  };

  // Current products to display
  const currentProducts =
    currentView === "favorites"
      ? favoriteProducts
      : currentView === "history"
      ? historyProducts
      : filteredProducts;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">EduMarket</h1>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => setCurrentView("home")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === "home"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Trang chủ
              </button>
              <button
                onClick={() => setCurrentView("favorites")}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === "favorites"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                <Heart className="w-4 h-4" />
                <span>Yêu thích ({favorites.length})</span>
              </button>
              <button
                onClick={() => setCurrentView("history")}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === "history"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                <History className="w-4 h-4" />
                <span>Lịch sử ({historyProducts.length})</span>
              </button>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t bg-white py-4">
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => {
                    setCurrentView("home");
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === "home"
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  Trang chủ
                </button>
                <button
                  onClick={() => {
                    setCurrentView("favorites");
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === "favorites"
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  <Heart className="w-4 h-4" />
                  <span>Yêu thích ({favorites.length})</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentView("history");
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === "history"
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  <History className="w-4 h-4" />
                  <span>Lịch sử ({viewHistory.length})</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Home View */}
        {currentView === "home" && (
          <>
            {/* Search Section */}
            <div className="mb-8">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Khám phá khoá học tốt nhất
                </h2>
                <p className="text-gray-600">
                  Tìm kiếm và học hỏi từ những chuyên gia hàng đầu
                </p>
              </div>
              <SearchBar
                onSearch={handleSearch}
                className="max-w-2xl mx-auto"
              />
            </div>

            {/* Filters */}
            <FilterBar
              filters={filters}
              onFiltersChange={handleFiltersChange}
              categories={categories}
              className="mb-8"
            />

            {/* AI Suggestions */}
            <AISuggestions
              onToggleFavorite={handleToggleFavorite}
              onViewDetail={handleViewDetail}
              onAddToHistory={handleAddToHistory}
              favorites={favorites}
              viewHistory={viewHistory}
              className="mb-8"
            />

            {/* Products Grid */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {filters.query
                    ? `Kết quả tìm kiếm cho "${filters.query}"`
                    : "Tất cả khoá học"}
                </h3>
                <span className="text-gray-600">
                  {filteredProducts.length} khoá học
                </span>
              </div>
              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    Không tìm thấy khoá học phù hợp
                  </p>
                  <p className="text-gray-400 mt-2">
                    Hãy thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm
                  </p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Favorites View */}
        {currentView === "favorites" && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Khoá học yêu thích
              </h2>
              <p className="text-gray-600">
                Danh sách các khoá học bạn đã đánh dấu yêu thích
              </p>
            </div>

            {favoriteProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  Chưa có khoá học yêu thích
                </p>
                <p className="text-gray-400 mt-2">
                  Hãy khám phá và thêm những khoá học bạn thích
                </p>
                <button
                  onClick={() => setCurrentView("home")}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Khám phá ngay
                </button>
              </div>
            )}
          </div>
        )}

        {/* History View */}
        {currentView === "history" && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Lịch sử xem
              </h2>
              <p className="text-gray-600">Những khoá học bạn đã xem gần đây</p>
            </div>

            {historyProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {historyProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Chưa có lịch sử xem</p>
                <p className="text-gray-400 mt-2">
                  Hãy khám phá các khoá học để xem lịch sử
                </p>
                <button
                  onClick={() => setCurrentView("home")}
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Khám phá ngay
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Product Modal */}
      <ProductModal />

      {/* Toast Notification */}
      {showToast.show && (
        <div className="fixed bottom-4 right-4 z-50">
          <div
            className={`px-6 py-3 rounded-lg shadow-lg text-white max-w-sm ${
              showToast.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {showToast.message}
          </div>
        </div>
      )}
    </div>
  );
}
