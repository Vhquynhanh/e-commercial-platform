import { auth } from "@/auth";
import HistoryProductForm from "@/components/form/HistoryProductForm";
export default async function HistoryProductPage() {
  // const session = await auth();
  // if (!session?.user) redirect("/sign-in");
  // const userId = session?.user?.id;

  // if (!userId) {
  //   return (
  //     <p className="text-red-500 p-4">Bạn cần đăng nhập để tạo danh mục.</p>
  //   );
  // }
  return <HistoryProductForm />;
}
