import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export function ShopNow() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative w-full h-[320px] md:h-[380px] rounded-3xl overflow-hidden bg-[#f0f3ed] flex items-center justify-between">
          
          {/* Left Decorative Image: Hand holding bottle */}
          <div className="relative h-full w-[25%] lg:w-[30%] hidden md:block">
            <div className="absolute inset-0 flex items-center justify-center translate-x-4 lg:translate-x-10 translate-y-6">
               <div className="relative w-full h-full transform scale-125">
                 <Image
                    src="/images/shopnow2.png"
                    alt="Hand holding skincare bottle"
                    fill
                    className="object-contain"
                  />
                  {/* Decorative Leaves Accent */}
                  <div className="absolute -left-10 bottom-10 w-40 h-40 opacity-40 pointer-events-none">
                     <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1545239351-ef056c0b05d1?auto=format&fit=crop&q=80&w=200')] bg-contain bg-no-repeat rotate-45"></div>
                  </div>
               </div>
            </div>
          </div>

          {/* Centered Content */}
          <div className="flex-1 text-center px-6 md:px-12 z-10 max-w-2xl mx-auto">
            <h2 className="text-lg md:text-xl lg:text-2xl font-serif font-bold text-[#1a1a1a] mb-6 leading-tight">
              Your Skin With The Dream Co
            </h2>
            <p className="text-gray-500 text-sm md:text-base mb-10 max-w-lg mx-auto leading-relaxed">
              Shop our selection of luxury t-shirts and polo shirts, the ultimate casual garments. We
              offer exclusive fabrics in cashmere.
            </p>
            <button className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#5c723d] text-white rounded-full font-bold hover:bg-[#4a5c31] transition-all transform hover:-translate-y-0.5 shadow-lg group">
              Shop Now <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Right Decorative Image: Smiling Model */}
          <div className="relative h-full w-[25%] lg:w-[30%] hidden md:block">
            <div className="absolute inset-0 flex items-center justify-start">
               <div className="relative w-[130%] h-full transform translate-x-0 lg:translate-x-6">
                  <Image
                    src="/images/shopnow1.png"
                    alt="Smiling Model"
                    fill
                    className="object-contain object-right"
                  />
                  {/* Decorative Leaves Accent */}
                  <div className="absolute right-5 bottom-20 w-32 h-32 opacity-30 pointer-events-none">
                     <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1545239351-ef056c0b05d1?auto=format&fit=crop&q=80&w=200')] bg-contain bg-no-repeat -rotate-12"></div>
                  </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
