"use server";

import { redirect } from "next/navigation";
import { signOut } from "@/auth"; // Xóa phần này nếu bạn không cần signOut nữa

export const signInAction = async (loginInfo: string, password: string) => {
  return true;
};

export const signOutAction = async () => {
  await signOut();
  redirect("/sign-in");
};
