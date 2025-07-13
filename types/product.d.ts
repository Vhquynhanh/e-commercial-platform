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
  isPopular?: boolean;
  isBestseller?: boolean;
  suggestionReason?: string;
  matchScore?: number;
}

export type PriceRangeValue = "all" | "under-500k" | "500k-1m" | "over-1m";

export interface SearchFilters {
  query: string;
  priceRange: PriceRangeValue;
  category: string[];
  level: string[];
}

export interface UserBehavior {
  favorites: Product[];
  viewHistory: Product[];
  searchHistory: string[];
  completedCourses: Product[];
  purchasedCourses: Product[];
}
