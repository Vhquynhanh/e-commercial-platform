"use client";
import React, { useMemo, useState } from "react";
import SearchBar from "../ui/SearchBar";
import FilterBar from "../ui/FilterBar";
import AISuggestions from "../ui/AISuggestions";
import ProductCard from "../card/ProductCard";
import { Product, SearchFilters } from "@/types/product";
import { useProduct } from "@/contexts/ProductContext";
import ProductModal from "../modal/ProductModal";

const HomeForm = () => {
  const {
    favorites,
    viewHistory,
    products,
    handleAddToHistory,
    handleToggleFavorite
  } = useProduct();
  const [showModal, setShowModal] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
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

  // Handle view detail
  const handleViewDetail = (product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  return (
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
        <SearchBar onSearch={handleSearch} className="max-w-2xl mx-auto" />
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
              <ProductCard
                key={product.id}
                product={product}
                isFavorite={favorites.includes(product.id)}
                onToggleFavorite={handleToggleFavorite}
                onViewDetail={handleViewDetail}
                onAddToHistory={handleAddToHistory}
              />
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

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        isFavorite={
          selectedProduct ? favorites.includes(selectedProduct.id) : false
        }
        onToggleFavorite={handleToggleFavorite}
      />
    </>
  );
};

export default HomeForm;
