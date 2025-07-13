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
import { toast } from "sonner";

/* Kiểu dữ liệu cho context */
interface ProductContextType {
  products: Product[];
  favorites: string[];
  viewHistory: string[];
  selectedProduct: Product | null;
  showModal: boolean;
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
  const [viewHistory, setViewHistory] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);

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
    };
    fetchData();
  }, []);

  // Handle pending toast messages

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
  const handleAddToHistory = useCallback((productId: string) => {
    setViewHistory((prev) => {
      const newHistory = [productId, ...prev.filter((id) => id !== productId)];
      return newHistory.slice(0, 10);
    });
  }, []);

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
