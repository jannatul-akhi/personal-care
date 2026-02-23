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
    </section>
  );
}
