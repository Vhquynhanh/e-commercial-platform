import axios from "axios";
import { Product } from "@/types/product";

export const fetchSuggestion = async (): Promise<Product[]> => {
  try {
    const res = await axios.get("/mock/suggestion.json");
    return res.data;
  } catch (error) {
    throw new Error("Không thể lấy gợi ý lúc này");
  }
};
