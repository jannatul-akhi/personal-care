import { ShoppingCart, Heart, Star, ArrowRight } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Healthy Glow Daily Face Cream",
    price: 1640,
    originalPrice: 2000,
    rating: 4.8,
    sold: "2K Sold",
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=300&h=300&fit=crop",
  },
  {
    id: 2,
    name: "Tea Tree Oil Serum",
    price: 1450,
    originalPrice: 1800,
    rating: 4.9,
    sold: "1.2K Sold",
    image:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=300&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Aloe Vera Healing Gel",
    price: 750,
    originalPrice: 950,
    rating: 4.7,
    sold: "5K Sold",
    image:
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=300&h=300&fit=crop",
  },
  {
    id: 4,
    name: "Neem Face Wash",
    price: 450,
    originalPrice: 600,
    rating: 4.6,
    sold: "3.5K Sold",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop",
  },
  {
    id: 5,
    name: "Vitamin E Night Cream",
    price: 1890,
    originalPrice: 2300,
    rating: 4.8,
    sold: "900 Sold",
    image:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=300&h=300&fit=crop",
  },
  {
    id: 6,
    name: "Charcoal Face Mask",
    price: 650,
    originalPrice: 850,
    rating: 4.5,
    sold: "2.1K Sold",
    image:
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=300&h=300&fit=crop",
  },
  {
    id: 7,
    name: "Rose Water Toner",
    price: 550,
    originalPrice: 700,
    rating: 4.7,
    sold: "4K Sold",
    image:
      "https://images.unsplash.com/photo-1617897903246-719242758050?w=300&h=300&fit=crop",
  },
  {
    id: 8,
    name: "Collagen Eye Cream",
    price: 2200,
    originalPrice: 2800,
    rating: 4.9,
    sold: "600 Sold",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&h=300&fit=crop",
  },
];

export function TopRatedProducts() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a1a1a] mb-4">
            Top Rated Product
          </h2>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-4 lg:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              {/* Image Box */}
              <div className="relative aspect-square bg-[#f3f4f0] rounded-xl overflow-hidden mb-4 transition-all duration-300">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Hover Action Buttons */}
                <div className="absolute bottom-4 left-0 right-0 px-3 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                  <button className="bg-[#4a6741] text-white py-2 px-3 rounded-full text-[10px] font-medium flex items-center justify-center gap-1 hover:bg-[#3d5435] transition-colors whitespace-nowrap">
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
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 px-8 py-3 bg-[#4a6741] text-white rounded-md font-bold hover:bg-[#3d5435] transition-colors shadow-md">
            See All Items <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
