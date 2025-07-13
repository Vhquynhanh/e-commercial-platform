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
  const { products } = useProduct();
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    priceRange: "all",
    category: [],
    level: []
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
    if (filters.category.length > 0) {
      filtered = filtered.filter((p) => filters.category.includes(p.category));
    }

    // Level filter
    if (filters.level.length > 0) {
      filtered = filtered.filter((p) => filters.level.includes(p.level));
    }

    return filtered;
  }, [products, filters]);

  // Handle search
  const handleSearch = (query: string) => {
    setFilters((prev) => ({ ...prev, query }));
  };

  // Handle filter changes
  const handleFiltersChange = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };

  return (
    <>
      {/* Search Section */}
      <div className="mb-8">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-dark900_light100 mb-2">
            Khám phá khoá học tốt nhất
          </h2>
          <p className="text-dark600_light300">
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

      {/* Products Grid */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-dark900_light100">
            {filters.query
              ? `Kết quả tìm kiếm cho "${filters.query}"`
              : "Tất cả khoá học"}
          </h3>
          <span className="text-dark600_light400">
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
            <p className="text-light-500 dark:text-light-400 text-lg">
              Không tìm thấy khoá học phù hợp
            </p>
            <p className="text-light-400 dark:text-light-500 mt-2">
              Hãy thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm
            </p>
          </div>
        )}
      </div>

      {/* AI Suggestions */}
      <AISuggestions />

      {/* Product Modal */}
      <ProductModal />
    </>
  );
};

export default HomeForm;
