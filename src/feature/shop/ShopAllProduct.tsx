"use client";

import { ShoppingCart, ArrowRight, Star, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const products = [
  {
    id: 1,
    name: "Healthy Glow Daily Face Cream",
    price: 1640,
    originalPrice: 2500,
    rating: 4.6,
    sold: "2K Sold",
    image: "/images/hero1.png",
  },
  {
    id: 2,
    name: "Healthy Glow Daily Face Cream",
    price: 1640,
    originalPrice: 2500,
    rating: 4.6,
    sold: "2K Sold",
    image: "/images/hero1.png",
  },
  {
    id: 3,
    name: "Healthy Glow Daily Face Cream",
    price: 1640,
    originalPrice: 2500,
    rating: 4.6,
    sold: "2K Sold",
    image: "/images/hero1.png",
  },
  {
    id: 4,
    name: "Healthy Glow Daily Face Cream",
    price: 1640,
    originalPrice: 2500,
    rating: 4.6,
    sold: "2K Sold",
    image: "/images/hero1.png",
  },
  {
    id: 5,
    name: "Healthy Glow Daily Face Cream",
    price: 1640,
    originalPrice: 2500,
    rating: 4.6,
    sold: "2K Sold",
    image: "/images/hero1.png",
  },
  {
    id: 6,
    name: "Healthy Glow Daily Face Cream",
    price: 1640,
    originalPrice: 2500,
    rating: 4.6,
    sold: "2K Sold",
    image: "/images/hero1.png",
  },
  {
    id: 7,
    name: "Healthy Glow Daily Face Cream",
    price: 1640,
    originalPrice: 2500,
    rating: 4.6,
    sold: "2K Sold",
    image: "/images/hero1.png",
  },
  {
    id: 8,
    name: "Healthy Glow Daily Face Cream",
    price: 1640,
    originalPrice: 2500,
    rating: 4.6,
    sold: "2K Sold",
    image: "/images/hero1.png",
  },
  {
    id: 9,
    name: "Healthy Glow Daily Face Cream",
    price: 1640,
    originalPrice: 2500,
    rating: 4.6,
    sold: "2K Sold",
    image: "/images/hero1.png",
  },
  {
    id: 10,
    name: "Healthy Glow Daily Face Cream",
    price: 1640,
    originalPrice: 2500,
    rating: 4.6,
    sold: "2K Sold",
    image: "/images/hero1.png",
  },
  {
    id: 11,
    name: "Healthy Glow Daily Face Cream",
    price: 1640,
    originalPrice: 2500,
    rating: 4.6,
    sold: "2K Sold",
    image: "/images/hero1.png",
  },
  {
    id: 12,
    name: "Healthy Glow Daily Face Cream",
    price: 1640,
    originalPrice: 2500,
    rating: 4.6,
    sold: "2K Sold",
    image: "/images/hero1.png",
  },
  {
    id: 13,
    name: "Healthy Glow Daily Face Cream",
    price: 1640,
    originalPrice: 2500,
    rating: 4.6,
    sold: "2K Sold",
    image: "/images/hero1.png",
  },
  {
    id: 14,
    name: "Healthy Glow Daily Face Cream",
    price: 1640,
    originalPrice: 2500,
    rating: 4.6,
    sold: "2K Sold",
    image: "/images/hero1.png",
  },
  {
    id: 15,
    name: "Healthy Glow Daily Face Cream",
    price: 1640,
    originalPrice: 2500,
    rating: 4.6,
    sold: "2K Sold",
    image: "/images/hero1.png",
  },
];

export function ShopAllProduct() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 lg:gap-x-6 gap-y-10">
          {products.map((product) => (
            <Link 
              href={`/shop/${product.id}`} 
              key={product.id} 
              className="group cursor-pointer block"
            >
              {/* Image Container */}
              <div className="relative aspect-square bg-[#f3f4f0] rounded-xl overflow-hidden mb-4 transition-all duration-300">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Hover Action Buttons */}
                <div className="absolute bottom-4 left-0 right-0 px-3 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                  <button className="flex-1 bg-[#4a6741] text-white py-2 px-3 rounded-full text-[10px] font-bold flex items-center justify-center gap-1 hover:bg-[#3d5435] transition-colors whitespace-nowrap">
                    <ShoppingCart className="w-3.5 h-3.5" /> Add to Cart
                  </button>
                  <button className="bg-[#4a6741] text-white py-2 px-3 rounded-full text-[10px] font-bold flex items-center justify-center gap-1 hover:bg-[#3d5435] transition-colors whitespace-nowrap">
                    <ArrowRight className="w-3.5 h-3.5 rotate-45" /> Compare
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="text-center px-1">
                <div className="flex items-center justify-center gap-1 mb-1.5">
                  <Star className="w-3 h-3 fill-[#FBBC05] text-[#FBBC05]" />
                  <span className="text-[11px] font-bold text-gray-700">{product.rating}</span>
                  <span className="text-[11px] text-gray-300 mx-1">|</span>
                  <span className="text-[11px] font-semibold text-gray-500">{product.sold}</span>
                </div>
                
                <h3 className="text-[13px] font-bold text-[#1a1a1a] mb-2 leading-tight">
                  {product.name}
                </h3>
                
                <div className="flex items-center justify-center gap-2">
                  <span className="text-[11px] text-gray-400 line-through">
                    {product.originalPrice} TK.
                  </span>
                  <span className="text-[14px] font-bold text-[#4a6741]">
                    {product.price} TK.
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-16">
          <button className="bg-[#4a6741] text-white px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-[#3d5435] transition-all shadow-md group">
            Load More <ArrowRight className="w-4 h-4 rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
