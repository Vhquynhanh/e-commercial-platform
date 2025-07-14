import FavoriteProductForm from "@/components/form/FavoriteProductForm";

export default async function FavoriteProductPage() {
  // const session = await auth();
  // if (!session?.user) redirect("/sign-in");
  // const userId = session?.user?.id;

  // if (!userId) {
  //   return (
  //     <p className="text-red-500 p-4">Bạn cần đăng nhập để tạo danh mục.</p>
  //   );
  // }
  return <FavoriteProductForm />;
}
