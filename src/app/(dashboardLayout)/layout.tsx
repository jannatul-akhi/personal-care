import DashboardGuard from "@/components/dashboard/DashboardGuard";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardGuard>{children}</DashboardGuard>;
}
