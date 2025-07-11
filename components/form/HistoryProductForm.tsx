"use client";
import React, { useMemo } from "react";
import ProductModal from "../modal/ProductModal";
import { useRouter } from "next/navigation";
import { useProduct } from "@/contexts/ProductContext";
import { Product } from "@/types/product";
import ProductCard from "../card/ProductCard";
import { History } from "lucide-react";

const HistoryProductForm = () => {
  const router = useRouter();
  const { products, viewHistory } = useProduct();

  // Get history products
  const historyProducts = useMemo(() => {
    return viewHistory
      .map((id) => products.find((p) => p.id === id))
      .filter(Boolean) as Product[];
  }, [products, viewHistory]);

  return (
    <>
      <div>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Lịch sử xem
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Những khoá học bạn đã xem gần đây
          </p>
        </div>

        {historyProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {historyProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <History className="w-16 h-16 text-gray-300 dark:text-gray-500 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Chưa có lịch sử xem
            </p>
            <p className="text-gray-400 dark:text-gray-500 mt-2">
              Hãy khám phá các khoá học để xem lịch sử
            </p>
            <button
              onClick={() => router.push("/")}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Khám phá ngay
            </button>
          </div>
        )}
      </div>
      {/* Product Modal */}
      <ProductModal />
    </>
  );
};

export default HistoryProductForm;
