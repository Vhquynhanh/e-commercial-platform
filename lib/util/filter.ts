import { Option } from "@/components/ui/select";

export function normalizeMultiSelectFilter<T extends string | number | boolean>(
  selected: (Option<T> | null)[] | Option<T> | null
): T[] {
  if (!selected) return [];

  const selectedArray = Array.isArray(selected) ? selected : [selected];

  // Nếu có lựa chọn "Tất cả" (value === "") → reset filter
  const hasAll = selectedArray.some((opt) => opt?.value === "");

  return hasAll ? [] : selectedArray.map((opt) => opt!.value);
}
