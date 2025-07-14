import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      favorites: string[];
      viewHistory: { productId: string; viewCount: number }[];
    };
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    favorites: string[];
    viewHistory: { productId: string; viewCount: number }[];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    type: string;
  }
}
