import { ShoppingCart, Heart, Star, ArrowRight } from "lucide-react";
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
    badge: null,
  },
  {
    id: 2,
    name: "Healthy Glow Daily Face Cream",
    price: 1640,
    originalPrice: 2500,
    rating: 4.6,
    sold: "2K Sold",
    image: "/images/hero1.png",
    badge: null,
  },
  {
    id: 3,
    name: "Healthy Glow Daily Face Cream",
    price: 1640,
    originalPrice: 2500,
    rating: 4.6,
    sold: "2K Sold",
    image: "/images/hero1.png",
    badge: null,
  },
  {
    id: 4,
    name: "Healthy Glow Daily Face Cream",
    price: 1640,
    originalPrice: 2500,
    rating: 4.6,
    sold: "2K Sold",
    image: "/images/hero1.png",
    badge: "FREE!",
  },
  {
    id: 5,
    name: "Healthy Glow Daily Face Cream",
    price: 1640,
    originalPrice: 2500,
    rating: 4.6,
    sold: "2K Sold",
    image: "/images/hero1.png",
    badge: null,
  },
];

export function BestSellingProducts() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a1a1a] mb-4">
            Best Selling Products
          </h2>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-y-10 gap-x-4 lg:gap-x-6">
          {products.map((product) => (
            <Link href={`/shop/${product.id}`} key={product.id} className="group cursor-pointer">
              {/* Image Box */}
              <div className="relative aspect-square bg-[#f3f4f0] rounded-xl overflow-hidden mb-4 transition-all duration-300">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                />
                
                {product.badge && (
                  <div className="absolute top-4 right-4 bg-[#1a5c96] text-white text-[10px] font-bold py-1 px-3 rounded-md rotate-[15deg] shadow-lg">
                    {product.badge}
                  </div>
                )}

                {/* Hover Action Buttons */}
                <div className="absolute bottom-4 left-0 right-0 px-3 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                  <button className="flex-1 bg-[#4a6741] text-white py-2 px-3 rounded-full text-[10px] font-medium flex items-center justify-center gap-1 hover:bg-[#3d5435] transition-colors whitespace-nowrap">
                    <ShoppingCart className="w-3 h-3" /> Add to Cart
                  </button>
                  <button className="bg-[#4a6741] text-white py-2 px-3 rounded-full text-[10px] font-medium flex items-center justify-center gap-1 hover:bg-[#3d5435] transition-colors whitespace-nowrap">
                    <ArrowRight className="w-3 h-3 rotate-45" /> Compare
                  </button>
                </div>
              </div>

              {/* Product Info - Centered */}
              <div className="text-center px-1">
                <div className="flex items-center justify-center gap-1 mb-2">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-semibold text-gray-700">{product.rating}</span>
                  <span className="text-xs text-gray-300 mx-1">|</span>
                  <span className="text-xs text-gray-600">{product.sold}</span>
                </div>
                
                <h3 className="text-sm font-bold text-gray-800 mb-2 leading-tight">
                  {product.name}
                </h3>
                
                <div className="flex items-center justify-center gap-1.5">
                  <span className="text-xs text-gray-400 line-through">
                    {product.originalPrice} TK.
                  </span>
                  <span className="text-sm font-bold text-[#4a6741]">
                    {product.price} TK.
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/shop" className="inline-flex items-center gap-2 px-8 py-3 bg-[#4a6741] text-white rounded-full font-medium hover:bg-[#3d5435] transition-colors shadow-md">
            View All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
