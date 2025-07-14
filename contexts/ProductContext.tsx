"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback
} from "react";
import { Product } from "@/types/product";
import { fetchProduct } from "@/lib/api/fetchProduct";
import { fetchUser } from "@/lib/api/fetchUser";

/* Kiểu dữ liệu cho context */
interface ProductContextType {
  products: Product[];
  favorites: string[];
  viewHistory: { productId: string; viewCount: number }[];
  selectedProduct: Product | null;
  showModal: boolean;
  isLoading: boolean;
  handleToggleFavorite: (productId: string) => void;
  handleAddToHistory: (productId: string) => void;
  handleViewDetail: (product: Product) => void;
  handleCloseModal: () => void;
}

/* Khởi tạo context */
const ProductContext = createContext<ProductContextType | undefined>(undefined);

/* Provider bọc quanh toàn bộ app (hoặc nhóm route) */
export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [viewHistory, setViewHistory] = useState<
    { productId: string; viewCount: number }[]
  >([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  /* Fetch products - user from API */
  useEffect(() => {
    const fetchData = async () => {
      const [productsData, userData] = await Promise.all([
        fetchProduct(),
        fetchUser()
      ]);
      setProducts(productsData);
      setFavorites(userData.favorites);
      setViewHistory(userData.viewHistory);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  /* Thêm / xoá yêu thích */
  const handleToggleFavorite = useCallback(
    (productId: string) => {
      setFavorites((prev) => {
        const isAdding = !prev.includes(productId);
        const newFavorites = isAdding
          ? [...prev, productId]
          : prev.filter((id) => id !== productId);

        return newFavorites;
      });
    },
    [products]
  );

  /* Lưu lịch sử (giữ tối đa 10 mục) */
  const handleAddToHistory = useCallback(
    (productId: string) => {
      setViewHistory((prev) => {
        // Kiểm tra xem sản phẩm đã có trong lịch sử xem chưa
        const existingProduct = prev.find(
          (item) => item.productId === productId
        );

        if (existingProduct) {
          // Nếu sản phẩm đã có, tăng số lần xem
          return prev.map((item) =>
            item.productId === productId
              ? { ...item, viewCount: item.viewCount + 1 }
              : item
          );
        } else {
          // Nếu sản phẩm chưa có trong lịch sử xem, thêm mới vào lịch sử
          const newHistory = [{ productId, viewCount: 1 }, ...prev];
          return newHistory.slice(0, 10); // Giới hạn số lượng lịch sử xem (10 sản phẩm)
        }
      });
    },
    [products]
  );

  // Handle view detail
  const handleViewDetail = useCallback((product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
  }, []);

  // Handle close modal
  const handleCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        favorites,
        viewHistory,
        selectedProduct,
        showModal,
        isLoading,
        handleToggleFavorite,
        handleAddToHistory,
        handleViewDetail,
        handleCloseModal
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

/* Hook tiện dụng */
export function useProduct() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProduct must be used within ProductProvider");
  return ctx;
}
