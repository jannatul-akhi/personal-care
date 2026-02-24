// components/dashboard/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, User, MapPin, Heart, Bell, Package } from "lucide-react";
import { cn } from "@/utils/cn";

const navItems = [
  { href: "/account", label: "Account Details", icon: User },
  { href: "/address", label: "Address", icon: MapPin },
  { href: "/dashboard/wishlist", label: "Wishlist", icon: Heart },
  { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
  // Orders sub-menu or separate
  { href: "/dashboard/orders/active", label: "Active Orders", icon: Package },
  // ...
];

export default function Sidebar({ user }: { user: any }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold">My Account</h2>
        <p className="text-sm text-gray-600">Name</p>
        {/* {user?.email} */}
      </div>

      <nav className="space-y-1 flex-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm",
              pathname === item.href
                ? "bg-blue-50 text-blue-700 font-medium"
                : "text-gray-700 hover:bg-gray-100",
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-4 border-t">
        <button className="flex items-center gap-3 text-red-600 hover:text-red-700 text-sm">
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
}
