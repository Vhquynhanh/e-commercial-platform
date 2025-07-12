"use client";
import { SearchFilters } from "@/types/product";
import { Filter, ChevronDown } from "lucide-react";
import { useState } from "react";

interface FilterBarProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  categories: string[];
  className?: string;
}

export default function FilterBar({
  filters,
  onFiltersChange,
  categories,
  className = ""
}: FilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const priceRanges = [
    { value: "all", label: "Tất cả mức giá" },
    { value: "under-500k", label: "Dưới 500.000đ" },
    { value: "500k-1m", label: "500.000đ - 1.000.000đ" },
    { value: "over-1m", label: "Trên 1.000.000đ" }
  ];

  const levels = [
    { value: "", label: "Tất cả trình độ" },
    { value: "Beginner", label: "Cơ bản" },
    { value: "Intermediate", label: "Trung cấp" },
    { value: "Advanced", label: "Nâng cao" }
  ];

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      query: filters.query,
      priceRange: "all",
      category: "",
      level: ""
    });
  };

  const hasActiveFilters =
    filters.priceRange !== "all" || filters.category || filters.level;

  return (
    <div
      className={`background-light100_dark100 rounded-lg shadow-sm border border-light300_dark700 ${className}`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-light-500 dark:text-light-300" />
            <h3 className="font-semibold text-dark900_light100">Bộ lọc</h3>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden flex items-center space-x-1 text-primary-600 hover:text-primary-700 dark:text-primary-300 dark:hover:text-primary-400 text-dark900_light100"
          >
            <span>Mở rộng</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${
            isOpen ? "block" : "hidden lg:grid"
          }`}
        >
          {/* Price Range Filter */}
          <div>
            <label className="block text-sm font-medium text-dark900_light100 mb-2">
              Mức giá
            </label>
            <select
              value={filters.priceRange}
              onChange={(e) => handleFilterChange("priceRange", e.target.value)}
              className="w-full p-2 border border-light300_dark700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 text-dark700_light300 background-light150_dark700"
            >
              {priceRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-dark900_light100 mb-2">
              Danh mục
            </label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="w-full p-2 border border-light300_dark700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 background-light150_dark700 text-dark700_light300"
            >
              <option value="">Tất cả danh mục</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Level Filter */}
          <div>
            <label className="block text-sm font-medium text-dark900_light100 mb-2">
              Trình độ
            </label>
            <select
              value={filters.level}
              onChange={(e) => handleFilterChange("level", e.target.value)}
              className="w-full p-2 border border-light300_dark700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 background-light150_dark700 text-dark700_light300"
            >
              {levels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          <div className="flex items-end">
            <button
              onClick={clearFilters}
              disabled={!hasActiveFilters}
              className={`w-full px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                hasActiveFilters
                  ? "background-light150_dark700 text-dark700_light300 hover:background-light200_dark600"
                  : "background-light50_dark700 text-dark600_light400 cursor-not-allowed"
              }`}
            >
              Xóa bộ lọc
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
