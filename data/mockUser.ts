import { User } from "next-auth";

export const mockUser: User = {
  id: "user_123456",
  name: "Bích Phượng",
  email: "bichphuong@example.com",
  image: "https://randomuser.me/api/portraits/women/65.jpg",
  favorites: ["1", "3"],
  viewHistory: ["1", "2", "3", "4"]
};
