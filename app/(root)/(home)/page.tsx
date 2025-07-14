import HomeForm from "@/components/form/HomeForm";

export default async function HomePage() {
  // const session = await auth();
  // if (!session?.user) redirect("/sign-in");
  // const userId = session?.user?.id;

  // if (!userId) {
  //   return (
  //     <p className="text-red-500 p-4">Bạn cần đăng nhập để tạo danh mục.</p>
  //   );
  // }
  return <HomeForm />;
}
