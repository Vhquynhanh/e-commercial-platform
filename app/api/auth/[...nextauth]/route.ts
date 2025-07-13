export const runtime = "nodejs";

export const GET = async (req: Request) => {
  return new Response(
    JSON.stringify({ message: "Mock API - Không cần gọi auth nữa" }),
    { status: 200 }
  );
};

export const POST = async (req: Request) => {
  return new Response(
    JSON.stringify({ message: "Mock API - POST request không cần auth" }),
    { status: 200 }
  );
};
