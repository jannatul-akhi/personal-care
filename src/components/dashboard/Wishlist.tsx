"use client";

import React from "react";
import Image from "next/image";
import { ShoppingCart, Repeat, Trash2, Apple } from "lucide-react";
import { cn } from "@/utils/cn";

const wishlistItems = [
  {
    id: 1,
    name: "Luxury Body Lotion - Deep Hydration",
    storage: "250ml",
    color: "White",
    price: "৳1,850.00",
    image: "/images/lotion1.png",
    brand: "Natural Care",
  },
  {
    id: 2,
    name: "Premium Skin Serum - Anti-Aging",
    storage: "50ml",
    color: "Clear",
    price: "৳2,450.00",
    image: "/images/skin1.png",
    brand: "Natural Care",
  },
  {
    id: 3,
    name: "Intensive Care Lotion - Aloe Vera",
    storage: "400ml",
    color: "Green",
    price: "৳1,250.00",
    image: "/images/lotion2.png",
    brand: "Natural Care",
  },
  {
    id: 4,
    name: "Soft Skin Night Cream",
    storage: "100ml",
    color: "Pink",
    price: "৳950.00",
    image: "/images/skin2.png",
    brand: "Natural Care",
  },
];

export default function Wishlist() {
  return (
    <div className="bg-white rounded-[20px] p-6 shadow-sm border border-slate-100 min-h-full">
      <div className="flex flex-col gap-6">
        <h1 className="text-xl font-bold text-slate-900">Wishlist</h1>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[13px] font-medium text-slate-600">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-blue-500 text-blue-600 focus:ring-blue-500"
              defaultChecked
            />
            <span>Select 2/4</span>
          </div>
          <div className="flex items-center gap-3 text-xs font-semibold">
            <button className="text-blue-600 hover:underline">Add to Cart</button>
            <button className="text-blue-600 hover:underline">Compare</button>
            <button className="text-red-500 hover:underline">Remove</button>
          </div>
        </div>

        <div className="space-y-4">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="group relative flex items-center gap-4 rounded-xl border border-slate-100 p-3 transition-all hover:bg-slate-50/50"
            >
              {/* Product Image with Checkbox */}
              <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-slate-50 border border-slate-100">
                <input
                  type="checkbox"
                  className="absolute top-1 left-1 z-10 h-4 w-4 rounded border-slate-300 bg-white/80 text-blue-600 focus:ring-blue-500"
                />
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain p-1"
                />
              </div>

              {/* Product Info */}
              <div className="flex flex-1 flex-col justify-center">
                <div className="flex items-center gap-2 mb-0.5">
                  <Apple className="h-4 w-4 text-slate-600 fill-slate-600" />
                  <h3 className="text-[13px] font-bold text-slate-900 line-clamp-1">
                    {item.name}
                  </h3>
                </div>
                <div className="flex gap-2 text-[11px] text-slate-500 mb-1">
                  <span>Storage: {item.storage}</span>
                  <span>Color: {item.color}</span>
                </div>
                <div className="text-[13px] font-bold text-blue-600">
                  {item.price}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pr-2">
                <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors hover:bg-blue-600 hover:text-white">
                  <ShoppingCart className="h-4 w-4" />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-500 transition-colors hover:bg-slate-200">
                  <Repeat className="h-4 w-4" />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-500 transition-colors hover:bg-red-500 hover:text-white">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
