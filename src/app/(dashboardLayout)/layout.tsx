import { redirect } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import { Header } from "@/components/shared/Navbar/Header";
import { Footer } from "@/components/shared/footer/Footer";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //   const user = await getCurrentUser();

  //   if (!user) {
  //     redirect('/auth/login');
  //   }

  return (
    <>
      <Header />
      <div className="flex h-[calc(100vh-120px)] overflow-hidden bg-gray-100">
        {/* Sidebar - Scrollable independently */}
        <aside className="hidden md:block w-72 bg-white shadow-sm overflow-y-auto scrollbar-hide border-r border-gray-100">
          <Sidebar user="OLI" />
        </aside>

        {/* Main content - Fixed */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto scrollbar-hide">
          <div className="max-w-7xl mx-auto h-full">{children}</div>
        </main>
      </div>
      <Footer />
    </>
  );
}
