import { Product } from "@/types/product";

export const mockSuggestions: Product[] = [
  {
    id: "ai_1",
    name: "Business English Communication",
    price: 699000,
    image:
      "https://plus.unsplash.com/premium_photo-1681492985238-c03c92137e0f?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Hình ảnh từ Unsplash
    shortDescription:
      "Professional English for business meetings and presentations",
    longDescription:
      "Master business English with practical scenarios, email writing, and presentation skills. Perfect for professionals looking to advance their careers.",
    category: "Language",
    rating: 4.7,
    reviews: 856,
    instructor: "Jennifer Wilson",
    duration: "18 hours",
    students: 12500,
    level: "Intermediate",
    tags: ["Business English", "Professional", "Communication"],
    createdAt: "2024-01-30"
  },
  {
    id: "ai_2",
    name: "Advanced React Patterns",
    price: 999000,
    image:
      "https://plus.unsplash.com/premium_photo-1678565869434-c81195861939?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Hình ảnh từ Unsplash
    shortDescription: "Learn advanced React patterns and best practices",
    longDescription:
      "Dive deep into advanced React concepts including hooks patterns, performance optimization, and state management solutions.",
    category: "Programming",
    rating: 4.8,
    reviews: 432,
    instructor: "Alex Chen",
    duration: "22 hours",
    students: 5200,
    level: "Advanced",
    tags: ["React", "Advanced", "Patterns", "Performance"],
    createdAt: "2024-02-10"
  },
  {
    id: "ai_3",
    name: "Digital Marketing Analytics",
    price: 799000,
    image:
      "https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Hình ảnh từ Pexels
    shortDescription: "Master data-driven marketing strategies",
    longDescription:
      "Learn to analyze marketing data, create reports, and optimize campaigns using Google Analytics, Facebook Insights, and other tools.",
    category: "Marketing",
    rating: 4.6,
    reviews: 1200,
    instructor: "Maria Garcia",
    duration: "16 hours",
    students: 8900,
    level: "Intermediate",
    tags: ["Analytics", "Data", "Google Analytics", "ROI"],
    createdAt: "2024-02-05"
  }
];
