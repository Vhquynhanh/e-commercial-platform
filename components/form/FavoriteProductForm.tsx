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
          <h2 className="text-3xl font-bold text-dark900_light100 mb-2">
            Khoá học yêu thích
          </h2>
          <p className="text-dark600_light300">
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
            <Heart className="w-16 h-16 text-light300_light500 mx-auto mb-4" />
            <p className="text-light500_light100 text-light400_light200 text-lg">
              Chưa có khoá học yêu thích
            </p>
            <p className="text-light400_light200 mt-2">
              Hãy khám phá và thêm những khoá học bạn thích
            </p>
            <button
              onClick={() => router.push("/")}
              className="mt-4 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg transition-colors"
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
