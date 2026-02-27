"use client";

import { useState, useRef, useEffect } from "react";
import {
  Search,
  User,
  Heart,
  ShoppingCart,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { logout } from "@/redux/features/user/userSlice";
import { useGetWishlistQuery } from "@/redux/api/wishlist/wishlistApi";
import { useGetCartCountQuery } from "@/redux/api/cart/cartApi";
import { RootState } from "@/redux/store";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector((state: RootState) => state.user?.user);
  const token = useSelector((state: RootState) => state.user?.token);
  const guestCartId = useSelector(
    (state: RootState) => state.cart?.guestCartId,
  );

  const isLoggedIn = !!(user || token);

  // login থাকলে → auth header দিয়ে count
  // login না থাকলে → guestCartId query param  // Fetch count and cart total
  const { data: cartCountData } = useGetCartCountQuery({
    isLoggedIn,
    guestCartId,
  });

  // Wishlist count
  const { data: wishlistData } = useGetWishlistQuery(undefined, {
    skip: !isLoggedIn,
  });
  const wishlistCount = wishlistData?.data?.items?.length ?? 0;

  const cartCount = cartCountData?.data?.count ?? 0;

  // outside click → dropdown বন্ধ
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    Cookies.remove("auth_token");
    Cookies.remove("token");
    dispatch(logout());
    setIsUserMenuOpen(false);
    router.push("/login");
  };

  const navItems = [
    { name: "SKIN CARE", href: "#" },
    { name: "BODY CARE", href: "#" },
    { name: "FRAGRANCE", href: "#" },
    { name: "MAKE UP", href: "#" },
    { name: "LIP CARE", href: "#" },
  ];

  const displayName = user?.firstName
    ? `${user.firstName} ${user.lastName || ""}`.trim()
    : user?.username || user?.email || "User";

  const avatarLetter = (
    user?.firstName?.[0] ||
    user?.username?.[0] ||
    user?.email?.[0] ||
    "U"
  ).toUpperCase();

  return (
    <header className="w-full">
      {/* Top Banner */}
      <div className="w-full">
        <Image
          src="/images/topBanner.png"
          alt="Top Banner"
          width={1920}
          height={50}
          className="w-full h-auto object-cover"
          priority
        />
      </div>

      {/* Main Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center shrink-0">
              <Image
                src="/images/Logo.png"
                alt="Logo"
                width={120}
                height={40}
                className="h-10 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-[#168B86] text-sm font-semibold tracking-wide transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-1">
              {/* Search */}
              <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 mr-2">
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent outline-none text-sm w-32 lg:w-44"
                />
                <Search className="w-4 h-4 text-gray-400 shrink-0" />
              </div>

              {/* Wishlist */}
              <Link
                href="/dashboard/wishlist"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
              >
                <Heart className="w-5 h-5 text-gray-600" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 leading-none">
                    {wishlistCount > 99 ? "99+" : wishlistCount}
                  </span>
                )}
              </Link>

              {/* User — logged in / out */}
              {isLoggedIn ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen((v) => !v)}
                    className="p-1.5 hover:bg-gray-100 rounded-full transition-colors relative"
                  >
                    {user?.avatarUrl ? (
                      <Image
                        src={user.avatarUrl}
                        alt="avatar"
                        width={28}
                        height={28}
                        className="w-7 h-7 rounded-full object-cover ring-2 ring-[#168B86]/30"
                      />
                    ) : (
                      <Image
                        src="/images/default-avatar.png"
                        alt="avatar"
                        width={28}
                        height={28}
                        className="w-7 h-7 rounded-full object-cover ring-2 ring-[#168B86]/30"
                      />
                    )}
                    {/* online dot */}
                    <span className="absolute bottom-1 right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />
                  </button>

                  {/* Dropdown */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] border border-gray-100 overflow-hidden z-50">
                      {/* User info */}
                      <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                        <p className="text-sm font-bold text-gray-900 truncate">
                          {displayName}
                        </p>
                        <p className="text-xs text-gray-500 truncate mt-0.5">
                          {user?.email || ""}
                        </p>
                      </div>

                      <div className="py-1">
                        <Link
                          href="/account"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 text-[#168B86]" />
                          Dashboard
                        </Link>
                        <Link
                          href="/account/profile"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          <User className="w-4 h-4 text-gray-500" />
                          My Account
                        </Link>
                      </div>

                      <div className="border-t border-gray-100 py-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  title="Login"
                >
                  <User className="w-5 h-5 text-gray-600" />
                </Link>
              )}

              {/* Cart — live count */}
              <Link
                href="/cart"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
              >
                <ShoppingCart className="w-5 h-5 text-gray-600" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-[#168B86] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 leading-none">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile menu toggle */}
              <button
                className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors ml-1"
                onClick={() => setIsMenuOpen((v) => !v)}
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5 text-gray-700" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-2">
            <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 mb-3">
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none text-sm flex-1"
              />
              <Search className="w-4 h-4 text-gray-400" />
            </div>

            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block text-gray-700 hover:text-[#168B86] font-semibold py-2 text-sm"
              >
                {item.name}
              </a>
            ))}

            <div className="pt-3 border-t border-gray-100 space-y-1">
              {isLoggedIn ? (
                <>
                  <Link
                    href="/account"
                    className="flex items-center gap-2 py-2 text-gray-700 text-sm font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LayoutDashboard className="w-4 h-4 text-[#168B86]" />
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center gap-2 py-2 text-red-500 text-sm font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center gap-2 py-2 text-[#168B86] text-sm font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-4 h-4" />
                  Login / Register
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
