import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import AuthContainer from "@/components/container/AuthContainer";
import SignInForm from "@/components/form/SignInForm";

const SignInPage = () => {
  const handleSignIn = async (formData: FormData, rememberMe: boolean) => {
    "use server";
    const loginInfo = formData.get("loginInfo");
    const password = formData.get("password");

    if (!loginInfo || !password) {
      throw new Error("Thiếu thông tin đăng nhập.");
    }

    const result = await signIn("credentials", {
      redirect: false,
      loginInfo: String(loginInfo),
      password: String(password)
    });

    if (!result) {
      throw new Error("Thông tin đăng nhập không chính xác.");
    }

    redirect("/");
  };

  return (
    <AuthContainer>
      <SignInForm onSubmit={handleSignIn} />
    </AuthContainer>
  );
};

export default SignInPage;
