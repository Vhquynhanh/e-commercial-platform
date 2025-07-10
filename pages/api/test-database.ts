// pages/api/users.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { initializeDatabase, AppDataSource } from "@/lib/postgresql";
import { UserEntity } from "@/database/user.entity";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await initializeDatabase();

    const userRepo = AppDataSource.getRepository(UserEntity);
    const users = await userRepo.find({
      relations: {
        student: true,
        staff: true
        // accounts: true,
        // sessions: true,
      }
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("❌ Error fetching users:", error);
    res.status(500).json({
      message: "Failed to fetch users",
      error: (error as Error).message
    });
  }
}
