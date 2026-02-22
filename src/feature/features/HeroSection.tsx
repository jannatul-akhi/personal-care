import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="w-full">
      {/* Main Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 max-w-7xl mx-auto">
        {/* Left Banner - Bright Glow */}
        <div className="relative bg-gradient-to-br from-yellow-100 via-orange-50 to-yellow-200 rounded-2xl overflow-hidden min-h-[400px] lg:min-h-full">
          <Image
            src="/images/hero1.png"
            alt="Bright Glow"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right Side Banners */}
        <div className="grid grid-rows-2 gap-4">
          {/* Skin Care Banner */}
          <div className="relative bg-gradient-to-r from-green-50 to-green-100 rounded-2xl overflow-hidden min-h-[190px]">
            <Image
              src="/images/hero2.png"
              alt="Skin Care"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Healthy Care Banner */}
          <div className="relative bg-gradient-to-r from-teal-50 to-cyan-100 rounded-2xl overflow-hidden min-h-[190px]">
            <Image
              src="/images/hero3.png"
              alt="Healthy Care"
              height={600}
              width={600}
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* Category Icons */}
      {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              name: "Women's Care",
              icon: "👩",
              color: "bg-pink-100 text-pink-600",
            },
            {
              name: "Kids Care",
              icon: "👶",
              color: "bg-blue-100 text-blue-600",
            },
            {
              name: "Men's Care",
              icon: "👨",
              color: "bg-green-100 text-green-600",
            },
            {
              name: "Hair Care",
              icon: "💇",
              color: "bg-purple-100 text-purple-600",
            },
          ].map((category) => (
            <div
              key={category.name}
              className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100"
            >
              <div
                className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center text-2xl`}
              >
                {category.icon}
              </div>
              <span className="font-medium text-gray-700">{category.name}</span>
            </div>
          ))}
        </div>
      </div> */}
    </section>
  );
}
