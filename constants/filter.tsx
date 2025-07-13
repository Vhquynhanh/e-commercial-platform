import { Option } from "@/components/ui/select";
import { PriceRangeValue } from "@/types/product";

export const priceRanges: Option<PriceRangeValue>[] = [
  { value: "all", label: "Tất cả mức giá" },
  { value: "under-500k", label: "Dưới 500.000đ" },
  { value: "500k-1m", label: "500.000đ - 1.000.000đ" },
  { value: "over-1m", label: "Trên 1.000.000đ" }
];

export const levelOptions: Option<string>[] = [
  { value: "", label: "Tất cả trình độ" },
  { value: "Beginner", label: "Cơ bản" },
  { value: "Intermediate", label: "Trung cấp" },
  { value: "Advanced", label: "Nâng cao" }
];
