"use server";

import { redirect } from "next/navigation";

export const signInAction = async (loginInfo: string, password: string) => {
  return true;
};

export const signOutAction = async () => {
  redirect("/sign-in");
};
