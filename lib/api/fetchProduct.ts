import axios from "axios";
import { Product } from "@/types/product";

export const fetchProduct = async (): Promise<Product[]> => {
  try {
    const res = await axios.get("/mock/product.json");
    return res.data;
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm:", error);
    return [];
  }
};
