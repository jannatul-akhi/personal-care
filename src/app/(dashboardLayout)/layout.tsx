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
      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar - fixed or sticky */}
        <aside className="hidden md:block w-64 bg-white shadow-md">
          <Sidebar user="OLI" />
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
      <Footer />
    </>
  );
}
