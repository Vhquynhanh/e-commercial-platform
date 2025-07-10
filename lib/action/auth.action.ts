"use server";

import { compare } from "bcryptjs";
import { signOut } from "@/auth";
import { redirect } from "next/navigation";
import { UserEntity } from "@/database/user.entity";
import { AppDataSource } from "../postgresql";

export const signInAction = async (loginInfo: string, password: string) => {
  if (!loginInfo || !password) {
    return {
      success: false,
      status: 400,
      error: "Missing credentials"
    };
  }

  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }

  const userRepo = AppDataSource.getRepository(UserEntity);

  // Query UserEntity for login credentials (username, email, or phoneNumber)
  const user = await userRepo
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.staff", "staff")
    .leftJoinAndSelect("user.student", "student")
    .where("user.username = :loginInfo", { loginInfo })
    .orWhere("user.email = :loginInfo", { loginInfo })
    .orWhere("user.phoneNumber = :loginInfo", { loginInfo })
    .getOne();

  if (!user) {
    return {
      success: false,
      status: 404,
      error: "User not found"
    };
  }

  // Compare the provided password with the hashed password in UserEntity
  // const isValid = await compare(password, user.password);
  const isValid = password === user.password;
  if (!isValid) {
    return {
      success: false,
      status: 401,
      error: "Invalid password"
    };
  }

  // Get the associated account (staff or student) based on user.type
  const account = user.type === "staff" ? user.staff : user.student;
  if (!account) {
    return {
      success: false,
      status: 404,
      error: `${user.type === "staff" ? "Staff" : "Student"} account not found`
    };
  }

  return {
    success: true,
    user: {
      id: user.id,
      email: user.email,
      name: account.firstName + " " + account.lastName,
      image: user.image,
      type: user.type,
      role: user.role
    }
  };
};

export const signOutAction = async () => {
  await signOut();
  redirect("/sign-in");
};
