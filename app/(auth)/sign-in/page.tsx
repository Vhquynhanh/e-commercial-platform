"use client";

import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");

  const isEmail = (value: string) => value.includes("@");
  const isPhone = (value: string) => /^\d{9,11}$/.test(value);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const identifier = form.get("email")?.toString().trim() || "";

    if (!isEmail(identifier) && !isPhone(identifier)) {
      alert("Please enter a valid email or phone number.");
      return;
    }

    const res = await signIn("credentials", {
      email: identifier,
      password: form.get("password"),
      redirect: false,
      callbackUrl: "/"
    });

    if (res?.ok && res.url) {
      router.push(res.url);
    } else {
      setError("Sai email hoặc mật khẩu");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 ">
      <div className="w-full bg-light-50 p-8 shadow-lg rounded-xl space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-dark-800">Đăng nhập</h1>
          <p className="text-sm text-light-500">
            Vui lòng nhập thông tin để tiếp tục
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <TextInput
            name="email"
            type="text"
            required
            placeholder="Email hoặc số điện thoại"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
          />
          <TextInput
            name="password"
            type="password"
            required
            placeholder="Mật khẩu"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button type="submit" className="w-full">
            Đăng nhập
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => signIn("google")}
          >
            Đăng nhập bằng Google
          </Button>
        </form>

        <div className="text-center pt-2">
          <p className="text-sm text-light-500">
            Chưa có tài khoản?{" "}
            <button
              type="button"
              onClick={() => router.push("/sign-up")}
              className="text-primary-500 hover:underline"
            >
              Đăng ký ngay
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
