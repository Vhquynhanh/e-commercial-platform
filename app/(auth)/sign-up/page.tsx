"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TextInput } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({
        name: form.get("name"),
        email: form.get("email"),
        phoneNumber: form.get("phoneNumber"),
        password: form.get("password")
      }),
      headers: { "Content-Type": "application/json" }
    });

    if (res.ok) {
      router.push("/");
    } else {
      const result = await res.json();
      setError(result.error || "Đăng ký thất bại");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full bg-light-50 p-8 shadow-lg rounded-xl space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-dark-800">
            Tạo tài khoản
          </h1>
          <p className="text-sm text-light-500">
            Điền thông tin bên dưới để bắt đầu
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 min-w-[330px]">
          <TextInput name="name" required placeholder="Họ và tên" />
          <TextInput name="email" required type="email" placeholder="Email" />
          <TextInput name="phoneNumber" required placeholder="Số điện thoại" />
          <TextInput
            name="password"
            required
            type="password"
            placeholder="Mật khẩu"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button type="submit" className="w-full">
            Đăng ký
          </Button>
          <p className="text-sm text-center text-light-500">
            Đã có tài khoản?{" "}
            <a href="/sign-in" className="text-primary-500 hover:underline">
              Đăng nhập
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
