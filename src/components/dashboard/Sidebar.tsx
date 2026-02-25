// components/dashboard/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LogOut,
  User,
  MapPin,
  Heart,
  Bell,
  Package,
  SearchCheck,
  Truck,
  Clock,
  CheckCircle2,
  Star,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/utils/cn";

const orderItems = [
  { href: "/dashboard/track-order", label: "Track Order", icon: SearchCheck },
];

const mainOrderItems = [
  { href: "/dashboard/orders/active", label: "Active Orders (2)", icon: Truck },
  { href: "/dashboard/orders/queue", label: "In Queue (4)", icon: Clock },
  {
    href: "/dashboard/orders/complete",
    label: "Complete (4)",
    icon: CheckCircle2,
  },
  { href: "/dashboard/reviews", label: "Reviews (4)", icon: Star },
  { href: "/dashboard/returns", label: "All Returns (4)", icon: RotateCcw },
];

const accountItems = [
  { href: "/account", label: "Account Details", icon: User },
  { href: "/address", label: "Address", icon: MapPin },
  { href: "/dashboard/wishlist", label: "Wishlist", icon: Heart },
  { href: "/dashboard/notifications", label: "Notifications", icon: Bell },
];

export default function Sidebar({ user }: { user: any }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full p-6 text-gray-700">
      <div className="mb-6">
        <h2 className="text-base font-semibold text-gray-900">
          Manage your account
        </h2>
        <p className="text-xs text-gray-500 mt-1 leading-relaxed">
          Profile, notifications & order tracing
        </p>
      </div>

      <nav className="flex-1 space-y-4">
        {/* Track Order Group */}
        <div className="space-y-1">
          {orderItems.map((item) => (
            <SidebarItem key={item.href} item={item} pathname={pathname} />
          ))}
        </div>

        <div className="border-t border-gray-100/60" />

        {/* Order Status Group */}
        <div className="space-y-1">
          {mainOrderItems.map((item) => (
            <SidebarItem key={item.href} item={item} pathname={pathname} />
          ))}
        </div>

        <div className="border-t border-gray-100/60" />

        {/* Account Details Group */}
        <div className="space-y-1">
          {accountItems.map((item) => (
            <SidebarItem key={item.href} item={item} pathname={pathname} />
          ))}
        </div>
      </nav>

      <div className="mt-auto pt-6 pb-6">
        <button className="flex items-center gap-3 text-red-500 hover:text-red-600 text-[13px] font-medium transition-colors">
          <LogOut className="h-[18px] w-[18px]" />
          Logout
        </button>
      </div>
    </div>
  );
}

function SidebarItem({
  item,
  pathname,
}: {
  item: any;
  pathname: string;
}) {
  const isActive = pathname === item.href;
  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 px-3 py-[10px] rounded-[10px] text-[13px] font-medium transition-all duration-200",
        isActive
          ? "bg-[#2563EB] text-white shadow-md shadow-blue-200"
          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900",
      )}
    >
      <item.icon
        className={cn(
          "h-[18px] w-[18px]",
          isActive ? "text-white" : "text-gray-500",
        )}
      />
      {item.label}
    </Link>
  );
}
