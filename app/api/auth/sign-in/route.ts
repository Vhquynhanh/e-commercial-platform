// luôn ở dòng đầu tiên
export const runtime = "nodejs";

import { signInAction } from "@/lib/action/auth.action";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { loginInfo, password } = await request.json();
    const result = await signInAction(loginInfo, password);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: result.status }
      );
    }

    return NextResponse.json(result.user);
  } catch (error) {
    console.error("Sign in error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
