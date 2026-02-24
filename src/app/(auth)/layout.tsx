import AuthLayout from "@/feature/auth/AuthLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Healixity",
    template: "%s | Accounts",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AuthLayout>{children}</AuthLayout>;
}

// className=" min-h-screen w-full flex items-center justify-center lg:py-20 p-4"
