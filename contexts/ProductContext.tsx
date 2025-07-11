"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { mockUser } from "@/data/mockUser";
import { Product } from "@/types/product";
import { mockProducts } from "@/data/mockProduct";
import { toast } from "@/hooks/use-toast";

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
  const [products] = useState<Product[]>(mockProducts);
  const [favorites, setFavorites] = useState<string[]>(mockUser.favorites);
  const [viewHistory, setViewHistory] = useState<string[]>(
    mockUser.viewHistory
  );
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);

  /* Thêm / xoá yêu thích */
  const handleToggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];

      // Show toast
      const isAdding = !prev.includes(productId);
      const product = products.find((p) => p.id === productId);
      toast({
        description: isAdding
          ? `Đã thêm "${product?.name}" vào danh sách yêu thích`
          : `Đã xóa "${product?.name}" khỏi danh sách yêu thích`,
        className:
          "px-6 py-3 shadow-lg rounded text-white max-w-sm bg-green-500"
      });

      return newFavorites;
    });
  };

  /* Lưu lịch sử (giữ tối đa 10 mục) */
  const handleAddToHistory = (productId: string) => {
    setViewHistory((prev) => {
      const newHistory = [productId, ...prev.filter((id) => id !== productId)];
      return newHistory.slice(0, 10); // Keep only last 10 items
    });
  };

  // Handle view detail
  const handleViewDetail = (product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  // Handle close modal
  const handleCloseModal = () => {
    setShowModal(false);
  };
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
  if (!ctx) throw new Error("useProduct must be dùng trong ProductProvider");
  return ctx;
}
