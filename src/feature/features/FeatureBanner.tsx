import {
  Truck,
  Headphones,
  ShieldCheck,
  Award,
  ShoppingCart,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

export function FeatureBanner() {
  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "When ordering over $100",
    },
    {
      icon: Headphones,
      title: "24/7 Online Support",
      description: "When ordering over $100",
    },
    {
      icon: ShieldCheck,
      title: "100% Original",
      description: "When ordering over $100",
    },
    {
      icon: Award,
      title: "BSTI Certified",
      description: "Fast & Hassle Free Delivery",
    },
  ];

  return (
    <section className="py-12 bg-white relative">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[550px] lg:h-auto">
          {/* Left - Skin Care Banner */}
          <div className="lg:col-span-4 relative h-[550px] rounded-xl overflow-hidden group">
            <Image
              src="/images/skin1.png"
              alt="Skin Care"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>

          {/* Middle - Features List */}
          <div className="lg:col-span-4 bg-[#f9fbf9] rounded-xl flex flex-col justify-between px-10 py-6 border border-gray-50 h-[550px]">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`flex items-center gap-6 py-3 ${
                  index !== features.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}
              >
                <div className="w-14 h-14 bg-[#4a6741] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg group">
                  <feature.icon className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-[#1a1a1a] text-[19px]">
                    {feature.title}
                  </h3>
                  <p className="text-[13px] text-gray-500 mt-0.5">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right - Face Care Banner */}
          <div className="lg:col-span-4 relative h-[550px] rounded-xl overflow-hidden group">
            <Image
              src="/images/skin2.png"
              alt="Skin Care"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        {/* Floating Cart Information - Vertical Pill Stick to Right */}
        <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50">
          <div className="bg-white shadow-[0_4px_30px_rgba(0,0,0,0.15)] rounded-l-2xl overflow-hidden border-y border-l border-gray-100">
            <div className="bg-[#4a6741] p-4 text-white flex flex-col items-center gap-1 cursor-pointer hover:bg-[#3d5435] transition-colors min-w-[85px]">
              <div className="relative">
                <ShoppingCart className="w-7 h-7 " />
              </div>
              <span className="text-[13px] font-bold mt-1">5 Items</span>
            </div>
            <div className="p-3 text-center bg-white">
              <p className="text-[#4a6741] font-black text-[15px]">৳ 5,640</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
