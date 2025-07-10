import { NextApiRequest, NextApiResponse } from "next";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const result = await getAllUsers();
  return res.json(result);
};

export default handler;

// import type { NextApiRequest, NextApiResponse } from "next";
// import { connectMongoDB } from "@/lib/mongodb"; // Đường dẫn cần đúng với file mongodb.js

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     await connectMongoDB();
//     res.status(200).json({ message: "✅ MongoDB Connected Successfully!" });
//   } catch (error) {
//     res.status(500).json({ error: "❌ MongoDB Connection Failed!" });
//   }
// }
