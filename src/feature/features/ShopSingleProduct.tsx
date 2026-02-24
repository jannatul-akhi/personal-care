"use client";

import { useState } from "react";
import { 
  Star, 
  ChevronDown, 
  ChevronUp, 
  ShoppingCart, 
  Truck, 
  Zap, 
  MapPin,
  Maximize2,
  Home,
  ChevronRight,
  ArrowUpRight,
  Camera
} from "lucide-react";
import Image from "next/image";

export function ShopSingleProduct() {
  const [activeAccordion, setActiveAccordion] = useState<string | null>("description");
  const [selectedSize, setSelectedSize] = useState("50ml");
  const [quantity, setQuantity] = useState(2);
  const [activeImage, setActiveImage] = useState(0);

  const productImages = [
    "/images/hero1.png", // Mocking with existing images if specific ones aren't available
    "/images/skin1.png",
    "/images/skin2.png",
    "/images/shop-banner.png"
  ];

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  return (
    <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-[13px] text-gray-500 mb-8">
        <Home className="w-3.5 h-3.5" />
        <span className="hover:text-gray-700 cursor-pointer">Home</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="hover:text-gray-700 cursor-pointer">Shop Page</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        
        {/* Left: Image Gallery (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="relative aspect-square bg-[#f3f4f0] rounded-2xl overflow-hidden group">
            <Image
              src={productImages[activeImage]}
              alt="Product"
              fill
              className="object-contain p-8"
            />
            <button className="absolute top-4 right-4 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {productImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                  activeImage === idx ? "border-[#4a6741]" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={img} alt="Thumbnail" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Center: Product Details (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <h1 className="text-3xl font-serif font-bold text-[#1a1a1a] mb-2">
              Healthy Glow Daily Face Cream
            </h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-[#FBBC05] text-[#FBBC05]" />
                <span className="text-lg font-bold text-gray-900">4.6</span>
              </div>
              <span className="text-sm text-gray-400">(5k+ Reviews)</span>
            </div>
          </div>

          <p className="text-[15px] text-gray-600 leading-relaxed">
            A top-rated choice for many kitchens, this model uses smart fuzzy logic technology to adjust cooking time and temperature automatically for perfectly cooked rice every time. It often includes multiple cooking settings (white rice, brown rice, steam, quick rice) and a keep warm function.
          </p>

          <div className="text-sm font-bold">
            <span className="text-gray-500">Brand: </span>
            <span className="text-gray-900">L'Oréal Paris</span>
          </div>

          {/* Banner Offer */}
          <div className="relative bg-gradient-to-r from-[#A83D9E] to-[#6A217A] rounded-xl px-6 py-4 text-white overflow-hidden flex items-center justify-between">
            <div>
              <p className="text-xl font-bold mb-1 italic">First Order?</p>
              <p className="text-sm opacity-90">Enjoy an Exclusive Discount!</p>
            </div>
            <div className="relative z-10 text-right">
              <div className="bg-[#FBBC05] text-[#6A217A] text-[10px] font-bold px-2 py-0.5 rounded absolute -top-2 right-0 transform rotate-[10deg]">
                GET UPTO
              </div>
              <p className="text-4xl font-black">20% <span className="text-xl">OFF</span></p>
              <p className="text-[10px] font-bold tracking-widest mt-1">SPECIAL OFFER</p>
            </div>
          </div>

          {/* Accordion Sections */}
          <div className="space-y-3">
            {[
              { id: "description", label: "Product Description" },
              { id: "how-to-use", label: "How To Use" },
              { id: "shipping", label: "Shipping Details" },
              { id: "return", label: "Return Policy" }
            ].map((item) => (
              <div key={item.id} className="border-b border-gray-100 last:border-0">
                <button
                  onClick={() => toggleAccordion(item.id)}
                  className="w-full flex items-center justify-between py-4 text-left group"
                >
                  <span className="font-serif font-bold text-[#1a1a1a] group-hover:text-[#4a6741] transition-colors">
                    {item.label}
                  </span>
                  {activeAccordion === item.id ? (
                    <ChevronUp className="w-4 h-4 text-[#4a6741]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  )}
                </button>
                {activeAccordion === item.id && (
                  <div className="pb-4 text-[14px] text-gray-500 animate-in fade-in slide-in-from-top-1 duration-200">
                    Detailed information about {item.label.toLowerCase()} goes here. Our products are formulated with the highest quality ingredients to ensure maximum efficacy and safety.
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Purchase Card (3 cols) */}
        <div className="lg:col-span-3">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm sticky top-6">
            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-3xl font-bold text-gray-900">1450 TK</span>
              <span className="text-gray-400 line-through text-sm">2500 TK.</span>
            </div>

            {/* Delivery Options */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Delivered to</span>
                <button className="text-[#4a6741] font-bold hover:underline">Change</button>
              </div>
              <div className="flex gap-3 text-[13px] text-gray-700">
                <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                <span>2558 Hardman Road, Vermont, South Burlington, USA - 67452</span>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors border-2 border-transparent has-[:checked]:border-[#4a6741]">
                  <input type="radio" name="delivery" className="w-4 h-4 text-[#4a6741] focus:ring-[#4a6741]" defaultChecked />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-0.5">
                      <div className="flex items-center gap-2 font-bold text-gray-900">
                        <Truck className="w-4 h-4" /> Normal Delivery
                      </div>
                      <span className="font-bold">৳120</span>
                    </div>
                    <p className="text-[11px] text-gray-400">Within 2/3 Days</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors border-2 border-transparent has-[:checked]:border-[#4a6741]">
                  <input type="radio" name="delivery" className="w-4 h-4 text-[#4a6741] focus:ring-[#4a6741]" />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-0.5">
                      <div className="flex items-center gap-2 font-bold text-gray-900">
                        <Zap className="w-4 h-4" /> Express Delivery
                      </div>
                      <span className="font-bold">৳180</span>
                    </div>
                    <p className="text-[11px] text-gray-400">Within 12 Hours</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Selection Options */}
            <div className="space-y-4 mb-8">
              <div>
                <label className="text-sm font-bold text-gray-900 mb-2 block">Size:</label>
                <select 
                  className="w-full bg-gray-50 border-transparent rounded-xl p-3 text-sm font-medium focus:ring-0 cursor-pointer appearance-none"
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  <option value="50ml">50ml</option>
                  <option value="100ml">100ml</option>
                  <option value="200ml">200ml</option>
                </select>
              </div>
              
              <div className="flex items-center gap-2 text-[12px] text-gray-500 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-500" /> 15 in stock
              </div>

              <div>
                <label className="text-sm font-bold text-gray-900 mb-2 block">Quantity:</label>
                <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-1.5 w-max">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xl font-bold hover:bg-white transition-colors"
                  > - </button>
                  <span className="font-bold text-gray-900 w-4 text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xl font-bold hover:bg-white transition-colors"
                  > + </button>
                </div>
              </div>
            </div>

            <button className="w-full bg-[#1a1a1a] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-black transition-colors">
              Add To Cart <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Products Review Section */}
      <div className="pt-16 border-t border-gray-100">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-[#1a1a1a]">Products Review</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Summary (4 cols) */}
          <div className="lg:col-span-4 space-y-12">
            <div>
              <div className="flex flex-col gap-2 mb-6">
                <p className="text-5xl font-bold text-gray-900">4.6 out of 5</p>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < 4 ? "fill-[#FBBC05] text-[#FBBC05]" : "fill-gray-200 text-gray-200"}`} />
                  ))}
                  <span className="text-sm text-gray-400 ml-2">(5K+ Reviews)</span>
                </div>
              </div>
              <button className="inline-flex items-center gap-2 px-8 py-3 bg-[#4a6741] text-white rounded-full font-bold hover:bg-[#3d5435] transition-all">
                Write A Review <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            {/* Image Gallery */}
            <div>
              <h3 className="text-xl font-serif font-bold text-[#1a1a1a] mb-6">Image Gallery</h3>
              <div className="grid grid-cols-4 gap-3">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer">
                    <Image
                      src={productImages[i % 4]}
                      alt="Review Gallery"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {i === 7 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold">
                        +120
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Detailed Ratings & Reviews (8 cols) */}
          <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-serif font-bold text-[#1a1a1a]">Reviews</h3>
              <button className="flex items-center gap-1 text-sm font-bold text-gray-600">
                Top reviews <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-8 max-h-[800px] overflow-y-auto pr-6 custom-scrollbar">
              {[1, 2, 3].map((idx) => (
                <div key={idx} className="pb-8 border-b border-gray-100 last:border-0">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full" />
                      <div>
                        <div className="font-bold text-gray-900 flex items-center gap-1.5">
                          Eleanor Pena <div className="w-3.5 h-3.5 bg-green-500 rounded-full flex items-center justify-center text-[8px] text-white">✓</div>
                        </div>
                        <div className="flex items-center gap-1 mt-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < 4 ? "fill-[#FBBC05] text-[#FBBC05]" : "fill-gray-200 text-gray-200"}`} />
                          ))}
                          <span className="text-[11px] text-gray-400 font-bold ml-1">(4.6)</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-[12px] text-gray-400 font-medium flex items-center gap-1.5">
                      <Camera className="w-3.5 h-3.5" /> August 10, 2026
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <p className="font-bold text-gray-900 mb-2">Exactly as described</p>
                    <p className="text-[14px] text-gray-500 leading-relaxed">
                      I'm really impressed with this cap. The fabric is soft yet durable, and the fit is adjustable, making it super comfortable. Highly recommended!
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <div className="w-16 h-16 relative rounded-lg overflow-hidden border border-gray-100">
                      <Image src={productImages[0]} alt="Review img" fill className="object-cover" />
                    </div>
                    <div className="w-16 h-16 relative rounded-lg overflow-hidden border border-gray-100">
                      <Image src={productImages[1]} alt="Review img" fill className="object-cover" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f9f9f9;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e0e0e0;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
