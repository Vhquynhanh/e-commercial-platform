import axios from "axios";
import { Product } from "@/types/product";

interface FetchSuggestionParams {
  userId: string;
}

export const fetchSuggestion = async ({
  userId
}: FetchSuggestionParams): Promise<string[]> => {
  try {
    const res = await axios.get(`/mock/user.json`, {
      params: { userId }
    });

    const user = res.data;
    const favoriteProducts = user.favorites;
    const mostViewedProducts = user.viewHistory.sort(
      (a: any, b: any) => b.viewCount - a.viewCount
    )[0];

    // Gộp hai danh sách và loại bỏ phần tử trùng lặp
    const combinedProducts = Array.from(
      new Set([...favoriteProducts, mostViewedProducts.productId])
    );

    // Trả về danh sách gộp
    return combinedProducts;
  } catch (error) {
    throw new Error("Không thể lấy gợi ý lúc này");
  }
};
