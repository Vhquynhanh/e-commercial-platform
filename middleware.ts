import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isDevMock = true;

export async function middleware(request: NextRequest) {
  if (isDevMock) {
    return NextResponse.next();
  }

  // ❌ Không được import @/auth ở đây

  // Chuyển logic auth sang phía page cần xác thực
  return NextResponse.next();
}
