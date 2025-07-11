// types/product.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  shortDescription: string;
  longDescription: string;
  category: string;
  rating: number;
  reviews: number;
  instructor: string;
  duration: string;
  students: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  tags: string[];
  createdAt: string;
}

export interface SearchFilters {
  query: string;
  priceRange: "all" | "under-500k" | "500k-1m" | "over-1m";
  category: string;
  level: string;
}
