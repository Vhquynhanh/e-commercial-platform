import { Product } from "@/types/product";

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Complete English Speaking Course with Native Americans",
    price: 899000,
    image: "/api/placeholder/300/200",
    shortDescription: "Master English conversation with native speakers",
    longDescription:
      "This comprehensive course will help you speak English fluently with confidence. Learn from native American speakers with real-world conversations, practical exercises, and personalized feedback.",
    category: "Language",
    rating: 4.8,
    reviews: 1250,
    instructor: "John Smith",
    duration: "20 hours",
    students: 15000,
    level: "Intermediate",
    tags: ["English", "Speaking", "Native Speaker", "Conversation"],
    createdAt: "2024-01-15"
  },
  {
    id: "2",
    name: "React & Next.js Complete Developer Course",
    price: 1299000,
    image: "/api/placeholder/300/200",
    shortDescription: "Build modern web applications with React and Next.js",
    longDescription:
      "Learn to build full-stack applications with React and Next.js. From basics to advanced concepts including server-side rendering, API routes, and deployment.",
    category: "Programming",
    rating: 4.9,
    reviews: 890,
    instructor: "Sarah Johnson",
    duration: "35 hours",
    students: 8500,
    level: "Advanced",
    tags: ["React", "Next.js", "JavaScript", "Web Development"],
    createdAt: "2024-02-01"
  },
  {
    id: "3",
    name: "Digital Marketing Mastery for Beginners",
    price: 450000,
    image: "/api/placeholder/300/200",
    shortDescription: "Complete guide to digital marketing strategies",
    longDescription:
      "Learn all aspects of digital marketing including SEO, social media marketing, email marketing, and paid advertising. Perfect for beginners and small business owners.",
    category: "Marketing",
    rating: 4.6,
    reviews: 2100,
    instructor: "Mike Chen",
    duration: "15 hours",
    students: 25000,
    level: "Beginner",
    tags: ["Digital Marketing", "SEO", "Social Media", "Business"],
    createdAt: "2024-01-20"
  },
  {
    id: "4",
    name: "Python Data Science & Machine Learning",
    price: 1599000,
    image: "/api/placeholder/300/200",
    shortDescription: "Master data science and ML with Python",
    longDescription:
      "Comprehensive course covering Python programming, data analysis, machine learning algorithms, and real-world projects. Includes pandas, numpy, scikit-learn, and tensorflow.",
    category: "Programming",
    rating: 4.7,
    reviews: 750,
    instructor: "Dr. Lisa Wang",
    duration: "40 hours",
    students: 6200,
    level: "Advanced",
    tags: ["Python", "Data Science", "Machine Learning", "AI"],
    createdAt: "2024-01-10"
  },
  {
    id: "5",
    name: "Graphic Design Fundamentals",
    price: 650000,
    image: "/api/placeholder/300/200",
    shortDescription: "Learn professional graphic design principles",
    longDescription:
      "Master the fundamentals of graphic design including color theory, typography, layout design, and using Adobe Creative Suite. Perfect for beginners and career changers.",
    category: "Design",
    rating: 4.5,
    reviews: 1800,
    instructor: "Emma Rodriguez",
    duration: "25 hours",
    students: 12000,
    level: "Beginner",
    tags: ["Graphic Design", "Adobe", "Creative", "Visual Design"],
    createdAt: "2024-01-25"
  },
  {
    id: "6",
    name: "Photography Masterclass",
    price: 750000,
    image: "/api/placeholder/300/200",
    shortDescription: "Professional photography techniques and editing",
    longDescription:
      "Learn professional photography from composition to post-processing. Covers portrait, landscape, and commercial photography with hands-on assignments.",
    category: "Creative",
    rating: 4.8,
    reviews: 980,
    instructor: "David Kim",
    duration: "30 hours",
    students: 9500,
    level: "Intermediate",
    tags: ["Photography", "Editing", "Composition", "Professional"],
    createdAt: "2024-02-05"
  }
];
