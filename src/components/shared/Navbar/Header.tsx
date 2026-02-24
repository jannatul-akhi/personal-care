"use client";

import { useState } from "react";
import { Search, User, ArrowLeftRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "SKIN CARE", href: "#" },
    { name: "BODY CARE", href: "#" },
    { name: "FRAGRANCE", href: "#" },
    { name: "MAKE UP", href: "#" },
    { name: "LIP CARE", href: "#" },
  ];

  return (
    <header className="w-full bg-white border-b border-gray-100">
      {/* Top Banner (Optional, keeping if needed but 디자인 이미지에는 없음) */}
      <div className="w-full">
        <Image
          src="/images/topBanner.png"
          alt="Enjoy 20% Off Our Winter Collection"
          width={1920}
          height={50}
          className="w-full h-auto object-cover"
          priority
        />
      </div>

      {/* Main Header */}
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/Logo.png"
                alt="Healthy Plus"
                width={130}
                height={45}
                className="h-11 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation - Pill style */}
          <nav className="hidden lg:flex items-center gap-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-6 py-2.5 bg-gray-50 border border-transparent hover:border-gray-200 rounded-full text-[13px] font-bold text-gray-700 transition-all whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-sm relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-white border border-gray-200 rounded-full px-6 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-500/20 focus:border-green-500/50 transition-all placeholder:text-gray-400"
            />
            <Search className="w-5 h-5 text-gray-400 absolute right-4 cursor-pointer hover:text-green-600 transition-colors" />
          </div>

          {/* Right Side Icons/Links */}
          <div className="flex items-center gap-6">
            {/* Compare */}
            <Link href="/compare" className="flex items-center gap-2 group">
              <span className="text-sm font-bold text-gray-700 group-hover:text-green-600 transition-colors">Compare</span>
              <div className="relative">
                <ArrowLeftRight className="w-5 h-5 text-gray-700 group-hover:text-green-600 transition-colors" />
                <span className="absolute -top-2.5 -right-2.5 w-5 h-5 bg-[#4a6741] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                  9
                </span>
              </div>
            </Link>

            {/* Login/Sign Up */}
            <Link href="/signIn" className="flex items-center gap-2 group">
              <span className="text-sm font-bold text-gray-700 group-hover:text-green-600 transition-colors whitespace-nowrap">Login/Sign Up</span>
              <User className="w-6 h-6 text-gray-700 group-hover:text-green-600 transition-colors" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 animate-in slide-in-from-top-2 duration-300">
          <div className="px-4 py-6 space-y-4">
            {/* Mobile Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-gray-50 border-none rounded-full px-5 py-3 text-sm focus:ring-2 focus:ring-green-500/20"
              />
              <Search className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-3 bg-gray-50 rounded-xl text-center text-sm font-bold text-gray-700 hover:bg-[#4a6741] hover:text-white transition-all underline-none"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
