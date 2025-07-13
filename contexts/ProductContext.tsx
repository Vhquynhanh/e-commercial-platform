"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect
} from "react";
import { Product } from "@/types/product";
import { useToast } from "./ToastContext";
import { fetchProduct } from "@/lib/api/fetchProduct";
import { fetchUser } from "@/lib/api/fetchUser";

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
  const [products, setProducts] = useState<Product[]>([]); // Lưu trữ sản phẩm từ API
  const [favorites, setFavorites] = useState<string[]>([]);
  const [viewHistory, setViewHistory] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const { showToastMessage } = useToast();

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

  /* Thêm / xoá yêu thích */
  const handleToggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      const newFavorites = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];

      // Show toast
      const isAdding = !prev.includes(productId);
      const product = products.find((p) => p.id === productId);
      showToastMessage(
        `${isAdding ? "Đã thêm" : "Đã xoá"} "${product?.name ?? "sản phẩm"}" ${
          isAdding ? "vào" : "khỏi"
        } yêu thích`,
        "success"
      );

      return newFavorites;
    });
  };

  /* Lưu lịch sử (giữ tối đa 10 mục) */
  const handleAddToHistory = (productId: string) => {
    setViewHistory((prev) => {
      const newHistory = [productId, ...prev.filter((id) => id !== productId)];
      return newHistory.slice(0, 10); // Giới hạn tối đa 10 mục
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
  if (!ctx) throw new Error("useProduct must be used within ProductProvider");
  return ctx;
}
