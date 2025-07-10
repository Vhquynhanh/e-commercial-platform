"use client";
import Link from "next/link";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { TextInput } from "@/components/ui/textInput";
import Switch from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

interface SignInFormProps {
  onSubmit: (formData: FormData, rememberMe: boolean) => Promise<void>;
}

const SignInForm = ({ onSubmit }: SignInFormProps) => {
  const [isRemember, setIsRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setError(null); // reset lỗi cũ
    try {
      await onSubmit(formData, isRemember);
    } catch (err: any) {
      // Bắt lỗi và hiển thị
      setError(err.message || "Đăng nhập thất bại. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        handleSubmit(formData);
      }}
      className="flex flex-col items-center justify-between gap-6"
    >
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-light-129 font-bold text-2xl">Welcome back!</h1>
        <div className="text-dark400_light600">Log in to your account</div>
      </div>

      <div className="flex flex-col items-center justify-between w-full gap-6">
        <div className="w-full flex flex-col gap-2">
          <div className="flex flex-row">
            <label className="text-dark400_light600">
              Email, Phonenumber or Username
            </label>
            <label className="text-light-129">*</label>
          </div>
          <TextInput
            name="loginInfo"
            placeholder="Enter your email, phone or username"
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <div className="flex flex-row text-dark400_light600">
            <label>Password</label>
            <label className="text-light-129">*</label>
          </div>
          <TextInput
            name="password"
            placeholder="Enter your password"
            type="password"
          />
        </div>
      </div>

      <div className="w-full flex flex-row items-center justify-between">
        <label className="text-dark400_light600">Remember me</label>
        <Switch checked={isRemember} onChange={setIsRemember} />
      </div>

      {error && (
        <div className="w-full text-red-500 text-sm text-center">{error}</div>
      )}

      <Button
        type="submit"
        disabled={isLoading}
        variant={isLoading ? "loading" : "default"}
        size="lg"
      >
        {isLoading ? (
          <>
            Log in
            <Loader2 className="animate-spin" />
          </>
        ) : (
          "Log in"
        )}
      </Button>

      <Link href="/forgot-password">
        <p className="underline text-dark400_light600">Forgot password?</p>
      </Link>
    </form>
  );
};

export default SignInForm;
