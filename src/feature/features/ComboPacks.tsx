import { Star, ArrowRight, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";

const categories = [
  {
    id: 1,
    title: "Natural Hygiene Oil",
    bannerImage: "/images/combo1.png",
    products: [
      { id: 101, name: "Healthy Glow Daily Face Cream", price: 1640, originalPrice: 2500, rating: 4.6, sold: "2K Sold", image: "/images/hero1.png" },
      { id: 102, name: "Healthy Glow Daily Face Cream", price: 1640, originalPrice: 2500, rating: 4.6, sold: "2K Sold", image: "/images/hero2.png" },
      { id: 103, name: "Healthy Glow Daily Face Cream", price: 1640, originalPrice: 2500, rating: 4.6, sold: "2K Sold", image: "/images/hero3.png" },
    ]
  },
  {
    id: 2,
    title: "Organic Skin Care",
    bannerImage: "/images/combo2.png",
    products: [
      { id: 201, name: "Healthy Glow Daily Face Cream", price: 1640, originalPrice: 2500, rating: 4.6, sold: "2K Sold", image: "/images/lotion2.png" },
      { id: 202, name: "Healthy Glow Daily Face Cream", price: 1640, originalPrice: 2500, rating: 4.6, sold: "2K Sold", image: "/images/hero1.png" },
      { id: 203, name: "Healthy Glow Daily Face Cream", price: 1640, originalPrice: 2500, rating: 4.6, sold: "2K Sold", image: "/images/hero2.png" },
    ]
  }
];

export function ComboPacks() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a1a1a]">
            Choose Your Combo Pack
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {categories.map((category) => (
            <div key={category.id} className="border border-blue-100 rounded-2xl p-6 lg:p-8 flex flex-col bg-white">
              
              {/* Category Header Banner */}
              <div className="relative bg-[#f8faf7] rounded-xl p-8 mb-8 min-h-[200px] flex items-center overflow-hidden">
                <div className="relative z-10 flex-1">
                  <h3 className="text-xl lg:text-2xl font-serif font-bold text-[#1a1a1a] mb-4">
                    {category.title}
                  </h3>
                  <a href="#" className="inline-flex items-center gap-1.5 text-[#4a6741] font-bold text-sm lg:text-base hover:underline">
                    See All Product <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
                
                <div className="absolute right-0 top-0 bottom-0 w-1/2 flex items-center justify-end p-4">
                  <div className="relative w-full h-full">
                    <Image
                      src={category.bannerImage}
                      alt={category.title}
                      fill
                      className="object-contain"
                    />
                    {/* Badge */}
                    <div className="absolute -left-2 -bottom-2 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-green-50 z-20">
                      <img src="/images/badge.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Products Item Grid */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                 {category.products.map((product) => (
                   <div key={product.id} className="text-center group cursor-pointer">
                      <div className="bg-[#f3f4f0] rounded-xl overflow-hidden aspect-square mb-3 relative group-hover:shadow-md transition-all">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex items-center justify-center gap-1 mb-1.5">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-[11px] font-bold text-gray-700">{product.rating}</span>
                        <span className="text-[11px] text-gray-300 mx-0.5">|</span>
                        <span className="text-[11px] text-gray-600">{product.sold}</span>
                      </div>
                      <h4 className="text-[13px] font-bold text-gray-800 leading-tight mb-2 px-1">
                        {product.name}
                      </h4>
                      <div className="flex items-center justify-center gap-1.5">
                        <span className="text-[11px] text-gray-400 line-through whitespace-nowrap">
                          {product.originalPrice} TK.
                        </span>
                        <span className="text-[13px] font-bold text-[#4a6741] whitespace-nowrap">
                          {product.price} TK.
                        </span>
                      </div>
                   </div>
                 ))}
              </div>

              {/* Navigation Controls */}
              <div className="mt-auto flex justify-center gap-2">
                 <button className="w-8 h-8 bg-[#4a6741] text-white flex items-center justify-center rounded-sm hover:bg-[#3d5435] transition-colors">
                   <ChevronLeft className="w-5 h-5" />
                 </button>
                 <button className="w-8 h-8 bg-white text-gray-400 border border-gray-100 flex items-center justify-center rounded-sm hover:bg-gray-50 transition-colors">
                   <ChevronRight className="w-5 h-5" />
                 </button>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
