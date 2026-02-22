import Image from "next/image";
import { Star } from "lucide-react";

const galleryImages = [
  { src: "/images/celeb1.png", rotate: "-rotate-[5deg]", zIndex: "z-10", translate: "translate-y-12" },
  { src: "/images/celeb2.png", rotate: "-rotate-[2.5deg]", zIndex: "z-20", translate: "translate-y-6" },
  { src: "/images/celeb3.png", rotate: "rotate-0", zIndex: "z-30", translate: "translate-y-0" },
  { src: "/images/celeb4.png", rotate: "rotate-[2.5deg]", zIndex: "z-20", translate: "translate-y-6" },
  { src: "/images/celeb5.png", rotate: "rotate-[5deg]", zIndex: "z-10", translate: "translate-y-12" },
];

export default function BestApproach() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#1a1a1a] mb-6">
          Best Approach to Use Our Product
        </h2>
        <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto mb-20 leading-relaxed">
          Shop our selection of luxury t-shirts and polo shirts, the ultimate casual
          garments. We offer exclusive fabrics in cashmere.
        </p>

        <div className="relative flex justify-center items-center h-[500px] md:h-[600px] lg:h-[700px] mb-24 px-4">
          <div className="flex items-center justify-center gap-4 md:gap-7 lg:gap-10">
            {galleryImages.map((img, idx) => (
              <div
                key={idx}
                className={`relative rounded-[.5rem] overflow-hidden shadow-2xl transition-all duration-700 ease-out hover:scale-105 hover:z-50 ${img.rotate} ${img.zIndex} ${img.translate} 
                  ${idx === 2 ? 'w-[200px] h-[350px] md:w-[280px] md:h-[450px] lg:w-[320px] lg:h-[520px]' : 
                    (idx === 1 || idx === 3) ? 'w-[160px] h-[280px] md:w-[220px] md:h-[380px] lg:w-[260px] lg:h-[430px]' : 
                    'w-[130px] h-[230px] md:w-[180px] md:h-[320px] lg:w-[210px] lg:h-[370px]'}
                `}
              >
                <Image
                  src={img.src}
                  alt={`Approach step ${idx + 1}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>
            ))}
          </div>

          {/* Floating Product Card */}
          <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 z-[60] w-[260px] md:w-[320px]">
            <div className="bg-[#f9fafb] rounded-[1rem] p-3 md:p-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.04)] flex items-center gap-5 border border-gray-100/50">
               <div className="relative w-14 h-14 md:w-16 md:h-16 bg-white rounded-lg flex-shrink-0 overflow-hidden border border-gray-50">
                  <Image 
                    src="/images/lotion1.png" 
                    alt="Product thumbnail" 
                    fill 
                    className="object-contain p-1.5"
                  />
               </div>
               <div className="flex-1 text-left">
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-[#fbbf24] text-[#fbbf24]" />
                      <span className="text-[10px] md:text-xs font-semibold text-gray-700">4.6</span>
                    </div>
                    <span className="text-[9px] md:text-[10px] text-gray-400">|</span>
                    <span className="text-[9px] md:text-[10px] text-gray-400 font-medium">2K Sold</span>
                  </div>
                  <h3 className="text-[11px] md:text-[13px] font-bold text-gray-900 mb-1 leading-snug">
                    Healthy Glow Daily Face Cream
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] md:text-xs text-gray-400 line-through font-normal">৳1825</span>
                    <span className="text-sm md:text-base font-bold text-[#5c723d]">৳1640</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
