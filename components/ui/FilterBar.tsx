"use client";
import { PriceRangeValue, SearchFilters } from "@/types/product";
import { Filter, ChevronDown } from "lucide-react";
import { useMemo, useState } from "react"; // nếu bạn export type này
import { Option, SelectInput } from "./select";
import { normalizeMultiSelectFilter } from "@/lib/util/filter";

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

  const priceRanges: Option<PriceRangeValue>[] = [
    { value: "all", label: "Tất cả mức giá" },
    { value: "under-500k", label: "Dưới 500.000đ" },
    { value: "500k-1m", label: "500.000đ - 1.000.000đ" },
    { value: "over-1m", label: "Trên 1.000.000đ" }
  ];

  const levels: Option<string>[] = [
    { value: "", label: "Tất cả trình độ" },
    { value: "Beginner", label: "Cơ bản" },
    { value: "Intermediate", label: "Trung cấp" },
    { value: "Advanced", label: "Nâng cao" }
  ];

  const categoryOptions: Option<string>[] = useMemo(
    () => [
      { value: "", label: "Tất cả danh mục" },
      ...categories.map((c) => ({ value: c, label: c }))
    ],
    [categories]
  );

  const handleFilterChange = <T extends keyof SearchFilters>(
    key: T,
    value: SearchFilters[T]
  ) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      query: filters.query,
      priceRange: "all",
      category: [],
      level: []
    });
  };

  const hasActiveFilters =
    filters.priceRange !== "all" ||
    filters.category.length > 0 ||
    filters.level.length > 0;

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
          <SelectInput<PriceRangeValue>
            id="priceRange"
            label="Mức giá"
            options={priceRanges}
            value={filters.priceRange}
            onChange={(opt) => {
              // opt có thể là null hoặc Option<PriceRangeValue>
              const option = Array.isArray(opt) ? opt[0] : opt; // đảm bảo không phải mảng
              handleFilterChange("priceRange", option ? option.value : "all");
            }}
            fullWidth
            filterable
          />

          {/* Danh mục */}
          <SelectInput<string>
            id="category"
            label="Danh mục"
            placeholder="Chọn danh mục"
            options={categoryOptions}
            value={filters.category}
            isMulti
            showCheckbox
            filterable
            fullWidth
            onChange={(opts) => {
              const values = normalizeMultiSelectFilter(opts);
              handleFilterChange("category", values);
            }}
          />

          {/* Trình độ */}
          <SelectInput<string>
            id="level"
            label="Trình độ"
            placeholder="Chọn trình độ"
            options={levels}
            value={filters.level} // string[]
            isMulti
            showCheckbox
            onChange={(opts) => {
              const values = normalizeMultiSelectFilter(opts);
              handleFilterChange("level", values);
            }}
            fullWidth
            filterable
          />

          {/* Nút Xoá bộ lọc */}
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
