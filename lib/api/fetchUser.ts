import axios from "axios";
import { User } from "next-auth";

export const fetchUser = async (): Promise<User> => {
  try {
    const res = await axios.get("/mock/user.json");
    return res.data;
  } catch (error) {
    throw new Error("Không thể tải thông tin người dùng");
  }
};
