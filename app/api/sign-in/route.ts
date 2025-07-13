// luôn ở dòng đầu tiên
export const runtime = "nodejs";

import { signInAction } from "@/lib/action/auth.action";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { loginInfo, password } = await request.json();
    const result = await signInAction(loginInfo, password);

    if (!result) {
      return NextResponse.json(
        { error: "Invalid login credentials" },
        { status: 401 }
      );
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Sign in error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
