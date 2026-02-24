import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export function ShopAllProductBanner() {
  return (
    <section className="py-8 bg-white">
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full aspect-[1340/360] min-h-[300px] rounded-2xl overflow-hidden bg-[#2D1B8E]">
          {/* Background Image */}
          <Image
            src="/images/shop_banner.png"
            alt="Shop All Products Banner"
            fill
            className="object-cover"
            priority
          />

          
        </div>
      </div>
    </section>
  );
}
