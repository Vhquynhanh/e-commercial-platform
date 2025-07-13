import { User } from "next-auth";

export const fetchUser = async (): Promise<User> => {
  try {
    const res = await fetch("/mock/user.json");
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Error("Không thể tải thông tin người dùng");
  }
};
