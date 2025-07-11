"use client";
import React, { useMemo } from "react";
import ProductCard from "../card/ProductCard";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useProduct } from "@/contexts/ProductContext";
import ProductModal from "../modal/ProductModal";

const FavoriteProductForm = () => {
  const router = useRouter();
  const { products, favorites } = useProduct();
  // Get favorite products
  const favoriteProducts = useMemo(() => {
    return products.filter((product) => favorites.includes(product.id));
  }, [products, favorites]);
  return (
    <>
      <div>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Khoá học yêu thích
          </h2>
          <p className="text-gray-600">
            Danh sách các khoá học bạn đã đánh dấu yêu thích
          </p>
        </div>

        {favoriteProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">Chưa có khoá học yêu thích</p>
            <p className="text-gray-400 mt-2">
              Hãy khám phá và thêm những khoá học bạn thích
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

export default FavoriteProductForm;
